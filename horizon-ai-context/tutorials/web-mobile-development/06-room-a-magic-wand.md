---
title: "Room A: The Magic Wand - Camera API and Grabbable Projectiles"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-6-room-a-the-magic-wand"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile",
    "camera_api",
    "grabbable_objects",
    "projectiles",
  ]
tutorial: "web-mobile-development"
summary: "Build first puzzle room with dynamic camera modes, grabbable magic wand, and projectile-based puzzle mechanics for cross-platform play."
---

# Room A: The Magic Wand - Camera API and Grabbable Projectiles

## What & Why

Implements the first puzzle room of the web/mobile game featuring a maze navigation challenge. Players find and grab a magic wand, then use it to shoot projectiles at an exit door to proceed. Demonstrates Camera API mode switching, grabbable object configuration, and projectile interaction systems optimized for cross-platform input handling.

## Key APIs / Concepts

### Camera API Components

- `sysEvents.OnSetCameraModeFirstPerson` - Switch to first-person view
- `sysEvents.OnSetCameraModeThirdPerson` - Switch to third-person view
- `sysEvents.OnSetCameraCollisionEnabled` - Toggle camera collision detection
- `sysCameraChangeTrigger` script - Handles trigger-based camera mode switching

### Grabbable Object System

- `Motion: Interactive` - Enables object interaction
- `Interaction: Grabbable` - Makes object grabbable
- `Avatar Pose: Torch` - Sets grab animation style
- Primary/Secondary Action Icons - Mobile interaction buttons

### Projectile System

- `hz.ProjectileLauncherGizmo` - Core projectile launcher component
- `hz.CodeBlockEvents.OnIndexTriggerDown` - Trigger firing events
- `hz.CodeBlockEvents.OnProjectileHitEntity` - Handle projectile collisions
- `launcher.owner.set(player)` - Sets projectile ownership for aim direction

## How-To (Recipe)

### 1. Set up Camera Mode Triggers

- Create Trigger Zone entities for camera behavior zones
- Attach `sysCameraChangeTrigger` script to trigger zones
- Configure camera mode parameters in Properties panel

### 2. Configure Dynamic Camera Switching

- For first-person areas: Set `cameraMode: "FirstPerson"`
- For collision-disabled areas: Set `cameraMode: "Collision"`
- Script automatically handles enter/exit events with network messaging

### 3. Create Grabbable Projectile Entity

- Group magic wand model with ProjectileLauncher child entity
- Set parent entity: `Motion: Interactive`, `Interaction: Grabbable`
- Configure avatar interaction properties and mobile action icons

### 4. Implement Wand Script Logic

- Define props for projectile launcher, hint text, door target, puzzle manager
- Handle `OnGrabStart` event to set launcher ownership
- Connect `OnIndexTriggerDown` for firing with animation
- Connect `OnProjectileHitEntity` for puzzle completion logic

## Minimal Example

```typescript
// RoomA_Wand script structure
class RoomA_Wand extends hz.Component<typeof RoomA_Wand> {
  static propsDefinition = {
    projectileLauncher: { type: hz.PropTypes.Entity },
    hintText: { type: hz.PropTypes.String },
    hintDuration: { type: hz.PropTypes.Number, default: 2 },
    objectToMove: { type: hz.PropTypes.Entity },
    puzzleManager: { type: hz.PropTypes.Entity },
  };

  start() {
    const launcher = this.props.projectileLauncher?.as(
      hz.ProjectileLauncherGizmo
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: true, player: hz.Player) => {
        // Set ownership for web/mobile aim direction
        launcher.owner.set(player);

        // Display hint to player
        this.sendNetworkBroadcastEvent(sysEvents.OnDisplayHintHUD, {
          players: [player],
          text: this.props.hintText,
          duration: this.props.hintDuration,
        });

        // Handle firing with animation
        this.connectCodeBlockEvent(
          this.entity,
          hz.CodeBlockEvents.OnIndexTriggerDown,
          (player: hz.Player) => {
            player.playAvatarGripPoseAnimationByName(
              hz.AvatarGripPoseAnimationNames.Fire
            );
            this.async.setTimeout(() => launcher.launchProjectile(), 30);
          }
        );
      }
    );
  }
}
```

## Limits & Constraints

- **Camera Collision**: Can be disabled per trigger zone but affects all collision detection
- **Projectile Ownership**: Must be set to player for accurate web/mobile aiming
- **Animation Timing**: 30ms delay recommended between animation start and projectile launch
- **Mobile Action Icons**: Limited to predefined icon types (Fire, Aim, etc.)
- **Grab Anchors**: Require VR headset for precise positioning setup

## Gotchas / Debugging

- **Camera Mode Persistence**: Ensure trigger exit events properly restore previous camera modes
- **Projectile Direction**: Without player ownership, web/mobile projectiles may fire in wrong direction
- **Entity Grouping**: Wand and launcher must be properly parent-child grouped for unified interaction
- **Network Events**: Use `sendNetworkEvent` for targeted messaging vs `sendNetworkBroadcastEvent` for global
- **Trigger Zone Coverage**: Ensure trigger volumes completely cover intended interaction areas

## See Also

- [Camera Manager Implementation](04-camera-manager.md) - Core camera system setup
- [HUD System Integration](02-hud-system.md) - Hint display mechanics
- [Puzzle Manager Logic](03-puzzle-manager.md) - Puzzle completion handling
- [Focused Interaction Manager](07a-focused-interaction-manager.md) - Touch input processing

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-6-room-a-the-magic-wand (accessed 2025-09-26)
