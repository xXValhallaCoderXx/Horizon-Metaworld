---
title: "Module 4 - Spawn Controller"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-4-spawn-controller"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "spawn_controller",
    "typescript_v2",
    "memory_management",
    "asset_loading",
  ]
summary: "TypeScript v2.0.0 recommended approach using SpawnController containers for optimal asset management with runtime memory storage and fast spawn/unload operations."
tutorial: "spawning-pooling"
---

# Module 4 - Spawn Controller

## What & Why

SpawnController is the recommended TypeScript v2.0.0 approach for asset spawning and pooling. Unlike object pooling that places assets off-screen, SpawnController loads assets into runtime memory without world presence until spawned. This provides the fastest performance for spawn/unload operations while avoiding state management complexity of traditional pooling.

## Key APIs / Concepts

- **SpawnController container** - Memory-based asset container object (no world presence until spawned)
- `load()` - Loads asset into SpawnController runtime memory
- `spawn()` - Makes SpawnController asset available in world (can call without load(), but slower)
- `unload()` - Removes asset from world, retains in runtime memory for reuse
- `dispose()` - Completely destroys SpawnController object
- `pause()` - Interrupts spawning process with Promise return
- **Enumerated states**: `currentState`, `spawnError` for debugging
- **Script properties**: `spawnCount` (max 500), `assetToSpawn`

## How-To (Recipe)

1. **Create SpawnController array** - Initialize Pool&lt;hz.SpawnController&gt; for container management
2. **Load in preStart()** - Create SpawnController instances and call `load()` for memory pre-population
3. **Spawn on trigger** - Use `spawn()` method to make loaded assets appear in world instantly
4. **Unload on exit** - Use `unload()` method to remove from world while keeping in memory
5. **Track with dual arrays** - Maintain both `spawnControllerPool[]` and `spawnControllerList[]`
6. **Handle errors** - Use then/catch promises with enumerated error checking

## Minimal Example

```typescript
class SpawnControllerManager extends hz.Component<
  typeof SpawnControllerManager
> {
  static propsDefinition = {
    spawnCount: { type: hz.PropTypes.Number, default: 1, max: 500 },
    assetToSpawn: { type: hz.PropTypes.Asset },
  };

  spawnControllerPool: Pool<hz.SpawnController> =
    new Pool<hz.SpawnController>();
  spawnControllerList: hz.SpawnController[] = [];

  preStart() {
    // Data validation
    if (
      !this.props.assetToSpawn ||
      this.props.spawnCount < 1 ||
      this.props.spawnCount > 500
    ) {
      console.error("Invalid properties");
      return;
    }

    // Initialize SpawnController pool
    for (let i = 0; i < this.props.spawnCount; i++) {
      const sc = new hz.SpawnController(
        this.props.assetToSpawn,
        this.getRandomSpawnPosition(this.entity.position.get()),
        ASSET_ROTATION,
        this.entity.scale.get()
      );

      this.spawnControllerPool.addToPool(sc);

      // Pre-load into memory (recommended)
      sc.load()
        .then(() => {
          console.log(`Loaded SpawnController #${i}`);
        })
        .catch(() => {
          console.error(`Error loading SpawnController #${i}`);
        });
    }

    // Spawn trigger
    this.connectLocalEvent(this.entity, spawnEvent, (data) => {
      for (let i = 0; i < this.props.spawnCount; i++) {
        const obj = this.spawnControllerPool.getNextAvailable();
        if (!obj) return;

        obj
          .spawn()
          .then(() => {
            console.log(
              `Spawned with state: ${hz.SpawnState[obj.currentState.get()]}`
            );
          })
          .catch(() => {
            console.error(
              `Spawn error: ${hz.SpawnError[obj.spawnError.get()]}`
            );
          });

        this.spawnControllerList.push(obj);
      }
    });

    // Unload trigger
    this.connectLocalEvent(this.entity, unloadEvent, () => {
      this.spawnControllerList.forEach((obj) => {
        obj.unload(); // Remove from world, keep in memory
        this.spawnControllerPool.addToPool(obj);
      });
      this.spawnControllerPool.resetAvailability();
      this.spawnControllerList = [];
    });
  }

  dispose() {
    // Cleanup all SpawnController objects
    this.spawnControllerList.forEach((obj) => {
      this.spawnControllerPool.removeFromPool(obj);
      obj.dispose(); // Destroy completely
    });
  }
}
```

## SpawnController Methods

| Method       | Description                                            |
| ------------ | ------------------------------------------------------ |
| `initialize` | Create array of SpawnController container objects      |
| `load()`     | Load specified asset into SpawnController memory       |
| `spawn()`    | Make SpawnController object available in world         |
| `unload()`   | Remove from world and runtime memory, retain reference |
| `dispose()`  | Destroy SpawnController object completely              |
| `pause()`    | Interrupt spawning process (returns Promise)           |

## Performance Characteristics

**Best performance of all approaches**:

- **Fastest spawn times** - Assets already loaded in runtime memory
- **Instant unload** - Quick removal without destruction
- **No state management** - Assets don't exist in world until spawned
- **Memory efficient** - Only loaded assets consume memory, not world entities
- **Debugging support** - Enumerated states and error codes

**Key advantages over Object Pooling**:

- No off-screen entity management required
- No visibility/position state synchronization
- No script execution management for pooled objects
- Cleaner memory model with containers vs world entities

## Enumerated States & Error Handling

**CurrentState enum** (index-based):

- `0` = Normal/loaded state
- Use `hz.SpawnState[obj.currentState.get()]` for text values

**SpawnError enum**:

- `hz.SpawnError.None` - No error
- `hz.SpawnError.ExceedsCapacity` - Resource limit reached
- `hz.SpawnError.Cancelled` - Operation cancelled
- `hz.SpawnError.InvalidAsset` - Asset not valid
- `hz.SpawnError.UnauthorizedContent` - Permission issue
- `hz.SpawnError.InvalidParams` - Bad parameters
- `hz.SpawnError.Unknown` - Unspecified error

## Limits & Constraints

- **Asset count maximum**: 500 instances per script (configurable safeguard)
- **Memory usage**: All loaded SpawnControllers consume runtime memory
- **Load timing**: Best to `load()` in `preStart()` before gameplay
- **Property validation**: Must validate `spawnCount` and `assetToSpawn` properties
- **Single asset type**: Script manages one asset type (can be modified for multiple)
- **Batch operations**: Example spawns/unloads all instances at once

## Gotchas / Debugging

- **Load before spawn** - Always `load()` first for best performance; `spawn()` without `load()` works but slower
- **Promise handling** - Use then/catch blocks for proper error handling
- **State checking** - Query `currentState` and `spawnError` enums for debugging
- **Array management** - Maintain both pool and active lists correctly
- **Property validation** - Validate script properties in `preStart()` with appropriate error messages
- **Disposal pattern** - Call `dispose()` to fully cleanup SpawnController objects

## See Also

- [Module 3 - Object Pooling](./03-implement-object-pooling.md) - Previous approach comparison
- [Module 5 - Summary](./05-summary.md) - Tutorial completion and method comparison
- [PoolUtils.ts] - Reusable pool management utility

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-4-spawn-controller (accessed 2025-09-26)
