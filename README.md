# ZermosModal Library Documentation

## Table of Contents
1. Introduction
2. Class Overview
3. Constructor
4. Methods
5. Component Types
6. Conditions and Dynamic Rendering
7. Tips and Tricks
8. Examples
    - Easy Example
    - Medium Example
    - Advanced Example
9. Styling Guidelines
10. Best Practices
11. Troubleshooting

## 1. Introduction

ZermosModal is a versatile JavaScript library for creating interactive and dynamic modal interfaces. It provides a flexible way to build complex forms, surveys, and interactive UI components with various input types and conditional rendering capabilities.

This project is NOT a plug and play solution, it is a library that you can use to create your own modals with your own styling and logic. While a lot of the basic components are already implemented, you can always add/edit components to extend the library.

## 2. Class Overview

The library consists of two main classes:
- `ZermosModal`: The primary class for creating and managing modal interfaces.
- `ZermosSubModal`: A subclass of ZermosModal, specifically designed for nested submenus within a modal. `class ZermosSubModal extends ZermosModal {}`: is a literal clone only used for easier to read code!

## 3. Constructor

#### `constructor(disableClosing = false, components = [], conditions = {})`

Creates a new ZermosModal instance.

- `disableClosing` (boolean): If true, prevents the modal from being closed by clicking outside.
- `components` (array): Initial array of components to be rendered in the modal.
- `conditions` (object): Initial conditions for conditional rendering.
- 
I dont recommend setting `components` & `conditions` directly, but you do you.

## 4. Methods

### Adding Components

#### `addHeading({ text, subheading = "", level = 1, id = undefined })`

Adds a heading component to the modal.

- `text` (string): The main heading text.
- `subheading` (string): Optional subheading text.
- `level` (number): Heading level (1-6).
- `id` (string): Optional unique identifier for the component.

#### `addToggle({ label, initialState = false, onChange = () => {}, id = undefined })`

Adds a toggle switch component to the modal.

- `label` (string): Label for the toggle switch.
- `initialState` (boolean): Initial state of the toggle.
- `onChange` (function): Callback function triggered when the toggle state changes.
- `id` (string): Optional unique identifier for the component.

#### `addMultiToggles({ labels, initialStates = [], onChange = () => {}, id = undefined })`

Adds multiple toggle switches as a group.

- `labels` (array): Array of labels for each toggle.
- `initialStates` (array): Array of initial states for each toggle.
- `onChange` (function): Callback function triggered when any toggle state changes.
- `id` (string): Optional unique identifier for the component.

#### `addButton({ text, onClick = () => {}, id = undefined })`

Adds a button component to the modal.

- `text` (string): Button text.
- `onClick` (function): Callback function triggered when the button is clicked.
- `id` (string): Optional unique identifier for the component.

#### `addDoubleButtons({ text, secondText, onClick = () => {}, secondOnClick = () => {}, id = undefined })`

Adds two buttons side by side.

- `text` (string): Text for the first button.
- `secondText` (string): Text for the second button.
- `onClick` (function): Callback for the first button.
- `secondOnClick` (function): Callback for the second button.
- `id` (string): Optional unique identifier for the component.

#### `addTripleButtons({ text, secondText, thirdText, onClick = () => {}, secondOnClick = () => {}, thirdOnClick = () => {}, id = undefined })`

Adds three buttons side by side.

- `text`, `secondText`, `thirdText` (string): Text for each button.
- `onClick`, `secondOnClick`, `thirdOnClick` (function): Callbacks for each button.
- `id` (string): Optional unique identifier for the component.

#### `addSubmenu({ showCondition, subModal, id = undefined })`

Adds a submenu component to the modal.

- `showCondition` (string): Condition for showing the submenu.
- `subModal` (ZermosSubModal): Instance of ZermosSubModal for the submenu.
- `id` (string): Optional unique identifier for the component.

#### `addText({ text, asHtml = false, id = undefined })`

Adds a text component to the modal.

- `text` (string): The text content.
- `asHtml` (boolean): If true, renders the text as HTML.
- `id` (string): Optional unique identifier for the component.

#### `addLabel({ text, id = undefined })`

Adds a label component to the modal.

- `text` (string): The label text.
- `id` (string): Optional unique identifier for the component.

#### `addUrl({ url, showFull = false, copyButton = true, id = undefined })`

Adds a URL component to the modal.

- `url` (string): The URL to display.
- `showFull` (boolean): If true, shows the full URL.
- `copyButton` (boolean): If true, adds a copy button for the URL.
- `id` (string): Optional unique identifier for the component.

