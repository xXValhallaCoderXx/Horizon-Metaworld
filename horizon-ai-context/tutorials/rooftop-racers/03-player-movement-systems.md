---
title: "Module 3 - Player Movement Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-3-player-movement-systems"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "scripting", "player_movement", "input_handling", "tutorial"]
tutorial: "rooftop-racers"
summary: "Implementation of advanced player movement systems including double-jump and boost jump mechanics in the Rooftop Racers sample world."
---

# Module 3 - Player Movement Systems

## What & Why

This module implements advanced player movement mechanics beyond standard VR controls, specifically **double-jump** and **boost jump** systems for the Rooftop Racers game. These features enhance traversal gameplay by allowing players to jump twice in mid-air and perform super-jumps when crossing through rings.

## Key APIs / Concepts

- **PlayerControllerManager.ts**: Global script managing player control initialization and ownership
- **PlayerControllerLocal.ts**: Local script handling input processing and movement calculations
- **CtrlPool**: System managing control mappings for individual players
- **hz.EventSubscription**: Network event system for player state synchronization
- **Properties panel**: Interface for configuring jump parameters without code changes

### Movement Properties
- `doubleJumpAmount`: Velocity modifier for second jump
- `boostJumpAmount`: Velocity modifier for boost jump
- `boostJumpAngle`: Angle calculation for boost jump trajectory

## How-To (Recipe)

1. **Attach PlayerControllerManager** to an entity in the world
2. **Configure jump properties** via Properties panel or code defaults
3. **Initialize control systems** in preStart() - register player enter/exit listeners
4. **Register player controls** in start() - add controls to CtrlPool on player entry
5. **Handle input processing** via PlayerControllerLocal for individual players
6. **Calculate movement vectors** using position, velocity, and normalized input
7. **Synchronize state** across network using hz.EventSubscription objects

## Minimal Example

```typescript
// PlayerControllerManager.ts - Core setup
preStart() {
    // Register player lifecycle listeners
    this.connectToCodeBlockEvent("playerManager", "onPlayerEnterWorld", this.onPlayerEnterWorld);
    this.connectToCodeBlockEvent("playerManager", "onPlayerExitWorld", this.onPlayerExitWorld);
    
    // Network event for control data broadcast
    this.netEvtGetPlyrCtrlData = this.connectBroadcastEvent("onGetPlyrCtrlData", this.onGetPlyrCtrlData);
}

// PlayerControllerLocal.ts - Input handling
connectDoubleJumpInputs() {
    // Map jump input and create callback for double-jump mechanics
    const jumpCallback = () => {
        // Calculate velocity and angle for first/second jump
        // Play sound effects
    };
}
```

## Limits & Constraints

- **Platform compatibility**: Input normalization required for VR/mobile/desktop
- **Network synchronization**: State changes must be broadcast to other players
- **Boost jump recharge**: Limited to ring crossings, prevents unlimited usage
- **Local vs server execution**: Script behavior differs based on execution context

## Gotchas / Debugging

- **Control registration timing**: Controls must be registered in CtrlPool when player enters world
- **Player ID lookup**: Use player.id for control removal on player exit
- **Local script context**: Script behavior depends on whether executing on client or server
- **Network event timing**: Player state updates require proper event subscription setup
- **Math dependencies**: Vector calculations rely on MathUtils.ts helper functions

## See Also

- [Module 2 - Overall Game Manager Systems](./02-game-manager-systems.md) - Core game state management
- [Module 4 - Player HUD Systems](./04-player-hud-systems.md) - UI feedback for movement
- [Module 6 - Helper and Base Classes](./06-helper-base-classes.md) - MathUtils.ts vector calculations

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-3-player-movement-systems (accessed 2025-09-26)