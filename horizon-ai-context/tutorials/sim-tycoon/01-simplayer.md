---
title: "Module 1 - SimPlayer"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-1-simplayer"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "sim_tycoon",
    "player_management",
    "tools",
    "inventory",
  ]
summary: "Custom player wrapper that extends hz.Player with tool management, resource tracking, inventory system, and persistent save data integration."
tutorial: "sim-tycoon"
---

# Module 1 - SimPlayer

## What & Why

SimPlayer is a custom player wrapper extending `hz.Player` that centralizes player state management for tycoon games. It handles tool equipping, resource tracking, inventory management, mining progress, and save data persistence - serving as the foundation for all player interactions.

## Key APIs / Concepts

- **SimPlayer Class**: Custom wrapper around `hz.Player` (not a Horizon component)
- **Tool Management**: `equipAttachable()`, `equipGrabbable()`, `getPlayerTool()`
- **Resource Tracking**: Dynamic inventory with capacity limits and weight calculations
- **State Persistence**: Integration with SaveGame system for session continuity
- **Cleanup**: `onSimPlayerExit()` for proper player departure handling

## How-To (Recipe)

1. **Add SimPlayer to project**

   - Include `SimPlayer.ts` in your scripts
   - Set up in `World.ts` (not a Horizon component)

2. **Create SimPlayer instances**

   - For each `hz.Player`, create corresponding `SimPlayer`
   - Initialize with `constructor(player, world)`
   - Populate `toolMap` with available tools from ToolGroups

3. **Manage tools dynamically**

   - Use `equipAttachable(toolName)` for backpacks
   - Use `equipGrabbable(toolName)` for pickaxes
   - Avoid direct tool manipulation

4. **Track resources and progress**
   - Let SimPlayer handle inventory weight calculations
   - Use mining progress tracking (`extractionProgress`, `extractionThreshold`)
   - Monitor tutorial completion flags (FTUE)

## System Responsibilities

| Component             | Description                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Tool Management**   | Tracks all player tools via `toolMap`, handles grabbables (pickaxes) and attachables (backpacks), ensures proper pooling and attachment |
| **Resource Tracking** | Manages player resource inventory, enforces storage limits, calculates total weight, provides mining feedback                           |
| **Stats & Score**     | Stores player stats/scores, integrates with SaveGame for persistence across sessions                                                    |
| **Progress State**    | Tracks mining progress, last extracted resource type, tutorial completion (FTUE) flags                                                  |
| **Persistence**       | Links to SaveGame system, handles equipped tools/stats storage, provides cleanup on player exit                                         |

## Minimal Example

```typescript
// In World.ts - create SimPlayer for new players
const simPlayer = new SimPlayer(player, this.world);

// Equip tools
simPlayer.equipGrabbable("green_pickaxe");
simPlayer.equipAttachable("basic_backpack");

// Get specific tool
const pickaxe = simPlayer.getPlayerTool("green_pickaxe");

// Cleanup on exit
simPlayer.onSimPlayerExit();
```

## System Integrations

- **SaveGame System**: Persists player state between sessions
- **Tool Systems**: Manages equipping/unequipping with proper pooling
- **Resource Systems**: Tracks inventory capacity and resource collection
- **HUD System**: Provides data for UI updates and progress display
- **Store System**: Handles purchase validation and tool distribution

## Limits & Constraints

- Not a Horizon component - requires manual setup in `World.ts`
- Tool operations should use SimPlayer methods, not direct manipulation
- Inventory capacity enforced by backpack storage limits
- Resource tracking depends on proper tool configuration

## Gotchas / Debugging

- **Always create SimPlayer for each player** - central to all systems
- **Use appropriate equip functions** - bypassing SimPlayer breaks state tracking
- **Save regularly after changes** - prevents progress loss
- **Clean up on player exit** - prevents memory leaks and state corruption
- **Validate operations through SimPlayer** - maintains system integrity

## See Also

- [Module 3 - Tools and ToolGroups](./03-tools-and-toolgroups.md) - Tool system architecture
- [Module 9 - SaveGame System](./09-savegame-system.md) - Persistence implementation
- [Module 10 - HUD System](./10-hud-system.md) - UI integration patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-1-simplayer (accessed 2025-09-26)
