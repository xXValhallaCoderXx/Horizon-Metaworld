---
title: "Completing the Match and Returning Players"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-6-completing-the-match-and-returning-players"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "game_completion", "player_return", "lobby_teleportation", "game_reset", "state_management"]
summary: "Implementation of match completion handling with player teleportation back to lobby and game state reset for continuous gameplay."
tutorial: "multiplayer-lobby"
---

# Completing the Match and Returning Players

## What & Why

This final module completes the multiplayer lobby cycle by handling match completion, teleporting players back to the lobby, and resetting the game state for continuous gameplay. The simple race-to-target game demonstrates the complete multiplayer loop.

## Key Game Completion Flow

### Match End Detection
- **End Game Trigger Gizmo**: Detects when first player reaches target
- **EndGameTrigger Script**: Broadcasts game completion event
- **Winner Detection**: First player to trigger wins the match

### State Transition Sequence
1. **Ending State**: Brief notification period with UI message
2. **Finished State**: Triggers player teleportation back to lobby  
3. **Ready State**: Game reset for next match

### Player Return Process
- All match players teleported to Lobby Spawn Point
- Player tracking updated (match → lobby)
- Game state reset to Ready for next round

## Key APIs & Implementation

### EndGameTrigger Event Broadcasting
```typescript
// TODO: broadcast the "gameOver" event
this.sendLocalBroadcastEvent(Events.gameOver, {});
```

### GameManager State Transitions
```typescript
// TODO: update the game state to "Ending"
this.setGameState(GameState.Ending);
```

### Game Over UI Messaging
```typescript
this.world.ui.showPopupForEveryone(
  `Game Over! \n Teleporting back to Lobby`, 
  3
);
```

### Lobby Spawn Point Setup
```typescript
// TODO: create a prop for the Lobby Spawn Point
lobbySpawnPoint: { type: hz.PropTypes.Entity },
```

## How-To (Complete Implementation)

### 1. End Game Event Broadcasting
```typescript
// EndGameTrigger.ts
this.sendLocalBroadcastEvent(Events.gameOver, {});
```

### 2. Game State Management
```typescript
// GameManager.ts - handle game over
this.setGameState(GameState.Ending);

// After 3-second delay
this.setGameState(GameState.Finished);
```

### 3. Player Return Implementation  
```typescript
// PlayerManager.ts - lobby teleportation
this.props.lobbySpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
this.matchPlayers.moveToLobby(player);
```

### 4. Game State Reset
```typescript
// PlayerManager.ts - after all players returned
this.sendLocalBroadcastEvent(Events.setGameState, {
  newState: GameState.Ready
});
```

## Complete Match Cycle

```
Ready → Player triggers start → Starting (countdown) → 
Active (match running) → Ending (winner notification) → 
Finished (teleport players) → Ready (cycle repeats)
```

## UI Messaging Strategy

- **Game Start**: 3 messages for 1 second each ("3", "2", "1")
- **Game End**: 1 message for 3 seconds (longer notification)
- **Teleportation Warning**: Always notify before moving players

## Testing & Validation

### Visit Mode Testing
- Enter world in Visit mode (not Preview)
- Test complete match cycle repeatedly
- Verify state transitions work correctly
- Confirm UI messages display properly

### Multiplayer Validation
- Test with multiple players
- Verify winner detection works
- Ensure all players return to lobby
- Check game resets properly

## Extension Ideas

The tutorial suggests several enhancements:
- **Selective Teleportation**: Only move players on start platform
- **Minimum Players**: Require certain number to start match
- **Mid-Match Joining**: Allow new players to join active matches  
- **Countdown Cancellation**: Cancel if player leaves start platform
- **Winner Messaging**: Display winner name to all players
- **Auto-Win**: Declare winner if others leave match

## Limits & Constraints

- Simple winner-take-all game model
- All match players returned simultaneously
- Fixed 3-second notification period
- Automatic game reset (no manual control)

## Gotchas / Debugging

- **Entity Connection**: Connect Lobby Spawn Point in desktop editor
- **State Timing**: Ensure proper delays between state transitions
- **Player Tracking**: Verify all players properly moved between states
- **Event Names**: Match broadcast event names across components
- **UI Timing**: Coordinate message duration with state changes

## See Also

- [Module 1 - Setup](./01-setup.md) - Tutorial foundation
- [Module 5 - Entering the Match](./05-entering-the-match.md) - Match entry teleportation
- [Events and Triggers System](../../events-triggers-system.md) - Event coordination patterns
- [Gizmos Overview](../../gizmos-overview.md) - SpawnPointGizmo usage

## Checkpoint

Tutorial completion:
- ✅ Complete multiplayer lobby system implemented
- ✅ Player state management working
- ✅ Game start/end cycle functional  
- ✅ Continuous gameplay loop established
- ✅ Foundation ready for extensions

Congratulations! You've built a complete multiplayer lobby system that handles drop-in/drop-out gameplay with proper state management and player coordination.

## Sources

- [Multiplayer Lobby Tutorial - Module 6](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-6-completing-the-match-and-returning-players) (accessed 2025-09-25)