#### `addDatePicker({ required = false, initialDate = undefined, onChange = () => {}, id = undefined })`

Adds a date picker component to the modal.

- `required` (boolean): If true, makes the date selection required.
- `initialDate` (Date): Initial date to display.
- `onChange` (function): Callback function triggered when a date is selected.
- `id` (string): Optional unique identifier for the component.

### `addTimePicker({required: false, initialTime: undefined, onChange: () => {}, id: undefined})`

Adds a time picker component to the modal.

- `required` (boolean): If true, makes the time selection required.
- `initialTime` (string): Initial time to display. in the format of "HH:MM".
- `onChange` (function): Callback function triggered when a time is selected.
- `id` (string): Optional unique identifier for the component.

#### `addDropdown({ options, required = false, multiSelect = false, onChange = () => {}, id = undefined })`

Adds a dropdown component to the modal.

- `options` (array): Array of options for the dropdown.
- `required` (boolean): If true, makes the selection required.
- `multiSelect` (boolean): If true, allows multiple selections.
- `onChange` (function): Callback function triggered when the selection changes.
- `id` (string): Optional unique identifier for the component.

#### `addSeparator({ text = '', id = undefined })`

Adds a separator component to the modal.

- `text` (string): Optional text to display on the separator.
- `id` (string): Optional unique identifier for the component.

#### `addImage({ src, alt = '', id = undefined })`

Adds an image component to the modal.

- `src` (string): Source URL of the image.
- `alt` (string): Alternative text for the image.
- `id` (string): Optional unique identifier for the component.

#### `addSpacer({ height = "20px", id = undefined })`

Adds a spacer component to the modal.

- `height` (string): Height of the spacer.
- `id` (string): Optional unique identifier for the component.

#### `addNumberInput({ required = false, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1, onChange = () => {}, id = undefined })`

Adds a number input component to the modal.

- `required` (boolean): If true, makes the input required.
- `initialValue` (number): Initial value of the input.
- `decimals` (number): Number of decimal places to allow.
- `min`, `max` (number): Minimum and maximum allowed values.
- `step` (number): Step value for increments/decrements.
- `onChange` (function): Callback function triggered when the value changes.
- `id` (string): Optional unique identifier for the component.

#### `addTextInput({ required = false, initialValue = '', maxLength = -1, onChange = () => {}, id = undefined })`

Adds a text input component to the modal.

- `required` (boolean): If true, makes the input required.
- `initialValue` (string): Initial value of the input.
- `maxLength` (number): Maximum length of the input (-1 for no limit).
- `onChange` (function): Callback function triggered when the value changes.
- `id` (string): Optional unique identifier for the component.

#### `addPasswordInput({ required = false, maxLength = -1, onChange = () => {}, id = undefined })`

Adds a password input component to the modal.

- `required` (boolean): If true, makes the input required.
- `maxLength` (number): Maximum length of the input (-1 for no limit).
- `onChange` (function): Callback function triggered when the value changes.
- `id` (string): Optional unique identifier for the component.

#### `addTextArea({ required = false, initialValue = '', maxLength = -1, onChange = () => {}, id = undefined })`

Adds a text area component to the modal.

- `required` (boolean): If true, makes the input required.
- `initialValue` (string): Initial value of the text area.
- `maxLength` (number): Maximum length of the input (-1 for no limit).
- `onChange` (function): Callback function triggered when the value changes.
- `id` (string): Optional unique identifier for the component.

#### `addCheckbox({ initialState = false, onChange = () => {}, id = undefined })`

Adds a checkbox component to the modal.

- `initialState` (boolean): Initial state of the checkbox.
- `onChange` (function): Callback function triggered when the state changes.
- `id` (string): Optional unique identifier for the component.

#### `addMultiCheckbox(labels, initialStates = [], onChange = () => {}, id = undefined)`

Adds multiple checkbox components as a group.

- `labels` (array): Array of labels for each checkbox.
- `initialStates` (array): Array of initial states for each checkbox.
- `onChange` (function): Callback function triggered when any checkbox state changes.
- `id` (string): Optional unique identifier for the component.

#### `addSlider({ min = 0, max = 100, step = 1, initialValue = 50, onChange = () => {}, id = undefined })`

Adds a slider component to the modal.

- `min`, `max` (number): Minimum and maximum values for the slider.
- `step` (number): Step value for increments/decrements.
- `initialValue` (number): Initial value of the slider.
- `onChange` (function): Callback function triggered when the value changes.
- `id` (string): Optional unique identifier for the component.

