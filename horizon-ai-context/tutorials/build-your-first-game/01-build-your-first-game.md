---
title: "Module 1 - Build your first game"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "desktop_editor",
    "game_development",
    "platformer",
  ]
summary: "First module in building a platformer-style co-op game in Horizon Worlds, focusing on desktop editor setup, world layout, and gem placement."
tutorial: "build-your-first-game"
---

## What & Why

Create a simple platformer-style game where players run and jump through a world collecting gems. This first module introduces the Meta Horizon Worlds desktop editor, establishes the game world layout, and sets up basic collectible objects. Companion content to tutorial world accessed through desktop editor.

## Key APIs / Concepts

- **Desktop Editor**: Primary development environment for building Horizon Worlds
- **Build Mode**: Add, edit, remove entities that compose your world
- **Preview Mode**: Explore and playtest worlds; activates TypeScript scripts
- **Hierarchy Panel**: Entity organization and management interface
- **Move Tool**: Position and rotation controls for entities
- **Entity Duplication**: Create multiple instances of objects
- **World Simulation**: Script execution environment activated in Preview mode

## How-To (Recipe)

1. **Access Tutorial World**

   - Open Meta Quest Link application on desktop
   - Locate Meta Horizon application in Library tab
   - Select "Start in Desktop Mode" from context menu
   - Click "My worlds" in Creation Home navigation
   - Select your copy of tutorial template

2. **Setup Game Layout**

   - Use provided course layout as base design
   - Build maps offset from origin `(0,0,0)` for easier snapping
   - Drag/drop entities in Hierarchy panel to reorganize
   - Use Preview mode to test player movement and jumping distances

3. **Add Collectible Gems**

   - Search for "emerald" in Hierarchy panel
   - Right-click emerald entity and select "Duplicate"
   - Repeat until you have 5 total gems
   - Use Move tool to position gems around course
   - Place gems chest-high for easy player collision

4. **Test Your World**
   - Click Play button to enter Preview mode
   - Use WASD + mouse for movement, SPACEBAR to jump
   - Press ESC once to pause, ESC again to exit
   - Use Reset button to restart simulation

## Minimal Example

```typescript
// Module 1 focuses on world building rather than scripting
// Completed TypeScript files available with "_COMPLETE" suffix
// Scripts covered in subsequent modules
```

## Limits & Constraints

- **Preview Controls**: Single movement speed only
- **Editor Modes**: Build mode for editing, Preview mode for testing only
- **Platform Support**: VR headset and desktop editor access methods
- **File Naming**: Tutorial files end with `_COMPLETE` suffix
- **Testing Recommendation**: Test on all target devices before publishing

## Gotchas / Debugging

- Preview mode ≠ actual game experience; used for development debugging only
- Must press Play button to activate TypeScript script execution
- Duplicated gems spawn at exact same position/rotation as source
- World simulation can be disabled for exploration without scripts
- ESC key behavior: first press pauses, second press exits completely

## See Also

- [Getting Started with Tutorial Prerequisites](../tutorial-prerequisites)
- [Access Tutorial Worlds](../access-tutorial-worlds)
- [Use Assets from Tutorials](../use-assets-from-tutorials)
- [Module 2 - Intro to Scripting](./02-intro-to-scripting.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game (accessed 2025-09-25)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/use-assets-from-tutorials
