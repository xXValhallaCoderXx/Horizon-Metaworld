---
title: "Module 6 - Helper and Base Classes"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-6-helper-and-base-classes"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "architecture", "base_classes", "utilities", "events", "tutorial"]
tutorial: "rooftop-racers"
summary: "Overview of helper classes and utility functions providing reusable functionality including events, math utilities, object pooling, and trigger-based game mechanics."
---

# Module 6 - Helper and Base Classes

## What & Why

These helper classes and utilities provide reusable functionality throughout the Rooftop Racers game. They implement common patterns like **event management**, **object pooling**, **math calculations**, and **trigger-based interactions**. These files are designed for portability and can be easily adapted to other Horizon Worlds projects.

## Key APIs / Concepts

- **Events.ts**: Centralized global event definitions and management
- **GameUtils.ts**: Game-wide enums, constants, entity pools, and curve functions
- **MathUtils.ts**: Advanced mathematical helper functions
- **PlayerEventTriggerBase.ts**: Base class for player trigger interactions
- **Specialized Triggers**: Extended classes for specific game mechanics
- **LocalEvent vs NetworkEvent**: Client-side vs network-broadcast events

### Reusable Utilities
- **Object pooling**: Entity management for performance
- **Curve visualization**: Advanced curve functions and visualizer
- **Trigger inheritance**: Base class pattern for trigger behaviors

## How-To (Recipe)

1. **Define global events** in Events.ts as LocalEvent or NetworkEvent
2. **Import Events.ts** in any script that sends/receives events
3. **Use GameUtils.ts** for enums, constants, and object pooling
4. **Extend PlayerEventTriggerBase.ts** for custom trigger behaviors
5. **Reference MathUtils.ts** for complex mathematical operations
6. **Hide tutorial objects** using HideTeachingObjects.ts in production
7. **Organize triggers** by functionality (victory, OOB, boost, etc.)

## Minimal Example

```typescript
// Events.ts - Centralized event definitions
export const Events = {
    // Local events (client-side only)
    onPlayerGotBoost: new hz.LocalEvent<{ player: hz.Player }>(),
    
    // Network events (broadcast to all)
    onRacePosUpdate: new hz.NetworkEvent<{ player: hz.Player, position: number }>(),
    
    // Game state events
    onStopRacePosUpdates: new hz.LocalEvent<{}>()
};

// Usage in other scripts
import { Events } from './Events';

// Emit event
Events.onPlayerGotBoost.emit({ player: this.player });

// Subscribe to event
const subscription = Events.onRacePosUpdate.subscribe((data) => {
    console.log(`Player ${data.player.name} is in position ${data.position}`);
});

// PlayerEventTriggerBase.ts - Base trigger class
export abstract class PlayerEventTriggerBase extends hz.Component<typeof PlayerEventTriggerBase> {
    onPlayerEnterTrigger(player: hz.Player) {
        // Override in subclasses
    }
    
    onPlayerExitTrigger(player: hz.Player) {
        // Override in subclasses  
    }
}
```

## Limits & Constraints

- **Event organization**: All events must be defined in Events.ts, not scattered across files
- **Import requirements**: Scripts using events must import Events.ts
- **Local vs Network**: Choose appropriate event type for scope (LocalEvent vs NetworkEvent)
- **Portability**: GameUtils.ts and MathUtils.ts designed for reuse across projects
- **Tutorial objects**: Teaching/dev objects should be hidden in production builds

## Gotchas / Debugging

- **Event import**: Missing Events.ts import causes undefined event errors
- **Event scope**: LocalEvent only works on client, NetworkEvent broadcasts to all
- **Reference tracking**: Use "Go to References" in VS Code to see usage patterns
- **Base class extension**: Custom triggers must extend PlayerEventTriggerBase properly
- **Pool management**: Object pools require proper initialization and cleanup
- **Dev vs production**: Ensure tutorial objects are hidden in published worlds
- **Curve visualization**: Toggle trail triggers control visual debugging aids

## Specialized Trigger Classes

- **PlayerVictoryTrigger**: Sets player victory state
- **PlayerRegisterMatchTrigger**: Handles lobby player match join/leave
- **ToggleTrailTrigger**: Controls CurveVisualizer display
- **TeleportToSpawnPointTrigger**: Teleports player to spawn point
- **PlayerBoostPowerUpTrigger**: Enables boost jump ability
- **PlayerOOBTrigger**: Triggers out-of-bounds respawn
- **ToggleGatesOnGameStateChange**: Controls race start gates

## See Also

- [Module 2 - Overall Game Manager Systems](./02-game-manager-systems.md) - Uses Events.ts for game state management
- [Module 3 - Player Movement Systems](./03-player-movement-systems.md) - Uses MathUtils.ts for vector calculations
- [Module 4 - Player HUD Systems](./04-player-hud-systems.md) - Uses object pooling pattern from GameUtils.ts
- [Module 5 - Player Out of Bounds Management](./05-out-of-bounds-management.md) - Uses PlayerOOBTrigger and base classes

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-6-helper-and-base-classes (accessed 2025-09-26)