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

## 2. Class Overview

The library consists of two main classes:
- `ZermosModal`: The primary class for creating and managing modal interfaces.
- `ZermosSubModal`: A subclass of ZermosModal, specifically designed for nested submenus within a modal. `class ZermosSubModal extends ZermosModal {}`: is a literal clone only used for easier to read code!

## 3. Constructor

```javascript
constructor(components = [], conditions = {})
```

- `components`: An array of component objects that define the modal's content.
- `conditions`: An object containing key-value pairs for conditional rendering.

I don't recommend initializing a modal with params set, it is mostly used internally for the `deepCopy()` function

## 4. Methods

### 4.1 Adding Components

- `addComponent(component)`: Adds a component to the modal. **Meant for internal use only!**

- `addHeading(text, subheading = "", level = 1)`: Adds a heading component.

- `addToggle(label, initialState = false, onChange = (modal, isActive) => {})`: Adds a toggle switch.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `isActive`: Boolean indicating the new state of the toggle.

- `addButton(text, onClick = (modal) => {})`: Adds a button.
   - `onClick`: Callback function invoked with one parameter:
      - `modal`: The current modal instance.

- `addDoubleButtons(text, secondText, onClick = (modal) => {}, secondOnClick = (modal) => {})`: Adds two buttons side by side.
   - Both `onClick` and `secondOnClick`: Callback functions invoked with one parameter:
      - `modal`: The current modal instance.

- `addTripleButtons(text, secondText, thirdText, onClick = (modal) => {}, secondOnClick = (modal) => {}, thirdOnClick = (modal) => {})`: Adds three buttons side by side.
   - All three callbacks (`onClick`, `secondOnClick`, `thirdOnClick`): Invoked with one parameter:
      - `modal`: The current modal instance.

- `addSubmenu(showCondition, subModal)`: Adds a submenu component.

- `addText(text)`: Adds a text component.

- `addUrl(url, showFull = false, copyButton = true)`: Adds a URL component with optional copy functionality.

- `addDatePicker(required = false, initialDate = new Date(), onChange = (modal, selectedDate) => {})`: Adds a date picker.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `selectedDate`: The Date object representing the selected date.

- `addDropdown(options, required = false, multiSelect = false, onChange = (modal, selectedValue) => {})`: Adds a dropdown component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `selectedValue`: The selected value (or array of values if `multiSelect` is true).

- `addSeparator(text = '')`: Adds a separator line with optional text.

- `addImage(src, alt = '')`: Adds an image component.

- `addSpacer(height = "20px")`: Adds vertical space between components.

- `addNumberInput(required = false, initialValue = 0, decimals = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = 1, onChange = (modal, value) => {})`: Adds a number input component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `value`: The current numeric value of the input.

- `addTextInput(required = false, initialValue = '', maxLength = null, onChange = (modal, value) => {})`: Adds a text input component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `value`: The current text value of the input.

- `addPasswordInput(required = false, maxLength = null, onChange = (modal, value) => {})`: Adds a password input component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `value`: The current password value (as plain text).

- `addTextArea(required = false, initialValue = '', maxLength = null, onChange = (modal, value) => {})`: Adds a text area component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `value`: The current text value of the textarea.

- `addCheckbox(initialState = false, onChange = (modal, isChecked) => {})`: Adds a checkbox component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `isChecked`: Boolean indicating whether the checkbox is checked.

- `addSlider(min = 0, max = 100, step = 1, initialValue = 50, onChange = (modal, value) => {})`: Adds a slider component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `value`: The current numeric value of the slider.

- `addColorPicker(required, initialColor = '#000000', onChange = (modal, color) => {})`: Adds a color picker component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `color`: The selected color as a hexadecimal string (e.g., "#FF0000").

- `addRating(required, maxRating = 5, initialRating = 0, onChange = (modal, rating) => {})`: Adds a star rating component.
   - `onChange`: Callback function invoked with two parameters:
      - `modal`: The current modal instance.
      - `rating`: The selected rating as a number.

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
const contactForm = new ZermosModal()
  .addHeading("Contact Us", "We'd love to hear from you!")
  .addTextInput(true, "", null, (modal, value) => console.log("Name:", value))
  .addTextInput(true, "", null, (modal, value) => console.log("Email:", value))
  .addTextArea(false, "", null, (modal, value) => console.log("Message:", value))
  .addButton("Submit", (modal) => {
    console.log("Form submitted!");
    // Add form submission logic here
  });

