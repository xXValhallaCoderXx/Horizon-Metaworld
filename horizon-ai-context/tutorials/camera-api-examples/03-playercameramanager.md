---
title: "Module 3 - PlayerCameraManager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-3-playercameramanager"
last_updated: "2025-09-25T00:00:00Z"
tags:
  ["horizon_worlds", "camera", "scripting", "playercameramanager", "tutorial"]
summary: "PlayerCameraManager system for assigning and managing PlayerCamera entities to players with retry mechanisms and event-driven architecture."
tutorial: "camera-api-examples"
---

# Module 3 - PlayerCameraManager

## What & Why

The PlayerCameraManager is responsible for managing the assignment of PlayerCamera entities to players when they enter the world. It handles the registration of available PlayerCameras through self-registration and assigns them to players based on their player index. This system uses retry mechanisms to handle race conditions and ensures reliable camera assignment in multiplayer scenarios.

## Key APIs / Concepts

- **PlayerCameraManager**: Main management class that assigns/unassigns cameras
- **Self-Registration Pattern**: PlayerCameras register themselves via broadcast events
- **Player Index Assignment**: Cameras assigned based on player index (0 to max capacity)
- **Retry Mechanism**: Up to 5 attempts with 0.1s delay between attempts
- **Race Condition Handling**: Non-deterministic execution safety through retry logic
- **Entity Pool Management**: Cameras returned to pool when players leave

## How-To (Recipe)

1. **Set Up Camera Self-Registration**

   - In `PlayerCamera.ts` `start()` method, emit `OnRegisterPlayerCamera` broadcast event
   - Include `ObjectId` and entity reference in event data
   - Use broadcast events for easier camera addition/removal as max players change

2. **Configure PlayerCameraManager Registration Listener**

   - In `PlayerCameraManager.ts` `preStart()` method, connect to `OnRegisterPlayerCamera` event
   - Push registering cameras into `playerCameras` array for assignment pool
   - Filter by `ObjectId === "PlayerCamera"` for type safety

3. **Implement Camera Assignment Logic**

   - Use `getCameraForPlayer(player)` to get camera at player's index position
   - Implement retry mechanism with configurable attempts and delay
   - Handle assignment failures with error reporting

4. **Set Up Retry Constants**
   - Configure `retryCameraAssignDelay: 0.1` seconds between attempts
   - Set `maxAssignAttempts: 5` for reliability without excessive delay
   - Ensure enough PlayerCamera entities match world's max avatar capacity

## Minimal Example

```typescript
// PlayerCamera.ts - Self-registration in start()
start() {
    // Self register this PlayerCamera to the PlayerManager using broadcast event
    this.sendNetworkBroadcastEvent(CameraManagerEvents.OnRegisterPlayerCamera, {
        ObjectId: "PlayerCamera",
        Object: this.entity
    });
}

// PlayerCameraManager.ts - Registration listener in preStart()
preStart(): void {
    this.connectNetworkBroadcastEvent(CameraManagerEvents.OnRegisterPlayerCamera, ({ObjectId, Object}) => {
        if (ObjectId === "PlayerCamera") {
            this.playerCameras.push(Object);
        }
    });
}

// Retry mechanism configuration
private retryCameraAssignDelay: number = 0.1;
private maxAssignAttempts: number = 5;

// Camera assignment by player index
getCameraForPlayer(player: hz.Player): hz.Entity | undefined {
    const playerIndex = player.index; // Auto-assigned 0 to max capacity
    return this.playerCameras[playerIndex];
}

// CameraManagerEvents definition
export const CameraManagerEvents = {
    OnRegisterPlayerCamera: new hz.NetworkEvent<{
        ObjectId: string;
        Object: hz.Entity;
    }>('OnRegisterPlayerCamera'),
    OnSetPlayerCamera: new hz.NetworkEvent<{
        player: hz.Player;
        camera: hz.Entity;
    }>('OnSetPlayerCamera'),
};
```

## Camera Assignment Process

1. **Player Joins World**

   - Player automatically assigned index (0 to max capacity)
   - PlayerCameraManager attempts camera assignment
   - Up to 5 retry attempts with 0.1s delays

2. **Assignment Method**

   - `getCameraForPlayer()` returns camera at player's index
   - Camera must exist in `playerCameras` array at that index
   - Assignment links player to specific camera entity

3. **Player Leaves World**
   - Camera unassigned from departing player
   - Camera returned to available pool for reuse
   - Ready for assignment to next joining player

## Event System Details

| Event                    | Purpose                                   | Data                                   |
| ------------------------ | ----------------------------------------- | -------------------------------------- |
| `OnRegisterPlayerCamera` | PlayerCamera self-registration to manager | `ObjectId: string, Object: hz.Entity`  |
| `OnSetPlayerCamera`      | Camera assignment to joining player       | `player: hz.Player, camera: hz.Entity` |

## Limits & Constraints

- **Camera Entity Count**: Must have ≥ max avatar capacity PlayerCamera entities
- **Player Index Range**: 0 to maximum avatar capacity (set in Player Settings)
- **Assignment Attempts**: Maximum 5 retry attempts per player
- **Retry Delay**: 0.1 seconds between assignment attempts
- **Universal Coverage**: All visitors could potentially be mobile/web players needing cameras

## Gotchas / Debugging

- **Insufficient Cameras**: Error if not enough PlayerCamera entities for max capacity
- **Race Conditions**: Non-deterministic execution handled by retry mechanism
- **Index Mismatch**: Ensure camera array indices align with player indices
- **Performance vs Reliability**: Broadcast events easier but less performant than direct references
- **Assignment Timing**: Players might not get camera immediately due to retry delays
- **Mobile Player Assumption**: Design assumes all players might need camera management

## Architecture Pattern

The PlayerCameraManager demonstrates a generalized entity assignment pattern that can be applied to other systems:

- **Self-Registration**: Entities register themselves with manager
- **Pool Management**: Available entities tracked in arrays
- **Index-Based Assignment**: Use player index for deterministic assignment
- **Retry Logic**: Handle timing issues with configurable retry attempts
- **Cleanup on Exit**: Return resources to pool when players leave

## See Also

- [Module 2 - PlayerCamera Overview](02-playercamera-overview.md) - PlayerCamera entity basics and events
- [Module 4 - Pan Camera](04-pan-camera.md) - Pan camera implementation specifics
- [Module 5 - Fixed Camera and Spectator Mode](05-fixed-camera-spectator-mode.md) - Fixed camera techniques
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system concepts
- [Scripting Overview](../typescript-development-overview.md) - TypeScript development patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-3-playercameramanager (accessed 2025-09-25)
