---
title: "Desktop Editor Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "desktop_editor", "build_tools", "development"]
summary: "Primary development environment for building Horizon Worlds, featuring Build and Preview modes, entity management, and world simulation."
---

## What & Why

Desktop editor is the primary development environment for creating Horizon Worlds experiences. Provides visual world building, entity management, TypeScript development integration, and testing capabilities. Essential for complex world development requiring scripting and precise entity placement.

## Key APIs / Concepts

- **Build Mode**: World editing state for adding, modifying, removing entities
- **Preview Mode**: Testing environment that activates scripts and world simulation
- **Hierarchy Panel**: Entity tree structure for organization and management
- **Properties Panel**: Entity configuration interface and script attachment
- **Move Tool**: 3D positioning and rotation controls for entities
- **World Simulation**: Runtime environment executing all valid scripts
- **Empty Objects**: Invisible entities for organizational structure and script attachment

## How-To (Recipe)

1. **Access Desktop Editor**

   - Open Meta Quest Link application
   - Locate Meta Horizon in Library tab
   - Select "Start in Desktop Mode" from context menu
   - Navigate to "My worlds" in Creation Home

2. **Build Mode Operations**

   - Add entities via Build menu
   - Use Move tool for positioning (`(0,0,0)` origin offset recommended)
   - Organize via Hierarchy panel drag/drop
   - Configure via Properties panel

3. **Preview Mode Testing**

   - Click Play button to enter Preview mode
   - Use WASD + mouse for movement, SPACEBAR for jumping
   - Monitor Console tab for script debugging
   - Press ESC once to pause, ESC again to exit
   - Use Reset button to restart simulation

4. **Script Development Workflow**
   - Create scripts via Scripts panel
   - Right-click → "Open in External Editor" (VS Code recommended)
   - Attach scripts to entities via Properties panel
   - Test execution in Preview mode

## Minimal Example

```bash
# Desktop Editor Access Flow
Meta Quest Link → Meta Horizon → Start in Desktop Mode → My worlds
```

## Limits & Constraints

- **Preview Mode**: Single movement speed; debugging only, not production experience
- **Script Execution**: Only runs when attached to world entities
- **Platform Support**: Desktop-only development; VR headset access for testing
- **External Editor**: VS Code strongly recommended for TypeScript development

## Gotchas / Debugging

- Scripts require entity attachment to execute
- Preview mode ≠ actual gameplay experience
- World simulation toggle controls script execution
- Entity positioning easier with origin offset
- Console tab only available during Preview mode

## From Tutorials

- [Module 1 - Build your first game](./tutorials/build-your-first-game/01-build-your-first-game.md): Basic editor setup and world layout
- [Module 2 - Intro to Scripting](./tutorials/build-your-first-game/02-intro-to-scripting.md): Script creation and attachment workflow

## See Also

- [TypeScript Development](./typescript-development-overview.md)
- [Entity Management](./entities-and-objects.md)
- [Performance Optimization](./performance-budgets.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game (accessed 2025-09-25)