contactForm.open();
```

### Medium Example: Quiz with Conditional Questions

```javascript
const quiz = new ZermosModal()
  .addHeading("Geography Quiz")
  .addDropdown(
    [
      { label: "Europe", value: "europe" },
      { label: "Asia", value: "asia" },
      { label: "Africa", value: "africa" }
    ],
    true,
    false,
    (modal, value) => modal.setCondition("continent", value)
  )
  .addSubmenu("continent == 'europe'", new ZermosSubModal()
    .addHeading("European Capital", "", 2)
    .addTextInput(true, "", null, (modal, value) => console.log("European capital:", value))
  )
  .addSubmenu("continent == 'asia'", new ZermosSubModal()
    .addHeading("Asian Language", "", 2)
    .addDropdown(
      [
        { label: "Mandarin", value: "mandarin" },
        { label: "Hindi", value: "hindi" },
        { label: "Japanese", value: "japanese" }
      ],
      true,
      false,
      (modal, value) => console.log("Asian language:", value)
    )
  )
  .addSubmenu("continent == 'africa'", new ZermosSubModal()
    .addHeading("African Animal", "", 2)
    .addTextInput(true, "", null, (modal, value) => console.log("African animal:", value))
  )
  .addButton("Submit Quiz", (modal) => {
    console.log("Quiz submitted:", modal.getComponentsValue());
  });

quiz.open();
```

### Advanced Example: Complex Survey with Multiple Question Types and Dynamic Rendering

```javascript
    const survey = new ZermosModal()
    .addHeading("Customer Satisfaction Survey")
    .addText("Please answer the following questions to help us improve our services.")
    .addRating(true, 5, 0, (modal, value) => {
        modal.setCondition("satisfaction", value);
        console.log("Overall satisfaction:", value);
    })
    .addSubmenu("satisfaction <= 3", new ZermosSubModal()
        .addHeading("We're sorry to hear that. What went wrong?", "", 2)
        .addTextArea(true, "", null, (modal, value) => console.log("Negative feedback:", value))
    )
    .addSubmenu("satisfaction > 3", new ZermosSubModal()
        .addHeading("Great! What did you enjoy most?", "", 2)
        .addTextArea(false, "", null, (modal, value) => console.log("Positive feedback:", value))
    )
    .addHeading("Product Preferences", "", 2)
    .addDropdown(
        [
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
            { label: "Food", value: "food" }
        ],
        true,
        true,
        (modal, values) => {
            modal.setCondition("preferences", values);
            console.log("Product preferences:", values);
        }
    )
    .addSubmenu("preferences.includes('electronics')", new ZermosSubModal()
        .addHeading("Electronics Preferences", "", 3)
        .addCheckbox(false, (modal, value) => console.log("Interested in smartphones:", value))
        .addText("Interested in smartphones")
        .addCheckbox(false, (modal, value) => console.log("Interested in laptops:", value))
        .addText("Interested in laptops")
    )
    .addSubmenu("preferences.includes('clothing')", new ZermosSubModal()
        .addHeading("Clothing Preferences", "", 3)
        .addColorPicker(false, "#000000", (modal, value) => console.log("Favorite color:", value))
        .addText("Select your favorite color")
    )
    .addSubmenu("preferences.includes('food')", new ZermosSubModal()
        .addHeading("Food Preferences", "", 3)
        .addSlider(1, 10, 1, 5, (modal, value) => console.log("Spiciness preference:", value))
        .addText("Spiciness preference (1-10)")
    )
    .addHeading("Additional Information", "", 2)
    .addDatePicker(false, new Date(), (modal, value) => console.log("Preferred delivery date:", value))
    .addButton("Submit Survey", (modal) => {
        const results = modal.getComponentsValue();
        console.log("Survey results:", results);
        // Process and submit survey results
    });
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