---
title: "Module 0 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-0-setup"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "sim_tycoon", "setup", "template_world"]
summary: "Initial setup and configuration for the Sim Tycoon Template World, including variable group creation and reference world overview."
tutorial: "sim-tycoon"
---

# Module 0 - Setup

## What & Why

The Sim Tycoon Template World provides foundational systems and components for creating mobile-only multiplayer tycoon games. This module covers initial setup requirements and introduces the core gameplay concepts of gather-exchange-upgrade loops that drive player progression.

## Key Concepts

- **Template World Access**: Available via Horizon Desktop Editor Tutorials section
- **Variable Groups**: Required for persistent player data (`SaveGame` player variable)
- **Core Game Loop**: Tools → Resources → Currency → Upgrades → Repeat
- **Game Components**: Tools, collectible resources, conversion systems
- **Player Limit**: Maximum 8 players (configurable)

## How-To Setup

1. **Access Template World**

   - Open Horizon Desktop Editor → Creation Home page
   - Select **Tutorials** from left navigation
   - Find **Sim Tycoon Template** and click to open

2. **Create Variable Groups** (Required)

   - Navigate to **Systems** > **VariableGroups**
   - Create a new variable group
   - Add player variable named `SaveGame`

3. **Configure Save System**
   - Open `SaveGame.ts` file in code editor
   - Find `pvarsBaseName` variable
   - Update value to match your VariableGroup name (keep `:` colon)
   - If variable isn't named `SaveGame`, update `saveGameKey` accordingly

## Reference World Overview

**Game Genre**: Tycoon Simulator, Progression Simulator, Incremental Tycoon
**Popular Examples**: Samurai Tycoon, Saber, Plants

**Core Characteristics**:

- Players use tools to gather resources
- Exchange/convert resources for currency
- Purchase tool upgrades to gather faster
- Repeatable progression cycle

**Gameplay Flow**:

1. **FTUE Zone**: New players buy green pickaxe to activate teleporter
2. **Main Zone**: Mine resource nodes with pickaxe, collect gems
3. **Conversion**: Step on converter trigger to turn gems into currency
4. **Shopping**: Buy pickaxes, backpacks, upgrades from shops
5. **Progression**: Cross bridge to new platforms with different resources

## Customization Options

### Editing Properties

- Gameplay systems include designer-configurable properties
- Tune interactions via properties panel
- Examples: tool stats, resource node values

### Code Modifications

- Data sections implemented for easy modification
- Requires basic TypeScript knowledge
- Focus on data values rather than core logic

### Art Replacement

- Most artwork completely replaceable
- Gameplay-related art requires script attachment
- Examples: tool models, resource node visuals

## Tutorial Module Structure

**Core Systems (1-3)**: SimPlayer, Resource Nodes, Tools/ToolGroups
**Player Equipment (4-5)**: Pickaxe, Backpack  
**Economy (6-7)**: Resource Converter, Store System
**Management (8-9)**: World Management, SaveGame System
**Interface (10-11)**: HUD, FTUE System
**Advanced (12-17)**: Global nodes, teleporters, VFX, audio, achievements, customization

## Gotchas / Debugging

- Variable group **must** be created before testing save functionality
- `pvarsBaseName` requires exact match to VariableGroup name
- Colon (`:`) is mandatory at end of `pvarsBaseName` line
- Template world limited to 8 players by default
- Basic TypeScript knowledge recommended for code changes

## See Also

- [In-World Economy Systems Overview](../in-world-economy-systems.md) - Persistent economies and shop systems
- [TypeScript Development Overview](../typescript-development-overview.md) - Component scripting framework

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-0-setup (accessed 2025-09-26)
