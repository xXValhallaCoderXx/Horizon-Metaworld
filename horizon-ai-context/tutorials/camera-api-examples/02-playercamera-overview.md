---
title: "Module 2 - PlayerCamera Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-2-playercamera-overview"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "camera", "scripting", "playercamera", "tutorial"]
summary: "Overview of PlayerCamera system, camera perspectives, events, and implementation in Horizon Worlds with detailed API examples."
tutorial: "camera-api-examples"
---

# Module 2 - PlayerCamera Overview

## What & Why

The PlayerCamera system in Horizon Worlds enables dynamic camera control through scriptable entities that manage individual player viewpoints. This world demonstrates multiple camera perspectives through station-based examples, showing how first-person cameras work in shooting galleries and third-person cameras in combat arenas. Camera management is handled through PlayerCamera entity assignment and event-driven configuration.

## Key APIs / Concepts

- **Script Execution Mode**: PlayerCamera scripts must run in **Local mode** only
- **Camera Perspectives**: Follow, Third Person, First Person, Orbit, Pan, Fixed Position, Fixed with Entity, Focused Interaction
- **Core Entities**: `PlayerCameraManager` and `PlayerCamera` reference objects
- **Event System**: `PlayerCameraEvents` with SetCameraMode, SetCameraFixedPosition, etc.
- **Spawn Point Configuration**: Mobile Camera property on SpawnPoint gizmos for web/mobile initial POV
- **Camera Reset Button**: Required for Fixed camera modes to prevent player entrapment

## How-To (Recipe)

1. **Set up Camera Entities**
   - Create `PlayerCameraManager` reference object with `PlayerCameraManager.ts` script
   - Create `PlayerCamera` reference objects with `PlayerCamera.ts` scripts
   - Duplicate PlayerCamera entities to match world's max player capacity

2. **Configure Initial Camera**
   - Select SpawnPoint gizmo in world
   - Set Mobile Camera property in Properties panel (Follow/Third Person/First Person/Orbit/Pan)
   - Note: Only applies to web/mobile players

3. **Implement Camera Events**
   - Use `PlayerCameraEvents.SetCameraMode` for basic perspective changes
   - Use `PlayerCameraEvents.SetCameraFixedPosition` for absolute positioning
   - Use `PlayerCameraEvents.SetCameraFixedPositionWithEntity` for entity-relative positioning
   - Implement `RevertPlayerCamera` for returning to previous mode

4. **Add Camera Reset Safety**
   - Call `displayCameraResetButton(true)` when entering Fixed camera modes
   - Bind to `hz.PlayerInputAction.LeftGrip` with Door icon
   - Disconnect when exiting Fixed modes

## Minimal Example

```typescript
// Set camera to third person
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraMode, {
    mode: CameraMode.ThirdPerson
});

// Set fixed position with smooth transition
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraFixedPosition, {
    position: new Vec3(0, 20, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    duration: 0.4,
    easing: Easing.EaseInOut
});

// Position camera at entity location
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraFixedPositionWithEntity, {
    entity: this.props.cameraPositionEntity,
    duration: 0.4,
    easing: Easing.EaseInOut
});

// Camera reset button implementation
displayCameraResetButton(on: boolean) {
    if (on && !this.cameraResetHasRegisteredCallback) {
        this.cameraResetInput = hz.PlayerControls.connectLocalInput(
            hz.PlayerInputAction.LeftGrip, 
            hz.ButtonIcon.Door, 
            this, 
            {preferredButtonPlacement: hz.ButtonPlacement.Default}
        );
        this.cameraResetInput.registerCallback((action, pressed) => {
            if(pressed) this.onCameraResetButtonPressed();
        });
        this.cameraResetHasRegisteredCallback = true;
    }
}
```

## Camera Perspectives Details

| Perspective | Description | Use Cases |
|-------------|-------------|-----------|
| **Follow** | Camera follows player avatar with smooth, dynamic view | Default for new worlds; exploration and general gameplay |
| **Third Person** | Camera positioned behind avatar, facing forward | Close quarters combat, navigation, avatar connection |
| **First Person** | Camera at avatar's eye location, facing forward | VR default; aiming, UI interaction, focused tasks |
| **Orbit** | Camera pivots around fixed point | Visual exploration of specific areas/objects |
| **Pan** | Fixed distance/angle from player, consistent perspective | Side-scrolling games, platformers, specific viewing angles |
| **Fixed Position** | Camera at fixed world position and rotation | Big vistas, cutscenes not centered on entities |
| **Fixed with Entity** | Fixed position while tracking entity | Player-centric cutscenes, isometric/sidescrolling games |
| **Focused Interaction** | Zooms into specific object for interactions | Keypad entry, puzzle manipulation (web/mobile only) |

## CameraMode Enum Values

```typescript
export declare enum CameraMode {
    FirstPerson = 0,
    ThirdPerson = 1,
    Attach = 2,
    Fixed = 3,
    Orbit = 4,
    Pan = 5
}

export declare enum Easing {
    EaseIn = 0,
    EaseOut = 1,
    EaseInOut = 2,
    Linear = 3
}
```

## Limits & Constraints

- **Local Script Mode**: Camera scripts must execute in Local mode only
- **Entity Requirements**: Need one PlayerCamera entity per max world capacity
- **Web/Mobile Only**: SpawnPoint Mobile Camera settings only affect web/mobile players
- **Camera Reset**: Fixed camera modes require reset button to prevent player entrapment
- **Previous Mode Tracking**: System tracks previous camera mode for smooth reversions

## Gotchas / Debugging

- **Stuck in Fixed Mode**: Always implement Camera Reset button for Fixed perspectives
- **Mode Tracking**: Retain previous camera mode values for smooth transitions back
- **Entity Duplication**: Must have enough PlayerCamera entities for max player count
- **Local vs Network**: Camera manipulation is local-only, don't use networked scripts
- **Web/Mobile vs VR**: Different default perspectives (First Person for VR, configurable for web/mobile)
- **Event Parameters**: Ensure correct parameter types (Vec3 for position, Quaternion for rotation)

## See Also

- [Module 3 - PlayerCameraManager](03-playercameramanager.md) - Deep dive into camera manager script
- [Module 4 - Pan Camera](04-pan-camera.md) - Pan camera implementation specifics  
- [Module 5 - Fixed Camera and Spectator Mode](05-fixed-camera-spectator-mode.md) - Fixed camera techniques
- [Module 6 - Fixed Camera and Cutscenes](06-fixed-camera-cutscenes.md) - Cutscene camera workflows
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system concepts
- [Scripting Overview](../typescript-development-overview.md) - TypeScript development basics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-2-playercamera-overview (accessed 2025-09-25)