---
title: "Module 4 - Camera Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-4-camera-manager"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "web_mobile", "tutorial", "camera", "local_scripting"]
tutorial: "web-mobile-development"
summary: "Build a Camera Manager system for controlling camera perspectives, field of view, and collision settings across VR, web, and mobile platforms using the Camera API."
---

# Module 4 - Camera Manager

## What & Why

Camera control focuses player attention on important screen areas and provides optimal experiences across platforms. The Camera Manager leverages Meta Horizon Worlds Camera API features including perspective switching, fixed positioning, field of view changes, and collision control.

## Key APIs / Concepts

- `LocalCamera` - Core camera control object (requires local execution)
- `horizon/camera` API module - Must be enabled in Script Settings
- **Camera modes**: `setCameraModeThirdPerson()`, `setCameraModeFirstPerson()`, `setCameraModeFixed()`
- **Camera effects**: `setCameraRollWithOptions()`, `overrideCameraFOV()`, `resetCameraFOV()`
- **Camera settings**: `perspectiveSwitchingEnabled`, `collisionEnabled`
- `CameraTransitionOptions` - Duration and easing for smooth transitions
- **Entity ownership** - Script must be owned by player, not server
- **Local execution mode** - Camera API only works in local scripts

## How-To (Recipe)

1. **Enable Camera API Module**
   - Open Scripts panel → Gear icon → Settings
   - Click API → Enable `horizon/camera` → Apply

2. **Set Script to Local Execution Mode**
   - Select camera manager script in Scripts panel
   - Context menu → Script Execution Mode → Local

3. **Transfer Ownership to Player**
   - Check ownership: `this.entity.owner.get()`
   - Verify not server: `this.owningPlayer === this.world.getServerPlayer()`
   - Exit if server-owned to ensure local-only execution

4. **Initialize Camera on Startup**
   - Set consistent defaults: third-person, no roll, default FOV
   - Prevents issues when switching between Preview/Edit modes

5. **Create Event-Driven System**
   - Define camera events for all camera operations
   - Set up network event listeners for the owning player
   - Forward events to appropriate Camera API calls

6. **Assign Manager to Each Player**
   - Create one camera manager per possible player
   - Use Player Manager to transfer ownership on entry/exit

## Minimal Example

### Camera Manager Local Script
```typescript
import * as hz from 'horizon/core';
import { sysEvents } from 'sysEvents';
import LocalCamera, { CameraTransitionOptions, Easing } from 'horizon/camera';

class sysCameraManagerLocal extends hz.Component {
    private ownedByServer: boolean = true;
    private owningPlayer!: hz.Player;
    private transitionOptions: CameraTransitionOptions = {
        duration: 0.5,
        easing: Easing.EaseInOut,
    };

    start() {
        // Check ownership
        this.owningPlayer = this.entity.owner.get();
        this.ownedByServer = this.owningPlayer === this.world.getServerPlayer();
        if (this.ownedByServer) return;

        // Reset to defaults
        LocalCamera.setCameraModeThirdPerson();
        LocalCamera.setCameraRollWithOptions(0);
        LocalCamera.resetCameraFOV();

        // Set up event listeners
        this.setupCameraEventListeners();
    }

    private setupCameraEventListeners() {
        this.connectNetworkEvent(
            this.owningPlayer,
            sysEvents.OnSetCameraModeFirstPerson,
            () => {
                LocalCamera.setCameraModeFirstPerson(this.transitionOptions);
            }
        );
        
        this.connectNetworkEvent(
            this.owningPlayer,
            sysEvents.OnSetCameraModeFixed,
            data => {
                LocalCamera.setCameraModeFixed({
                    position: data.position,
                    rotation: data.rotation,
                    ...this.transitionOptions,
                });
            }
        );
    }
}
```

### Using Camera Events
```typescript
// Switch player to first-person
this.sendNetworkEvent(player, sysEvents.OnSetCameraModeFirstPerson, null);

// Set fixed camera position
this.sendNetworkEvent(player, sysEvents.OnSetCameraModeFixed, {
    position: new hz.Vec3(0, 5, 10),
    rotation: new hz.Quaternion(0, 0, 0, 1)
});
```

## Camera API Events

| Event | Purpose | Parameters |
|-------|---------|------------|
| `OnSetCameraModeThirdPerson` | Switch to third-person view | None |
| `OnSetCameraModeFirstPerson` | Switch to first-person view | None |
| `OnSetCameraModeFixed` | Fixed camera position | `position`, `rotation` |
| `OnSetCameraModeAttached` | Attach to entity/player | `target`, `positionOffset`, speeds |
| `OnSetCameraFOV` | Override field of view | `newFOV` |
| `OnResetCameraFOV` | Reset to default FOV | None |
| `OnSetCameraCollisionEnabled` | Toggle camera collision | `enabled` |

## SpawnPoint Alternative

For simple camera control without scripting:
- Use **Mobile Camera** field in SpawnPoint gizmos
- Set first-person or third-person for web/mobile players
- VR players unaffected
- Good for basic lobby/game area transitions

## System Architecture

1. **Camera Manager per Player**: One local manager assigned to each player
2. **Event-Driven Communication**: Network events trigger camera changes
3. **Local Execution**: All Camera API calls execute on player's client
4. **Ownership Transfer**: Player Manager assigns/unassigns managers
5. **Default Initialization**: Consistent camera state on world entry

## Limits & Constraints

- **Local execution required** - Camera API only works in local scripts
- **One manager per player** - Each player needs dedicated camera manager
- **Ownership dependency** - Script must be owned by target player
- **API module requirement** - `horizon/camera` must be enabled
- Platform UI may obstruct certain camera angles on web/mobile

## Gotchas / Debugging

- **Server vs Local**: Always check `ownedByServer` and exit if true
- **API Module**: Ensure `horizon/camera` is enabled in Script Settings
- **Execution Mode**: Script must be set to Local execution mode
- **Ownership Timing**: Manager assignment must happen after player enters world
- **Event Targeting**: Send events to `owningPlayer`, not the camera entity
- **Transition Options**: Customize duration/easing for smooth camera movements
- **Multi-Platform Testing**: Test camera behavior on VR, web, and mobile

## See Also

- [Using the Camera API for Web and Mobile](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/typescript-apis-for-mobile/camera/) - Camera API documentation
- [How to Set the Player's Camera](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-set-the-players-camera/) - Camera setup guide
- [Local Scripting and Entity Ownership](../local-scripting-ownership.md) - Local scripting concepts
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system overview

## Sources

- [Developing for Web and Mobile Players Tutorial - Module 4 Camera Manager](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-4-camera-manager) (Accessed: 2025-09-25)
- [Camera API Reference](https://horizon.meta.com/resources/scripting-api/camera.md/?api_version=2.0.0)
- [Camera Class API](https://horizon.meta.com/resources/scripting-api/camera.camera.md/?api_version=2.0.0)