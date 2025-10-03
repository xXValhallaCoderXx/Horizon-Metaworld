---
title: "Module 4 - Pan Camera"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-4-pancamera"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "camera", "scripting", "pan_camera", "tutorial"]
summary: "Pan camera implementation for sidescrolling, top-down, and isometric gameplay with offset positioning and collision handling."
tutorial: "camera-api-examples"
---

# Module 4 - Pan Camera

## What & Why

The pan camera moves the player's camera to follow their avatar at a consistent offset position. This provides creative freedom for different gameplay types, enabling sidescrolling, top-down, and isometric-influenced gameplay on web and mobile. The camera always targets the player's avatar at center frame while maintaining the specified offset distance and angle.

## Key APIs / Concepts

- **PanCameraTrigger.ts**: Extended CameraTrigger script with offset and movement properties
- **cameraOffset**: Vec3 position offset from player avatar (default: `(2, 0, 0)`)
- **translationSpeed**: Camera movement speed decoupled from avatar speed (default: `4.0`)
- **collisionsEnabled**: Whether camera collides with world objects or passes through
- **SetCameraPan Event**: Triggers pan camera mode with specified parameters
- **SetCameraCollisions Event**: Controls camera collision behavior

## How-To (Recipe)

1. **Set Up Pan Camera Trigger**

   - Create trigger zone with `PanCameraTrigger.ts` script
   - Configure `cameraOffset` Vec3 for desired viewing angle
   - Set `translationSpeed` for smooth camera transitions
   - Configure `collisionsEnabled` based on world design needs

2. **Configure Camera Perspectives**

   - **Sidescrolling**: Set X-axis offset (e.g., `(10, 0, 0)`)
   - **Top-down**: Set Y-axis offset (e.g., `(0, 20, 0)`)
   - **Isometric**: Use combination of X/Y/Z offsets for angled view
   - **Custom**: Adjust Vec3 values for specific creative angles

3. **Implement Event Listeners**

   - Add `SetCameraPan` listener in `PlayerCamera.ts`
   - Add `SetCameraCollisions` listener for collision handling
   - Connect events to `setCameraPan()` and `setCameraCollisions()` functions

4. **Handle Player Entry/Exit**
   - Trigger events when player enters trigger zone
   - Smoothly transition to pan camera with specified parameters
   - Revert to previous camera mode when exiting zone

## Minimal Example

```typescript
// PanCameraTrigger.ts - Extended trigger script properties
export class PanCameraTrigger extends CameraTrigger {
    // Camera offset from player avatar in Vec3 format
    cameraOffset: hz.Vec3 = new hz.Vec3(2, 0, 0); // Default sidescrolling

    // Camera movement speed decoupled from avatar speed
    translationSpeed: number = 4.0;

    // Whether camera should collide with world objects
    collisionsEnabled: boolean = true;
}

// Trigger zone entry - emit pan camera events
onPlayerEnter(player: hz.Player) {
    // Set camera collision behavior
    this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraCollisions, {
        enabled: this.collisionsEnabled
    });

    // Set pan camera mode with offset and speed
    this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraPan, {
        offset: this.cameraOffset,
        speed: this.translationSpeed
    });
}

// PlayerCamera.ts - Event listeners for pan camera
preStart() {
    // Listen for camera collision settings
    this.connectNetworkEvent(PlayerCameraEvents.SetCameraCollisions, ({enabled}) => {
        this.setCameraCollisions(enabled);
    });

    // Listen for pan camera settings
    this.connectNetworkEvent(PlayerCameraEvents.SetCameraPan, ({offset, speed}) => {
        this.setCameraPan(offset, speed);
    });
}
```

## Camera Offset Configurations

| Game Style       | Offset Example | Description                                 |
| ---------------- | -------------- | ------------------------------------------- |
| **Sidescroller** | `(10, 0, 0)`   | Camera 10 units to side of player on X-axis |
| **Top-down**     | `(0, 20, 0)`   | Camera 20 units above player on Y-axis      |
| **Isometric**    | `(5, 10, 5)`   | Angled view with mixed axis offsets         |
| **Side-top**     | `(8, 8, 0)`    | Diagonal perspective for platformers        |
| **Custom**       | `(x, y, z)`    | Any Vec3 combination for creative angles    |

## Pan Camera Parameters

| Parameter           | Type      | Default     | Description                                                                      |
| ------------------- | --------- | ----------- | -------------------------------------------------------------------------------- |
| `cameraOffset`      | `hz.Vec3` | `(2, 0, 0)` | Camera position offset from player avatar; always targets avatar at center frame |
| `translationSpeed`  | `number`  | `4.0`       | Camera movement speed independent of avatar speed; enables smooth transitions    |
| `collisionsEnabled` | `boolean` | varies      | `true`: camera moves closer when blocked; `false`: passes through obstacles      |

## Collision Behavior

- **Collisions Enabled (`true`)**

  - Camera moves closer to player when obstacles block offset position
  - Prevents camera from getting stuck behind walls or objects
  - Maintains visibility of player avatar at all times

- **Collisions Disabled (`false`)**
  - Camera ignores world obstacles and maintains exact offset
  - Passes through or positions behind objects to keep offset
  - May result in obstructed views but consistent positioning

## Limits & Constraints

- **Camera Targeting**: Always centers player avatar in frame regardless of offset
- **Speed Independence**: Camera movement decoupled from player movement speed
- **Offset Precision**: Vec3 coordinates determine exact camera positioning
- **Collision Handling**: Boolean toggle affects camera-world interaction
- **Platform Support**: Primarily designed for web and mobile gameplay

## Gotchas / Debugging

- **Offset Direction**: Positive/negative Vec3 values determine camera position relative to avatar
- **Speed Mismatch**: Too fast `translationSpeed` can cause jarring camera movements
- **Collision Issues**: Disabled collisions may hide player behind geometry
- **Axis Confusion**: Remember coordinate system when setting X/Y/Z offsets
- **Transition Smoothness**: Consider `translationSpeed` for seamless camera mode switches
- **Game Style Matching**: Ensure offset matches intended gameplay perspective

## Use Cases by Game Type

- **Sidescrolling Platformers**: Use X-axis offsets for side-view gameplay
- **Top-down Adventures**: Use Y-axis offsets for bird's-eye perspective
- **Isometric RPGs**: Combine multiple axis offsets for angled views
- **Racing Games**: Position behind avatar with Z-axis offsets
- **Puzzle Games**: Fixed offset for consistent viewing angle
- **Combat Systems**: Strategic positioning to show arena layout

## See Also

- [Module 2 - PlayerCamera Overview](02-playercamera-overview.md) - Core camera events and functions
- [Module 3 - PlayerCameraManager](03-playercameramanager.md) - Camera assignment system
- [Module 5 - Fixed Camera and Spectator Mode](05-fixed-camera-spectator-mode.md) - Fixed positioning techniques
- [Module 6 - Fixed Camera and Cutscenes](06-fixed-camera-cutscenes.md) - Cinematic camera control
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system concepts

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-4-pancamera (accessed 2025-09-25)
