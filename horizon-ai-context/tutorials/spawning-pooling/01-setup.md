---
title: "Module 1 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-1-setup"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "spawning", "pooling", "typescript", "asset_management"]
summary: "Introduction to spawning and pooling techniques in Horizon Worlds, covering setup and three different approaches: object spawning, object pooling, and SpawnController."
tutorial: "spawning-pooling"
---

# Module 1 - Setup

## What & Why

This tutorial covers different techniques for spawning and pooling objects in Meta Horizon Worlds. **Spawning** refers to adding assets to the world experience at runtime, while **object pooling** allows pre-loading instances of assets and deploying them as needed. These techniques optimize resource management and performance for complex worlds.

## Key APIs / Concepts

- **Object Spawning** - Spawn/despawn asset instances as needed (high performance cost)
- **Object Pooling** - Pre-instantiate assets in off-screen pool, move in/out of play area
- **SpawnController** - TypeScript v2.0.0 container object for managing spawned assets in runtime memory
- **Asset Pool gizmo** - Automatically spawns/despawns assets per player
- `spawn()` - Makes SpawnController entities part of world experience
- `unload()` - Removes SpawnController entities from world while retaining in memory
- Motion property - Must be set to non-None value for pooled assets to avoid "Unable to move static entity" error

## How-To (Recipe)

1. **Access the tutorial world**:

   - In desktop editor: Create new world based on "Spawning and Pooling in TypeScript" tutorial world
   - In headset: Go to Create menu > Tutorials tab > Start "Spawning and Pooling in TypeScript"

2. **Choose appropriate spawning method**:

   - Station 1 (Object Spawning) - For infrequent spawning of simple assets
   - Station 2 (Object Pooling) - For frequent spawning/despawning with pre-loaded pool
   - Station 3 (SpawnController) - Recommended method for optimal performance

3. **Configure assets for spawning**:

   - Ensure spawned assets are available to world owner
   - Set Motion property to non-None value for pooled assets
   - Use Shared Folders for multi-person teams

4. **Manage logging** (optional):
   - Set logging variables to FALSE to disable console output:
     - SimpleSpawn.ts: `DISPLAY_CONSOLE_SIMPLESPAWN`
     - ObjectPooling.ts: `DISPLAY_CONSOLE_OBJECTPOOLING`
     - SpawnControllerManager.ts: `DISPLAY_CONSOLE_SPAWNCONTROLLER`

## Minimal Example

```typescript
// SpawnController approach (recommended)
class SpawnControllerManager extends hz.Component<
  typeof SpawnControllerManager
> {
  static propsDefinition = {
    numberOfInstances: {
      type: hz.PropTypes.Number,
      default: 100,
    },
  };

  spawnControllers: hz.SpawnController[] = [];

  start() {
    // Pre-load assets into SpawnController array
    for (let i = 0; i < this.props.numberOfInstances; i++) {
      const controller = new hz.SpawnController(this.world, assetId);
      this.spawnControllers.push(controller);
    }
  }

  spawnAsset(): hz.Entity | null {
    const controller = this.spawnControllers.find(
      (c) => c.currentState === hz.SpawnControllerState.Loaded
    );
    if (controller) {
      return controller.spawn();
    }
    return null;
  }
}
```

## World Overview

The tutorial world contains **three stations** demonstrating different approaches:

1. **Station 1 - Object Spawning**: Direct spawn/despawn with loading costs
2. **Station 2 - Object Pooling**: Pre-loaded off-screen pool with state management
3. **Station 3 - SpawnController**: Memory-based container objects (recommended)

Each station spawns 100 instances of the same asset to demonstrate performance differences.

## Limits & Constraints

- **Performance cost**: Spawning/despawning has runtime performance impact, especially for successive operations
- **Asset permissions**: Spawned assets must be available to world owner
- **Memory usage**: All approaches consume memory; choose based on usage patterns
- **State management**: Object pooling requires managing entity behaviors when in/out of pool
- **Motion property**: Pooled assets must have Motion set to non-None to avoid movement errors

## Considerations

**Before implementing spawning/pooling, consider**:

- How often are objects created/removed during gameplay?
- How many object variations does the world require?
- Do some objects need to exist for the entire experience?
- Are spawning operations happening during core gameplay periods?

**SpawnController advantages**:

- Fastest spawn/unload operations after initial loading
- Enumerated return values for `CurrentState` and `SpawnError` for debugging
- No physical world representation until spawned
- Recommended method for managing spawned assets

## Gotchas / Debugging

- **"Unable to move static entity"** - Set Motion property to Animated or other non-None value for pooled assets
- **Asset availability** - Ensure spawned assets are accessible to world owner account
- **Performance impact** - Avoid spawning during core gameplay periods
- **Script execution** - Attached scripts with `start()` methods execute immediately when entities become active
- **State synchronization** - Object pooling requires careful management of entity states (behaviors, sounds, animations)

## See Also

- [Introduction to Asset Spawning](/horizon-worlds/learn/documentation/typescript/asset-spawning/introduction-to-asset-spawning/) - General asset spawning information
- [Asset Pool gizmo](/horizon-worlds/learn/documentation/code-blocks-and-gizmos/asset-pool-gizmo) - Automated per-player asset spawning
- [Shared Folders](/horizon-worlds/learn/documentation/desktop-editor/assets/shared-folders/) - Managing team assets
- [Getting Started with Tutorials](/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites) - Tutorial prerequisites

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-1-setup (accessed 2025-09-26)
