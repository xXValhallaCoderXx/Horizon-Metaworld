---
title: "Module 5 - Player Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-5-player-manager"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile_tutorial",
    "player_manager",
    "camera_ownership",
    "gameplay_tags",
  ]
summary: "Configure Player Manager to assign Camera Managers to each player using GameplayTags and entity ownership transfer for local camera API execution."
tutorial: "web-mobile-development"
---

# Module 5 - Player Manager

## What & Why

The Player Manager acts as a resource coordinator that assigns per-player Camera Managers when players join/leave the world. Since Camera APIs require local execution, this component handles ownership transfer to ensure each player gets their own Camera Manager for responsive camera control across platforms.

## Key APIs / Concepts

- **GameplayTags** - Entity tagging system for efficient entity searches
- **Entity ownership** - `.owner.set(player)` for local execution transfer
- **World queries** - `getEntitiesWithTags()` for finding tagged entities
- **Player lifecycle** - `OnPlayerEnterWorld`/`OnPlayerExitWorld` events
- **Player indexing** - `player.index.get()` for resource assignment
- **Server player** - `this.world.getServerPlayer()` for ownership reset

## How-To (Recipe)

1. **Tag Camera Manager entities** with "CameraManager" GameplayTag
2. **Query tagged entities** in `preStart()` using `getEntitiesWithTags()`
3. **Track player entry** via `OnPlayerEnterWorld` event
4. **Assign Camera Manager** by player index with ownership transfer
5. **Track player exit** via `OnPlayerExitWorld` event
6. **Release ownership** back to server player on exit
7. **Handle edge cases** with error logging for insufficient managers

## Minimal Example

```typescript
class sysPlayerManager extends hz.Component<typeof sysPlayerManager> {
  static propsDefinition = {};

  private cameraManagers: hz.Entity[] = [];
  private focusedInteractionManagers: hz.Entity[] = [];

  preStart() {
    // Get all camera managers by tag
    this.cameraManagers = this.world.getEntitiesWithTags(["CameraManager"]);
  }

  start() {
    // Player join handling
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) => {
        this.RegisterPlayer(player);
      }
    );

    // Player leave handling
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      (player: hz.Player) => {
        this.DeregisterPlayer(player);
      }
    );
  }

  private RegisterPlayer(player: hz.Player) {
    let playerIndex = player.index.get();

    // Assign Camera Manager by index
    if (playerIndex < this.cameraManagers.length) {
      this.cameraManagers[playerIndex].owner.set(player);
    } else {
      console.error("Not enough Camera Managers in the world");
    }
  }

  private DeregisterPlayer(player: hz.Player) {
    let playerIndex = player.index.get();

    // Release Camera Manager back to server
    if (playerIndex < this.cameraManagers.length) {
      this.cameraManagers[playerIndex].owner.set(this.world.getServerPlayer());
    }
  }
}
```

## Limits & Constraints

- **Entity tagging**: Must manually add "CameraManager" tag to entities in editor
- **Resource limits**: Number of Camera Managers must match expected player count
- **Index-based assignment**: Uses player.index for deterministic resource allocation
- **Ownership transfer**: Required for Camera API local execution

## Gotchas / Debugging

- **Missing tags**: Verify GameplayTags are assigned in entity Properties panel
- **Resource shortage**: Console error when more players than Camera Managers
- **Ownership cleanup**: Always transfer back to server on player exit
- **Index assumptions**: Player index used directly for resource mapping
- **Testing**: Use Preview Mode → Features Lab for camera feature validation

## See Also

- [Module 4 - Camera Manager](./04-camera-manager.md) - Camera Manager component created
- [Module 6 - Room A: The Magic Wand](./06-room-a-magic-wand.md) - Next puzzle implementation
- [Local Scripting and Entity Ownership](../local-scripting-ownership.md) - Ownership concepts
- [Using Camera API for Web and Mobile](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/typescript-apis-for-mobile/camera/) - Camera API guide
- [Local Script for Mobile and Web](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/getting-started-with-local-scripting/) - Local execution patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-5-player-manager (accessed 2025-09-25)
