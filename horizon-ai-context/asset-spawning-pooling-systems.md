---
title: "Asset Spawning and Pooling Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-1-setup"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-4-spawn-controller"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "asset_spawning",
    "object_pooling",
    "spawn_controller",
    "performance",
  ]
summary: "Overview of asset spawning and pooling techniques in Horizon Worlds for optimal runtime resource management and performance."
---

# Asset Spawning and Pooling Systems

## What & Why

Asset spawning enables creators to introduce objects into worlds at runtime rather than pre-placing all needed entities. This approach reduces initial world load times, optimizes memory usage, and enables dynamic gameplay experiences. Three primary approaches exist: direct spawning, object pooling, and SpawnController containers, each with distinct performance characteristics.

## Key APIs / Concepts

- **Object Spawning** - Runtime asset instantiation with `world.spawnAsset()` and `world.deleteAsset()`
- **Object Pooling** - Pre-instantiated assets moved between off-screen pool and gameplay areas
- **SpawnController** - TypeScript v2.0.0 container objects for memory-based asset management
- **Asset Pool Gizmo** - Automated per-player asset spawning for HUD and similar use cases
- `preStart()` - TypeScript v2.0.0 method for pre-gameplay initialization
- Pool management utilities - Reusable classes for availability tracking and entity lifecycle

## How-To (Recipe)

1. **Choose spawning method based on requirements**:

   - Simple spawning: Few assets, infrequent use
   - Object pooling: Frequent spawn/despawn with moderate complexity
   - SpawnController: Production worlds requiring optimal performance

2. **Configure asset permissions**:

   - Ensure spawned assets are available to world owner
   - Use Shared Folders for multi-person team development

3. **Implement appropriate lifecycle**:

   - Simple: Spawn on demand, delete when finished
   - Pooling: Pre-spawn to hidden area, move to/from gameplay area
   - SpawnController: Load to memory, spawn/unload as needed

4. **Handle errors and state**:
   - Implement proper error checking and user feedback
   - Track entity references for cleanup and resource management

## Performance Comparison

| Method          | Spawn Speed | Memory Usage | Implementation Complexity |
| --------------- | ----------- | ------------ | ------------------------- |
| Simple Spawning | Slowest     | Low          | Simple                    |
| Object Pooling  | Fast        | High         | Medium                    |
| SpawnController | Fastest     | Medium       | Medium                    |

**SpawnController (Recommended)**: Optimal balance of performance, memory efficiency, and maintainability for production worlds.

## Limits & Constraints

- **Asset permissions**: Spawned assets must be available to world owner account
- **Memory budgets**: All approaches consume runtime memory; monitor total usage
- **Performance impact**: Spawning has CPU cost; avoid during core gameplay periods
- **Entity limits**: Consider world entity quotas when planning spawning systems
- **Motion property**: Pooled assets must have Motion set to non-None to enable repositioning

## From Tutorials

The complete **Spawning and Pooling in TypeScript** tutorial series provides hands-on implementation of all three approaches:

- [Module 1 - Setup](./tutorials/spawning-pooling/01-setup.md) - Tutorial prerequisites and approach overview
- [Module 2 - Object Spawning](./tutorials/spawning-pooling/02-implement-object-spawning.md) - Direct runtime asset creation
- [Module 3 - Object Pooling](./tutorials/spawning-pooling/03-implement-object-pooling.md) - Pre-instantiated asset pools
- [Module 4 - Spawn Controller](./tutorials/spawning-pooling/04-spawn-controller.md) - Memory-based container approach
- [Module 5 - Summary](./tutorials/spawning-pooling/05-summary.md) - Method comparison and recommendations

## Gotchas / Debugging

- **Asset availability** - Verify spawned assets are accessible to world owner before runtime
- **Memory management** - Track spawned entities with arrays/maps for proper cleanup
- **State synchronization** - Object pooling requires managing entity behaviors when moving between pool and gameplay
- **Performance timing** - Pre-load assets during world initialization, not during active gameplay
- **Error handling** - Use enumerated error codes and states for debugging SpawnController issues

## See Also

- [Introduction to Asset Spawning](./asset-spawning-introduction.md) - Core concepts and SpawnController API
- [Asset Spawning Events](./asset-spawning-events.md) - Event monitoring and handling
- [Asset Spawning Optimization](./asset-spawning-optimization.md) - Performance strategies and pooling patterns
- [World Streaming](./asset-spawning-world-streaming.md) - Large world management through sublevels
- [Asset Spawning Scripting](./asset-spawning-scripting.md) - Architectural guidance and naming considerations
- [Asset Pool gizmo](/horizon-worlds/learn/documentation/code-blocks-and-gizmos/asset-pool-gizmo) - Automated per-player spawning
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Performance optimization with ownership patterns
- [TypeScript Development Overview](./typescript-development-overview.md) - Component-based scripting framework

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/ (accessed 2025-09-26)
