---
title: "Station 1 - Text and Fonts"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-1-text-and-fonts"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "custom_ui", "text", "fonts", "typescript"]
summary: "Learn to create text-based custom UI panels using different font families and styling options in Meta Horizon Worlds."
tutorial: "custom-ui-examples"
---

# Station 1 - Text and Fonts

## What & Why

Station 1 demonstrates text-based custom UI creation using various font faces displayed on a flat plane. This station teaches the fundamental structure of text-only custom UI definitions and how to implement basic font styling in Horizon Worlds.

## Key APIs / Concepts

- **`horizon/ui`** - UI module from API v2.0.0 for custom UI development
- **`UIComponent`** - Abstract class that provides framework for custom UI classes
- **`View`** - Custom UI panel object that contains child elements
- **`initializeUI()`** - Method that returns View() object definition
- **`Text`** - Object type for text elements with style properties
- **`FontFamily`** - Available fonts: 'Anton', 'Bangers', 'Kallisto', 'Optimistic', 'Oswald', 'Roboto', 'Roboto-Mono'

## How-To (Recipe)

1. **Set up CustomUI gizmo**

   - Create Station01-CustomUI gizmo
   - Set Visible: true
   - Attach script to define custom UI elements

2. **Create script structure**

   - Import components from `horizon/ui`
   - Define class extending UIComponent abstract class
   - Implement `initializeUI()` method returning View() object

3. **Define View object**

   - Specify child objects (Text, View, Image objects)
   - Add references to custom functions returning UI objects
   - Register class with UIComponent abstract class

4. **Configure text elements**
   - Use Text() objects with text and style properties
   - Apply fontFamily styling from available fonts
   - Explore additional TextStyle and ViewStyle options

## Minimal Example

```typescript
import { UIComponent, View, Text } from "horizon/ui";

class CustomUIFonts extends UIComponent {
  initializeUI() {
    return View({
      style: { backgroundColor: "black" },
      children: [
        Text({ text: "Anton", style: { fontFamily: "Anton" } }),
        Text({ text: "Bangers", style: { fontFamily: "Bangers" } }),
        Text({ text: "Roboto", style: { fontFamily: "Roboto" } }),
      ],
    });
  }
}

// Register the class
UIComponent.register(CustomUIFonts);
```

## Limits & Constraints

- **Available fonts**: Limited to 7 font families (Anton, Bangers, Kallisto, Optimistic, Oswald, Roboto, Roboto-Mono)
- **Text exploration**: "Go to Definition" method only works if values are properly defined in script context
- **Panel sizing**: Text length must be considered when sizing UI panels

## Gotchas / Debugging

- **FontFamily exploration**: Right-click `fontFamily` → "Go to Definition" to find horizon_ui.d.ts declarations
- **Style options**: Similarly explore TextStyle and ViewStyle objects via "Go to Definition"
- **Comment blocks**: When using `/*` comments, ensure proper closing `*/` to avoid breaking editor syntax
- **Script structure**: The UIComponent extension pattern is commonly used across Horizon Worlds scripts

## Development Tips

**Available fonts discovery:**

- Locate: `Text({ text: "Anton", style: { fontFamily: "Anton" } })`
- Right-click `fontFamily` → "Go to Definition"
- Navigate to `FontFamily` type definition to see complete list

**Style options exploration:**

- Right-click `style` property → "Go to Definition" for TextStyle options
- Explore ViewStyle for overall custom UI styling options
- TypeScript declarations in horizon_ui.d.ts provide complete API reference

**Commenting best practices:**

- Single-line: `// This is a single-line comment`
- Multi-line: `/* Multi-line comments for detailed explanations */`
- Include: intention, gotchas, TODOs for maintainability

## Copy and Explore

Try these experiments by copying the world and duplicating assets:

- Test different font combinations
- Explore text styling options (colors, sizes, effects)
- Experiment with View styling options
- Adjust panel sizes to accommodate different text lengths

## See Also

- [Station 0 - Setup](./00-setup.md) - Prerequisites and world setup
- [Station 2 - Image from Asset](./02-image-from-asset.md) - Adding images to custom UI
- [Custom UI Overview](../../custom-ui-overview.md) - General custom UI concepts

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-1-text-and-fonts (accessed 2025-09-25)
