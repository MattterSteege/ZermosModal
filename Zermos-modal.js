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
            if (this.evaluateExpression(element.getAttribute("showCondition"))){
                element.parentElement.style.display = "block";
            }
            else {
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

    addNumberInput(label, initialValue = 0, decimals = 0, onChange = () => {}) {
        return this.addComponent({
            type: 'numberInput',
            label,
            initialValue,
            decimals,
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
            if (this.shouldRenderComponent(component)) {
                const componentElement = this.renderComponent(component);
                modalElement.appendChild(componentElement);
            }
        });

        return modalElement;
    }

    shouldRenderComponent(component) {
        // Check if the component should be rendered based on conditions
        // This is where you'd implement the logic for conditional rendering
        // based on the this.conditions object
        return true; // Placeholder - always render for now
    }

    renderComponent(component) {
        // This method would create and return the DOM element for a specific component
        // You'd need to implement the rendering logic for each component type
        const componentElement = document.createElement('div');
        componentElement.classList.add(component.type);
        switch (component.type) {
            case "heading":
            {
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
            case "button":
            {
                const buttonElement = document.createElement("div");
                buttonElement.style = component.style;
                buttonElement.innerText = component.text;
                buttonElement.onclick = () => component.onClick(this);

                componentElement.appendChild(buttonElement);
                break;
            }
            case "submenu":
            {
                const subMenuElement = component.subModal.render();
                subMenuElement.setAttribute("showCondition", component.showCondition.replace("\"", "'"));

                componentElement.appendChild(subMenuElement);
                componentElement.style.display = this.evaluateExpression(component.showCondition) ? "block" : "none";
                break;
            }
            case "text":
            {
                const textElement = document.createElement('p');
                textElement.style = component.style;
                textElement.innerText = component.text;

                componentElement.appendChild(textElement);
                break;
            }
            case "toggle":
            {
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
            case "url":
            {
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
            case "spacer":
            {
                const spacerElement = document.createElement('div');
                spacerElement.style.height = component.height;
                componentElement.appendChild(spacerElement);
                break;
            }
            case "separator":
            {
                const separatorElement = document.createElement('div');

                const separatorTextElement = document.createElement('p');
                separatorTextElement.innerText = component.text;


                separatorElement.appendChild(separatorTextElement);
                componentElement.appendChild(separatorElement);
                break;
            }
            case "image":
            {
                const imageElement = document.createElement('img');
                imageElement.src = component.src;
                imageElement.alt = component.alt;
                imageElement.style = component.style;

                componentElement.appendChild(imageElement);
                break;
            }
            case "":
            default:
            {
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
                case '==': return this.conditions[key] === parseValue(value);
                case '!=': return this.conditions[key] !== parseValue(value);
                case '>': return this.conditions[key] > parseValue(value);
                case '<': return this.conditions[key] < parseValue(value);
                case '>=': return this.conditions[key] >= parseValue(value);
                case '<=': return this.conditions[key] <= parseValue(value);
                default: return false;
            }
        } else {
            return false;
        }

        function parseValue(value) {
            if (value === 'true') return true; //bool
            if (value === 'false') return false; //bool
            if (!isNaN(value)) return parseFloat(value); //number
            if (/^["'].*["']$/.test(value)) return value.slice(1, -1);  // string
            throw new Error('Unsupported value type');
        }
    }
}

class ZermosSubModal extends ZermosModal {
    // Subclass for submenus, can override or add specific submenu behavior
}