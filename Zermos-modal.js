class ZermosModal {
    constructor(style) {
        this.components = [];
        this.conditions = {};
        this.style = style ?? "";
    }

    addComponent(component) {
        this.components.push(component);
        return this;
    }

    setCondition(key, value) {
        this.conditions[key] = value;
        this.updateRenderedModal()
        return this;
    }

    updateRenderedModal() {
        var showConditionElements = document.querySelectorAll('div[showCondition]')
        showConditionElements.forEach((element) => {
            if (this.evaluateExpression(element.getAttribute("showCondition"))) {
                element.parentElement.style.display = "block";
            } else {
                element.parentElement.style.display = "none";
            }
        });
    }

    addHeading(text, subheading = "", level = 1, style = "textAlign: center") {
        return this.addComponent({
            type: 'heading',
            text,
            subheading,
            level,
            style
        });
    }

    addToggle(label, initialState = false, onChange = () => {}) {
        return this.addComponent({
            type: 'toggle',
            label,
            state: initialState,
            onChange
        });
    }

    addButton(text, onClick = () => {}, style = "") {
        return this.addComponent({
            type: 'button',
            text,
            onClick,
            style
        });
    }

    addSubmenu(showCondition, subModal) {
        return this.addComponent({
            type: 'submenu',
            showCondition,
            subModal
        });
    }

    addText(text, style = {}) {
        return this.addComponent({
            type: 'text',
            text,
            style
        });
    }

    addUrl(url, showFull = false, copyButton = true) {
        return this.addComponent({
            type: 'url',
            url,
            showFull,
            copyButton
        });
    }

    addDatePicker(label, initialDate = new Date(), onChange = () => {}) {
        return this.addComponent({
            type: 'datePicker',
            label,
            initialDate,
            onChange
        });
    }

    addDropdown(label, options, multiSelect = false, onChange = () => {}) {
        return this.addComponent({
            type: 'dropdown',
            label,
            options,
            multiSelect,
            onChange
        });
    }

    addSeparator(text = '') {
        return this.addComponent({
            type: 'separator',
            text
        });
    }

    addImage(src, alt = '', style = {}) {
        return this.addComponent({
            type: 'image',
            src,
            alt,
            style
        });
    }

    //height is specified like this: (20%, 16px, 2em, etc.)
    addSpacer(height = "20px") {
        return this.addComponent({
            type: 'spacer',
            height
        });
    }

    addNumberInput(label, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1,  onChange = () => {}) {
        return this.addComponent({
            type: 'numberInput',
            label,
            initialValue,
            decimals,
            min,
            max,
            step,
            onChange
        });
    }

    addTextInput(label, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({
            type: 'textInput',
            label,
            initialValue,
            maxLength,
            onChange
        });
    }

    addPasswordInput(label, maxLength = null, onChange = () => {}) {
        return this.addComponent({
            type: 'passwordInput',
            label,
            maxLength,
            onChange
        });
    }

    addTextArea(label, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({
            type: 'textArea',
            label,
            initialValue,
            maxLength,
            onChange
        });
    }

    //Rendering
    render() {
        // This method would create and return the actual DOM elements
        // based on the components and conditions
        const modalElement = document.createElement('div');
        modalElement.className = 'zermos-modal';
        modalElement.style = this.style;

        this.components.forEach(component => {
            const componentElement = this.renderComponent(component);
            modalElement.appendChild(componentElement);
        });

        return modalElement;
    }

    renderComponent(component) {
        // This method would create and return the DOM element for a specific component
        // You'd need to implement the rendering logic for each component type
        const componentElement = document.createElement('div');
        componentElement.classList.add(component.type);
        switch (component.type) {
            case "heading": {
                const headingElement = document.createElement('h' + component.level);
                headingElement.style = component.style;
                headingElement.innerText = component.text;

                const textElement = document.createElement('p');
                textElement.style = component.style;
                textElement.innerText = component.subheading;

                componentElement.appendChild(headingElement);
                componentElement.appendChild(textElement);
                break;
            }
            case "button": {
                const buttonElement = document.createElement("div");
                buttonElement.style = component.style;
                buttonElement.innerText = component.text;
                buttonElement.onclick = () => component.onClick(this);

                componentElement.appendChild(buttonElement);
                break;
            }
            case "submenu": {
                const subMenuElement = component.subModal.render();
                subMenuElement.setAttribute("showCondition", component.showCondition.replace("\"", "'"));

                componentElement.appendChild(subMenuElement);
                componentElement.style.display = this.evaluateExpression(component.showCondition) ? "block" : "none";
                break;
            }
            case "text": {
                const textElement = document.createElement('p');
                textElement.style = component.style;
                textElement.innerText = component.text;

                componentElement.appendChild(textElement);
                break;
            }
            case "toggle": {
                const toggleElement = document.createElement('div');
                toggleElement.classList.add("toggle-switch");
                component.state ? toggleElement.classList.add("active") : null;
                toggleElement.style = component.style;
                toggleElement.innerHTML = "<div class=\"switch\"></div>"

                componentElement.appendChild(toggleElement);

                toggleElement.addEventListener('click', () => {
                    toggleElement.classList.toggle('active');
                    const isActive = toggleElement.classList.contains('active');
                    component.onChange(this, isActive);
                });
                break;
            }
            case "url": {
                const urlSection = document.createElement('div');
                urlSection.className = 'url-section';

                const urlField = document.createElement('div');
                urlField.className = 'url-field';
                urlField.textContent = component.showFull ? component.url : new URL(component.url).pathname;
                urlField.contentEditable = !component.copyButton;

                if (component.copyButton) {
                    const copyButton = document.createElement('div');
                    copyButton.className = 'button copy';
                    copyButton.textContent = 'Kopieer';

                    var copyUrl = component.url;
                    copyButton.addEventListener('click', () => {

                        navigator.clipboard.writeText(copyUrl)
                            .then(() => {
                                console.log(`"${copyUrl}" was copied to your clipboard.`)
                            })
                            .catch(err => {
                                console.error(`Error copying text to clipboard: ${err}`)
                            })
                    })

                    urlSection.appendChild(copyButton);
                }
                urlSection.appendChild(urlField);

                componentElement.appendChild(urlSection);
                break;
            }
            case "spacer": {
                const spacerElement = document.createElement('div');
                spacerElement.style.height = component.height;
                componentElement.appendChild(spacerElement);
                break;
            }
            case "separator": {
                const separatorElement = document.createElement('div');

                const separatorTextElement = document.createElement('p');
                separatorTextElement.innerText = component.text;


                separatorElement.appendChild(separatorTextElement);
                componentElement.appendChild(separatorElement);
                break;
            }
            case "image": {
                const imageElement = document.createElement('img');
                imageElement.src = component.src;
                imageElement.alt = component.alt;
                imageElement.style = component.style;

                componentElement.appendChild(imageElement);
                break;
            }
            case "datePicker": {
                const datepicker = document.createElement('div');
                datepicker.id = 'datepicker';

                const selectedDateElem = document.createElement('div');
                selectedDateElem.id = 'selected-date';
                selectedDateElem.textContent = 'Select a date';
                datepicker.appendChild(selectedDateElem);

                const calendarElem = document.createElement('div');
                calendarElem.id = 'calendar';
                datepicker.appendChild(calendarElem);

                const calendarHeader = document.createElement('div');
                calendarHeader.id = 'calendar-header';
                calendarElem.appendChild(calendarHeader);

                const prevMonthButton = document.createElement('button');
                prevMonthButton.id = 'prev-month';
                prevMonthButton.textContent = '<';
                calendarHeader.appendChild(prevMonthButton);

                const monthYearElem = document.createElement('span');
                monthYearElem.id = 'month-year';
                calendarHeader.appendChild(monthYearElem);

                const nextMonthButton = document.createElement('button');
                nextMonthButton.id = 'next-month';
                nextMonthButton.textContent = '>';
                calendarHeader.appendChild(nextMonthButton);

                const calendarBody = document.createElement('div');
                calendarBody.id = 'calendar-body';
                calendarElem.appendChild(calendarBody);

                componentElement.appendChild(datepicker);

                let selectedDate = new Date();
                let currentMonth = selectedDate.getMonth();
                let currentYear = selectedDate.getFullYear();

                function renderCalendar(month, year) {
                    calendarBody.innerHTML = '';
                    const firstDay = new Date(year, month).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();

                    monthYearElem.textContent = `${year} - ${month + 1}`;

                    for (let i = 0; i < firstDay; i++) {
                        calendarBody.appendChild(document.createElement('div'));
                    }

                    for (let day = 1; day <= daysInMonth; day++) {
                        const dayElem = document.createElement('div');
                        dayElem.textContent = day;
                        dayElem.classList.add('day');
                        if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                            dayElem.classList.add('selected');
                        }
                        dayElem.addEventListener('click', function () {
                            selectedDate = new Date(year, month, day);
                            selectedDateElem.textContent = selectedDate.toDateString();
                            calendarElem.style.display = 'none';
                            renderCalendar(currentMonth, currentYear);
                            component.onChange(this, selectedDate);
                        });
                        calendarBody.appendChild(dayElem);
                    }
                }

                selectedDateElem.addEventListener('click', function () {
                    calendarElem.style.display = calendarElem.style.display === 'none' ? 'block' : 'none';
                });

                prevMonthButton.addEventListener('click', function () {
                    if (currentMonth === 0) {
                        currentMonth = 11;
                        currentYear--;
                    } else {
                        currentMonth--;
                    }
                    renderCalendar(currentMonth, currentYear);
                });

                nextMonthButton.addEventListener('click', function () {
                    if (currentMonth === 11) {
                        currentMonth = 0;
                        currentYear++;
                    } else {
                        currentMonth++;
                    }
                    renderCalendar(currentMonth, currentYear);
                });

                renderCalendar(currentMonth, currentYear);

                break;
            }
            case "dropdown": {
                const labelElement = document.createElement('p');
                labelElement.innerText = component.label;

                const dropdownElement = document.createElement('div');
                dropdownElement.classList.add('dropdown');

                const dropdownButton = document.createElement('div');
                dropdownButton.classList.add('dropdown-button');
                dropdownButton.innerText = 'Select...';

                const dropdownMenu = document.createElement('div');
                dropdownMenu.classList.add('dropdown-menu');
                dropdownMenu.style.display = 'none';

                component.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('dropdown-option');
                    optionElement.innerText = option.label;

                    optionElement.addEventListener('click', () => {
                        if (component.multiSelect) {
                            optionElement.classList.toggle('selected');
                        } else {
                            Array.from(dropdownMenu.children).forEach(child => {
                                child.classList.remove('selected');
                            });
                            optionElement.classList.add('selected');
                            dropdownButton.innerText = option.label;
                            dropdownMenu.style.display = 'none';
                        }
                        const selectedOptions = Array.from(dropdownMenu.children)
                            .filter(child => child.classList.contains('selected'))
                            .map(child => child.innerText);
                        component.onChange(this, component.multiSelect ? selectedOptions : selectedOptions[0]);
                    });

                    dropdownMenu.appendChild(optionElement);
                });

                dropdownButton.addEventListener('click', () => {
                    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
                });

                dropdownElement.appendChild(dropdownButton);
                dropdownElement.appendChild(dropdownMenu);

                componentElement.appendChild(labelElement);
                componentElement.appendChild(dropdownElement);
                break;
            }
            case "numberInput": {
                const min = component.min;
                const max = component.max;
                const step = component.step;
                let value = component.initialValue;

                // Create the main div
                const numberInput = document.createElement('div');
                numberInput.className = 'number-input';
                numberInput.id = 'customNumberInput';

                // Create the decrement button
                const decrementButton = document.createElement('button');
                decrementButton.className = 'button';
                decrementButton.textContent = '-';

                // Create the span for number display
                const numberDisplay = document.createElement('span');
                numberDisplay.contentEditable = 'true';
                numberDisplay.className = 'display';
                numberDisplay.textContent = '0';

                // Create the increment button
                const incrementButton = document.createElement('button');
                incrementButton.className = 'button';
                incrementButton.textContent = '+';

                // Append the buttons and span to the main div
                numberInput.appendChild(decrementButton);
                numberInput.appendChild(numberDisplay);
                numberInput.appendChild(incrementButton);

                function updateDisplay() {
                    console.log(value)
                    numberDisplay.textContent = value.toString();
                }

                function increment() {
                    if (value + step <= max) {
                        value += step;
                        updateDisplay();
                    }
                }

                function decrement() {
                    if (value - step >= min) {
                        value -= step;
                        updateDisplay();
                    }
                }

                function validateAndSetInput(inputValue) {
                    let parsedValue = parseFloat(inputValue.replace(',', '.'));
                    if (!isNaN(parsedValue)) {
                        if (parsedValue >= min && parsedValue <= max) {
                            value = parsedValue;
                            updateDisplay();
                        }
                    }
                }

                incrementButton.addEventListener("click", increment);
                decrementButton.addEventListener("click", decrement);

                numberDisplay.addEventListener("input", (e) => {
                    const inputValue = e.target.textContent;
                    validateAndSetInput(inputValue);
                });

                numberDisplay.addEventListener("keypress", (e) => {
                    const char = String.fromCharCode(e.which);
                    if (!/[0-9,.]/.test(char)) {
                        e.preventDefault();
                    }
                });

                updateDisplay();

                componentElement.appendChild(numberInput);
                break;
            }
            case "textInput": {
                const labelElement = document.createElement('p');
                labelElement.innerText = component.label;

                const textInputElement = document.createElement('div');
                textInputElement.classList.add('text-input');
                textInputElement.innerText = component.initialValue;

                textInputElement.addEventListener('click', () => {
                    const newValue = prompt("Enter text:", component.initialValue);
                    if (newValue !== null && (component.maxLength === null || newValue.length <= component.maxLength)) {
                        textInputElement.innerText = newValue;
                        component.onChange(this, newValue);
                    }
                });

                componentElement.appendChild(labelElement);
                componentElement.appendChild(textInputElement);
                break;
            }
            case "passwordInput": {
                const labelElement = document.createElement('p');
                labelElement.innerText = component.label;

                const passwordInputElement = document.createElement('div');
                passwordInputElement.classList.add('password-input');
                passwordInputElement.innerText = '';

                passwordInputElement.addEventListener('click', () => {
                    const newValue = prompt("Enter password:");
                    if (newValue !== null && (component.maxLength === null || newValue.length <= component.maxLength)) {
                        passwordInputElement.innerText = '*'.repeat(newValue.length);
                        component.onChange(this, newValue);
                    }
                });

                componentElement.appendChild(labelElement);
                componentElement.appendChild(passwordInputElement);
                break;
            }
            case "textArea": {
                const labelElement = document.createElement('p');
                labelElement.innerText = component.label;

                const textAreaElement = document.createElement('div');
                textAreaElement.classList.add('text-area');
                textAreaElement.innerText = component.initialValue;

                textAreaElement.addEventListener('click', () => {
                    const newValue = prompt("Enter text:", component.initialValue);
                    if (newValue !== null && (component.maxLength === null || newValue.length <= component.maxLength)) {
                        textAreaElement.innerText = newValue;
                        component.onChange(this, newValue);
                    }
                });

                componentElement.appendChild(labelElement);
                componentElement.appendChild(textAreaElement);
                break;
            }
            case "":
            default: {
                componentElement.innerText = "rendered default: " + component.type;
                break;
            }
        }

        return componentElement;
    }

    open() {
        const modalElement = this.render();
        document.body.appendChild(modalElement);
    }

    //conditions
    evaluateExpression(expression) {
        const comparisonMatch = expression.match(/^(\w+)\s*(==|!=|>|<|>=|<=)\s*(.+)$/);

        if (comparisonMatch) {
            const [_, key, operator, value] = comparisonMatch;
            switch (operator) {
                case '==':
                    return this.conditions[key] === parseValue(value);
                case '!=':
                    return this.conditions[key] !== parseValue(value);
                case '>':
                    return this.conditions[key] > parseValue(value);
                case '<':
                    return this.conditions[key] < parseValue(value);
                case '>=':
                    return this.conditions[key] >= parseValue(value);
                case '<=':
                    return this.conditions[key] <= parseValue(value);
                default:
                    return false;
            }
        } else {
            return false;
        }

        function parseValue(value) {
            if (value === 'true') return true; //bool
            if (value === 'false') return false; //bool
            if (!isNaN(value)) return parseFloat(value); //number
            if (/^["'].*["']$/.test(value)) return value.slice(1, -1); // string
            throw new Error('Unsupported value type');
        }
    }
}

class ZermosSubModal extends ZermosModal {
    // Subclass for submenus, can override or add specific submenu behavior
}