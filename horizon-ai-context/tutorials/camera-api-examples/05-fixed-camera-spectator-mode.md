---
title: "Module 5 - Fixed Camera and Spectator Mode"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-5-fixed-camera-and-spectator-mode"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "camera",
    "scripting",
    "fixed_camera",
    "spectator",
    "tutorial",
  ]
summary: "Fixed camera positioning for spectator experiences using reference entities and camera reset button implementation."
tutorial: "camera-api-examples"
---

# Module 5 - Fixed Camera and Spectator Mode

## What & Why

Fixed camera mode positions players as spectators to events, allowing visitors to enjoy unfolding scenes like NBA games, musical events, or step out of dynamic action temporarily. The camera is set at a stationary reference object's position and rotation, providing controlled viewpoints for specific experiences.

## Key APIs / Concepts

- **FixedCameraTrigger.ts**: Simple trigger script for fixed camera activation
- **cameraPositionEntity**: Reference entity that defines camera position and rotation
- **SetCameraFixedPositionWithEntity**: Event that positions camera at entity location
- **Camera Reset Button**: Q button for escaping fixed camera mode (critical for user experience)
- **Locomotion Control**: Player movement disabled during fixed camera mode
- **Reference Object**: Empty entity positioned above trigger zone for camera positioning

## How-To (Recipe)

1. **Set Up Reference Object**

   - Create empty reference object positioned where camera should be
   - Position and rotate the object to frame the desired view
   - Place above or around the trigger zone area

2. **Configure FixedCameraTrigger**

   - Attach `FixedCameraTrigger.ts` script to trigger zone
   - Set `cameraPositionEntity` prop to reference the positioned object
   - Configure trigger zone size to capture player entry

3. **Implement Camera Transition**

   - Emit `SetCameraFixedPositionWithEntity` event on player entry
   - Set transition duration (e.g., 0.4 seconds) and easing (EaseInOut)
   - Handle cases where camera position entity is undefined

4. **Enable Camera Reset Safety**
   - Automatically display Camera Reset button (Q icon)
   - Disable player locomotion during fixed camera mode
   - Allow players to escape back to previous camera mode

## Minimal Example

```typescript
// FixedCameraTrigger.ts - Simple fixed camera trigger
class FixedCameraTrigger extends hz.Component<typeof FixedCameraTrigger> {
    static propsDefinition = {
        cameraPositionEntity: { type: hz.PropTypes.Entity },
    };

    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerEnterTrigger,
            (player: hz.Player) => {
                if (this.props.cameraPositionEntity !== undefined &&
                    this.props.cameraPositionEntity !== null) {

                    // Position camera at reference entity location
                    this.sendNetworkEvent(
                        player,
                        PlayerCameraEvents.SetCameraFixedPositionWithEntity,
                        {
                            entity: this.props.cameraPositionEntity,
                            duration: 0.4,
                            easing: Easing.EaseInOut,
                        }
                    );
                } else {
                    console.warn(
                        'Attempted to use FixedCameraTrigger without a camera position entity. ' +
                        'Create an empty object and reference it in the props.'
                    );
                }
            }
        );
    }
}

// PlayerCamera.ts - Event handling for fixed camera
preStart() {
    // Listen for fixed camera with entity positioning
    this.connectNetworkEvent(
        PlayerCameraEvents.SetCameraFixedPositionWithEntity,
        ({entity, duration, easing}) => {
            this.setCameraFixedPositionWithEntity(entity, duration, easing);
        }
    );
}

// Fixed camera positioning implementation
setCameraFixedPositionWithEntity(entity: hz.Entity, duration: number, easing: Easing) {
    // Get position and rotation from reference entity
    const position = entity.position;
    const rotation = entity.rotation;

    // Set camera to entity's transform
    this.setCameraFixedPosition(position, rotation, duration, easing);

    // Disable player movement and enable reset button
    this.setPlayerLocomotion(0);
    this.displayCameraResetButton(true);
}
```

## Fixed Camera Setup Process

1. **Position Reference Entity**

   - Place empty object at desired camera viewpoint
   - Rotate to face the scene or area of interest
   - Consider height and angle for optimal viewing

2. **Configure Trigger Zone**

   - Size trigger appropriately for player entry detection
   - Position relative to the experience area
   - Attach FixedCameraTrigger script

3. **Link Entity Reference**

   - Set cameraPositionEntity prop to reference object
   - Ensure reference is valid and positioned correctly
   - Test camera transition and framing

4. **Safety Implementation**
   - Camera reset button automatically appears
   - Player locomotion disabled to prevent confusion
   - Clear visual indicator (Q button) for escape method

## Camera Reset Button Implementation

- **Automatic Display**: Button appears when entering fixed camera mode
- **Input Binding**: Connected to `hz.PlayerInputAction.LeftGrip`
- **Icon**: `hz.ButtonIcon.Door` provides clear escape indication
- **Function**: Returns camera to previous mode when pressed
- **Critical Safety**: Prevents players from getting "stuck" in fixed perspective

## Spectator Mode Use Cases

| Scenario                 | Description       | Camera Positioning                   |
| ------------------------ | ----------------- | ------------------------------------ |
| **Sports Events**        | NBA games, racing | Elevated sideline or grandstand view |
| **Musical Performances** | Concerts, shows   | Audience perspective or stage-side   |
| **Presentations**        | Lectures, demos   | Auditorium or classroom angle        |
| **Scenic Views**         | Vistas, landmarks | Overlook or panoramic position       |
| **Action Sequences**     | Combat, gameplay  | Strategic vantage point              |

## Limits & Constraints

- **Locomotion Disabled**: Player movement set to 0 during fixed camera
- **Mandatory Reset Button**: Must provide escape mechanism for fixed modes
- **Reference Entity Required**: Camera position entity must exist and be valid
- **Transition Duration**: Smooth transitions improve user experience (0.4s recommended)
- **Single Viewpoint**: Camera locked to reference entity's transform

## Gotchas / Debugging

- **Missing Reference Entity**: Always validate `cameraPositionEntity` exists before use
- **Reset Button Critical**: Fixed camera without reset button traps players
- **Locomotion State**: Remember to disable movement to prevent disorientation
- **Entity Positioning**: Reference object transform directly determines camera view
- **Transition Smoothness**: Too fast transitions can be jarring for users
- **Console Warnings**: Check for missing entity references in debug output

## Spectator Experience Design

- **Clear Entry Points**: Make trigger zones obvious to players
- **Compelling Views**: Position cameras to showcase interesting content
- **Escape Clarity**: Ensure reset button visibility and understanding
- **Duration Consideration**: Not all players want long spectator experiences
- **Context Appropriate**: Use when viewing is better than participating

## See Also

- [Module 2 - PlayerCamera Overview](02-playercamera-overview.md) - Core camera events and reset button details
- [Module 4 - Pan Camera](04-pan-camera.md) - Alternative camera positioning approaches
- [Module 6 - Fixed Camera and Cutscenes](06-fixed-camera-cutscenes.md) - Animated camera sequences
- [Camera APIs Overview](../camera-apis-overview.md) - General camera system concepts
- [Events and Triggers System](../events-triggers-system.md) - Trigger zone implementation

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-5-fixed-camera-and-spectator-mode (accessed 2025-09-25)
