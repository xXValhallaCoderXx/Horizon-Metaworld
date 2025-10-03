---
title: "Camera APIs Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-1-setup"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "camera_api", "web_mobile", "player_camera"]
summary: "Overview of camera positioning and control APIs for web and mobile Horizon Worlds experiences."
---

# Camera APIs Overview

## What & Why

Camera APIs in Meta Horizon Worlds enable developers to control camera positioning and behavior for web and mobile experiences. While VR uses a fixed first-person perspective from the avatar, web and mobile platforms support multiple camera positions to optimize immersive experience, situational awareness, and interaction models.

Camera positioning is crucial for creating engaging non-VR experiences that account for different input methods and screen constraints.

## Key APIs / Concepts

- **PlayerCamera.ts** - Core script for individual player camera control with event-driven mode switching
- **PlayerCameraManager.ts** - Management system for assigning cameras to players with retry mechanisms
- **Camera Perspectives**:
  - Follow Camera - Dynamic view maintaining player in frame (default for new worlds)
  - Third Person - Camera behind avatar facing forward
  - First Person - Camera at avatar eye level (VR default)
  - Orbit Camera - Pivots around fixed point for exploration
  - Pan Camera - Fixed offset following for sidescrolling/top-down gameplay
  - Fixed Camera Position - Static world position for vistas/cutscenes
  - Fixed with Entity - Fixed position tracking specific entity
- **Event System** - NetworkEvent-based camera mode switching and configuration
- **Safety Features** - Camera reset button and locomotion control for fixed modes
- **Reference Objects** - Empty entities for camera positioning and animation paths

## How-To (Basic Implementation)

1. **Set Up Camera Manager**

   - Create PlayerCameraManager component
   - Initialize camera state tracking
   - Configure platform detection

2. **Implement Camera Modes**

   - Define camera positioning logic for each mode
   - Set up reference objects for fixed cameras
   - Configure offset parameters for pan cameras

3. **Handle Camera Transitions**

   - Implement smooth transitions between modes
   - Manage camera state persistence
   - Handle platform-specific behaviors

4. **Test Across Platforms**
   - Verify behavior in web browser
   - Test in published world for mobile
   - Ensure VR fallback behavior

## Minimal Example

```typescript
// PlayerCamera.ts - Core camera control script (Local mode only)
class PlayerCamera extends hz.Component<{}> {
  start() {
    // Listen for camera mode changes
    this.connectNetworkEvent(PlayerCameraEvents.SetCameraMode, ({mode}) => {
      this.setCameraMode(mode);
    });

    // Listen for fixed position events
    this.connectNetworkEvent(PlayerCameraEvents.SetCameraFixedPositionWithEntity, ({entity, duration, easing}) => {
      this.setCameraFixedPositionWithEntity(entity, duration, easing);
    });
  }
}

// Basic camera mode switching
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraMode, {
  mode: CameraMode.ThirdPerson
});

// Fixed camera with entity reference
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraFixedPositionWithEntity, {
  entity: this.props.cameraPositionEntity,
  duration: 0.4,
  easing: Easing.EaseInOut
});

// PlayerCameraManager.ts - Assignment system
preStart(): void {
  this.connectNetworkBroadcastEvent(CameraManagerEvents.OnRegisterPlayerCamera, ({ObjectId, Object}) => {
    if (ObjectId === "PlayerCamera") {
      this.playerCameras.push(Object);
    }
  });
}
```

## Limits & Constraints

- **Platform Limitations**: Camera positioning only applies to web and mobile platforms
- **VR Restriction**: Camera APIs do not affect VR experiences (always first-person)
- **Mobile Testing**: Mobile camera features can only be tested in published worlds
- **API Version**: Requires TypeScript API version 2.0.0 or higher
- **Performance**: Camera transitions may impact performance on lower-end mobile devices

## Gotchas / Debugging

- Camera changes have no effect in VR mode - test only on target platforms
- Mobile-specific features (like reset button) only appear on mobile devices
- Ensure smooth transitions to prevent motion sickness in camera switches
- Platform detection should happen early in component lifecycle
- Fixed camera references must exist before camera activation

## From Tutorials

Camera API concepts and implementations are covered in multiple tutorial series:

### Camera API Examples Tutorial
- [Module 1 - Setup](./tutorials/camera-api-examples/01-setup.md) - Prerequisites and world setup
- [Module 2 - PlayerCamera Overview](./tutorials/camera-api-examples/02-playercamera-overview.md) - Core camera perspectives and events
- [Module 3 - PlayerCameraManager](./tutorials/camera-api-examples/03-playercameramanager.md) - Camera assignment and retry mechanisms
- [Module 4 - Pan Camera](./tutorials/camera-api-examples/04-pan-camera.md) - Sidescrolling and top-down perspectives
- [Module 5 - Fixed Camera and Spectator Mode](./tutorials/camera-api-examples/05-fixed-camera-spectator-mode.md) - Static camera positioning
- [Module 6 - Fixed Camera and Cutscenes](./tutorials/camera-api-examples/06-fixed-camera-cutscenes.md) - Cinematic camera sequences
- [Module 7 - Other Systems and Summary](./tutorials/camera-api-examples/07-other-systems-summary.md) - Complete tutorial summary

### Web and Mobile Development Tutorial
- [Module 4 - Camera Manager](./tutorials/web-mobile-development/04-camera-manager.md) - Cross-platform camera management with local execution and event-driven control

## See Also

- [Mobile and Web Development](./mobile-web-development-overview.md) - Platform-specific considerations
- [Events and Triggers System](./events-triggers-system.md) - Triggering camera changes
- [Objects and Components Overview](./objects-components-overview.md) - Entity-component architecture
- [TypeScript Development Overview](./typescript-development-overview.md) - Development environment setup

## Sources

- [Camera API Examples Tutorial](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-1-setup) (accessed 2025-09-25)
