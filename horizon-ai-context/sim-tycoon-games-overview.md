---
title: "Sim Tycoon Games Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-0-setup"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "tycoon", "sim_games", "progression", "player_management"]
summary: "Framework for building mobile-focused multiplayer tycoon games with tool management, resource collection, and persistent progression systems."
---

# Sim Tycoon Games Overview

## What & Why

Sim tycoon games (also called Progression Simulators, Incremental Tycoons) create engaging gameplay loops through resource collection, tool upgrades, and persistent progression. These games excel at drop-in multiplayer experiences where players gather resources, convert them to currency, purchase upgrades, and repeat the cycle with improved efficiency.

## Key Systems / Concepts

- **SimPlayer Wrapper**: Custom player state manager extending `hz.Player`
- **Tool Management**: Dynamic equipping/unequipping of grabbables (pickaxes) and attachables (backpacks)
- **Resource Nodes**: Interactive mining objects with health, respawn timers, and configurable yields
- **Variable Groups**: Required for persistent save data across sessions
- **FTUE System**: First-Time User Experience for player onboarding
- **Core Game Loop**: Tools → Resources → Currency → Upgrades → Repeat

## How-To (Recipe)

1. **Setup Template Foundation**

   - Access Sim Tycoon Template via Horizon Desktop Editor → Tutorials
   - Create VariableGroup with `SaveGame` player variable
   - Configure `SaveGame.ts` with matching `pvarsBaseName` and `saveGameKey`

2. **Implement Player Management**

   - Create `SimPlayer` wrapper for each `hz.Player`
   - Handle tool equipping via `equipGrabbable()` and `equipAttachable()`
   - Track inventory capacity, mining progress, and FTUE completion

3. **Configure Resource Systems**

   - Set up resource nodes with `maxHealth`, `resourceType`, `resourceAmount`, `respawnTime`
   - Design mining mechanics with tool damage and node health depletion
   - Implement automatic resource-to-inventory addition with capacity limits

4. **Build Economy Loop**
   - Create converter systems for resource-to-currency exchange
   - Set up shop systems for tool and upgrade purchases
   - Balance upgrade costs against collection efficiency improvements

## Minimal Example

```typescript
// Create SimPlayer for new players
const simPlayer = new SimPlayer(player, this.world);

// Equip basic tools
simPlayer.equipGrabbable("green_pickaxe");
simPlayer.equipAttachable("basic_backpack");

// Mining interaction (handled automatically by resource nodes)
// Node health decreases → resources generated → added to SimPlayer inventory
// Player steps on converter → resources become currency
// Player purchases upgrades at shop → improved efficiency
```

## System Architecture

**Core Components**:

- **SimPlayer**: Central state management for tools, resources, stats, progress
- **Resource Nodes**: Configurable mining objects with health/respawn systems
- **Tool Systems**: Grabbable tools (pickaxes) and attachable tools (backpacks)
- **Save System**: Persistent storage via Variable Groups and SaveGame integration

**Economy Flow**:

1. Player mines resource nodes with equipped tools
2. Resources collected based on tool efficiency and node yields
3. Resources converted to currency via converter triggers
4. Currency spent at shops for tool upgrades and capacity improvements
5. Better tools enable faster/more efficient resource collection

## Popular Examples & Characteristics

**Horizon World Examples**: Samurai Tycoon, Saber, Plants

**Key Characteristics**:

- Repeatable progression cycles that maintain engagement
- Tool upgrade paths that meaningfully improve collection rates
- Multiple resource types requiring different strategies
- Social multiplayer elements with shared resource nodes
- Mobile-optimized controls and UI systems

## Limits & Constraints

- Maximum 8 players by default (configurable)
- Requires Variable Groups setup for save functionality
- Mobile-only optimization in template (can be expanded)
- Basic TypeScript knowledge needed for customization
- FTUE required for new player onboarding

## From Tutorials

The [Sim Tycoon Tutorial Series](./tutorials/sim-tycoon/00-setup.md) provides comprehensive 18-module implementation covering:

- **Setup & Core**: [Setup](./tutorials/sim-tycoon/00-setup.md), [SimPlayer](./tutorials/sim-tycoon/01-simplayer.md), [Resource Nodes](./tutorials/sim-tycoon/02-resource-nodes.md)
- **Tools**: [Tools and ToolGroups](./tutorials/sim-tycoon/03-tools-and-toolgroups.md), [Pickaxe](./tutorials/sim-tycoon/04-pickaxe-tool.md), [Backpack](./tutorials/sim-tycoon/05-backpack-tool.md)
- **Economy**: [Resource Converter](./tutorials/sim-tycoon/06-resource-converter-system.md), [Store System](./tutorials/sim-tycoon/07-store-system.md)
- **Management**: [World Management](./tutorials/sim-tycoon/08-world-game-management.md), [SaveGame System](./tutorials/sim-tycoon/09-savegame-system.md)
- **Interface**: [HUD System](./tutorials/sim-tycoon/10-hud-system.md), [FTUE System](./tutorials/sim-tycoon/11-ftue-system.md)
- **Advanced Features**: [Global Nodes](./tutorials/sim-tycoon/12-global-resource-nodes.md), [Teleporters](./tutorials/sim-tycoon/13-teleporter-system.md)
- **Polish**: [VFX](./tutorials/sim-tycoon/14-particle-vfx-system.md), [Audio](./tutorials/sim-tycoon/15-audio-system.md), [Achievements](./tutorials/sim-tycoon/16-achievement-quest-system.md)
- **Customization**: [Configuration](./tutorials/sim-tycoon/17-configuration-customization.md)

## Gotchas / Debugging

- **Variable Groups required first** - SaveGame won't work without proper setup
- **SimPlayer is not a Horizon component** - must be instantiated manually
- **Tool operations must use SimPlayer methods** - direct manipulation breaks state
- **Save regularly after player changes** - prevents progress loss
- **Proper cleanup on player exit** - prevents memory leaks

## See Also

- [In-World Economy Systems Overview](./in-world-economy-systems.md) - Persistent economies with World Inventory APIs
- [Player State Management](./typescript-development-overview.md) - Component-based scripting patterns
- [Save Data Systems](./objects-components-overview.md) - Variable Groups and persistence

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-0-setup (accessed 2025-09-26)
