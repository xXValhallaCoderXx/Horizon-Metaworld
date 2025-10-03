---
title: "Module 7A - The Focused Interaction Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7a-the-focused-interaction-manager"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "web_mobile", "tutorial", "focused_interaction", "touch", "local_scripting"]
tutorial: "web-mobile-development"
summary: "Build a Focused Interaction Manager system that enables touch-based interactions for web and mobile players while hiding standard controls and processing input data."
---

# Module 7A - The Focused Interaction Manager

## What & Why

The Focused Interaction Manager enables touch-based interactions for web and mobile players by entering Focus mode, where standard controls are hidden and player interactions are focused on screen content. The system processes touch input data and forwards it to appropriate entities for actions like object rotation, keypad input, or other touch-based mechanics.

## Key APIs / Concepts

- `player.enterFocusedInteractionMode()` - Enters Focus mode (hides standard controls)
- `hz.PlayerControls.onFocusedInteractionInput*` events - Touch input events
- `hz.CodeBlockEvents.OnPlayerExitedFocusedInteraction` - Player exit event
- **Focus mode characteristics**: Standard controls hidden, avatar controls disabled, touch data accessible
- **Local execution required** - API must run on player's local client
- **Server-client coordination** - Server script broadcasts exit events to local managers
- **Input data structure**: `interactionInfo` array with `interactionIndex` for multi-touch support

## How-To (Recipe)

1. **Set Up Server Manager**
   - Create server script to listen for `OnPlayerExitedFocusedInteraction`
   - Broadcast exit event to all local managers for cleanup

2. **Create Local Manager per Player**
   - Set script execution mode to Local
   - Check ownership (must be player-owned, not server)
   - Handle entry, input processing, and exit

3. **Implement Focus Mode Entry**
   - Listen for `OnStartFocusMode` event
   - Store reference to active interaction controller
   - Call `player.enterFocusedInteractionMode()`
   - Set camera to fixed position for optimal viewing

4. **Process Touch Inputs**
   - Listen for input started/moved/ended events
   - Extract first interaction (multi-touch future-proofed)
   - Forward input data to active controller entity

5. **Handle Focus Mode Exit**
   - Listen for exit broadcast event
   - Reset camera to third-person mode
   - Notify active controller of exit
   - Clear active controller reference

6. **Assign Managers via Player Manager**
   - Tag local managers with gameplay tags
   - Use Player Manager to transfer ownership on entry/exit

## Minimal Example

### Server Manager Script
```typescript
import * as hz from 'horizon/core';
import {sysEvents} from 'sysEvents';

class sysFocusedInteractionManagerServer extends hz.Component {
    start() {
        this.connectCodeBlockEvent(
            this.entity,
            hz.CodeBlockEvents.OnPlayerExitedFocusedInteraction,
            (player: hz.Player) => {
                this.sendNetworkBroadcastEvent(sysEvents.OnPlayerExitedFocusMode, {
                    player: player,
                });
            }
        );
    }
}
```

### Local Manager Script
```typescript
import * as hz from 'horizon/core';
import {sysEvents} from 'sysEvents';

class sysFocusedInteractionManagerLocal extends hz.Component {
    private ownedByServer: boolean = true;
    private owningPlayer!: hz.Player;
    private activeFocusedInteractionExample?: hz.Entity;

    start() {
        this.owningPlayer = this.entity.owner.get();
        this.ownedByServer = this.owningPlayer === this.world.getServerPlayer();
        if (this.ownedByServer) return; // Local clients only

        this.setupFocusModeListeners();
        this.setupInputListeners();
    }

    private setupFocusModeListeners() {
        // Enter Focus mode
        this.connectNetworkEvent(
            this.owningPlayer,
            sysEvents.OnStartFocusMode,
            data => {
                this.activeFocusedInteractionExample = data.exampleController;
                this.owningPlayer.enterFocusedInteractionMode();
                
                // Set fixed camera
                this.sendNetworkEvent(this.owningPlayer, sysEvents.OnSetCameraModeFixed, {
                    position: data.cameraPosition,
                    rotation: data.cameraRotation,
                });
            }
        );

        // Exit Focus mode
        this.connectNetworkBroadcastEvent(sysEvents.OnPlayerExitedFocusMode, data => {
            if (data.player !== this.owningPlayer) return;
            
            // Reset camera
            this.sendNetworkEvent(this.owningPlayer, sysEvents.OnSetCameraModeThirdPerson, null);
            
            // Notify controller
            if (this.activeFocusedInteractionExample) {
                this.sendNetworkEvent(
                    this.activeFocusedInteractionExample,
                    sysEvents.OnExitFocusMode,
                    {player: this.owningPlayer}
                );
                this.activeFocusedInteractionExample = undefined;
            }
        });
    }

    private setupInputListeners() {
        // Touch input started
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

        // Similar setup for moved and ended events...
    }
}
```

