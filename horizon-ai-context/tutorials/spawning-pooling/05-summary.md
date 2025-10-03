---
title: "Module 5 - Summary"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-5-summary"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial_summary",
    "performance_comparison",
    "spawning_methods",
    "best_practices",
  ]
summary: "Tutorial completion summary comparing all three spawning approaches with recommendations and extension ideas for production implementations."
tutorial: "spawning-pooling"
---

# Module 5 - Summary

## What & Why

This tutorial covered the primary spawning options available in Meta Horizon Worlds, including proper usage, trade-offs, and considerations for each approach. Understanding these methods enables developers to choose the optimal asset management strategy based on their specific world requirements and performance constraints.

## Method Comparison Summary

### 1. Simple Object Spawning

**Best for**: Small numbers of simple assets, infrequent spawning needs

- ✅ **Easy to implement** - Straightforward `world.spawnAsset()` and `world.deleteAsset()` calls
- ❌ **Slow performance** - Loading from Asset Library at runtime causes visible delays
- ❌ **Resource intensive** - High CPU cost during gameplay periods
- **Use case**: Small sets of assets in less dynamic environments

### 2. Object Pooling

**Best for**: Frequent spawning/despawning with moderate complexity management

- ✅ **Faster than simple spawning** - Pre-loaded assets appear/disappear quickly
- ✅ **Reduced CPU load** - Position/visibility updates vs create/destroy operations
- ❌ **State management complexity** - Must manage entity behaviors, sounds, animations
- ❌ **Memory overhead** - All pooled entities exist in world throughout session
- **Use case**: Games requiring regular asset appearance/disappearance cycles

### 3. SpawnController (Recommended)

**Best for**: Optimal performance with clean memory management

- ✅ **Fastest performance** - Assets loaded in runtime memory, not world entities
- ✅ **Cleanest implementation** - No off-screen entity management required
- ✅ **Built-in debugging** - Enumerated states and error codes
- ✅ **Memory efficient** - Container objects vs world entities
- **Use case**: Production worlds requiring optimal asset spawning performance

## Performance Characteristics

| Method          | Spawn Speed | Memory Usage | Complexity | Runtime Impact              |
| --------------- | ----------- | ------------ | ---------- | --------------------------- |
| Object Spawning | Slowest     | Low          | Simple     | High CPU during spawn       |
| Object Pooling  | Fast        | High         | Medium     | Low CPU, complex state mgmt |
| SpawnController | Fastest     | Medium       | Medium     | Lowest overall impact       |

## Key Learning Outcomes

**Technical concepts mastered**:

- Runtime asset instantiation vs pre-loading strategies
- Memory vs world entity storage trade-offs
- Event-driven spawning architectures
- Performance optimization through proper asset lifecycle management
- TypeScript v2.0.0 `preStart()` method utilization
- Pool management patterns with reusable utility classes

**Best practices established**:

- Always validate script properties in `preStart()`
- Use `load()` before `spawn()` for SpawnController optimal performance
- Implement proper error handling with then/catch promises
- Maintain dual tracking arrays for pool management
- Consider asset ownership and permission requirements

## Extension Ideas

### Single Array Optimization

Convert separate `objList[]` and `objectPool[]` arrays into single multi-dimensional array:

```typescript
interface PooledAsset {
  entity: hz.Entity;
  inUse: boolean;
  // Additional metadata
}

pooledAssets: PooledAsset[] = [];
```

### Multiple Asset Types

Expand beyond single asset management:

- **Properties panel** - Multiple asset property slots (current approach)
- **Hard-coded asset IDs** - BigInt asset.id references for known assets
- **JSON configuration** - External data source with loadOnStart, maxEntities, maxHitPoints

### Advanced Pool Features

- Dynamic pool sizing based on demand
- Asset priority systems for limited resources
- Automatic pool cleanup and memory management
- Performance metrics and analytics integration

## Production Considerations

**Asset permissions**: Ensure spawned assets are available to world owner
**Memory budgets**: Monitor total memory usage across all spawning systems
**Error handling**: Implement comprehensive error checking and user feedback
**Performance profiling**: Test with target player counts and usage patterns
**Scalability**: Plan for peak concurrent asset usage scenarios

## Recommended Approach

**For new projects**: Start with **SpawnController** for optimal performance and maintainability
**For existing projects**: Evaluate migration costs vs performance benefits
**For simple prototypes**: Object spawning may be sufficient for initial development

The SpawnController method represents the current best practice for asset spawning in Horizon Worlds, offering the optimal balance of performance, memory efficiency, and implementation complexity.

## See Also

- [Module 1 - Setup](./01-setup.md) - Tutorial prerequisites and world overview
- [Module 2 - Object Spawning](./02-implement-object-spawning.md) - Basic runtime spawning
- [Module 3 - Object Pooling](./03-implement-object-pooling.md) - Pre-loaded off-screen pools
- [Module 4 - Spawn Controller](./04-spawn-controller.md) - TypeScript v2.0.0 recommended approach
- [Introduction to Asset Spawning](/horizon-worlds/learn/documentation/typescript/asset-spawning/introduction-to-asset-spawning/) - General spawning documentation

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-5-summary (accessed 2025-09-26)
