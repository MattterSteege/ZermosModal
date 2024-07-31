# ZermosModal

ZermosModal is a lightweight, flexible JavaScript library for creating customizable modal dialogs and user interfaces. It provides an easy-to-use API for building complex modal structures with various UI components.

This project is still being developed as a replacement for my current modal script that i'm using in multiple of my personal projects. So be ware that some components are still buggy and/or not really developed.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Conditional Rendering](#Condition-Handling-Methods)
- [Examples](#usage-example)
- [Contributing](#contributing)
- [License](#license)

## Features

- Easy-to-use API for creating modal dialogs
- Wide range of UI components (buttons, toggles, dropdowns, etc.)
- Conditional rendering of components
- Customizable styling
- Submodal support for nested interfaces

## Installation

To use ZermosModal in your project, include the `ZermosModal.js` file in your HTML:

```html
<script src="path/to/ZermosModal.js"></script>
```

## Usage

# ZermosModal Class Documentation

## Class Overview

The `ZermosModal` class is a JavaScript implementation for creating and managing modal dialogs with various UI components. It provides methods for adding different types of components, handling conditions, and rendering the modal.

## Constructor

```javascript
constructor(components = [], conditions = {})
```

- `components` (optional): An array of component objects (default: empty array)
- `conditions` (optional): An object of key-value pairs for conditional rendering (default: empty object)

## Methods

### Component Addition Methods

Note: All component addition methods return `this` for method chaining unless otherwise specified.

1. `addComponent(component)`
    - Adds a generic component to the modal

2. `addHeading(text, subheading = "", level = 1)`
    - Adds a heading component
    - Parameters:
        - `text`: Main heading text
        - `subheading` (optional): Subheading text
        - `level` (optional): Heading level (1-6)

3. `addToggle(label, initialState = false, onChange)`
    - Adds a toggle switch component
    - Parameters:
        - `label`: Label for the toggle
        - `initialState` (optional): Initial state of the toggle (true/false)
        - `onChange` (optional): Callback function when toggle state changes
            - Called with two arguments: `(modalInstance, isActive)`
            - `modalInstance`: The current ZermosModal instance
            - `isActive`: Boolean indicating the new state of the toggle

4. `addButton(text, onClick)`
    - Adds a button component
    - Parameters:
        - `text`: Button text
        - `onClick` (optional): Callback function when button is clicked
            - Called with one argument: `(modalInstance)`
            - `modalInstance`: The current ZermosModal instance

5. `addDoubleButtons(text, secondText, onClick, secondOnClick)`
    - Adds two button components side by side
    - Parameters:
        - `text`: First button text
        - `secondText`: Second button text
        - `onClick` (optional): Callback for first button
        - `secondOnClick` (optional): Callback for second button
    - Both callbacks are called with `(modalInstance)` as argument

6. `addTripleButtons(text, secondText, thirdText, onClick, secondOnClick, thirdOnClick)`
    - Adds three button components side by side
    - Parameters:
        - `text`, `secondText`, `thirdText`: Button texts
        - `onClick`, `secondOnClick`, `thirdOnClick` (all optional): Respective callbacks
    - All callbacks are called with `(modalInstance)` as argument

7. `addSubmenu(showCondition, subModal)`
    - Adds a submenu component
    - Parameters:
        - `showCondition`: Condition for showing the submenu
        - `subModal`: Instance of ZermosSubModal

8. `addText(text)`
    - Adds a text component
    - Parameters:
        - `text`: Text content

9. `addUrl(url, showFull = false, copyButton = true)`
    - Adds a URL component
    - Parameters:
        - `url`: URL to display
        - `showFull` (optional): Whether to show full URL or just pathname
        - `copyButton` (optional): Whether to include a copy button

10. `addDatePicker(label, initialDate = new Date(), onChange)`
    - Adds a date picker component
    - Parameters:
        - `label`: Label for the date picker
        - `initialDate` (optional): Initial date (default: current date)
        - `onChange` (optional): Callback when date changes
            - Called with two arguments: `(modalInstance, selectedDate)`
            - `modalInstance`: The current ZermosModal instance
            - `selectedDate`: The newly selected Date object

11. `addDropdown(label, options, multiSelect = false, onChange)`
    - Adds a dropdown component
    - Parameters:
        - `label`: Label for the dropdown
        - `options`: Array of options
        - `multiSelect` (optional): Whether multiple options can be selected
        - `onChange` (optional): Callback when selection changes
            - Called with two arguments: `(modalInstance, selectedOptions)`
            - `modalInstance`: The current ZermosModal instance
            - `selectedOptions`: Array of selected options (or single option if `multiSelect` is false)

12. `addSeparator(text = '')`
    - Adds a separator component
    - Parameters:
        - `text` (optional): Text for the separator

13. `addImage(src, alt = '')`
    - Adds an image component
    - Parameters:
        - `src`: Image source URL
        - `alt` (optional): Alternative text for the image

14. `addSpacer(height = "20px")`
    - Adds a spacer component
    - Parameters:
        - `height` (optional): Height of the spacer (CSS value)

15. `addNumberInput(label, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1, onChange)`
    - Adds a number input component
    - Parameters:
        - `label`: Label for the input
        - `initialValue` (optional): Initial numeric value
        - `decimals` (optional): Number of decimal places
        - `min`, `max` (optional): Minimum and maximum allowed values
        - `step` (optional): Step value for increments/decrements
        - `onChange` (optional): Callback when value changes
            - Called with two arguments: `(modalInstance, newValue)`
            - `modalInstance`: The current ZermosModal instance
            - `newValue`: The new numeric value of the input

16. `addTextInput(label, initialValue = '', maxLength = null, onChange)`
    - Adds a text input component
    - Parameters:
        - `label`: Label for the input
        - `initialValue` (optional): Initial text value
        - `maxLength` (optional): Maximum allowed length of input
        - `onChange` (optional): Callback when text changes
            - Called with two arguments: `(modalInstance, newText)`
            - `modalInstance`: The current ZermosModal instance
            - `newText`: The new text value of the input

17. `addPasswordInput(label, maxLength = null, onChange)`
    - Adds a password input component
    - Parameters:
        - `label`: Label for the input
        - `maxLength` (optional): Maximum allowed length of input
        - `onChange` (optional): Callback when password changes
            - Called with two arguments: `(modalInstance, newPassword)`
            - `modalInstance`: The current ZermosModal instance
            - `newPassword`: The new password value

18. `addTextArea(label, initialValue = '', maxLength = null, onChange)`
    - Adds a text area component
    - Parameters:
        - `label`: Label for the text area
        - `initialValue` (optional): Initial text value
        - `maxLength` (optional): Maximum allowed length of input
        - `onChange` (optional): Callback when text changes
            - Called with two arguments: `(modalInstance, newText)`
            - `modalInstance`: The current ZermosModal instance
            - `newText`: The new text value of the text area

### Rendering and Display Methods

1. `render()`
    - Renders all components and returns the modal element
    - Returns: DOM element representing the entire modal

2. `renderComponent(component)`
    - Renders a single component
    - Parameters:
        - `component`: Component object to render
    - Returns: DOM element for the rendered component

3. `open()`
    - Renders the modal and appends it to the document body

### Condition Handling Methods

1. `setCondition(key, value)`
    - Sets a condition for conditional rendering
    - Parameters:
        - `key`: Condition identifier
        - `value`: Condition value

2. `updateRenderedModal()`
    - Updates the rendered modal based on current conditions

3. `evaluateExpression(expression)`
    - Evaluates a conditional expression
    - Parameters:
        - `expression`: String representing a condition
    - Returns: Boolean result of the evaluation

### Utility Methods

1. `deepCopy()`
    - Creates a deep copy of the modal instance
    - Returns: New ZermosModal instance with copied components and conditions

## ZermosSubModal Class

A subclass of ZermosModal, potentially for use with submenu components. Currently, it doesn't add any additional functionality beyond what ZermosModal provides.

## Usage Example

```javascript
const modal = new ZermosModal();
modal.addHeading("Welcome")
    .addText("This is a sample modal")
    .addButton("Click me", (modal) => console.log("Button clicked in", modal))
    .addToggle("Enable feature", false, (modal, isEnabled) => console.log("Toggle:", isEnabled))
    .addNumberInput("Enter a number", 0, 2, 0, 100, 1, (modal, value) => console.log("Number input:", value))
    .open();
```

This example creates a modal with a heading, some text, a button, a toggle switch, and a number input, then opens the modal. It demonstrates the usage of `onChange` callbacks for different components.

Here's a more complex example demonstrating various features:

```javascript
const modal = new ZermosModal();

modal.addHeading("User Registration")
    .addText("Please fill out the form below:")
    .addTextInput("Username", "", 20, (modal, value) => console.log(`Username: ${value}`))
    .addPasswordInput("Password", 20, (modal, value) => console.log(`Password set`))
    .addDatePicker("Date of Birth", new Date(), (modal, date) => console.log(`DoB: ${date}`))
    .addDropdown("Country", [
        { label: "USA", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "UK", value: "uk" }
    ], false, (modal, selected) => console.log(`Country: ${selected}`))
    .addToggle("Subscribe to newsletter", false, (modal, state) => console.log(`Subscribed: ${state}`))
    .addButton("Register", () => {
        // Registration logic
        console.log("Registration submitted");
    });

modal.open();
```

## Contributing

Contributions to ZermosModal are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

[MIT License](https://opensource.org/licenses/MIT)

---

For more information or support, please open an issue on the GitHub repository.
