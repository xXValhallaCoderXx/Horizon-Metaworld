---
title: "Use Drag Inputs to Rotate Objects"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7b-use-drag-inputs-to-rotate-objects"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile",
    "focused_interaction",
    "drag_inputs",
    "cross_platform",
  ]
tutorial: "web-mobile-development"
summary: "Implement cross-platform object rotation using drag inputs and Focused Interaction API, enabling different interaction methods for VR vs web/mobile players."
---

# Use Drag Inputs to Rotate Objects

## What & Why

Implements interactive object rotation for puzzle elements that reveal hidden numeric codes when manipulated. Creates dual interaction paradigms: VR players can directly grab and rotate objects while web/mobile players use the Focused Interaction API with drag gestures. Ensures optimal UX across all platforms by adapting to each device's capabilities.

## Key APIs / Concepts

### Focused Interaction Events

- `sysEvents.OnFocusedInteractionInputStarted` - Captures initial touch/mouse down
- `sysEvents.OnFocusedInteractionInputMoved` - Tracks drag movement delta
- `sysEvents.OnFocusedInteractionInputEnded` - Handles input release

### Cross-Platform Access Control

- `hz.PlayerDeviceType.VR` - Device type detection
- `setWhoCanGrab(players)` - Dynamic grab permission management
- `activePlayer` tracking - Single-player interaction enforcement

### Event Management

- `hz.CodeBlockEvents.OnPlayerEnterWorld` - VR player tracking
- `hz.CodeBlockEvents.OnPlayerExitWorld` - Cleanup on disconnect
- `hz.CodeBlockEvents.OnPlayerEnterTrigger` - Focus mode initiation

## How-To (Recipe)

### 1. Set Up Cross-Platform Grab Permissions

- Initialize empty grab permissions to prevent default grabbing
- Track VR players entering/leaving world in separate array
- Update grab permissions to allow only VR players direct manipulation

### 2. Implement Focus Mode Entry/Exit

- Detect non-VR players entering interaction trigger
- Enforce single-player interaction with active player tracking
- Send focus mode events with camera positioning data

### 3. Process Drag Input Events

- Track screen position changes between input move events
- Convert 2D screen deltas to 3D rotation quaternions
- Apply rotational transformations to target object incrementally

### 4. Handle Player Session Management

- Maintain VR player list with proper cleanup on disconnect
- Reset grab permissions and active player state on focus exit
- Restore normal interaction state after focused session ends

## Minimal Example

```typescript
// Core drag input processing
this.connectNetworkEvent(this.entity, sysEvents.OnFocusedInteractionInputMoved,
  (data) => {
    const interaction = data.interactionInfo;
    if (interaction?.interactionIndex === 0) {
      if (this.dragLastPos && this.props.objectToDrag) {
        // Calculate screen space drag delta
        let dragDelta = interaction.screenPosition.sub(this.dragLastPos);

        if (dragDelta.magnitude() > 0) {
          // Convert 2D drag to 3D rotation
          let newRotation = hz.Quaternion.fromEuler(
            new hz.Vec3(dragDelta.y * 1080, 0, -dragDelta.x * 1080)
          );

          // Apply incremental rotation
          this.props.objectToDrag.rotation.set(
            newRotation.mul(this.props.objectToDrag.rotation.get())
          );
        }

        this.dragLastPos = interaction.screenPosition;
      }
    }
  }
);

// Cross-platform grab permission management
private SetWhoCanGrabObject(players: hz.Player[]) {
  if (this.props.objectToDrag?.simulated.get()) {
    this.props.objectToDrag.as(hz.GrabbableEntity)?.setWhoCanGrab(players);
  }
}
```

## Limits & Constraints

- **Single Player Interaction**: Only one player can enter focus mode per object at a time
- **VR Priority**: VR players maintain grab access even when web/mobile players are present
- **Rotation Sensitivity**: Drag delta multiplier (1080) may need adjustment per object scale
- **Trigger Zone Coverage**: Interaction triggers must be properly positioned for screen selection
- **Network Latency**: Drag input processing subject to network update rates

## Gotchas / Debugging

- **Grab Permission Race Conditions**: Ensure VR player tracking updates before setting permissions
- **Active Player State**: Always reset active player to server player on focus exit
- **Screen Position Tracking**: Check for undefined dragLastPos before calculating deltas
- **Device Type Detection**: VR detection must happen after player fully enters world
- **Object Reference Validation**: Verify objectToDrag exists and is simulated before manipulation
- **Trigger Interaction**: Web/mobile players need visible trigger zone for screen selection

## See Also

- [The Focused Interaction Manager](07a-focused-interaction-manager.md) - Core focus mode implementation
- [Use tap inputs to interact with keypad](07c-tap-inputs-keypad.md) - Sequential input validation
- [Room B: Secret Code Overview](07-room-b-secret-code.md) - Overall puzzle mechanics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7b-use-drag-inputs-to-rotate-objects (accessed 2025-09-26)
