---
title: "Station 3 - Scrollable UI"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-3-scrollable-ui"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "custom_ui",
    "scroll",
    "scrollview",
    "typescript",
    "ui_components",
  ]
summary: "Learn to create scrollable custom UI panels using ScrollView objects for content that exceeds display area boundaries."
tutorial: "custom-ui-examples"
---

# Station 3 - Scrollable UI

## What & Why

Station 3 demonstrates creating scrollable custom UI panels using ScrollView objects instead of basic View objects. This enables displaying content that exceeds the physical panel dimensions without requiring oversized UI panels that would be difficult to use in VR. The example shows a biography with title, picture, and extended body text that scrolls vertically.

## Key APIs / Concepts

- **`ScrollView`** - Container that enables scrolling through content larger than display area
- **`contentContainerStyle`** - Defines styling for the ScrollView's content container
- **`style`** - Defines visible window dimensions (viewport) into the scrollable content
- **`horizontal`** - Boolean controlling scroll direction (false = vertical, true = horizontal)
- **`flexDirection`** - Defines how child objects are organized within Views
- **`alignItems`** - Controls child object alignment in non-predominant axis
- **Module import pattern** - `import * as ui` for namespace-based API access

## How-To (Recipe)

1. **Import UI module with namespace**

   - Use `import * as ui from 'horizon/ui'` for namespace-based access
   - Reference components as `ui.ScrollView`, `ui.Text`, etc.

2. **Define ScrollView structure**

   - Replace `View` object with `ScrollView` object
   - Add child objects (Text, Image, etc.) in children array

3. **Configure viewport dimensions**

   - Set `style` property with height/width for visible window
   - Ensure dimensions are less than panel height/width

4. **Configure content container**

   - Set `contentContainerStyle.height` larger than viewport height
   - Add `alignItems` for cross-axis alignment

5. **Control scroll behavior**
   - Set `horizontal: false` for vertical scrolling (default)
   - Set `horizontal: true` for horizontal scrolling

## Minimal Example

```typescript
import * as ui from "horizon/ui";

class ScrollableExample extends ui.UIComponent {
  static panelHeight = 400;
  static panelWidth = 300;

  initializeUI() {
    return ui.View({
      children: [
        ui.Text({
          text: "Biography",
          style: { fontSize: 24, fontWeight: "bold" },
        }),

        ui.ScrollView({
          children: [
            ui.Text({
              text: "Lord Lorem Ipsum lived from 1234 to 1567...\n\n",
              style: { fontFamily: "Anton", fontSize: 18, color: "gray" },
            }),
            ui.Text({
              text: "His great works included extensive writings on placeholder text...\n\n",
              style: { fontFamily: "Anton", fontSize: 18, color: "gray" },
            }),
            // More content...
          ],

          // Content container larger than viewport
          contentContainerStyle: {
            height: 800,
            alignItems: "flex-start",
          },

          // Visible viewport window
          style: {
            height: 200,
            width: 250,
          },

          horizontal: false,
        }),
      ],
    });
  }
}
```

## Limits & Constraints

- **Viewport size**: ScrollView style dimensions must be less than panel height/width
- **Content height**: Can be larger or smaller than panel height
- **Scrollbar display**: Appears based on contentContainerStyle height vs viewport height, regardless of actual content
- **Performance**: Large amounts of content may impact performance

## Gotchas / Debugging

- **Scrollbars always show**: If contentContainerStyle.height > viewport height, scrollbars appear even without enough content
- **Alignment confusion**: `alignItems` controls non-predominant axis (horizontal alignment for vertical scroll)
- **Dimension relationships**: Ensure proper nesting: contentContainer > viewport > panel dimensions
- **Import pattern**: Using `import * as ui` requires `ui.` prefix for all components

## Development Tips

**ScrollView configuration:**

- **Viewport (style)**: Window size visible to user
- **Content container**: Total scrollable area size
- **Relationship**: Container > Viewport = Scrolling enabled

**Scroll direction control:**

- `horizontal: false` - Vertical scrolling (default)
- `horizontal: true` - Horizontal scrolling
- `flexDirection` affects child object organization

**Content sizing:**

- Experiment with contentContainerStyle.height to match actual content needs
- Comment out Text elements to test scrolling behavior
- Adjust height values based on content requirements

## TypeScript Patterns

**Module namespace import:**

```typescript
import * as ui from 'horizon/ui';

// Usage with namespace prefix
ui.View({ ... })
ui.Text({ ... })
ui.ScrollView({ ... })
```

**Versus selective imports:**

```typescript
import { UIComponent, View, Text, ScrollView } from 'horizon/ui';

// Direct usage
View({ ... })
Text({ ... })
ScrollView({ ... })
```

## Styling Properties

**ScrollView-specific styling:**

- `style: { height, width }` - Visible viewport dimensions
- `contentContainerStyle: { height, alignItems }` - Content container properties
- `horizontal: boolean` - Scroll direction control

**Child organization:**

- `flexDirection` - Controls layout flow of child objects
- `alignItems` - Cross-axis alignment (horizontal for vertical scroll)

## See Also

- [Station 2 - Image from Asset](./02-image-from-asset.md) - Static image loading
- [Station 4 - Generic Yes/No Dialog](./04-generic-yes-no-dialog.md) - Interactive dialogs
- [Custom UI Overview](../../custom-ui-overview.md) - General custom UI concepts

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-3-scrollable-ui (accessed 2025-09-25)
