---
title: "Module 2 - Implement Object Spawning"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-2-implement-object-spawning"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "spawning",
    "object_spawning",
    "typescript",
    "trigger_zones",
  ]
summary: "Implementation of basic object spawning using trigger zones, demonstrating runtime asset instantiation and deletion with SimpleSpawn and SimpleSpawnTrigger scripts."
tutorial: "spawning-pooling"
---

# Module 2 - Implement Object Spawning

## What & Why

Object spawning allows creators to instantiate and destroy assets at runtime through scripts. This approach creates individual instances from the Asset Library when needed and removes them when no longer required. While suitable for simple use cases, object spawning has performance costs that make it less ideal for frequent or large-scale asset management.

## Key APIs / Concepts

- `this.world.spawnAsset(asset, position, rotation)` - Creates asset instance at runtime
- `this.world.deleteAsset(entity, immediate)` - Removes spawned asset from world
- **LocalEvent** - Custom events for inter-script communication with parameters
- **CodeBlockEvents** - Platform-provided events (OnPlayerEnterTrigger, OnPlayerExitTrigger)
- `connectLocalEvent()` - Subscribe to custom events
- `sendLocalEvent()` - Emit custom events to target entities
- `connectCodeBlockEvent()` - Subscribe to platform events
- `objList: hz.Entity[]` - Array to track spawned objects for cleanup

## How-To (Recipe)

1. **Create spawn manager script** (`SimpleSpawn.ts`):

   - Define LocalEvents for spawn/despawn triggers
   - Set up entity array to track spawned objects
   - Implement spawn logic with `world.spawnAsset()`
   - Implement despawn logic with `world.deleteAsset()`

2. **Create trigger script** (`SimpleSpawnTrigger.ts`):

   - Import spawn events from manager script
   - Connect to CodeBlockEvents (OnPlayerEnterTrigger, OnPlayerExitTrigger)
   - Send LocalEvents to spawn manager with position data

3. **Set up world objects**:

   - Attach spawn manager script to Empty Object
   - Configure assetToSpawn property in Properties panel
   - Add Trigger Zone gizmo with trigger script attached
   - Set target property to point to spawn manager object

4. **Test and debug**:
   - Use console logging to track spawn/despawn operations
   - Monitor objList array size for resource management

## Minimal Example

```typescript
// SimpleSpawn.ts - Main spawning logic
import * as hz from "horizon/core";

export const spawnTriggerEvent = new hz.LocalEvent<{ position: hz.Vec3 }>(
  "spawnEvent"
);
export const despawnTriggerEvent = new hz.LocalEvent<{}>("despawnEvent");

const MAX_SPAWN_OBJECTS = 100;

class SimpleSpawn extends hz.Component<typeof SimpleSpawn> {
  static propsDefinition = {
    assetToSpawn: { type: hz.PropTypes.Asset },
  };

  objList: hz.Entity[] = new Array<hz.Entity>();

  preStart() {
    // Listen for spawn trigger
    this.connectLocalEvent(
      this.entity,
      spawnTriggerEvent,
      (data: { position: hz.Vec3 }) => {
        if (this.objList.length >= MAX_SPAWN_OBJECTS) return;
        if (this.props.assetToSpawn == undefined) return;

        for (let i = 0; i < MAX_SPAWN_OBJECTS; i++) {
          this.world
            .spawnAsset(
              this.props.assetToSpawn,
              this.getRandomSpawnPosition(data.position),
              hz.Quaternion.fromEuler(new hz.Vec3(-90, 0, 90))
            )
            .then((spawnedObjects) => {
              spawnedObjects.forEach((obj) => {
                this.objList.push(obj);
              });
            });
        }
      }
    );

    // Listen for despawn trigger
    this.connectLocalEvent(this.entity, despawnTriggerEvent, () => {
      this.objList.forEach((obj) => {
        this.world.deleteAsset(obj, true);
      });
      this.objList.splice(0, this.objList.length);
    });
  }

  private getRandomSpawnPosition(initialPosition: hz.Vec3): hz.Vec3 {
    const pos = initialPosition.clone();
    pos.x += Math.random() * 3;
    pos.y += Math.random() * 2;
    pos.z += Math.random() * 2;
    return pos;
  }
}

// SimpleSpawnTrigger.ts - Trigger zone handler
import { despawnTriggerEvent, spawnTriggerEvent } from "SimpleSpawn";

class SpawnTrigger extends hz.Component<typeof SpawnTrigger> {
  static propsDefinition = {
    target: { type: hz.PropTypes.Entity },
  };

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      () => {
        this.sendLocalEvent(this.props.target, spawnTriggerEvent, {
          position: this.props.target.position.get(),
        });
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitTrigger,
      () => {
        this.sendLocalEvent(this.props.target, despawnTriggerEvent, {});
      }
    );
  }
}
```

## Required Assets & Setup

- **Asset to spawn**: Configure `assetToSpawn` property (example uses Red Heart asset)
- **Empty Object**: Attach SimpleSpawn script for world-level spawn management
- **Trigger Zone gizmo**: Invisible trigger area with ground marker for visibility
- **Target reference**: Trigger script's target property points to spawn manager object

## Limits & Constraints

- **Performance cost**: Resource-intensive at runtime, especially for 100+ instances
- **Asset availability**: Spawned assets must be available to world owner
- **Interruption risk**: Spawning can be interrupted/fail during active gameplay
- **Memory usage**: Each spawned instance occupies runtime memory
- **Sequential spawning**: Assets appear one after another due to loading time
- **Concurrent spawn prevention**: Script blocks multiple spawn operations to avoid issues

## Event Architecture

**Two event types used**:

1. **CodeBlockEvents** - Platform-provided for specific use cases (trigger zones)
2. **LocalEvents** - Custom messages between scripts with parameterized data

**Event flow**:

1. Player enters trigger zone → `OnPlayerEnterTrigger`
2. Trigger script sends → `spawnTriggerEvent` (with position data)
3. Spawn manager receives → Creates assets via `world.spawnAsset()`
4. Player exits trigger zone → `OnPlayerExitTrigger`
5. Trigger script sends → `despawnTriggerEvent`
6. Spawn manager receives → Deletes assets via `world.deleteAsset()`

## Gotchas / Debugging

- **Spawn interruption** - Operations can fail if triggered during active gameplay
- **objList tracking** - Essential for cleanup; must maintain entity references throughout gameplay
- **Asset loading time** - Visible delay as assets load from storage one by one
- **Concurrent spawn blocking** - Script prevents multiple spawn operations to avoid corruption
- **Resource cleanup** - Always delete unused objects to free up memory
- **Console logging** - Use `DISPLAY_CONSOLE_SIMPLESPAWN` flag to enable/disable debug output

## Performance Extensions

**Make number configurable**:

- Externalize `MAX_SPAWN_OBJECTS` as script property
- Add bounds checking for negative/excessive values

**Improve spawn timing**:

- Use asynchronous spawning for smoother performance
- Trigger spawning via `world.onUpdate` event (per-frame)
- Space spawns across multiple frames to reduce lag

## See Also

- [Local Events](/horizon-worlds/learn/documentation/typescript/events/local-events) - Custom event system documentation
- [Module 1 - Setup](./01-setup.md) - Tutorial prerequisites and overview
- [Module 3 - Object Pooling](./03-implement-object-pooling.md) - Next module covering pooling approach

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/spawning-and-pooling-in-typescript/module-2-implement-object-spawning (accessed 2025-09-26)
