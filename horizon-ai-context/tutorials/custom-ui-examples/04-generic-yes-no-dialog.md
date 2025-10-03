---
title: "Generic Yes/No Dialog"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-4-generic-yes-no-dialog"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "custom_ui", "dialog", "pressable", "ui_components"]
summary: "Create reusable confirmation dialogs with Yes/No buttons using custom UI Pressable components and function-based patterns."
tutorial: "custom-ui-examples"
---

# Generic Yes/No Dialog

## What & Why

Creates a reusable dialog template with Yes and No buttons for user confirmations. Uses function-based component patterns to generate consistent UI elements with configurable properties and event handlers. Essential for any interaction requiring user consent or decision-making.

## Key APIs / Concepts

- **`MyButton(props: MyButtonProps)`** - Function returning `UINode` for button creation
- **`MyPrompt()`** - Function creating complete Yes/No dialog layout
- **`Pressable`** - UI component supporting JavaScript-style events
- **`UINode()`** - Base UI element that can be added to View()
- **`Text()`** - Text display element for dialog messages
- **`View()`** - Container for custom UI elements

## How-To (Recipe)

1. Create button component function accepting properties
2. Return `UINode()` with Pressable component containing event handlers
3. Define `MyPrompt()` function combining Text() and two MyButton() calls
4. Set different properties for Yes/No buttons (text, styling, actions)
5. Call `MyPrompt()` within `initializeUI()` for panel setup
6. Add placeholder functions `doYes()` and `doNo()` for button actions

## Minimal Example

```typescript
interface MyButtonProps {
  text: string;
  backgroundColor: string;
  onClickAction: () => void;
}

function MyButton(props: MyButtonProps): UINode {
  return UINode({
    component: Pressable({
      backgroundColor: props.backgroundColor,
      onClick: props.onClickAction,
      // Other Pressable events: onEnter, onExit, onPress, onRelease
    }),
    children: [Text({ content: props.text })],
  });
}

function MyPrompt(): UINode {
  return UINode({
    children: [
      Text({ content: "Are you sure?" }),
      MyButton({ text: "Yes", backgroundColor: "GREEN", onClickAction: doYes }),
      MyButton({ text: "No", backgroundColor: "RED", onClickAction: doNo }),
    ],
  });
}

function doYes() {
  console.log("User selected Yes");
}

function doNo() {
  console.log("User selected No");
}

function initializeUI() {
  const dialog = MyPrompt();
  // Add dialog to custom UI View()
}
```

## Limits & Constraints

- **Update Frequency**: UI updates performed every five frames
- **Properties**: Function parameters allow variation between buttons
- **Event Support**: Pressable supports 5 JavaScript-style events
- **Component Reuse**: Same function can generate multiple button instances with different properties

## Gotchas / Debugging

- Functions must return `UINode()` to be added to View() definition
- Properties passed to button functions enable customization without code duplication
- Use Visual Studio Code's "Go to Definition" on event strings for Pressable documentation
- Placeholder functions should be replaced with actual game logic
- Ensure consistent property interfaces when creating reusable components

## See Also

- [Custom UI Overview](../custom-ui-overview.md) - Base custom UI concepts
- [Text and Fonts](./01-text-and-fonts.md) - Text element styling
- [Pressable Events](../events-triggers-system.md) - Event handling patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-4-generic-yes-no-dialog (accessed 2025-09-25)