#### `addColorPicker({ required, initialColor = '#000000', onChange = () => {}, id = undefined })`

Adds a color picker component to the modal.

- `required` (boolean): If true, makes the color selection required.
- `initialColor` (string): Initial color value (hex format).
- `onChange` (function): Callback function triggered when the color changes.
- `id` (string): Optional unique identifier for the component.

#### `addRating({ required, maxRating = 5, initialRating = 0, onChange = () => {}, id = undefined })`

Adds a rating component to the modal.

- `required` (boolean): If true, makes the rating required.
- `maxRating` (number): Maximum rating value.
- `initialRating` (number): Initial rating value.
- `onChange` (function): Callback function triggered when the rating changes.
- `id` (string): Optional unique identifier for the component.

#### `addHTML({ html, id = undefined })`

Adds raw HTML content to the modal.

- `html` (string): HTML content to be rendered.
- `id` (string): Optional unique identifier for the component.

#### `addCodeBlock({ code, id = undefined })`

Adds a code block component to the modal.

- `code` (string): Code content to be displayed.
- `id` (string): Optional unique identifier for the component.

#### `addList({ items, listType = "ul", id = undefined })`

Adds a list component to the modal.

- `items` (array): Array of list items.
- `listType` (string): Type of list ("ul" for unordered, "ol" for ordered).
- `id` (string): Optional unique identifier for the component.

### Modal Management

#### `open()`

Opens the modal by rendering it and appending it to the document body.

#### `openTroughAppending(element)`

Opens the modal by appending it to a specific element.

- `element` (HTMLElement): The element to append the modal to.

#### `close()`

Closes the modal with a fade-out animation.

#### `closeAll()`

Closes all open modals.

#### `onCloseCallback(callback)`
Adds a callback function that will be called when the modal is closed via clicking outside the modal and NOT when called using `.close()`.

### State Management

#### `setCondition(key, value)`

Sets a condition for conditional rendering.

- `key` (string): The condition key.
- `value` (any): The condition value.

#### `getComponentsValue()`

Retrieves the current values of all input components in the modal.

Returns an object with:
- `correct` (boolean): Indicates if all required fields are filled.
- `values` (array): Array of objects containing the values of each input component.

### Utility Methods

#### `evaluateExpression(expression)`

Evaluates a condition expression.

- `expression` (string): The condition expression to evaluate.

Returns a boolean indicating whether the condition is met.

### 4.2 Rendering and Management

- `render()`: Renders the modal and returns the DOM element. **Meant for internal use only!**
- `open()`: Opens the modal by appending it to the document body.
- `setCondition(key, value)`: Sets a condition for conditional rendering.
- `getComponentsValue()`: Retrieves the values of all components in the modal.
- `deepCopy()`: Creates a deep copy of the modal instance.

## 5. Component Types

The library supports various component types, each with specific properties and behaviors:

- Heading
- Toggle Switch
- Button
- Double Buttons
- Triple Buttons
- Submenu
- Text
- URL
- Date Picker
- Time Picker
- Dropdown
- Separator
- Image
- Spacer
- Number Input
- Text Input
- Password Input
- Text Area
- Checkbox
- Slider
- Color Picker
- Rating

## 6. Conditions and Dynamic Rendering

The library supports conditional rendering of components based on user-defined conditions. Use the `setCondition` method to update condition values and trigger re-rendering of conditional components.

## 7. Tips and Tricks

1. Nested Modals: Use `ZermosSubModal` for creating nested modal structures. This doesn't do anything specific to the generated modal, it is just easier to read in your code if it is a submodal.
2. Chaining: Most methods return `this`, allowing for method chaining when adding components.
3. Custom Styling: Use CSS to customize the appearance of modal components.
4. Validation: Implement custom validation logic in the `onChange` callbacks of input components.
5. Dynamic Updates: Use the `setCondition` method to dynamically update the modal's content based on user interactions.
6. Accessibility: Ensure proper labeling and ARIA attributes for better accessibility.
7. Mobile Responsiveness: Test and adjust the modal layout for various screen sizes.

## 8. Examples

### Easy Example: Simple Contact Form

```javascript
const modal = new ZermosModal()
    .addHeading({ text: "Welcome!" })
    .addText({ text: "This is a simple modal example." })
    .addButton({ text: "Close", onClick: () => modal.close() });

modal.open();
```

### Medium Example: Quiz with Conditional Questions

