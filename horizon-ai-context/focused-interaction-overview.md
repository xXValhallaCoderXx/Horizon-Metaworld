---
title: "Focused Interaction Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7a-the-focused-interaction-manager"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "focused_interaction", "web_mobile", "touch", "local_scripting"]
summary: "Touch-based interaction system for web and mobile players that enables focused screen interactions with hidden standard controls."
---

# Focused Interaction Overview

## What & Why

Focused Interaction API enables touch-based interactions for web and mobile players by entering a special mode where standard controls are hidden and player interactions focus on screen content. This system is essential for implementing complex touch mechanics like object rotation, keypad input, slingshot aiming, and other touch-driven gameplay elements that require precise input control.

## Key APIs / Concepts

- **Focus Mode** - Special interaction state where standard controls are hidden and avatar movement is disabled
- **Touch Input Processing** - Access to touch coordinates, drag paths, and multi-touch data
- **Local Execution Required** - API must run on player's local client for touch data access
- **Manager-per-Player Pattern** - Each player requires dedicated Focused Interaction Manager
- **Server-Client Coordination** - Server handles exit events, local managers handle entry and input
- **Input Data Structure** - `InteractionInfo` array with screen and world coordinates

## How-To (Recipe)

1. **Set Up Server Manager**
   - Listen for `OnPlayerExitedFocusedInteraction` code block event
   - Broadcast exit notification to all local managers for cleanup

2. **Create Local Manager System**
   - Configure script for local execution mode
   - Verify player ownership (not server-owned)
   - Handle focus mode entry, input processing, and exit

3. **Implement Focus Mode Entry**
   - Listen for focus mode start events
   - Call `player.enterFocusedInteractionMode()`
   - Set fixed camera position for optimal interaction view
   - Store reference to active interaction controller

4. **Process Touch Input Data**
   - Listen for input started/moved/ended events
   - Extract relevant interaction data from array structure
   - Forward processed input to controller entities
   - Handle multi-touch preparation (currently single-touch)

5. **Manage Focus Mode Exit**
   - Reset camera to normal mode (usually third-person)
   - Notify active controller of exit
   - Clear controller references and perform cleanup

## Minimal Example

```typescript
// Focus Mode Entry
this.sendNetworkEvent(player, sysEvents.OnStartFocusMode, {
    exampleController: this.entity,
    cameraPosition: new hz.Vec3(0, 5, 10),
    cameraRotation: new hz.Quaternion(0, 0, 0, 1)
});

// Local Manager Input Processing
this.connectLocalBroadcastEvent(
    hz.PlayerControls.onFocusedInteractionInputStarted,
    data => {
        const firstInteraction = data.interactionInfo[0];
        if (firstInteraction.interactionIndex !== 0) return;
        
        if (this.activeFocusedInteractionExample?.exists()) {
            this.sendNetworkEvent(
                this.activeFocusedInteractionExample,
                sysEvents.OnFocusedInteractionInputStarted,
                {interactionInfo: firstInteraction}
            );
        }
    }
);

// Controller Entity Receiving Input
this.connectNetworkEvent(
    this.entity,
    sysEvents.OnFocusedInteractionInputMoved,
    data => {
        const touch = data.interactionInfo;
        // Process touch movement for object rotation, dragging, etc.
        this.handleTouchDrag(touch.screenPosition, touch.worldPosition);
    }
);
```

## System Architecture

### Manager Structure
- **Server Manager**: Handles exit event broadcasting from code block events
- **Local Manager per Player**: Processes touch input and manages focus state
- **Controller Entity**: Receives input data and implements specific interaction behavior
- **Player Manager Integration**: Assigns managers to players using gameplay tags

### Event Flow
1. **Entry**: System sends focus mode start event → Player enters focus mode → Camera fixed
2. **Input**: Touch events → Local manager processes → Forwards to controller
3. **Exit**: Player exits focus mode → Server broadcasts → Local managers cleanup

