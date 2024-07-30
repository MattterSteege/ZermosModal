class ZermosModal {
    constructor(components = [], conditions = {}) {
        this.components = components;
        this.conditions = conditions;
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

    addHeading(text, subheading = "", level = 1) {
        return this.addComponent({
            type: 'heading',
            text,
            subheading,
            level
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

    addButton(text, onClick = () => {}) {
        return this.addComponent({
            type: 'button',
            text,
            onClick
        });
    }

    addDoubleButtons(text, secondText, onClick = () => {}, secondOnClick = () => {}) {
        return this.addComponent({
            type: 'doubleButton',
            text,
            onClick,
            secondText,
            secondOnClick
        });
    }

    addTripleButtons(text, secondText, thirdText, onClick = () => {}, secondOnClick = () => {}, thirdOnClick = () => {}) {
        return this.addComponent({
            type: 'tripleButton',
            text,
            onClick,
            secondText,
            secondOnClick,
            thirdText,
            thirdOnClick
        });
    }

    addSubmenu(showCondition, subModal) {
        return this.addComponent({
            type: 'submenu',
            showCondition,
            subModal
        });
    }

    addText(text) {
        return this.addComponent({
            type: 'text',
            text
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

    addImage(src, alt = '') {
        return this.addComponent({
            type: 'image',
            src,
            alt
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
                headingElement.innerText = component.text;

                const textElement = document.createElement('p');
                textElement.innerText = component.subheading;

                componentElement.appendChild(headingElement);
                componentElement.appendChild(textElement);
                break;
            }
            case "button": {
                const buttonElement = document.createElement("div");
                buttonElement.innerText = component.text;
                buttonElement.onclick = () => component.onClick(this);

                componentElement.appendChild(buttonElement);
                break;
            }
            case "doubleButton": {
                const buttonElement = document.createElement("div");
                buttonElement.innerText = component.text;
                buttonElement.onclick = () => component.onClick(this);

                const secondButtonElement = document.createElement("div");
                secondButtonElement.innerText = component.secondText;
                secondButtonElement.onclick = () => component.secondOnClick(this);

                componentElement.appendChild(buttonElement);
                componentElement.appendChild(secondButtonElement);
                break;
            }
            case "tripleButton": {
                const buttonElement = document.createElement("div");
                buttonElement.innerText = component.text;
                buttonElement.onclick = () => component.onClick(this);

                const secondButtonElement = document.createElement("div");
                secondButtonElement.innerText = component.secondText;
                secondButtonElement.onclick = () => component.secondOnClick(this);

                const thirdButtonElement = document.createElement("div");
                thirdButtonElement.innerText = component.thirdText;
                thirdButtonElement.onclick = () => component.thirdOnClick(this);

                componentElement.appendChild(buttonElement);
                componentElement.appendChild(secondButtonElement);
                componentElement.appendChild(thirdButtonElement);
                componentElement.appendChild(thirdButtonElement);
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
                textElement.innerText = component.text;

                componentElement.appendChild(textElement);
                break;
            }
            case "toggle": {
                const toggleElement = document.createElement('div');
                toggleElement.classList.add("toggle-switch");
                component.state ? toggleElement.classList.add("active") : null;
                toggleElement.innerHTML = "<div class=\"switch\"></div>"

                componentElement.appendChild(toggleElement);

                toggleElement.addEventListener('click', () => {
                    toggleElement.classList.toggle('active');
                    const isActive = toggleElement.classList.contains('active');
                    if (component.onChange) component.onChange(this, isActive);
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

                    console.log(firstDay);

                    monthYearElem.textContent = new Date(year, month + 1, 0).toLocaleString('default', { year: 'numeric', month: 'long' });

                    for (let i = 0; i < firstDay - 1; i++) {
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
                            if (component.onChange) component.onChange(this, selectedDate);
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
                            dropdownButton.click();
                        }
                        const selectedOptions = Array.from(dropdownMenu.children)
                            .filter(child => child.classList.contains('selected'))
                            .map(child => child.innerText);

                        dropdownButton.innerText = selectedOptions.join(", ") === "" ? "Select..." : selectedOptions.join(", ");

                        if (component.onChange) component.onChange(this, component.multiSelect ? selectedOptions : selectedOptions[0]);
                    });

                    dropdownMenu.appendChild(optionElement);
                });

                dropdownButton.addEventListener('click', () => {
                    dropdownButton.classList.toggle("selected");
                    dropdownMenu.classList.toggle("show");
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
                decrementButton.className = 'decrement-button';
                decrementButton.textContent = '-';

                // Create the span for number display
                const numberDisplay = document.createElement('span');
                numberDisplay.contentEditable = 'true';
                numberDisplay.className = 'display';
                numberDisplay.textContent = '0';

                // Create the increment button
                const incrementButton = document.createElement('button');
                incrementButton.className = 'increment-button';
                incrementButton.textContent = '+';

                // Append the buttons and span to the main div
                numberInput.appendChild(decrementButton);
                numberInput.appendChild(numberDisplay);
                numberInput.appendChild(incrementButton);

                function updateDisplay() {
                    numberDisplay.textContent = value.toString();
                    console.log(component)
                    if (component.onChange) component.onChange(this, value);
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
                const label = component.label;
                const initialValue = component.initialValue;
                const maxLength = component.maxLength;

// Create the main div
                const textElementInput = document.createElement('div');
                textElementInput.className = 'text-element-input';

// Create the label
                const inputLabel = document.createElement('p');
                inputLabel.className = "label"
                inputLabel.textContent = label;

// Create the span for text display
                const textDisplay = document.createElement('div');
                textDisplay.contentEditable = 'true';
                textDisplay.className = 'display';
                textDisplay.textContent = initialValue;

// Append the label and span to the main div
                textElementInput.appendChild(inputLabel);
                textElementInput.appendChild(textDisplay);

                textElementInput.addEventListener("keypress", (e) => {
                    if (textElementInput.innerText.length >= maxLength || e.key === "Enter") {
                        e.preventDefault();
                    }
                });

                componentElement.appendChild(textElementInput);
                break;
            }
            case "passwordInput": {
                const label = component.label;
                const maxLength = component.maxLength;
                let password = '';
                let showPassword = false;

// Create the main div
                const textElementInput = document.createElement('div');
                textElementInput.className = 'password-element-input';

// Create the label
                const inputLabel = document.createElement('p');
                inputLabel.className = "label";
                inputLabel.textContent = label;

// Create the span for text display
                const textDisplay = document.createElement('div');
                textDisplay.contentEditable = 'true';
                textDisplay.className = 'display';

// Create the eye icon
                const eyeIcon = document.createElement('span');
                eyeIcon.innerText = "👀"
                eyeIcon.className = 'eye-icon';

// Toggle password visibility
                eyeIcon.addEventListener('click', () => {
                    showPassword = !showPassword;
                    updateDisplay();
                });

// Append the label, span, and eye icon to the main div
                textElementInput.appendChild(inputLabel);
                textElementInput.appendChild(textDisplay);
                textElementInput.appendChild(eyeIcon);

                textElementInput.addEventListener("keydown", (e) => {
                    let sel = window.getSelection();
                    let pos = sel.focusOffset;

                    if (e.key === "Backspace") {
                        if (pos > 0) {
                            password = password.slice(0, pos - 1) + password.slice(pos);
                        }
                    } else if (e.key.length === 1 && password.length < maxLength) {
                        password = password.slice(0, pos) + e.key + password.slice(pos);
                    } else if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                        e.preventDefault();
                    }

                    updateDisplay();
                    setCursorPosition(textDisplay, pos + (e.key === "Backspace" ? -1 : 1));
                    e.preventDefault();
                });

// Function to set the cursor position within contentEditable
                function setCursorPosition(contentEditableElement, position) {
                    let range = document.createRange();
                    let sel = window.getSelection();
                    range.setStart(contentEditableElement.childNodes[0], position);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }

// Function to update the display based on showPassword toggle
                function updateDisplay() {
                    textDisplay.innerText = showPassword ? password : '•'.repeat(password.length);
                }

                componentElement.appendChild(textElementInput);
                break;
            }
            case "textArea": {
                const label = component.label;
                const initialValue = component.initialValue;
                const maxLength = component.maxLength;

// Create the main div
                const textAreaElementInput = document.createElement('div');
                textAreaElementInput.className = 'textarea-element-input';

// Create the label
                const inputLabel = document.createElement('p');
                inputLabel.className = "label"
                inputLabel.textContent = label;

// Create the span for text display
                const textDisplay = document.createElement('div');
                textDisplay.contentEditable = 'true';
                textDisplay.className = 'display';
                textDisplay.textContent = initialValue;

// Append the label and span to the main div
                textAreaElementInput.appendChild(inputLabel);
                textAreaElementInput.appendChild(textDisplay);

                textAreaElementInput.addEventListener("keypress", (e) => {
                    if (textAreaElementInput.innerText.length >= maxLength) {
                        e.preventDefault();
                    }
                });

                componentElement.appendChild(textAreaElementInput);
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

    // Method to create a deep copy
    deepCopy() {
        // Manually deep copy components and conditions
        const copiedComponents = this.components.map(component => {
            return {
                ...component,
                onChange: component.onChange // preserve function reference
            };
        });

        // For conditions, assuming they don't contain functions
        const copiedConditions = JSON.parse(JSON.stringify(this.conditions));

        return new ZermosModal(copiedComponents, copiedConditions);
    }

}

class ZermosSubModal extends ZermosModal {
    // Subclass for submenus, can override or add specific submenu behavior
}