```javascript
const modal = new ZermosModal()
.addHeading({ text: "User Information Form" })
.addTextInput({ required: true, id: "name", initialValue: "", onChange: (ctx, value) => console.log("Name:", value) })
.addLabel({ text: "Enter your name" })
.addDropdown({
    options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" }
    ],
    required: true,
    id: "color",
    onChange: (ctx, value) => console.log("Favorite color:", value)
})
.addLabel({ text: "Choose your favorite color" })
.addDatePicker({ required: true, id: "birthdate", onChange: (ctx, value) => console.log("Birthdate:", value) })
.addLabel({ text: "Select your birthdate" })
.addButton({ text: "Submit", onClick: (ctx) => {
        const values = ctx.getComponentsValue();
        if (values.correct) {
            console.log("Form submitted:", values);
            ctx.close();
        } else {
            alert("Please fill in all required fields.");
        }
    }});

modal.open();
```

### Advanced Example: Complex Survey with Multiple Question Types and Dynamic Rendering

```javascript
const subModal = new ZermosSubModal()
    .addHeading({ text: "Additional Options" })
    .addToggle({ label: "Enable notifications", id: "notifications", onChange: (ctx, value) => ctx.setCondition("notificationsEnabled", value) })
    .addTextArea({ required: true, id: "notificationMessage", initialValue: "", maxLength: 100, onChange: (ctx, value) => console.log("Notification message:", value) })
    .addLabel({ text: "Enter notification message" });

const mainModal = new ZermosModal()
    .addHeading({ text: "Advanced Settings" })
    .addToggle({ label: "Dark Mode", id: "darkMode", onChange: (ctx, value) => console.log("Dark mode:", value) })
    .addSlider({ min: 0, max: 100, step: 10, initialValue: 50, id: "volume", onChange: (ctx, value) => console.log("Volume:", value) })
    .addLabel({ text: "Adjust volume" })
    .addMultiCheckbox(
        ["Option 1", "Option 2", "Option 3"],
        [false, true, false],
        (ctx, values) => console.log("Selected options:", values),
        "multiOptions"
    )
    .addSubmenu({ showCondition: "notificationsEnabled == true", subModal: subModal })
    .addColorPicker({ required: true, id: "themeColor", onChange: (ctx, value) => console.log("Theme color:", value) })
    .addLabel({ text: "Choose theme color" })
    .addButton({ text: "Save Settings", onClick: (ctx) => {
            const values = ctx.getComponentsValue();
            console.log("Settings saved:", values);
            ctx.close();
        }})
    .addButton({ text: "Cancel", onClick: (ctx) => ctx.close() })
    .addButton({ text: "Open Extra settings", onClick: (ctx) => ctx.setCondition("notificationsEnabled", true) });

mainModal.open();
```

## 9. Styling Guidelines

The ZermosModal library provides basic styling, but you can customize the appearance using CSS. Here are some key classes to target:

- `.zermos-modal`: The main modal container
- `.heading`, `.subheading`: Heading elements
- `.toggle-switch`: Toggle switch container
- `.dropdown`: Dropdown container
- `.slider-container`: Slider container
- `.color-picker-container`: Color picker container
- `.rating-container`: Rating component container

## 10. Best Practices

1. Organize complex forms into logical sections using headings and separators.
2. Use conditional rendering to create dynamic, responsive forms.
3. Implement proper error handling and validation for user inputs.
4. Provide clear instructions and labels for each input component.
5. Use appropriate input types for different kinds of data (e.g., number input for numerical values).
6. Implement a clear submission process and provide feedback to users.
7. Consider using submodals for grouping related questions or for multi-step forms.
8. Optimize performance by lazy-loading complex components or large datasets.
9. Ensure your modal is accessible by using proper ARIA attributes and keyboard navigation.
10. Test your modal thoroughly across different devices and browsers.

## 11. Troubleshooting

- If components are not rendering correctly, check that you're using the correct method to add each component type.
- For issues with conditional rendering, verify that your condition expressions are correctly formatted and that you're using `setCondition` to update values.
- If the modal is not opening, ensure that you're calling the `open()` method after adding all components.
- For performance issues with large forms, consider breaking the content into multiple submodals or implementing pagination.
- If custom styling is not applied, check that your CSS selectors are correctly targeting the modal components.

By following this documentation, you should be able to create complex, interactive modal interfaces using the ZermosModal library. Remember to experiment with different component combinations and leverage the conditional rendering features to create dynamic and responsive user interfaces.
