---
title: "Custom UI Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/api-references-and-examples/custom-ui/"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "custom_ui", "typescript", "ui", "scripting"]
summary: "Custom 2D user interfaces in Meta Horizon Worlds using TypeScript and the Custom UI gizmo."
---

# Custom UI Overview

## What & Why

Custom UIs enable creation of custom 2D interfaces in Meta Horizon Worlds. They provide interactive panels, overlays, and kiosk-style interfaces that can display messaging, collect input, and integrate with world systems through TypeScript scripting.

## Key APIs / Concepts

- **Custom UI gizmo** - Container object with no visual appearance by default; all characteristics defined through TypeScript
- **UIComponent** - Abstract base class for Custom UI panels; must be extended
- **View()** - Core UI container object; can contain Text, Image, and other View objects
- **`initializeUI()` method** - Returns View object definition; contains panel structure
- **`horizon/ui`** - API module providing UI components and styling
- **Binding `set()` method** - Updates UI state; triggers ReactVR refresh and network calls

## How-To (Recipe)

1. **Place Custom UI gizmo in world**
2. **Create TypeScript script** extending UIComponent class
3. **Implement `initializeUI()` method** returning View object
4. **Attach script to Custom UI gizmo**
5. **Enable Auto-start simulation** in desktop editor for testing

## Minimal Example

```typescript
import { UIComponent, View, Text } from "@/horizon/ui";

class BasicTextUI extends UIComponent {
  initializeUI() {
    return View({
      style: { backgroundColor: "black" },
      children: [
        Text({
          text: "Hello World",
          style: { color: "white" },
        }),
      ],
    });
  }
}

UIComponent.register(BasicTextUI);
```

## Limits & Constraints

**Performance Limits**:

- Local client CPU cost: below 0.5ms per frame
- Server CPU cost: below 1.5ms per frame
- Each panel update requires network call
- All `set()` operations are networked RPC events

**Visual Constraints**:

- All UI layers render even if not visible
- Flat hierarchies perform better than nested structures
- Network latency affects async operations

## Gotchas / Debugging

- **Auto-start simulation required**: Custom UIs won't display if simulation not started
- **Performance**: Avoid updates in `world.onUpdate` or tight loops
- **Layer rendering**: Every layer renders regardless of visibility
- **Network calls**: Each UI update triggers network communication
- **TypeScript only**: Cannot be created without TypeScript scripting

## From Tutorials

### Custom UI Examples Tutorial Series

Comprehensive 11-station tutorial covering all Custom UI capabilities:

- [Station 0 - Setup](./tutorials/custom-ui-examples/00-setup.md) - Prerequisites and configuration
- [Station 1 - Text and Fonts](./tutorials/custom-ui-examples/01-text-and-fonts.md) - Text display, font families, and dynamic content
- [Station 2 - Image from Asset](./tutorials/custom-ui-examples/02-image-from-asset.md) - Loading images from texture assets
- [Station 3 - Scrollable UI](./tutorials/custom-ui-examples/03-scrollable-ui.md) - ScrollView for content larger than viewport
- [Station 4 - Generic Yes/No Dialog](./tutorials/custom-ui-examples/04-generic-yes-no-dialog.md) - Reusable dialog patterns with Pressable components
- [Station 5 - Light the Sphere Dialog](./tutorials/custom-ui-examples/05-light-the-sphere-dialog.md) - World interaction via MeshEntity and PropTypes.Entity
- [Station 6a - Column View](./tutorials/custom-ui-examples/06a-column-view.md) - FlexDirection column layouts and View constructors
- [Station 6b - Combo View](./tutorials/custom-ui-examples/06b-combo-view.md) - Complex nested layouts with mixed row/column flexDirection
- [Station 7 - Persistent Variables](./tutorials/custom-ui-examples/07-persistent-variables.md) - Data persistence across world sessions using variable groups
- [Station 8 - JSON as Datasource](./tutorials/custom-ui-examples/08-json-as-datasource.md) - Data-driven UIs with JSON from Text assets
- [Station 9 - Animation Effects](./tutorials/custom-ui-examples/09-animation-effects.md) - AnimatedBinding and Animation classes for UI effects
- [Station 10 - Timer and Build Info Overlays](./tutorials/custom-ui-examples/10-timer-and-build-info-overlays.md) - Non-interactive screen overlays (HUDs) with absolute positioning

## See Also

- [Gizmos Overview](./gizmos-overview.md) - All available gizmo types
- [TypeScript Development Overview](./typescript-development-overview.md) - Component-based scripting framework
- [Events and Triggers System](./events-triggers-system.md) - Integration with world events
- [Custom UI Examples Tutorial](./tutorials/custom-ui-examples/00-setup.md) - Complete tutorial series

## Sources

- Custom UI API Reference: https://developers.meta.com/horizon-worlds/learn/documentation/typescript/api-references-and-examples/custom-ui/ (accessed 2025-09-25)
