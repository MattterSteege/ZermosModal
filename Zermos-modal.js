class ZermosModal {
    constructor(components = [], conditions = {}) {
        this.components = components;
        this.conditions = conditions;
    }

    addComponent(component) {
        component.id = btoa(crypto.getRandomValues(new Uint8Array(8))).slice(0,11)
        this.components.push(component);
        return this;
    }

    setCondition(key, value) {
        this.conditions[key] = value;
        this.updateRenderedModal();
        return this;
    }

    getComponentsValue() {
        var values = [];
        var correctForm = true;
        this.components.forEach((elem) => {
            if (elem.type === "submenu"){
                console.log("submenu found, values are:", elem.subModal.getComponentsValue().values)
                values.push(...elem.subModal.getComponentsValue().values)
            }
            if ((elem.required && (elem.userSetValue === "" || elem.userSetValue === null || elem.userSetValue === undefined)) && this.isInputType(elem.type)){
                var notcorrect = document.querySelector('#' + elem.id);
                correctForm = false;
                values.push({type: elem.type, value: null, correct: false});
            }
            else if (this.isInputType(elem.type))
            {
                var value = {type: elem.type, value: null, correct: true};
                if (elem.userSetValue === "true" || elem.userSetValue === "false")
                    value.value = !!elem.userSetValue;
                else if (elem.userSetValue === undefined)
                    value.value = null;
                else
                    value.value = elem.userSetValue;

                values.push(value)
            }
        });

        return {correct: correctForm, values: values};
    }

    isInputType(type){
        return type.toLowerCase().includes("input");
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
        return this.addComponent({ type: 'toggleInput', label, state: initialState, onChange });
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

    ///INPUT ELEMENTS
    addDatePicker(label, required = false, initialDate = new Date(), onChange = () => {}) {
        return this.addComponent({ type: 'datePickerInput', label, required, initialDate, onChange });
    }

    addDropdown(label, options, required = false, multiSelect = false, onChange = () => {}) {
        return this.addComponent({ type: 'dropdownInput', label, options, required, multiSelect, onChange });
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

    addNumberInput(label, required = false, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1, onChange = () => {}) {
        return this.addComponent({ type: 'numberInput', label, required, initialValue, decimals, min, max, step, onChange });
    }

    addTextInput(label, required = false, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'textInput', label, required, initialValue, maxLength, onChange });
    }

    addPasswordInput(label, required = false, maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'passwordInput', label, required, maxLength, onChange });
    }

    addTextArea(label, required = false, initialValue = '', maxLength = null, onChange = () => {}) {
        return this.addComponent({ type: 'textAreaInput', label, required, initialValue, maxLength, onChange });
    }

    addCheckbox(label, initialState = false, onChange = () => {}) {
        return this.addComponent({ type: 'toggleInput', label, state: initialState, asCheckbox: true, onChange });
    }

    /// NEW
    addSlider(label, min = 0, max = 100, step = 1, initialValue = 50, onChange = () => {}) {
        return this.addComponent({ type: 'sliderInput', label, min, max, step, initialValue, onChange });
    }

    addColorPicker(label, required, initialColor = '#000000', onChange = () => {}) {
        return this.addComponent({ type: 'colorPickerInput', label, required, initialColor, onChange });
    }

    addFileUpload(label, required, accept = '*', multiple = false, onChange = () => {}) {
        return this.addComponent({ type: 'fileUploadInput', label, required, accept, multiple, onChange });
    }

    addRating(label, required, maxRating = 5, initialRating = 0, onChange = () => {}) {
        return this.addComponent({ type: 'ratingInput', label, required, maxRating, initialRating, onChange });
    }

    addCaptcha(siteKey, required) {
        return this.addComponent({ type: 'captchaInput', siteKey, required });
    }

    addSignature() {
        return this.addComponent({ type: 'signatureInput' });
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
        componentElement.id = component.id;

        const renderMethods = {
            heading: this.renderHeading,
            button: this.renderButton,
            doubleButton: this.renderDoubleButton,
            tripleButton: this.renderTripleButton,
            submenu: this.renderSubmenu,
            text: this.renderText,
            toggleInput: this.renderToggle,
            url: this.renderUrl,
            spacer: this.renderSpacer,
            separator: this.renderSeparator,
            image: this.renderImage,
            datePickerInput: this.renderDatePicker,
            dropdownInput: this.renderDropdown,
            numberInput: this.renderNumberInput,
            textInput: this.renderTextInput,
            passwordInput: this.renderPasswordInput,
            textAreaInput: this.renderTextArea,
            sliderInput: this.renderSlider,
            colorPickerInput: this.renderColorPicker,
            fileUploadInput: this.renderFileUpload,
            ratingInput: this.renderRating,
            captchaInput: this.renderCaptcha,
            signatureInput: this.renderSignature,
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
        component.userSetValue = component.state.toString();

        const toggleElement = document.createElement('div');
        toggleElement.classList.add("toggle-switch");
        component.asCheckbox ? toggleElement.classList.add("as-checkbox") : null;
        if (component.state) toggleElement.classList.add("active");
        toggleElement.innerHTML = "<div class=\"switch\"></div>";

        toggleElement.addEventListener('click', () => {
            toggleElement.classList.toggle('active');
            const isActive = toggleElement.classList.contains('active');
            if (component.onChange) {
                component.onChange(this, isActive);
                component.userSetValue = isActive.toString();
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
            optionElement.dataset.value = option.value;

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
                    .map(child => child.dataset.value);

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

        componentElement.appendChild(dropdownElement);
        return componentElement;
    }

    renderNumberInput(component, componentElement) {
        const numberInput = document.createElement('div');
        numberInput.className = 'number-input';

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

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';
        textDisplay.textContent = component.initialValue;

        textElementInput.append(textDisplay);

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

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';

        const eyeIcon = document.createElement('span');
        eyeIcon.innerText = "👀";
        eyeIcon.className = 'eye-icon';

        passwordInput.append(textDisplay, eyeIcon);

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

        const textDisplay = document.createElement('div');
        textDisplay.contentEditable = 'true';
        textDisplay.className = 'display';
        textDisplay.textContent = component.initialValue;

        textAreaElementInput.append(textDisplay);

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

    renderSlider(component, componentElement) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider-track';

        const sliderThumb = document.createElement('div');
        sliderThumb.className = 'slider-thumb';

        const valueDisplay = document.createElement('span');
        valueDisplay.className = 'slider-value';
        valueDisplay.textContent = component.initialValue;

        sliderTrack.appendChild(sliderThumb);
        sliderContainer.append(sliderTrack, valueDisplay);

        const min = component.min;
        const max = component.max;
        const range = max - min;

        // Set initial position
        const initialPercentage = ((component.initialValue - min) / range) * 100;
        sliderThumb.style.left = `${initialPercentage}%`;

        let isDragging = false;

        const updateSliderValue = (clientX) => {
            const rect = sliderTrack.getBoundingClientRect();
            let percentage = (clientX - rect.left) / rect.width;
            percentage = Math.max(0, Math.min(percentage, 1));

            const value = min + percentage * range;
            const roundedValue = Math.round(value / component.step) * component.step;

            sliderThumb.style.left = `${percentage * 100}%`;
            valueDisplay.textContent = roundedValue.toFixed(getDecimalPlaces(component.step));

            if (component.onChange) {
                component.onChange(this, roundedValue);
                component.userSetValue = roundedValue;
            }
        };

        sliderTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            applyNoSelectionClass(true); // Apply no-selection class
            updateSliderValue(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSliderValue(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            applyNoSelectionClass(false); // Apply no-selection class
        });

        componentElement.appendChild(sliderContainer);
        return componentElement;

        function getDecimalPlaces(num) {
            // Ensure num is a floating-point number
            let floatNum = parseFloat(num);
            if (Math.floor(floatNum) === floatNum) return 0; // Check if the number is an integer

            let decimalPart = floatNum.toString().split('.')[1];

            // Trim any trailing zeroes for a more sensible decimal count
            if (decimalPart) {
                decimalPart = decimalPart.replace(/0+$/, '');
                return Math.min(decimalPart.length, 2);
            } else {
                return 0;
            }
        }

        // Add this function to apply and remove the no-selection CSS class
        function applyNoSelectionClass(apply) {
            if (apply) {
                document.body.classList.add('no-select');
            } else {
                document.body.classList.remove('no-select');
            }
        }
    }

    renderColorPicker(component, componentElement) {
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.className = 'color-picker-container';

        const colorDisplay = document.createElement('div');
        colorDisplay.className = 'color-display';
        colorDisplay.style.backgroundColor = component.initialColor;

        const colorPalette = document.createElement('div');
        colorPalette.className = 'color-palette';
        colorPalette.style.display = "none";

        const hexInput = document.createElement('div');
        hexInput.className = 'hex-input';
        hexInput.contentEditable = 'true';
        hexInput.textContent = component.initialColor;

        const rgbInputs = ['R', 'G', 'B'].map(channel => {
            const input = document.createElement('div');
            input.className = 'rgb-input';
            input.contentEditable = 'true';
            input.textContent = '0';
            return input;
        });

        const colorCircle = document.createElement('canvas');
        colorCircle.className = 'color-circle';
        colorCircle.width = 150;
        colorCircle.height = 150;

        const ctx = colorCircle.getContext('2d');

// Create a conic gradient
        const gradient = ctx.createConicGradient(0, 75, 75);

// Add five color stops
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1/6, "yellow");
        gradient.addColorStop(2/6, "lime");
        gradient.addColorStop(3/6, "cyan");
        gradient.addColorStop(4/6, "blue");
        gradient.addColorStop(5/6, "magenta");
        gradient.addColorStop(1, "red");

// Set the fill style and draw a rectangle
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 150, 150);

        const colorSelector = document.createElement('div');
        colorSelector.className = 'color-selector';

        const updateColorDisplay = (color) => {
            colorDisplay.style.backgroundColor = color;
            if (component.onChange) {
                component.onChange(this, color);
                component.userSetValue = color;
            }
        };

        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        };

        const rgbToHex = (r, g, b) => {
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        };

        const setColorFromHex = (hex) => {
            const { r, g, b } = hexToRgb(hex);
            rgbInputs[0].textContent = r;
            rgbInputs[1].textContent = g;
            rgbInputs[2].textContent = b;
            updateColorDisplay(hex);
        };

        const setColorFromRgb = () => {
            const r = parseInt(rgbInputs[0].textContent, 10) || 0;
            const g = parseInt(rgbInputs[1].textContent, 10) || 0;
            const b = parseInt(rgbInputs[2].textContent, 10) || 0;
            const hex = rgbToHex(r, g, b);
            hexInput.textContent = hex;
            updateColorDisplay(hex);
        };

        hexInput.addEventListener('input', (e) => {
            const hex = e.target.textContent.trim();
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                setColorFromHex(hex);
            }
        });

        rgbInputs.forEach(input => {
            input.addEventListener('input', setColorFromRgb);
        });

        colorDisplay.addEventListener('click', () => {
            colorPalette.style.display = colorPalette.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', (event) => {
            if (!colorPickerContainer.contains(event.target)) {
                colorPalette.style.display = 'none';
            }
        });

        colorCircle.addEventListener('click', (e) => {
            const rect = colorCircle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
            setColorFromHex(hex);
            colorSelector.style.left = `${x - 5}px`;
            colorSelector.style.top = `${y - 5}px`;
        });

        const { r, g, b } = hexToRgb(component.initialColor);
        rgbInputs[0].textContent = r;
        rgbInputs[1].textContent = g;
        rgbInputs[2].textContent = b;

        colorCircle.appendChild(colorSelector);
        colorPalette.append(hexInput, ...rgbInputs, colorCircle);
        colorPickerContainer.append(colorDisplay, colorPalette);
        componentElement.appendChild(colorPickerContainer);
        return componentElement;
    }


    renderFileUpload(component, componentElement) {
        const fileUploadContainer = document.createElement('div');
        fileUploadContainer.className = 'file-upload-container';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = component.accept;
        fileInput.multiple = component.multiple;

        fileInput.addEventListener('change', (e) => {
            if (component.onChange) {
                component.onChange(this, e.target.files);
                component.userSetValue = e.target.files;
            }
        });

        fileUploadContainer.append(fileInput);
        componentElement.appendChild(fileUploadContainer);
        return componentElement;
    }

    renderDefault(component, componentElement) {
        componentElement.innerText = `couldn't render component of type: ${component.type}`;
        return componentElement;
    }

    renderRating(component, componentElement) {
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'rating-container';

        for (let i = 1; i <= component.maxRating; i++) {
            const star = document.createElement('span');
            star.textContent = '☆';
            star.dataset.value = i;

            if (i <= component.initialRating) {
                star.textContent = '★';
            }

            star.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                ratingContainer.querySelectorAll('span').forEach((s, index) => {
                    s.textContent = index < value ? '★' : '☆';
                });
                if (component.onChange) {
                    component.onChange(this, value);
                    component.userSetValue = value;
                }
            });

            ratingContainer.appendChild(star);
        }

        componentElement.append(ratingContainer);
        return componentElement;
    }

    renderCaptcha(component, componentElement) {
        const captchaContainer = document.createElement('div');
        captchaContainer.className = 'captcha-container';

        // Generate and obfuscate captcha code
        const captchaCode = Math.random().toString(36).substr(2, 6).toUpperCase();
        const obfuscatedCaptcha = captchaCode.split('').map(char => char + ' ').join('').trim();

        const captchaDisplay = document.createElement('div');
        captchaDisplay.className = 'captcha-display';
        captchaDisplay.textContent = obfuscatedCaptcha;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter captcha';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Verify';
        submitButton.style.gridColumn = "1 / span 2";
        submitButton.addEventListener('click', () => {
            if (input.value.toUpperCase() === captchaCode) {
                alert('Captcha verified successfully!');
                component.userSetValue = true;
            } else {
                alert('Incorrect captcha. Please try again.');
                component.userSetValue = false;
                input.value = '';
            }
        });

        captchaContainer.append(captchaDisplay, input, submitButton);
        componentElement.appendChild(captchaContainer);
        return componentElement;
    }


    renderSignature(component, componentElement) {
        const signatureContainer = document.createElement('div');
        signatureContainer.className = 'signature-container';

        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function draw(e) {
            if (!isDrawing) return;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function stopDrawing() {
            isDrawing = false;
        }

        const buttonContainer = document.createElement('div');

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear';
        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            const signatureData = canvas.toDataURL();
            component.userSetValue = signatureData;
            alert('Signature saved!');
        });

        buttonContainer.append(clearButton, saveButton);
        signatureContainer.append(canvas, buttonContainer);
        componentElement.appendChild(signatureContainer);
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