### Touch Input Structure
```typescript
// InteractionInfo properties
{
    interactionIndex: number,        // Touch ID (0 for primary)
    screenPosition: hz.Vec2,         // Screen coordinates [0,1]
    worldPosition: hz.Vec3,          // 3D world position
    deltaScreenPosition: hz.Vec2,    // Movement since last event
    // Additional touch properties...
}
```

## Common Use Cases

### Object Rotation
- Enter focus mode with fixed camera
- Process drag input to rotate objects
- Apply rotation based on screen movement delta

### Virtual Keypad
- Display keypad interface in focus mode
- Process tap events on virtual buttons
- Send keypad input to game logic

### Slingshot/Projectile Mechanics
- Touch and drag to aim projectile
- Visual feedback during aiming
- Release to fire with calculated trajectory

### Drawing/Painting
- Continuous touch tracking for drawing
- Pressure and speed data for brush effects
- Canvas-based creative interactions

## Integration Patterns

### Camera Coordination
```typescript
// Focus mode often requires fixed camera
this.sendNetworkEvent(this.owningPlayer, sysEvents.OnSetCameraModeFixed, {
    position: data.cameraPosition,
    rotation: data.cameraRotation,
});

// Reset on exit
this.sendNetworkEvent(this.owningPlayer, sysEvents.OnSetCameraModeThirdPerson, null);
```

### Player Manager Assignment
```typescript
// Assign managers using gameplay tags
this.focusedInteractionManagers = this.world.getEntitiesWithTags(["FIManager"]);

// Transfer ownership to players
this.focusedInteractionManagers[playerIndex].owner.set(player);
```

## Multi-Touch Preparation

Current implementation handles single touch but is structured for multi-touch expansion:
- Input data comes as array (`interactionInfo[0]`)
- Code checks `interactionIndex === 0` for primary touch
- Future multi-touch will provide additional array elements
- Controller logic can be extended to handle multiple simultaneous touches

## Limits & Constraints

- **Platform Specific** - Primarily for web and mobile, not VR
- **Local Execution Required** - Touch input only accessible in local scripts
- **Single Touch Current** - Multi-touch support planned but not yet available
- **Manager per Player** - Each player needs dedicated local manager
- **Camera Integration** - Often requires Camera API for optimal user experience

## Gotchas / Debugging

- **Ownership Verification** - Always check script is player-owned before using API
- **Input Array Structure** - Single touch still comes as array, check `interactionIndex`
- **Entity Existence** - Verify controller entity exists before sending input events
- **Exit Cleanup** - Ensure proper camera reset and controller notification on exit
- **Event Targeting** - Send mode events to player, input events to controller
- **Platform Testing** - Test on actual web/mobile devices, not just desktop preview

## From Tutorials

- **[Web and Mobile Development Tutorial](./tutorials/web-mobile-development/07a-focused-interaction-manager.md)** - Complete Focused Interaction Manager implementation
- **[Module 7B - Drag Inputs](./tutorials/web-mobile-development/07b-drag-inputs-rotate-objects.md)** - Object rotation with drag input
- **[Module 7C - Tap Inputs](./tutorials/web-mobile-development/07c-tap-inputs-keypad.md)** - Virtual keypad implementation

## See Also

- [Web and Mobile Development Overview](./web-mobile-development-overview.md) - Cross-platform development concepts
- [Camera APIs Overview](./camera-apis-overview.md) - Camera integration for focus modes
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Local execution patterns
- [Events and Triggers System](./events-triggers-system.md) - Event-driven communication

## Sources

- [Developing for Web and Mobile Players Tutorial - Module 7A](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7a-the-focused-interaction-manager) (Accessed: 2025-09-25)
- [FocusedInteraction API Reference](https://horizon.meta.com/resources/scripting-api/core.focusedinteraction.md/?api_version=2.0.0)