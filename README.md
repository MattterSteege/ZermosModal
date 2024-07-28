# ZermosModal

ZermosModal is a lightweight, flexible JavaScript library for creating customizable modal dialogs and user interfaces. It provides an easy-to-use API for building complex modal structures with various UI components.

This project is still being developed as a replacement for my current modal script that i'm using in multiple of my personal projects. So be ware that some components are still buggy and/or not really developed.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Conditional Rendering](#conditional-rendering)
- [Styling](#styling)
- [Examples](#examples)
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

To create a new modal:

```javascript
const modal = new ZermosModal();
```

Add components to the modal:

```javascript
modal.addHeading("Welcome")
    .addText("This is a sample modal.")
    .addButton("Close", () => {
        // Close action
    });
```

Open the modal:

```javascript
modal.open();
```

## Components

ZermosModal supports the following components:

- Heading
- Text
- Button
- Toggle
- URL
- Date Picker
- Dropdown
- Number Input
- Text Input
- Password Input
- Text Area
- Image
- Separator
- Spacer
- Submenu

Each component has its own method for adding it to the modal. For example:

```javascript
modal.addHeading("Title", "Subtitle", 2)
    .addButton("Click me", () => console.log("Button clicked"))
    .addToggle("Enable feature", false, (modal, state) => console.log(`Toggle state: ${state}`))
    .addDropdown("Choose an option", [
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 }
    ], false, (modal, selected) => console.log(`Selected: ${selected}`));
```

## Conditional Rendering
*as of the time of writing this, this is only implemented on `.addSubmenu()`*

You can set conditions for showing/hiding components:

```javascript
modal.setCondition("showAdvanced", false);
modal.addSubmenu("showAdvanced == true", advancedSettingsSubModal);
```

## Styling

You can apply custom styles to the modal and its components if one component needs special styling, the general styling should be done via a css file (take styles.css as a base)

```javascript
const modal = new ZermosModal("background-color: #f0f0f0; padding: 20px;");
modal.addButton("Styled Button", () => {}, "background-color: blue; color: white;");
```

## Examples

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
