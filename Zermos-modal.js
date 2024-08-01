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
        this.updateRenderedModal();
        return this;
    }

    getComponentsValue() {
        return this.components
            .filter(elem => elem.userSetValue)
            .map(elem => [elem.type, elem.userSetValue]);
    }

    updateRenderedModal() {
        document.querySelectorAll('div[showCondition]').forEach(element => {
            element.parentElement.style.display =
                this.evaluateExpression(element.getAttribute("showCondition")) ? "block" : "none";
        });
    }

    addHeading(text, subheading = "", level = 1) {
        return this.addComponent({ type: 'heading', text, subheading, level });
    }

    addToggle(label, initialState = false, onChange = () => {}) {
        return this.addComponent({ type: 'toggle', label, state: initialState, onChange });
    }

    addButton(text, onClick = () => {}) {
        return this.addComponent({ type: 'button', text, onClick });
    }

    addDoubleButtons(text, secondText, onClick = () => {}, secondOnClick = () => {}) {
        return this.addComponent({ type: 'doubleButton', text, onClick, secondText, secondOnClick });
    }

    addTripleButtons(text, secondText, thirdText, onClick = () => {}, secondOnClick = () => {}, thirdOnClick = () => {}) {
        return this.addComponent({ type: 'tripleButton', text, onClick, secondText, secondOnClick, thirdText, thirdOnClick });
    }

    addSubmenu(showCondition, subModal) {
        return this.addComponent({ type: 'submenu', showCondition, subModal });
    }

    addText(text) {
        return this.addComponent({ type: 'text', text });
    }

    addUrl(url, showFull = false, copyButton = true) {
        return this.addComponent({ type: 'url', url, showFull, copyButton });
    }

    addDatePicker(label, initialDate = new Date(), onChange = () => {}) {
        return this.addComponent({ type: 'datePicker', label, initialDate, onChange });
    }

    addDropdown(label, options, multiSelect = false, onChange = () => {}) {
        return this.addComponent({ type: 'dropdown', label, options, multiSelect, onChange });
    }

    addSeparator(text = '') {
        return this.addComponent({ type: 'separator', text });
    }

    addImage(src, alt = '') {
        return this.addComponent({ type: 'image', src, alt });
    }

    addSpacer(height = "20px") {
        return this.addComponent({ type: 'spacer', height });
    }

    addNumberInput(label, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1, onChange = () => {}) {
        return this.addComponent({ type: 'numberInput', label, initialValue, decimals, min, max, step, onChange });
    }

    addTextInput(label, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'textInput', label, initialValue, maxLength, onChange });
    }

    addPasswordInput(label, maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'passwordInput', label, maxLength, onChange });
    }

    addTextArea(label, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'textArea', label, initialValue, maxLength, onChange });
    }

    render() {
        const modalElement = document.createElement('div');
        modalElement.className = 'zermos-modal';
        this.components.forEach(component => {
            modalElement.appendChild(this.renderComponent(component));
        });
        return modalElement;
    }

    renderComponent(component) {
        const componentElement = document.createElement('div');
        componentElement.classList.add(component.type);

        const renderMethods = {
            heading: this.renderHeading,
            button: this.renderButton,
            doubleButton: this.renderDoubleButton,
            tripleButton: this.renderTripleButton,
            submenu: this.renderSubmenu,
            text: this.renderText,
            toggle: this.renderToggle,
            url: this.renderUrl,
            spacer: this.renderSpacer,
            separator: this.renderSeparator,
            image: this.renderImage,
            datePicker: this.renderDatePicker,
            dropdown: this.renderDropdown,
            numberInput: this.renderNumberInput,
            textInput: this.renderTextInput,
            passwordInput: this.renderPasswordInput,
            textArea: this.renderTextArea
        };

        const renderMethod = renderMethods[component.type] || this.renderDefault;
        return renderMethod.call(this, component, componentElement);
    }

    renderHeading(component, componentElement) {
        const headingElement = document.createElement(`h${component.level}`);
        headingElement.innerText = component.text;
        const textElement = document.createElement('p');
        textElement.innerText = component.subheading;
        componentElement.append(headingElement, textElement);
        return componentElement;
    }

    renderButton(component, componentElement) {
        const buttonElement = document.createElement("button");
        buttonElement.innerText = component.text;
        buttonElement.onclick = () => component.onClick(this);
        componentElement.appendChild(buttonElement);
        return componentElement;
    }

    renderDoubleButton(component, componentElement) {
        const button1= document.createElement("button");
        button1.innerText = component.text;
        button1.onclick = () => component.onClick(this);

        const button2 = document.createElement("button");
        button2.innerText = component.secondText;
        button2.onclick = () => component.secondOnClick(this);

        componentElement.append(button1, button2);
        return componentElement;
    }

    renderTripleButton(component, componentElement) {
        const button1 = document.createElement("button");
        button1.innerText = component.text;
        button1.onclick = () => component.onClick(this);

        const button2 = document.createElement("button");
        button2.innerText = component.secondText;
        button2.onclick = () => component.secondOnClick(this);

        const button3 = document.createElement("button");
        button3.innerText = component.thirdText;
        button3.onclick = () => component.thirdOnClick(this);

        componentElement.append(button1, button2, button3);
        return componentElement;
    }

    renderSubmenu(component, componentElement) {
        const subMenuElement = component.subModal.render();
        subMenuElement.setAttribute("showCondition", component.showCondition.replace("\"", "'"));
        componentElement.appendChild(subMenuElement);
        componentElement.style.display = this.evaluateExpression(component.showCondition) ? "block" : "none";
        return componentElement;
    }

    renderText(component, componentElement) {
        const textElement = document.createElement('p');
        textElement.innerText = component.text;
        componentElement.appendChild(textElement);
        return componentElement;
    }

    renderToggle(component, componentElement) {
        const toggleElement = document.createElement('div');
        toggleElement.classList.add("toggle-switch");
        if (component.state) toggleElement.classList.add("active");
        toggleElement.innerHTML = "<div class=\"switch\"></div>";

        toggleElement.addEventListener('click', () => {
            toggleElement.classList.toggle('active');
            const isActive = toggleElement.classList.contains('active');
            if (component.onChange) {
                component.onChange(this, isActive);
                component.userSetValue = isActive;
            }
        });

        const toggleLabelElement = document.createElement('div');
        toggleLabelElement.classList.add("toggle-label");
        toggleLabelElement.innerText = component.label;

        componentElement.appendChild(toggleElement);
        componentElement.appendChild(toggleLabelElement)
        return componentElement;
    }

    renderUrl(component, componentElement) {
        const urlSection = document.createElement('div');
        urlSection.className = 'url-section';

        const urlField = document.createElement('div');
        urlField.className = 'url-field';
        urlField.textContent = component.showFull ? component.url : new URL(component.url).pathname;
        urlField.contentEditable = !component.copyButton;

        if (component.copyButton) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy';
            copyButton.textContent = 'Copy';

            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(component.url)
                    .then(() => console.log(`"${component.url}" was copied to your clipboard.`))
                    .catch(err => console.error(`Error copying text to clipboard: ${err}`));
            });

            urlSection.appendChild(copyButton);
        }
        urlSection.appendChild(urlField);

        componentElement.appendChild(urlSection);
        return componentElement;
    }

    renderSpacer(component, componentElement) {
        componentElement.style.height = component.height;
        return componentElement;
    }

    renderSeparator(component, componentElement) {
        const separatorTextElement = document.createElement('p');
        separatorTextElement.innerText = component.text;
        componentElement.appendChild(separatorTextElement);
        return componentElement;
    }

    renderImage(component, componentElement) {
        const imageElement = document.createElement('img');
        imageElement.src = component.src;
        imageElement.alt = component.alt;
        componentElement.appendChild(imageElement);
        return componentElement;
    }

    renderDatePicker(component, componentElement) {
        const datepicker = document.createElement('div');
        datepicker.className = 'datepicker-parent';

        const selectedDateElem = document.createElement('div');
        selectedDateElem.className = 'selected-date';
        selectedDateElem.textContent = 'Select a date';
        datepicker.appendChild(selectedDateElem);

        const calendarElem = document.createElement('div');
        calendarElem.className = 'calendar';
        calendarElem.style.display = "none";
        datepicker.appendChild(calendarElem);

        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        calendarElem.appendChild(calendarHeader);

        const prevMonthButton = document.createElement('button');
        prevMonthButton.className = 'prev-month';
        prevMonthButton.textContent = '<';
        calendarHeader.appendChild(prevMonthButton);

        const monthYearElem = document.createElement('span');
        monthYearElem.className = 'month-year';
        calendarHeader.appendChild(monthYearElem);

        const nextMonthButton = document.createElement('button');
        nextMonthButton.className = 'next-month';
        nextMonthButton.textContent = '>';
        calendarHeader.appendChild(nextMonthButton);

        const calendarBody = document.createElement('div');
        calendarBody.className = 'calendar-body';
        calendarElem.appendChild(calendarBody);

        componentElement.appendChild(datepicker);

        let selectedDate = component.initialDate;
        let currentMonth = selectedDate.getMonth();
        let currentYear = selectedDate.getFullYear();

        const renderCalendar = (month, year) => {
            calendarBody.innerHTML = '';
            const firstDay = new Date(year, month).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

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
                dayElem.addEventListener('click', () => {
                    selectedDate = new Date(year, month, day);
                    selectedDateElem.textContent = selectedDate.toDateString();
                    calendarElem.style.display = 'none';
                    renderCalendar(currentMonth, currentYear);
                    if (component.onChange) {
                        component.onChange(this, selectedDate);
                        component.userSetValue = selectedDate;
                    }
                });
                calendarBody.appendChild(dayElem);
            }
        };

        selectedDateElem.addEventListener('click', () => {
            calendarElem.style.display = calendarElem.style.display === 'none' ? 'block' : 'none';
            datepicker.classList.toggle("selected");
        });

        prevMonthButton.addEventListener('click', () => {
            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        nextMonthButton.addEventListener('click', () => {
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
            renderCalendar(currentMonth, currentYear);
        });

        renderCalendar(currentMonth, currentYear);

        return componentElement;
    }

    renderDropdown(component, componentElement) {
        const labelElement = document.createElement('label');
        labelElement.innerText = component.label;

        const dropdownElement = document.createElement('div');
        dropdownElement.classList.add('dropdown');

        const dropdownButton = document.createElement('button');
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
                    Array.from(dropdownMenu.children).forEach(child => child.classList.remove('selected'));
                    optionElement.classList.add('selected');
                    dropdownButton.click();
                }
                const selectedOptions = Array.from(dropdownMenu.children)
                    .filter(child => child.classList.contains('selected'))
                    .map(child => child.innerText);

                dropdownButton.innerText = selectedOptions.length ? selectedOptions.join(", ") : "Select...";

                if (component.onChange) {
                    component.onChange(this, component.multiSelect ? selectedOptions : selectedOptions[0]);
                    component.userSetValue = component.multiSelect ? selectedOptions : selectedOptions[0];
                }
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
        return componentElement;
    }

    renderNumberInput(component, componentElement) {
        const numberInput = document.createElement('div');
        numberInput.className = 'number-input';

        const label = document.createElement('label');
        label.textContent = component.label;

        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement-button';
        decrementButton.textContent = '-';

        const numberDisplay = document.createElement('span');
        numberDisplay.contentEditable = 'true';
        numberDisplay.className = 'display';

        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment-button';
        incrementButton.textContent = '+';

        numberInput.append(label, decrementButton, numberDisplay, incrementButton);

        let value = component.initialValue;

        const updateDisplay = () => {
            numberDisplay.textContent = value.toFixed(component.decimals);
            if (component.onChange) {
                component.onChange(this, value);
                component.userSetValue = value;
            }
        };

        const increment = () => {
            if (value + component.step <= component.max) {
                value += component.step;
                updateDisplay();
            }
        };

        const decrement = () => {
            if (value - component.step >= component.min) {
                value -= component.step;
                updateDisplay();
            }
        };

        const validateAndSetInput = (inputValue) => {
            let parsedValue = parseFloat(inputValue.replace(',', '.'));
            if (!isNaN(parsedValue) && parsedValue >= component.min && parsedValue <= component.max) {
                value = parsedValue;
                updateDisplay();
            }
        };

        incrementButton.addEventListener("click", increment);
        decrementButton.addEventListener("click", decrement);

        numberDisplay.addEventListener("input", (e) => validateAndSetInput(e.target.textContent));
        numberDisplay.addEventListener("keypress", (e) => {
            if (!/[0-9,.]/.test(String.fromCharCode(e.which))) {
                e.preventDefault();
            }
        });

        updateDisplay();
        componentElement.appendChild(numberInput);
        return componentElement;
    }

    renderTextInput(component, componentElement) {
        const textElementInput = document.createElement('div');
        textElementInput.className = 'text-element-input';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = component.label;

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';
        textDisplay.textContent = component.initialValue;

        textElementInput.append(inputLabel, textDisplay);

        const handleInput = (e) => {
            if (component.maxLength && e.target.innerText.length > component.maxLength) {
                e.target.innerText = e.target.innerText.slice(0, component.maxLength);
            }
            if (component.onChange) {
                component.onChange(this, e.target.innerText);
                component.userSetValue = e.target.innerText;
            }
        };

        textDisplay.addEventListener("input", handleInput);

        componentElement.appendChild(textElementInput);
        return componentElement;
    }

    renderPasswordInput(component, componentElement) {
        const passwordInput = document.createElement('div');
        passwordInput.className = 'password-element-input';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = component.label;

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';

        const eyeIcon = document.createElement('span');
        eyeIcon.innerText = "👀";
        eyeIcon.className = 'eye-icon';

        passwordInput.append(inputLabel, textDisplay, eyeIcon);

        let password = '';
        let showPassword = false;

        const updateDisplay = () => {
            textDisplay.innerText = showPassword ? password : '•'.repeat(password.length);
            if (component.onChange) {
                component.onChange(this, password);
                component.userSetValue = password;
            }
        };

        const handleKeydown = (e) => {
            let sel = window.getSelection();
            let pos = sel.focusOffset;

            if (e.key === "Backspace" && pos > 0) {
                password = password.slice(0, pos - 1) + password.slice(pos);
            } else if (e.key.length === 1 && (!component.maxLength || password.length < component.maxLength)) {
                password = password.slice(0, pos) + e.key + password.slice(pos);
            } else if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                e.preventDefault();
            }

            updateDisplay();
            this.setCursorPosition(textDisplay, pos + (e.key === "Backspace" ? -1 : 1));
            e.preventDefault();
        };

        eyeIcon.addEventListener('click', () => {
            showPassword = !showPassword;
            updateDisplay();
        });

        textDisplay.addEventListener("keydown", handleKeydown);

        componentElement.appendChild(passwordInput);
        return componentElement;
    }

    renderTextArea(component, componentElement) {
        const textAreaElementInput = document.createElement('div');
        textAreaElementInput.className = 'textarea-element-input';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = component.label;

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';
        textDisplay.textContent = component.initialValue;

        textAreaElementInput.append(inputLabel, textDisplay);

        const handleInput = (e) => {
            if (component.maxLength && e.target.innerText.length > component.maxLength) {
                e.target.innerText = e.target.innerText.slice(0, component.maxLength);
            }
            if (component.onChange) {
                component.onChange(this, e.target.innerText);
                component.userSetValue = e.target.innerText;
            }
        };

        textDisplay.addEventListener("input", handleInput);

        componentElement.appendChild(textAreaElementInput);
        return componentElement;
    }

    renderDefault(component, componentElement) {
        componentElement.innerText = `couldn't render component of type: ${component.type}`;
        return componentElement;
    }

    setCursorPosition(contentEditableElement, position) {
        position = Math.max(0, Math.min(position, contentEditableElement.textContent.length));
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(contentEditableElement.childNodes[0] || contentEditableElement, position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    evaluateExpression(expression) {
        const comparisonMatch = expression.match(/^(\w+)\s*(==|!=|>|<|>=|<=)\s*(.+)$/);
        if (!comparisonMatch) return false;

        const [_, key, operator, value] = comparisonMatch;
        const conditionValue = this.conditions[key];
        const comparedValue = this.parseValue(value);

        const operations = {
            '==': (a, b) => a === b,
            '!=': (a, b) => a !== b,
            '>': (a, b) => a > b,
            '<': (a, b) => a < b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b
        };

        return operations[operator](conditionValue, comparedValue);
    }

    parseValue(value) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (!isNaN(value)) return parseFloat(value);
        if (/^["'].*["']$/.test(value)) return value.slice(1, -1);
        throw new Error('Unsupported value type');
    }

    open() {
        const modalElement = this.render();
        document.body.appendChild(modalElement);
    }

    deepCopy() {
        const copiedComponents = this.components.map(component => ({...component}));
        const copiedConditions = {...this.conditions};
        return new ZermosModal(copiedComponents, copiedConditions);
    }
}

class ZermosSubModal extends ZermosModal {
    // Subclass for submenus, can override or add specific submenu behavior
}