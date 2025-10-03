---
title: "Module 7 - Other Systems and Summary"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-7-other-systems-and-summary"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "camera",
    "scripting",
    "tutorial",
    "summary",
    "instructions",
  ]
summary: "Tutorial summary covering all camera modes, use cases, and bonus systems including instructions UI and basic combat/gun mechanics."
tutorial: "camera-api-examples"
---

# Module 7 - Other Systems and Summary

## What & Why

This module summarizes the complete Camera API Examples tutorial, reviewing all camera modes and their use cases. It also covers bonus systems included in the world: an instructions system using custom UI on post-it assets, and basic weapon/gun scripts for interaction examples. The tutorial demonstrates how PlayerCamera entities with attached scripts respond to events to perform camera switches while retaining previous camera modes.

## Tutorial Summary

The Camera API Examples tutorial explored different player camera modes through individual PlayerCamera entities, each serving as a physical reference point with an attached `PlayerCamera.ts` script. This script consumes events from other entities and triggers, using message data to configure camera modes and properties.

## Camera Modes and Use Cases

| Camera Mode              | Use Case                        | Description                                                    |
| ------------------------ | ------------------------------- | -------------------------------------------------------------- |
| **First Person**         | Shooting weapons at targets     | Precise aiming and UI interaction; default for VR              |
| **Third Person**         | Close quarters combat           | Avatar connection and action visibility; good for cosmetics    |
| **Orbit**                | Explore interesting locations   | Environmental showcase and scale perception; great for selfies |
| **Pan**                  | Sidescrolling/top-down gameplay | Fixed offset following with consistent perspective             |
| **Fixed Camera**         | Spectator mode                  | Unencumbered world view for events and cutscenes               |
| **Fixed with Movements** | Cutscenes                       | Cinematic camera dolly and animated sequences                  |
| **Attach Camera**        | Security cameras                | Camera attached to moving objects or other entities            |
| **Follow Camera**        | Chase sequences                 | Dynamic third-person tracking with smooth movement             |

## Key System Components

### PlayerCamera.ts Script

- **Event-driven**: Responds to camera mode change events
- **Mode retention**: Tracks previous camera mode for smooth reversions
- **Local execution**: Must run in Local script mode only
- **Safety features**: Implements camera reset button for fixed modes

### PlayerCameraManager.ts Script

- **Assignment management**: Safely deploys cameras to entering players
- **Race condition handling**: Prevents startup timing issues with retry mechanisms
- **Self-registration**: PlayerCameras register themselves via broadcast events
- **Pool management**: Maintains available camera entities for assignment

## Implementation Pattern

```typescript
// Basic camera mode switching pattern
this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraMode, {
  mode: CameraMode.ThirdPerson,
});

// Fixed position with entity reference
this.sendNetworkEvent(
  player,
  PlayerCameraEvents.SetCameraFixedPositionWithEntity,
  {
    entity: this.props.cameraPositionEntity,
    duration: 0.4,
    easing: Easing.EaseInOut,
  }
);

// Camera reset for safety
this.displayCameraResetButton(true);
```

## Bonus Systems Overview

### Instructions System

**Purpose**: Provides contextual help throughout the world using visual post-it notes with custom UI.

**Components**:

- **Yellow Post-it Asset**: Unity Asset Bundle for visual post-it appearance
- **Custom UI**: Positioned to display on post-it surface
- **InstructionConsts.ts**: Key-value pairs containing instructional text
- **Dynamic Content**: Script property `name` references appropriate instruction text

**Key Instructions Available**:

- SWORD: Third-person camera explanation and trade-offs
- GUN: First-person camera benefits and limitations
- ORBIT: Orbit camera use cases and considerations
- FIXED: Fixed camera applications and safety notes
- PAN: Pan camera configurations and angle examples
- ATTACH: Attach camera targeting and use cases
- FOLLOW: Follow camera tracking and property adjustments

### Combat System (Weapon.ts)

**Purpose**: Rudimentary weapon grabbing and swinging mechanics.

**Features**:

- Basic weapon interaction
- Hand grabbing mechanics
- Simple swing actions

**Note**: Does not include collision detection, damage systems, or advanced combat mechanics. For robust combat examples, see the Chop 'n Pop Sample World.

### Gun System (Gun.ts)

**Purpose**: Simple gun management for projectile firing.

**Features**:

- Basic gun firing mechanics
- Projectile spawning
- Simple trigger interaction

**Note**: Does not include collision handling. For complete shooting mechanics, see the Simple Shooting Mechanics Tutorial World.

## Development Best Practices

### Camera Implementation

- Always use `PlayerCamera.ts` in Local script mode
- Provide camera reset buttons for fixed camera modes
- Retain previous camera mode for smooth transitions
- Handle race conditions with retry mechanisms
- Match PlayerCamera entity count to world max capacity

### Event System

- Use NetworkEvents for camera mode changes
- Implement LocalEvents for cutscene triggers
- Handle emergency exits with camera reset events
- Coordinate timing with setTimeout for sequences

### User Experience

- Provide clear visual indicators for interactive elements
- Implement safety mechanisms to prevent camera trapping
- Consider platform differences (VR vs web/mobile defaults)
- Test camera transitions for smoothness and timing

## Limits & Constraints

- **Script Mode**: Camera scripts must execute in Local mode only
- **Entity Requirements**: Need one PlayerCamera per max world capacity
- **Platform Differences**: Different default cameras for VR vs web/mobile
- **Safety Critical**: Must provide escape mechanisms for fixed cameras
- **Timing Sensitive**: Cutscenes require careful timeout coordination

## Getting Started with Camera APIs

1. **Copy Core Scripts**: Bring `PlayerCamera.ts` and `PlayerCameraManager.ts` into your world
2. **Create Reference Objects**: Set up empty entities for camera positioning
3. **Attach Scripts**: Connect scripts to appropriate reference entities
4. **Configure Events**: Send appropriate PlayerCamera events from triggers
5. **Test All Modes**: Verify smooth transitions and safety mechanisms
6. **Add Instructions**: Use the instructions system pattern for user guidance

## See Also

- [Module 1 - Setup](01-setup.md) - Initial world setup and requirements
- [Module 2 - PlayerCamera Overview](02-playercamera-overview.md) - Core camera system and events
- [Module 3 - PlayerCameraManager](03-playercameramanager.md) - Camera assignment management
- [Module 4 - Pan Camera](04-pan-camera.md) - Sidescrolling and top-down perspectives
- [Module 5 - Fixed Camera and Spectator Mode](05-fixed-camera-spectator-mode.md) - Static camera positioning
- [Module 6 - Fixed Camera and Cutscenes](06-fixed-camera-cutscenes.md) - Cinematic camera sequences
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system concepts
- [Simple Shooting Mechanics Tutorial](../simple-shooting-mechanics-tutorial/01-setup.md) - Complete weapon systems
- [Chop 'n Pop Sample World](../chop-n-pop-sample-world/01-setup.md) - Advanced combat mechanics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-7-other-systems-and-summary (accessed 2025-09-25)
