---
title: "Racing Game Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-1-setup"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-2-overall-game-manager-systems"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "racing_games",
    "game_architecture",
    "manager_pattern",
    "multiplayer",
  ]
summary: "Advanced racing game architecture patterns using manager systems, event-driven coordination, and multiplayer state management."
---

# Racing Game Systems

## What & Why

Racing game systems in Horizon Worlds require sophisticated coordination between player movement, game state management, matchmaking, and audio. The manager pattern provides a scalable architecture where singleton managers communicate via global events, enabling modular game systems that can be independently developed and reused across projects.

## Key APIs / Concepts

- **Manager Pattern**: Singleton components coordinating via global events
- **Event-Driven Architecture**: Centralized event definitions in dedicated files
- **State Management**: Game states and player states with enum coordination
- **Entity Pooling**: Manager-controlled entity assignment and reclamation
- **Local vs Server Execution**: Hybrid patterns for performance and consistency
- **Teleportation Systems**: SpawnPoint gizmos for non-disruptive player movement
- **Progress Tracking**: Curve-based position monitoring and race progression

## How-To (Recipe)

1. **Establish Event System**

   - Define all events in central Events.ts file
   - Use consistent event naming across all managers
   - Implement broadcast patterns for loose coupling

2. **Create Manager Hierarchy**

   - GameManager for overall state coordination
   - MatchManager for player lifecycle and teleportation
   - RaceManager for race-specific logic and progression
   - Specialized managers for HUD, audio, boundaries

3. **Implement State Machines**
   - Define clear game states and player states with enums
   - Use centralized transition functions to prevent desynchronization
   - Handle edge cases like player disconnection during races

## Minimal Example

```typescript
// Manager coordination pattern
export class RaceManager extends hz.Component<typeof RaceManager> {
  preStart() {
    // Subscribe to global events
    this.connectLocalBroadcastEvent(
      Events.onGameStateChange,
      this.onGameStateChange
    );
  }

  onGameStateChange(data: { fromState: GameState; toState: GameState }) {
    if (data.toState === GameState.StartingMatch) {
      this.initializeRace();
    }
  }

  private initializeRace() {
    // Broadcast race initialization to other managers
    this.sendLocalBroadcastEvent(Events.onRaceInitialized, {
      participants: this.participants,
    });
  }
}
```

## Limits & Constraints

- **Player Limits**: Typically 8-player maximum for racing games
- **Event Dependencies**: All managers must coordinate through shared event definitions
- **Performance**: Race updates often run on fixed intervals (e.g., 500ms)

## From Tutorials

- [Rooftop Racers Tutorial Series](./tutorials/rooftop-racers/01-setup.md) - Complete racing game implementation with advanced manager systems
- [Multiplayer Lobby Systems](./multiplayer-lobby-systems.md) - Player coordination patterns applicable to racing games

## See Also

- [Events and Triggers System](./events-triggers-system.md) - Event-driven architecture fundamentals
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Performance optimization patterns
- [Multiplayer Lobby Systems](./multiplayer-lobby-systems.md) - Player state management

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-1-setup (accessed 2025-09-26)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-2-overall-game-manager-systems (accessed 2025-09-26)
