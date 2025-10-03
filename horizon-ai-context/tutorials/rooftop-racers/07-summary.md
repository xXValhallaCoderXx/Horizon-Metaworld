---
title: "Module 7 - Summary"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-7-summary"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "asset_templates", "code_reuse", "world_expansion"]
tutorial: "rooftop-racers"
summary: "Tutorial conclusion covering how to reuse Rooftop Racers components including asset templates, utility imports, system exports, and world expansion ideas."
---

# Module 7 - Summary

## What & Why

This module provides guidance on **leveraging Rooftop Racers components** for your own world development. Covers practical approaches for extracting and reusing entities, scripts, and systems from the sample world, along with suggestions for extending the game with additional features.

## Key APIs / Concepts

- **Asset Templates**: Entity-to-library workflow for reusable game objects
- **Script Portability**: Separating TypeScript files from entity templates
- **System Export**: Complete gameplay system extraction process
- **Entity Management**: Desktop editor workflows for asset creation
- **Code Integration**: Events.ts management and system connections

### Reusable Components
- **GameUtils.ts & MathUtils.ts**: Most portable utility files
- **System pairs**: Manager + Local script patterns
- **Entity hierarchies**: Complete functional units with scripts attached

## How-To (Recipe)

### Create Asset Templates
1. **Locate target entity** in desktop editor hierarchy
2. **Right-click topmost node** of entity group
3. **Select "Create asset"** from context menu
4. **Store in asset folder** for organization
5. **Deploy to new worlds** from asset library
6. **Note**: Scripts not included in asset templates

### Import Utilities
1. **Copy GameUtils.ts and MathUtils.ts** to new project
2. **Import needed functions** in your scripts
3. **Adapt constants and enums** to your game requirements
4. **Reuse object pooling patterns** from GameUtils

### Export Game Systems
1. **Load Rooftop Racers** in desktop editor
2. **Identify system components**:
   - Manager script (global)
   - Local script (per-entity)
   - Associated entities
3. **Create asset template** for entities if desired
4. **Copy TypeScript files**:
   - Manager and local scripts
   - Events.ts (required)
   - Helper utilities as needed
5. **Clean Events.ts** - remove unused events
6. **Connect scripts to entities** in your world
7. **Integrate with existing systems**

## Minimal Example

```typescript
// Example system export checklist
// 1. HUD System Export
entities: [
  "HUD Manager entity",
  "Individual HUD entities (pool)"
]

scripts: [
  "HUDManager.ts",      // Global manager
  "HUDLocal.ts",        // Per-HUD script
  "Events.ts",          // Event definitions
  "GameUtils.ts"        // Object pooling utilities
]

steps: [
  "Create asset template for HUD entities",
  "Copy script files to new project", 
  "Import Events.ts in scripts that use events",
  "Remove unused events from Events.ts",
  "Attach scripts to appropriate entities",
  "Configure HUD pool size for player capacity"
]
```

## Limits & Constraints

- **Asset templates exclude scripts**: TypeScript files must be copied separately
- **Event dependencies**: Events.ts required for any system using events
- **Entity references**: Scripts may reference specific entity names/properties
- **System integration**: May require adaptation for different game mechanics
- **Desktop editor access**: Asset creation requires desktop editor, not web/mobile

## Gotchas / Debugging

- **Script separation**: Asset templates don't include attached scripts
- **Event cleanup**: Remove unused events from Events.ts to avoid conflicts
- **Entity naming**: Script references to entity names may need updates
- **System dependencies**: Some systems reference each other (e.g., HUD uses player movement events)
- **Property configuration**: Entity properties may need reconfiguration for new context
- **Manager/Local pairs**: Both scripts typically needed for complete system functionality

## Expansion Ideas & Exercises

### Suggested Enhancements
- **Add ring checkpoints**: Insert additional boost rings along course
- **Create shortcuts**: Design alternate paths with risk/reward mechanics
- **Player interactions**: Implement boost stealing or collision mechanics
- **Double-boost system**: Stack boost effects for temporary super-speed

### Learning Exercises
1. **Checkpoint system**: How would you add another ring checkpoint?
2. **Shortcut analysis**: Where could shortcuts be added to the world map?
3. **Player collision**: Could players steal boost from others on contact?
4. **Boost stacking**: Design a double-boost jump mechanic

## See Also

- [Module 1 - Setup](./01-setup.md) - Initial world setup and prerequisites
- [Module 2 - Overall Game Manager Systems](./02-game-manager-systems.md) - Core system architecture
- [Module 6 - Helper and Base Classes](./06-helper-base-classes.md) - Reusable utility components

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-7-summary (accessed 2025-09-26)