### Starting Focus Mode
```typescript
// Trigger Focus mode entry
this.sendNetworkEvent(player, sysEvents.OnStartFocusMode, {
    exampleController: this.entity,
    cameraPosition: new hz.Vec3(0, 5, 10),
    cameraRotation: new hz.Quaternion(0, 0, 0, 1)
});
```

## Focus Mode Events

| Event | Purpose | Parameters |
|-------|---------|------------|
| `OnStartFocusMode` | Enter Focus mode | `exampleController`, `cameraPosition`, `cameraRotation` |
| `OnExitFocusMode` | Exit Focus mode | `player` |
| `OnPlayerExitedFocusMode` | Broadcast exit notification | `player` |
| `OnFocusedInteractionInputStarted` | Touch input began | `interactionInfo` |
| `OnFocusedInteractionInputMoved` | Touch input moved | `interactionInfo` |
| `OnFocusedInteractionInputEnded` | Touch input ended | `interactionInfo` |

## Input Data Structure

```typescript
// InteractionInfo contains:
{
    interactionIndex: number,    // Touch ID (0 for first touch)
    screenPosition: hz.Vec2,     // Screen coordinates
    worldPosition: hz.Vec3,      // 3D world position
    // Additional touch properties...
}
```

## System Architecture

1. **Server Manager**: Broadcasts player exit events to all local managers
2. **Local Manager per Player**: Handles Focus mode and input processing for individual players
3. **Controller Entity**: Receives input data and implements specific interaction behavior
4. **Event Flow**: Entry → Input Processing → Exit with proper cleanup

### Multi-Touch Preparation

Current implementation handles single touch but is prepared for multi-touch:
- `interactionInfo` is an array structure
- Code checks `interactionIndex === 0` for first touch
- Future multi-touch support requires handling additional array elements

## Player Manager Integration

### Tagging System
- Apply gameplay tag (e.g., "FIManager") to local Focused Interaction Managers
- Use tags to identify managers for ownership assignment

### Assignment Logic
```typescript
// In Player Manager
private registerPlayer(player: hz.Player) {
    let playerIndex = player.index.get();
    
    if (playerIndex < this.focusedInteractionManagers.length) {
        this.focusedInteractionManagers[playerIndex].owner.set(player);
    }
}
```

## Limits & Constraints

- **Local execution required** - API only works in local scripts
- **One manager per player** - Each player needs dedicated local manager
- **Single touch current** - Multi-touch support planned but not yet available
- **Platform-specific** - Primarily for web and mobile, not VR
- **Camera control integration** - Often requires Camera API for optimal experience

## Gotchas / Debugging

- **Ownership Check**: Always verify script is player-owned before executing Focus API
- **Server-Client Split**: Server manager handles exit events, local managers handle everything else
- **Input Array Structure**: Even single touch comes as array - always check `interactionIndex`
- **Entity Existence**: Check `entity?.exists()` before sending events to controllers
- **Exit Cleanup**: Ensure camera reset and controller notification on Focus mode exit
- **Event Targeting**: Send events to `owningPlayer` for mode changes, to `controller` for input data
- **Manager Count**: Ensure enough local managers for maximum player count in world

## Use Cases

- **Object Rotation**: Drag to rotate 3D objects on touch screens
- **Keypad Input**: Tap virtual buttons for code entry
- **Slingshot Mechanics**: Touch and drag for projectile aiming
- **Puzzle Interactions**: Complex touch-based puzzle solving
- **Drawing/Sketching**: Touch-based drawing interfaces

## See Also

- [How to Use Focused Interaction](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/typescript-apis-for-mobile/focused-interaction/) - Focused Interaction API documentation
- [Local Scripting and Entity Ownership](../local-scripting-ownership.md) - Local scripting concepts
- [Module 4 - Camera Manager](./04-camera-manager.md) - Camera integration for Focus mode
- [Module 7B - Drag Inputs](./07b-drag-inputs-rotate-objects.md) - Drag input implementation example

## Sources

- [Developing for Web and Mobile Players Tutorial - Module 7A The Focused Interaction Manager](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7a-the-focused-interaction-manager) (Accessed: 2025-09-25)
- [FocusedInteraction API Reference](https://horizon.meta.com/resources/scripting-api/core.focusedinteraction.md/?api_version=2.0.0)