---
title: "Station 0 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-0-setup"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "custom_ui", "setup", "tutorial"]
tutorial: "custom-ui-examples"
summary: "Initial setup and prerequisites for the Custom UI Examples tutorial series, covering auto-start configuration and performance basics."
---

# Station 0 - Setup

## What & Why

Custom UIs enable you to build custom 2D interfaces in Meta Horizon Worlds. This station provides setup instructions and foundational concepts for the 11-station tutorial series that explores Custom UI capabilities through practical examples.

## Key APIs / Concepts

- **Custom UI gizmo** - Container object with no visual appearance by default; all characteristics defined through TypeScript
- **TypeScript script** - Defines 2D panel, elements, styles, and interactivity
- **Auto-start simulation** - Required setting for Custom UI execution in desktop editor
- **Performance constraints** - CPU cost limits and network considerations
- **Binding `set()` method** - Causes ReactVR refresh and network calls

## How-To (Recipe)

1. **Enable Auto-start simulation**:

   - Click three-dot menu in desktop editor toolbar
   - Enable "Auto-start simulation on Preview entry"
   - Enable "Auto-stop simulation on Preview exit"

2. **Create tutorial copy**:

   - Access tutorial world through desktop editor
   - Create your own copy for modification
   - Use external IDE (VS Code) for script editing

3. **Navigate stations**:
   - Start at Station 1 (to your left in world)
   - Progress through stations 0-10 sequentially
   - Each station adds complexity or new features

## Minimal Example

```typescript
// Custom UI requires TypeScript scripts attached to Custom UI gizmos
// No visual appearance by default - all defined programmatically
// Station 1 covers basic text display implementation
```

## Limits & Constraints

**Performance Limits**:

- Local client CPU cost: below 0.5ms per frame
- Server CPU cost: below 1.5ms per frame
- Each panel update requires network call
- Binding `set()` operations are networked RPC events

**Best Practices**:

- Avoid Custom UI updates with `world.onUpdate` events
- Avoid panel updates in for/next loops
- Split multiple UIs across multiple Custom UI gizmos
- Keep UI hierarchies as flat as possible
- Set invisible panels to invisible to stop rendering

## Gotchas / Debugging

- **No Custom UIs visible**: Verify Auto-start simulation is enabled
- **Performance issues**: Every layer renders even if not seen - use flat hierarchies
- **Network latency**: All `set()` calls are async operations bound by viewer latency
- **TypeScript required**: Custom UIs are generated entirely from TypeScript code

## See Also

- [Station 1 - Text and Fonts](./01-text-and-fonts.md) - Basic text display and font rendering
- [Custom UI API Documentation](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/api-references-and-examples/custom-ui/) - Complete API reference
- [Access Tutorial Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds) - Tutorial access workflow
- [Getting Started with Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites) - Prerequisites

## Sources

- Station 0 - Setup: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-0-setup (accessed 2025-09-25)
