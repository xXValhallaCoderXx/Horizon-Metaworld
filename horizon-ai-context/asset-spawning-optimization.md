---
title: "Asset Spawning Optimization Tips"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/optimization-tips"
last_updated: "2025-09-26T12:00:00Z"
tags: ["horizon_worlds", "asset_spawning", "object_pooling", "performance", "optimization"]
summary: "Performance optimization strategies for asset spawning including object limits, lifecycle management, and pooling patterns."
---

# Asset Spawning Optimization Tips

## What & Why

Asset spawning operations have runtime performance costs that can impact frame rates and user experience when not properly managed. These optimization strategies help minimize performance impact through proactive limits, efficient lifecycle management, and pooling patterns that reduce spawning overhead during active gameplay.

## Key APIs / Concepts

- **Object limits** - Enforced maximums to prevent performance degradation
- **Distance-based despawning** - Remove objects when players are sufficiently far away
- **Interaction timeouts** - Despawn objects after periods of non-interaction
- **Object pooling** - Pre-spawn hidden objects for reuse instead of create/destroy cycles
- **EntityPool** - Custom pool implementation for managing entity availability
- **Pool item states** - Track whether pooled objects are currently in use
- **Performance budgets** - Planned object allocations based on world limits

## How-To (Recipe)

1. **Implement object limits**:
   - Set maximum spawned object counts in code
   - Check limits before spawning new objects
   - Prevent uncontrolled spawning that breaks world performance

2. **Track object lifecycle**:
   - Monitor player distance from spawned objects
   - Implement interaction timeouts for unused objects  
   - Despawn objects when interaction is complete

3. **Set up object pooling**:
   - Pre-spawn objects during world initialization
   - Position pooled objects off-screen (Y - 10 units)
   - Request/return objects from pool instead of spawn/despawn

4. **Monitor pool efficiency**:
   - Track pool utilization and resize as needed
   - Balance pool size against memory usage
   - Implement fallback behavior when pool is exhausted

## Minimal Example

```typescript
import { Entity, Vec3 } from 'horizon/core';

// Basic pool item wrapper
class PoolItem<T> {
  item: T;
  inUse: boolean;

  constructor(item: T) {
    this.item = item;
    this.inUse = false;
  }

  requestItem(): T {
    this.inUse = true;
    return this.item;
  }

  returnItem(): void {
    this.inUse = false;
  }

  isInUse(): boolean {
    return this.inUse;
  }
}

// Entity pool manager
export class EntityPool {
  pool: Array<PoolItem<Entity>>;
  maxSize: number;

  constructor(maxSize: number = 30) {
    this.pool = new Array<PoolItem<Entity>>();
    this.maxSize = maxSize;
  }

  requestItem(): Entity | null {
    let itemIdx = this.pool.findIndex((poolItem) => {
      return !poolItem.isInUse();
    });
    
    return itemIdx !== -1 ? this.pool[itemIdx].requestItem() : null;
  }

  returnItem(item: Entity): void {
    let poolIdx = this.pool.findIndex((poolItem) => {
      return poolItem.item.id == item.id;
    });
    
    if (poolIdx !== -1) {
      this.pool[poolIdx].returnItem();
      // Hide object by moving it below world
      let itemPos = item.position.get().add(new Vec3(0, -10, 0));
      item.position.set(itemPos);
    }
  }
}
```

## Optimization Strategies

| Strategy | When to Use | Performance Impact | Implementation Complexity |
|----------|-------------|-------------------|--------------------------|
| Object Limits | Always | High | Low |
| Distance Despawning | Large worlds | Medium | Medium |
| Interaction Timeouts | Interactive objects | Medium | Low |
| Object Pooling | Frequently spawned items | High | High |

## Limits & Constraints

- **World object limits** - Total spawned objects affect world performance budgets
- **Pool memory usage** - Pre-spawned objects consume memory even when unused
- **Distance calculations** - Monitoring player distance has computational cost
- **Pool size balance** - Too small causes shortages, too large wastes memory

## Gotchas / Debugging

- **Enforce spawn limits** - Always check counts before spawning to prevent performance breakage
- **Pool initialization timing** - Pre-spawn objects during world start, not during gameplay
- **Hidden object placement** - Move pooled objects to Y-10 or other off-screen coordinates
- **Reference tracking** - Maintain arrays of active objects for lifecycle management
- **Pool exhaustion handling** - Implement fallbacks when pools run empty
- **Memory vs performance** - Balance pool sizes against total memory constraints

## See Also

- [Introduction to Asset Spawning](./asset-spawning-introduction.md) - Core spawning concepts and SpawnController API
- [Asset Spawning and Pooling Systems](./asset-spawning-pooling-systems.md) - Tutorial-based pooling implementations
- [Object Pool Pattern](https://en.wikipedia.org/wiki/Object_pool_pattern) - Computer science pooling concepts
- [World Streaming](./asset-spawning-world-streaming.md) - Dynamic loading systems

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/optimization-tips (accessed 2025-09-26)