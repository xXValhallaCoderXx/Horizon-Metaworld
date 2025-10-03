---
title: "Multiplayer Lobby Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-1-setup"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "multiplayer", "lobby_system", "player_management", "drop_in_gameplay"]
summary: "Comprehensive guide to building multiplayer lobby systems for drop-in/drop-out gameplay with player state management and coordinated transitions."
---

# Multiplayer Lobby Systems

## What & Why

Multiplayer lobby systems manage the complex challenge of drop-in/drop-out gameplay in Horizon Worlds. Players can join worlds at any time, potentially during active matches. A well-designed lobby system separates lobby and match populations, coordinates game states, and provides smooth transitions without disrupting ongoing gameplay.

## Key Components

### Core System Architecture
- **PlayerManager**: Tracks all players, manages lobby/match populations, handles teleportation
- **GameManager**: Manages game states, coordinates transitions, handles player messaging  
- **Trigger Scripts**: StartGameTrigger and EndGameTrigger for match boundaries
- **GameUtils**: Shared utilities, enums, and helper classes

### Game State Flow
```
Ready → Starting (countdown) → Active (match) → Ending (notification) → Finished (cleanup) → Ready
```

### Player Population Management
- **World Players**: All players currently in the world
- **Lobby Players**: Players waiting for next match
- **Match Players**: Players currently in active game

## Key APIs & Patterns

### Event-Driven Architecture
- `sendLocalBroadcastEvent()` - Coordinate between components
- `connectLocalBroadcastEvent()` - Listen for state changes
- Code Block Events for player world entry/exit

### Player State Tracking
```typescript
// MatchPlayers utility class patterns
this.matchPlayers.addNewPlayer(player);
this.matchPlayers.removePlayer(player); 
this.matchPlayers.moveToMatch(player);
this.matchPlayers.moveToLobby(player);
```

### Player Teleportation
```typescript
// SpawnPointGizmo usage
this.props.lobbySpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
this.props.matchSpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
```

### UI Coordination
```typescript
// Player messaging
this.world.ui.showPopupForEveryone(message, duration);
```

## Implementation Patterns

### Component Separation of Concerns
- **PlayerManager**: Player tracking and movement
- **GameManager**: State coordination and messaging
- **Trigger Scripts**: Event detection and broadcasting
- **Utils**: Reusable classes and enums

### Entity Properties for World References
```typescript
props: {
  matchSpawnPoint: { type: hz.PropTypes.Entity },
  lobbySpawnPoint: { type: hz.PropTypes.Entity }
}
```

### Utility Classes for Reusability
- `MatchPlayers` class for player collection management
- `PlayerList` for type-safe player arrays
- Shared enums for game states and events

## From Tutorials

The [Multiplayer Lobby Tutorial](./tutorials/multiplayer-lobby/01-setup.md) provides comprehensive implementation:

- [Module 1 - Setup](./tutorials/multiplayer-lobby/01-setup.md) - Environment and prerequisites
- [Module 2 - Provided Scripts](./tutorials/multiplayer-lobby/02-provided-scripts.md) - System architecture
- [Module 3 - Handling players entering and exiting](./tutorials/multiplayer-lobby/03-handling-players-entering-and-exiting.md) - Player tracking
- [Module 4 - Starting the Game](./tutorials/multiplayer-lobby/04-starting-the-game.md) - Match initiation
- [Module 5 - Entering the Match](./tutorials/multiplayer-lobby/05-entering-the-match.md) - Player teleportation
- [Module 6 - Completing the Match and Returning Players](./tutorials/multiplayer-lobby/06-completing-the-match-and-returning-players.md) - Match completion and reset

## Common Extensions

### Enhanced Player Management  
- Selective teleportation (only platform players)
- Minimum player requirements for match start
- Mid-match joining for new arrivals

### Improved Game Control
- Countdown cancellation mechanisms
- Winner name messaging
- Automatic winner declaration for dropouts

### Advanced State Management
- Custom game durations
- Multiple match areas
- Spectator mode support

## Limits & Constraints

- Single lobby per world architecture
- Fixed countdown timings (3 seconds default)
- All-or-nothing player teleportation
- Simple winner-take-all game model

## Gotchas & Debugging

### Event Coordination
- **Event Names**: Must match exactly between broadcast and listener
- **State Timing**: Proper delays between state transitions
- **Component Dependencies**: Ensure proper initialization order

### Player Management
- **Entity Connections**: SpawnPoint entities must be connected in desktop editor
- **Null Safety**: Use optional chaining for entity references
- **State Consistency**: Player tracking state must stay synchronized

### UI & User Experience
- **Message Timing**: Coordinate popup duration with state changes
- **Teleportation Warning**: Always notify before moving players
- **Visual Feedback**: Clear indicators for different game states

## See Also

- [Events and Triggers System](./events-triggers-system.md) - Event coordination patterns
- [Objects and Components Overview](./objects-components-overview.md) - Entity property patterns  
- [Gizmos Overview](./gizmos-overview.md) - SpawnPointGizmo usage
- [TypeScript Development Overview](./typescript-development-overview.md) - Component architecture
- [Player Management Concepts](./objects-components-overview.md) - General player tracking

## Sources

- [Multiplayer Lobby Tutorial Series](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-1-setup) (accessed 2025-09-25)