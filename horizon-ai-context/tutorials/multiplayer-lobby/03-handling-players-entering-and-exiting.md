---
title: "Handling Players Entering and Exiting"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-3-handling-players-entering-and-exiting"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "player_management", "matchPlayers", "drop_in_gameplay", "player_tracking"]
summary: "Implementation of player tracking system for multiplayer lobbies with drop-in/drop-out gameplay using MatchPlayers utility class."
tutorial: "multiplayer-lobby"
---

# Handling Players Entering and Exiting

## What & Why

Horizon Worlds allows players to join worlds at any time, potentially while games are in progress. This module implements player state tracking to manage lobby vs active match players, preventing disruption to ongoing games while maintaining an inclusive experience for new arrivals.

## Key Concepts

### Player State Management
- **World Players**: All players currently in the world
- **Lobby Players**: Players waiting for the next match  
- **Match Players**: Players currently in an active game
- **State Transitions**: Moving players between lobby and match states

### Drop-In Problem
Players joining mid-game need to be properly categorized without disrupting active matches. The solution separates player populations and manages their transitions.

## Key APIs & Utility Classes

### MatchPlayers Class (from GameUtils.ts)
- `addNewPlayer(player)` - Add player to match tracking
- `removePlayer(player)` - Remove player from match tracking  
- `PlayerList` - Utility for player collection management
- Helper classes for simplified player state tracking

## How-To (Implementation)

1. **Add Player Entry Handling**
   
   Replace TODO comment in PlayerManager:
   ```typescript
   // TODO: when players enter, add them to our list of MatchPlayers
   ```
   
   With:
   ```typescript
   this.matchPlayers.addNewPlayer(player);
   ```

2. **Add Player Exit Handling**
   
   Replace TODO comment in PlayerManager:
   ```typescript
   // TODO: when a player leaves, remove them from our list of MatchPlayers  
   ```
   
   With:
   ```typescript
   this.matchPlayers.removePlayer(player);
   ```

3. **Verify Implementation**
   - Game now tracks all players in world
   - Separates lobby players from match players
   - Maintains accurate player counts across transitions

## Minimal Example

```typescript
// PlayerManager.ts implementation
class PlayerManager extends hz.Component<{}> {
  matchPlayers: MatchPlayers;
  
  // On player enter world
  onPlayerEnter(player: hz.Player) {
    this.matchPlayers.addNewPlayer(player);
  }
  
  // On player leave world  
  onPlayerLeave(player: hz.Player) {
    this.matchPlayers.removePlayer(player);
  }
}
```

## Utility Classes Pattern

The `MatchPlayers` and `PlayerList` classes provide reusable functionality:
- **Encapsulated Logic**: Player management operations abstracted
- **Reusable Design**: Can be copied to other projects
- **Type Safety**: TypeScript interfaces for player collections
- **State Consistency**: Centralized player state management

## Limits & Constraints

- Player state changes limited to add/remove operations
- MatchPlayers utility must be properly initialized
- State consistency depends on proper event handling
- No built-in persistence across world restarts

## Gotchas / Debugging

- **Event Timing**: Ensure player events are properly connected to Code Block Events
- **State Synchronization**: MatchPlayers state must stay consistent across all components
- **Memory Management**: Remove players from tracking when they leave to prevent memory leaks
- **Utility Dependencies**: Ensure GameUtils.ts is properly imported

## See Also

- [Module 2 - Provided Scripts](./02-provided-scripts.md) - Script architecture overview
- [Module 4 - Starting the Game](./04-starting-the-game.md) - Game state transitions
- [GameUtils Implementation](#) - MatchPlayers class details  
- [Player Management Concepts](../../objects-components-overview.md) - General player tracking patterns

## Checkpoint

Module 3 completion:
- ✅ Implemented player entry tracking with `addNewPlayer()`
- ✅ Implemented player exit tracking with `removePlayer()`
- ✅ Game tracks all world players, lobby players, and match players
- ✅ Ready for game state transition logic

The simple utility class approach makes player state management straightforward and reusable across projects.

## Sources

- [Multiplayer Lobby Tutorial - Module 3](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-3-handling-players-entering-and-exiting) (accessed 2025-09-25)