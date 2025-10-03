---
title: "Starting the Multiplayer Game"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-4-starting-the-game"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "game_state", "countdown_timer", "player_messaging", "game_start"]
summary: "Implementation of game start sequence with countdown timer, player messaging, and state transition from Ready to Starting."
tutorial: "multiplayer-lobby"
---

# Starting the Multiplayer Game

## What & Why

This module implements the game start sequence triggered when a player steps on the start platform. It handles state transitions, countdown messaging, and coordination between GameManager and PlayerManager components through broadcast events.

## Key Concepts

### Game State Transitions
- **Ready State**: Lobby is waiting for players to start
- **Starting State**: Countdown sequence in progress  
- **Active State**: Match is running (next module)

### Countdown System
- 3-second countdown with player messaging
- UI popups shown to all players
- State management through broadcast events

## Key APIs & Implementation

### StartGameTrigger
- Listens to Code Block Event for player entry
- Broadcasts `gameStart` event to begin sequence
- Connects trigger zones to game logic

### GameManager State Handling  
- Receives `gameStart` broadcast event
- Updates game state to `Starting`
- Manages countdown timer and messaging
- Transitions to `Active` state after countdown

### Player Messaging System
- `this.world.ui.showPopupForEveryone()` - Display messages to all players
- Countdown messages: "Game starts in 3", "Game starts in 2", "Game starts in 1"
- Coordinates player expectations for match start

## How-To (Implementation)

1. **StartGameTrigger Event Broadcasting**
   ```typescript
   // TODO: broadcast the "gameStart" event
   this.sendLocalBroadcastEvent(Events.gameStart, {});
   ```

2. **GameManager State Update**
   ```typescript
   // TODO: update the game state to "Starting"
   this.setGameState(GameState.Starting);
   ```

3. **Countdown Timer Implementation**
   ```typescript
   // Example countdown in handleGameStart()
   this.world.ui.showPopupForEveryone("Game starts in 3", 1);
   // ... additional countdown logic
   ```

## Event Flow Pattern

```typescript
Player steps on trigger → StartGameTrigger broadcasts gameStart
GameManager receives gameStart → Sets state to Starting  
GameManager shows countdown → Transitions to Active state
PlayerManager receives state change → Teleports lobby players to match
```

## Limits & Constraints

- Single start trigger per world
- Fixed 3-second countdown duration
- All lobby players automatically included
- No cancellation mechanism during countdown

## Gotchas / Debugging

- **Event Coordination**: Ensure broadcast event names match between components
- **State Timing**: Countdown must complete before state transition
- **UI Messages**: Popup timing must align with countdown duration
- **Player Tracking**: Only lobby players should be moved to match

## See Also

- [Module 3 - Handling players entering and exiting](./03-handling-players-entering-and-exiting.md) - Player tracking setup
- [Module 5 - Entering the Match](./05-entering-the-match.md) - Match teleportation
- [Events and Triggers System](../../events-triggers-system.md) - Event system patterns

## Sources

- [Multiplayer Lobby Tutorial - Module 4](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-4-starting-the-game) (accessed 2025-09-25)