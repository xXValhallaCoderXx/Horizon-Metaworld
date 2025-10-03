---
title: "Station 2 - Image from Asset"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-2-image-from-asset"
last_updated: "2025-09-25T00:00:00Z"
tags:
  ["horizon_worlds", "custom_ui", "images", "assets", "typescript", "library"]
summary: "Learn to display static images in custom UI panels by loading PNG texture assets with proper styling and code organization using library files."
tutorial: "custom-ui-examples"
---

# Station 2 - Image from Asset

## What & Why

Station 2 demonstrates loading and displaying static images in custom UI panels. Images are uploaded as PNG texture assets and selected through the Properties panel. This enables displaying non-interactive assets created outside the platform directly in user interfaces, with proper code organization using reusable library files.

## Key APIs / Concepts

- **`ImageSource.fromTextureAsset(asset)`** - Loads texture asset as image source
- **`Image`** - UI component for displaying images with style properties
- **`ImageStyle`** - Styling object with height, width properties for images
- **`Asset`** - Type for objects uploaded to Asset Library (PNG textures)
- **`PropTypes`** - Reference to Properties panel properties of parent objects
- **`export`/`import`** - Module system for sharing code between scripts
- **Library pattern** - Centralized location for reusable code objects

## How-To (Recipe)

1. **Upload image asset**

   - Upload PNG file to Asset Library as Texture type
   - Asset becomes available in Properties panel dropdown

2. **Create library file for reusable code**

   - Define `loadImage2()` function with `export` keyword
   - Define `UITextureProps` type declaration with `export`
   - Centralize shared objects to avoid duplication

3. **Set up main script structure**

   - Import required UI components and library functions
   - Define `ImageStyle` object for image dimensions
   - Create class extending UIComponent with texture properties

4. **Configure Properties panel integration**

   - Use `propsDefinition` to define `textureAsset` property
   - Property appears as Asset dropdown in CustomUI gizmo Properties panel

5. **Implement UI rendering**
   - In `initializeUI()`, call `loadImage2()` with selected asset and style
   - Return View object containing Text and Image elements

## Minimal Example

**Library file (StationAll-CustomUI-Library.ts):**

```typescript
import { Image, ImageSource, ImageStyle, Asset } from "horizon/ui";

// Export reusable image loading function
export function loadImage2(asset: Asset, style: ImageStyle) {
  return Image({
    source: ImageSource.fromTextureAsset(asset),
    style: style,
  });
}

// Export type for texture properties
export type UITextureProps = {
  textureAsset: Asset;
};
```

**Main script (Station02-ImageFromAsset.ts):**

```typescript
import { UIComponent, View, Text, PropTypes } from "horizon/ui";
import { loadImage2, type UITextureProps } from "StationAll-CustomUI-Library";

const baseSimpleImage2Style = { height: 200, width: 200 };

class SimpleImage2 extends UIComponent<UITextureProps> {
  static propsDefinition = {
    textureAsset: PropTypes.asset,
  };

  initializeUI() {
    return View({
      children: [
        Text({ text: "Image from Asset" }),
        loadImage2(this.props.textureAsset, baseSimpleImage2Style),
      ],
    });
  }
}

UIComponent.register(SimpleImage2);
```

## Limits & Constraints

- **Image format**: Must be PNG files uploaded as Texture assets
- **Panel sizing**: CustomUI panel dimensions should be larger than ImageStyle dimensions
- **Asset access**: Only assets uploaded to your Asset Library are available in dropdown
- **Import scope**: Default script scope is file-level; use export/import for cross-file sharing

## Gotchas / Debugging

- **Unused imports**: VS Code highlights imported modules that aren't used (can be removed)
- **ImageStyle vs panel size**: Image styling is separate from overall CustomUI panel dimensions
- **Library organization**: Centralize reusable functions to avoid duplicate maintenance
- **Export keyword required**: Objects must be exported to be available in other scripts
- **Type imports**: Use `import {type TypeName}` syntax for type definitions

## Development Tips

**Library file pattern:**

- Label files as Library, Shared, Common, or similar
- Export functions and types that are used across multiple files
- Import only what's needed to keep scripts clean

**Properties panel integration:**

- `PropTypes.asset` creates dropdown with available texture assets
- Property value becomes accessible via `this.props.textureAsset`
- Designer selects assets visually without touching code

**ImageStyle exploration:**

- Right-click `ImageStyle` → "Go to Definition" to see all available styling options
- Common properties: height, width, positioning, effects

## Code Organization Best Practices

**Import statements:**

```typescript
// Standard API imports
import { UIComponent, Text, ImageStyle } from "horizon/ui";

// Library imports
import { loadImage2 } from "StationAll-CustomUI-Library";
import { type UITextureProps } from "StationAll-CustomUI-Library";
```

**Commenting unused imports:**

```typescript
// These imports might need to be added to extend capabilities:
// ViewStyle,
// Callback,
// Pressable,
```

## See Also

- [Station 1 - Text and Fonts](./01-text-and-fonts.md) - Basic text-based custom UI
- [Station 3 - Scrollable UI](./03-scrollable-ui.md) - Interactive scrolling panels
- [Custom UI Overview](../../custom-ui-overview.md) - General custom UI concepts

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-2-image-from-asset (accessed 2025-09-25)
