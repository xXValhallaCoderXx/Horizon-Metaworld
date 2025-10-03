---
title: "Use Tap Inputs to Interact with a Keypad"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7c-use-tap-inputs-to-interact-with-a-keypad"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "web_mobile", "focused_interaction", "raycast", "keypad"]
tutorial: "web-mobile-development"
summary: "Implement cross-platform keypad interaction using tap inputs, raycasting, and multi-script architecture for sequential code entry validation."
---

# Use Tap Inputs to Interact with a Keypad

## What & Why

Completes the Secret Code puzzle room by implementing a multi-platform keypad system for code entry. Combines VR collision detection with web/mobile tap-to-raycast mechanics, demonstrating advanced focused interaction patterns and script communication architecture for complex UI elements.

## Key APIs / Concepts

### Multi-Script Architecture

- `RoomB_Keypad` - Manages raycast, button events, and code validation
- `RoomB_KeypadButton` - Handles individual button interactions and animations
- `sysEvents.OnButtonPressed` - Custom event for keypad communication

### Raycast-Based Interaction

- `hz.RaycastGizmo.raycast()` - World-space tap position to entity detection
- `interaction.worldRayOrigin/worldRayDirection` - 3D ray from 2D screen input
- `sysEvents.OnEntityTapped` - Triggered entity selection event

### Cross-Platform Input Handling

- `hz.CodeBlockEvents.OnPlayerCollision` - VR physical button presses
- `sysEvents.OnFocusedInteractionInputEnded` - Web/mobile tap completion
- Dynamic camera FOV adjustment for close-up keypad interaction

## How-To (Recipe)

### 1. Implement Button Response System

- Handle VR collision events for physical button pressing
- Listen for `OnEntityTapped` events for web/mobile interactions
- Create unified button press handler with visual feedback and timing

### 2. Set Up Keypad Focus Mode

- Configure focused interaction with close camera positioning
- Adjust field of view for optimal keypad visibility
- Implement proper entry/exit state management

### 3. Process Tap Inputs with Raycasting

- Listen for `OnFocusedInteractionInputEnded` events
- Convert screen coordinates to world-space rays using interaction data
- Perform raycast to determine which button entity was selected

### 4. Implement Code Validation Logic

- Track sequential digit entry with maximum length constraints
- Compare entered code against expected solution
- Provide visual feedback and puzzle completion notification

## Minimal Example

```typescript
// Keypad raycast-based tap detection
this.connectNetworkEvent(this.entity, sysEvents.OnFocusedInteractionInputEnded,
  (data) => {
    const interaction = data.interactionInfo;
    if (interaction?.interactionIndex === 0 && this.raycastGizmo) {
      // Convert screen tap to 3D world ray
      const hit: hz.RaycastHit | null = this.raycastGizmo.raycast(
        interaction.worldRayOrigin,
        interaction.worldRayDirection
      );

      if (hit?.targetType === hz.RaycastTargetType.Entity && hit.target) {
        // Notify the tapped button
        this.sendNetworkEvent(hit.target, sysEvents.OnEntityTapped, null);
      }
    }
  }
);

// Button unified press handling
private HandleButtonPress(keypad: hz.Entity) {
  if (this.isPushed) return;

  this.isPushed = true;
  this.entity.position.set(this.pushedPos);  // Visual feedback

  // Notify keypad of button press
  this.sendNetworkEvent(keypad, sysEvents.OnButtonPressed, {
    number: this.props.number
  });

  // Reset button after delay
  this.async.setTimeout(() => this.ResetButton(), 300);
}
```

## Limits & Constraints

- **Single Active Player**: Only one player can interact with keypad at a time
- **Code Length**: Fixed 4-digit maximum with automatic validation trigger
- **Raycast Precision**: Requires properly configured raycast gizmo for accurate hit detection
- **FOV Adjustment**: Camera field of view changes may cause disorientation
- **Button Timing**: 300ms button reset delay prevents rapid multiple presses

## Gotchas / Debugging

- **Entity Hierarchy**: Ensure raycast targets are properly configured on button entities
- **Interaction Index**: Always verify `interactionIndex === 0` for primary input
- **Ray Direction**: Check that `worldRayOrigin` and `worldRayDirection` are valid before raycasting
- **Event Ordering**: Button press events must complete before code validation triggers
- **FOV Reset**: Always reset camera FOV when exiting focus mode to prevent permanent changes
- **Script References**: Verify keypad entity references are properly set in button props

## See Also

- [Use drag inputs to rotate objects](07b-drag-inputs-rotate-objects.md) - Object manipulation mechanics
- [The Focused Interaction Manager](07a-focused-interaction-manager.md) - Core focus mode system
- [Room B: Secret Code Overview](07-room-b-secret-code.md) - Complete puzzle mechanics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7c-use-tap-inputs-to-interact-with-a-keypad (accessed 2025-09-26)
