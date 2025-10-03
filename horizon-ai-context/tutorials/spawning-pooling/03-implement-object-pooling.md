---
title: "Module 3 - Implement Object Pooling"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-3-implement-object-pooling"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "object_pooling", "prestart", "typescript", "pool_utils"]
summary: "Advanced spawning technique using pre-instantiated object pools for improved performance, featuring reusable PoolUtils class and off-screen asset management."
tutorial: "spawning-pooling"
---

# Module 3 - Implement Object Pooling

## What & Why

Object pooling is a design pattern where objects needed during gameplay are pre-instantiated before gameplay begins. Instead of creating/destroying assets at runtime, pooling moves existing assets between an off-screen pool and the gameplay area. This reduces CPU load during gameplay and improves overall performance, especially for frequently spawned assets.

## Key APIs / Concepts

- `preStart()` - TypeScript v2.0.0 method that executes before all `start()` methods for initialization
- **Pool&lt;T&gt; class** - Reusable utility class for managing pooled entities with availability tracking
- **HIDDEN_POSITION** - Off-screen coordinate (e.g., -100, -100, 100) for pool storage
- `obj.visible.set(false/true)` - Control asset visibility without destroying
- `obj.position.set()` - Move assets between pool and gameplay areas
- `objectPool.getNextAvailable()` - Retrieve next available entity from pool
- `objectPool.resetAvailability()` - Mark all pooled entities as available for reuse
- Two tracking arrays: `objList[]` (active entities) and `objectPool[]` (available entities)

## How-To (Recipe)

1. **Set up PoolUtils** - Create reusable `PoolUtils.ts` with Pool class containing availability management methods

2. **Create ObjectPooling script**:

   - Use `preStart()` to pre-populate pool with `prePopulateObjectPool()`
   - Set up LocalEvents for spawn/despawn triggers
   - Implement pool-to-gameplay area movement logic
   - Implement gameplay-to-pool recycling logic

3. **Create trigger script** - Similar to SimpleSpawn but targeting pool events (`objPoolSpawnTriggerEvent`, `objPoolDespawnTriggerEvent`)

4. **Configure world objects**:

   - Attach scripts to Empty Objects
   - Set up trigger zones with proper target references
   - Configure asset properties for pooling

5. **Test with World Sim toggle** - Use desktop editor's World Sim On/Off to control pool initialization timing

## Minimal Example

```typescript
// PoolUtils.ts - Reusable pool management
export class Pool<T> {
  private available: T[] = [];
  private active: T[] = [];
  public all: T[] = [];

  hasAvailable(): boolean {
    return this.available.length > 0;
  }

  getNextAvailable(): T | null {
    if (this.available.length === 0) return null;
    const item = this.available.pop()!;
    this.active.push(item);
    return item;
  }

  addToPool(item: T): void {
    this.all.push(item);
    this.available.push(item);
  }

  resetAvailability(): void {
    this.active.forEach((item) => this.available.push(item));
    this.active = [];
  }
}

// ObjectPooling.ts - Main pooling logic
import { Pool } from "PoolUtils";

const OBJECT_POOL_SIZE = 100;
const HIDDEN_POSITION = new hz.Vec3(-100, -100, 100);

class ObjectPooling extends hz.Component<typeof ObjectPooling> {
  private objectPool: Pool<hz.Entity> = new Pool<hz.Entity>();
  private objList: hz.Entity[] = [];

  preStart() {
    // Pre-populate pool before gameplay
    if (this.props.assetToSpawn) {
      this.prePopulateObjectPool(this.props.assetToSpawn, OBJECT_POOL_SIZE);
    }

    // Spawn from pool (faster than runtime creation)
    this.connectLocalEvent(this.entity, objPoolSpawnTriggerEvent, (data) => {
      for (let i = 0; i < OBJECT_POOL_SIZE; i++) {
        const obj = this.objectPool.getNextAvailable();
        if (obj == null) return;

        obj.position.set(this.getRandomSpawnPosition(data.position));
        obj.visible.set(true);
        this.objList.push(obj);
      }
    });

    // Return to pool (no destruction)
    this.connectLocalEvent(this.entity, objPoolDespawnTriggerEvent, () => {
      this.objList.forEach((obj) => {
        obj.position.set(HIDDEN_POSITION);
        obj.visible.set(false);
      });
      this.objList.splice(0, this.objList.length);
      this.objectPool.resetAvailability();
    });
  }

  private prePopulateObjectPool(asset: hz.Asset, numOfObjects: number): void {
    for (let i = 0; i < numOfObjects; i++) {
      this.world
        .spawnAsset(asset, HIDDEN_POSITION, ASSET_ROTATION)
        .then((spawnedObjects) => {
          spawnedObjects.forEach((obj) => {
            this.objectPool.addToPool(obj);
            obj.visible.set(false);
          });
        });
    }
  }
}
```

## PoolUtils API Reference

| Function               | Description                                 |
| ---------------------- | ------------------------------------------- |
| `hasAvailable()`       | Returns true if pool has available entities |
| `hasActive()`          | Returns true if pool has active entities    |
| `getNextAvailable()`   | Returns next available entity from pool     |
| `getRandomAvailable()` | Returns random available entity from pool   |
| `getRandomActive()`    | Returns random active entity from pool      |
| `addToPool()`          | Adds specified entity to pool               |
| `removeFromPool()`     | Removes specified entity from pool          |
| `resetAvailability()`  | Resets availability of all pooled assets    |

## Performance Benefits

**Compared to object spawning**:

- **Faster appearance** - No loading from Asset Library during gameplay
- **Reduced CPU load** - Position/visibility updates vs create/destroy operations
- **Less lag** - Pre-loading occurs during world initialization when interruptions are less impactful
- **Smoother gameplay** - Assets appear instantly since they already exist in world

**Trade-offs**:

- **Initial loading time** - All assets must be created during `preStart()`
- **Memory usage** - All pool entities occupy memory throughout session
- **State management complexity** - Must disable/enable behaviors, sounds, animations when moving between pool and gameplay

## Limits & Constraints

- **World startup time** - Pool pre-population adds to initial load
- **Memory footprint** - All pooled assets remain in memory
- **State synchronization** - Must manage entity behaviors (animations, sounds, scripts) when pooling
- **Pool sizing** - Fixed pool size requires careful planning for peak usage
- **Hidden position management** - Off-screen entities still exist in world space

## Gotchas / Debugging

- **preStart() timing** - Pool must be populated before any `start()` method tries to use it
- **Visibility state** - Entities default to visible; must explicitly set `obj.visible.set(false)` when pooling
- **Position persistence** - Hidden position prevents interference with gameplay area
- **State cleanup** - Entity scripts continue running even when pooled; may need state management
- **World Sim toggle** - Desktop editor requires World Sim Off→On cycle to trigger `preStart()` initialization
- **Array management** - Maintain both `objList[]` and `objectPool[]` arrays correctly to prevent entity loss

## See Also

- [Module 2 - Object Spawning](./02-implement-object-spawning.md) - Previous approach for comparison
- [Module 4 - Spawn Controller](./04-spawn-controller.md) - TypeScript v2.0.0 recommended approach
- [PoolUtils.ts source] - Reusable pool management class (from tutorial files)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-3-implement-object-pooling (accessed 2025-09-26)
