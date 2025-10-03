---
title: "Introduction to Asset Spawning"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/introduction-to-asset-spawning"
last_updated: "2025-09-26T12:00:00Z"
tags: ["horizon_worlds", "asset_spawning", "spawn_controller", "typescript"]
summary: "Core concepts and APIs for spawning and despawning assets at runtime using SpawnController in TypeScript."
---

# Introduction to Asset Spawning

## What & Why

Asset spawning enables creators to instantiate and destroy objects at runtime through TypeScript scripts and CodeBlocks. This dynamic approach allows objects tied to Assets from the creator's Asset Library to be spawned for user interactions and in-world actions. Spawning reduces initial world load times and enables dynamic gameplay experiences that respond to player actions.

## Key APIs / Concepts

- **SpawnController** - Container object for managing asset spawning and despawning lifecycle
- **Asset Library** - Source repository for spawnable assets tied to creator account
- **Runtime Memory** - Intermediate state where assets are loaded before spawning
- **CodeBlockEvent** - Event system for triggering spawn/despawn actions
- `new SpawnController(asset, position, rotation, scale)` - Constructor for spawn management
- `load()` - Loads asset to runtime memory (0.5 ms/frame performance cost)
- `spawn()` - Instantiates loaded asset in world (5 ms/frame performance cost)  
- `unload()` - Removes spawned entity while preserving SpawnController reference
- `dispose()` - Destroys SpawnController object completely

## How-To (Recipe)

1. **Define SpawnController in component properties**:
   - Create SpawnController instance variable
   - Configure asset, position, rotation, and scale parameters

2. **Initialize in start() method**:
   - Instantiate SpawnController with required parameters
   - Set up CodeBlockEvent listeners for spawn/despawn triggers

3. **Implement spawning logic**:
   - Call `load()` during initialization for optimal performance
   - Use `spawn()` when asset needs to appear in world
   - Use `unload()` to remove asset while preserving reusability

4. **Handle VR integration**:
   - Create Trigger gizmo with CodeBlock scripts
   - Attach TypeScript component to invisible controller object
   - Configure asset reference through property panel drag-and-drop

## Minimal Example

```typescript
import { Component, PropTypes, CodeBlockEvent, SpawnController, Vec3 } from 'horizon/core';

const spawnTriggerEvent = new CodeBlockEvent<[]>('spawnEvent', []);
const despawnTriggerEvent = new CodeBlockEvent<[]>('despawnEvent', []);

class SimpleSpawn extends Component<typeof SimpleSpawn> {
  static propsDefinition = {
    wallAsset: { type: PropTypes.Asset },
  };

  spawnController!: SpawnController;

  start() {
    this.spawnController = new SpawnController(
      this.props.wallAsset!, 
      this.entity.position.get(), 
      this.entity.rotation.get(), 
      Vec3.one
    );

    this.connectCodeBlockEvent(this.entity, spawnTriggerEvent, () => {
      this.spawnController.spawn();
    });

    this.connectCodeBlockEvent(this.entity, despawnTriggerEvent, () => {
      this.spawnController.unload();
    });
  }
}

Component.register(SimpleSpawn);
```

## Limits & Constraints

- **Performance impact**: Spawning has runtime CPU cost, avoid during core gameplay
- **Asset permissions**: Spawned assets must be available to world owner account
- **Memory management**: Assets consume runtime memory when loaded
- **Frame timing**: load() = 0.5 ms/frame, spawn() = 5 ms/frame processing time
- **Quick succession spawning**: Particularly expensive when objects spawn rapidly

## Gotchas / Debugging

- **Separate load() and spawn()** - Pre-loading with load() dramatically improves spawn() performance
- **Asset availability** - Verify all spawnable assets are accessible to world owner before deployment
- **CodeBlock integration** - Ensure proper event wiring between Trigger gizmos and TypeScript components
- **Asset reference setup** - Use drag-and-drop from Asset Library property panel to avoid reference errors
- **Invisible controllers** - Consider making script-bearing objects invisible for cleaner presentation

## See Also

- [Checking for Asset Spawn Events](./asset-spawning-events.md) - Event monitoring and handling
- [Optimization Tips](./asset-spawning-optimization.md) - Performance improvement strategies  
- [World Streaming](./asset-spawning-world-streaming.md) - Dynamic loading systems
- [Scripting Considerations](./asset-spawning-scripting.md) - Architectural guidance
- [Asset Spawning and Pooling Systems](./asset-spawning-pooling-systems.md) - Tutorial-based implementation patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/introduction-to-asset-spawning (accessed 2025-09-26)