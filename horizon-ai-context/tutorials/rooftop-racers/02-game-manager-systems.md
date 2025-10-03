---
title: "Rooftop Racers Game Manager Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-2-overall-game-manager-systems"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "rooftop_racers",
    "game_manager",
    "match_manager",
    "race_manager",
    "typescript",
  ]
summary: "Core game management systems for Rooftop Racers - GameManager, MatchManager, RaceManager, and EnvironmentalSoundManager coordination."
tutorial: "rooftop-racers"
---

# Rooftop Racers Game Manager Systems

## What & Why

The core game management systems coordinate all aspects of the racing experience through event-driven architecture. Four primary managers handle game state, player matchmaking, race progression, and environmental audio. All systems communicate via globally defined events in `Events.ts`, creating a loosely coupled, modular architecture.

## Key APIs / Concepts

- **GameManager.ts**: Overall game state control and transitions
- **MatchManager.ts**: Player state management and teleportation between lobby/match areas
- **RaceManager.ts**: Race setup, progress tracking, and completion handling
- **EnvironmentalSoundManager.ts**: State-based audio management for all players
- **GameState enum**: `ReadyForMatch`, `StartingMatch`, `PlayingMatch`, `EndingMatch`, `CompletedMatch`
- **PlayerGameStatus enum**: `Lobby`, `Standby`, `Playing`
- **Event-driven coordination**: All managers send/receive events defined in `Events.ts`
- **SpawnPoint gizmo**: Less disruptive teleportation mechanism
- **Curve-based progression**: Vec3 checkpoint arrays for race path tracking

## How-To (Recipe)

1. **Setup Game State Management**

   - GameManager listens to player events and transitions game state
   - Use `transitGameState()` for coordinated state changes
   - Implement `dispose()` for safe resource cleanup

2. **Configure Match Management**

   - MatchManager maintains `playerMap` with unique IDs and PlayerData
   - Track player states with `PlayerGameStatus` enum
   - Use `getPlayerWithStatus()` for match setup coordination
   - Teleport groups with `teleportPlayersWithStatusToSpawnPoint()`

3. **Implement Race Mechanics**

   - RaceManager creates participant arrays on match start
   - Update race status every 500ms via `raceIntervalUpdateID`
   - Track progress with `initCurve()` checkpoint system
   - Use `updateAllRacerCurveProgress()` for position updates

4. **Add Environmental Audio**
   - Attach audio assets as entity properties
   - Listen for gameplay events from `Events.ts`
   - Stop current audio and start new state audio on transitions
   - Handle countdown audio for game start/end events

## Minimal Example

```typescript
// Game state management pattern
export class GameManager extends hz.Component<typeof GameManager> {
  preStart() {
    // Listen to global events
    this.connectLocalBroadcastEvent(
      Events.onPlayerEnterWorld,
      this.handlePlayerJoin
    );
    this.connectLocalBroadcastEvent(
      Events.onPlayerExitWorld,
      this.handlePlayerLeave
    );
  }

  private transitGameState(newState: GameState) {
    const oldState = this.currentState;
    this.currentState = newState;

    // Broadcast state change to all managers
    this.sendLocalBroadcastEvent(Events.onGameStateChange, {
      fromState: oldState,
      toState: newState,
    });
  }

  dispose() {
    // Safe cleanup - reset game state
    this.transitGameState(GameState.ReadyForMatch);
  }
}
```

## Limits & Constraints

- **Race Update Frequency**: 500ms intervals (modifiable)
- **State Dependencies**: All managers must listen to Events.ts definitions
- **Audio Properties**: Environmental sounds require designer-specified entity properties
- **Disposal Pattern**: GameManager reset triggers on destruction

## Gotchas / Debugging

- **Event Coordination**: All systems depend on Events.ts - ensure consistent event names
- **PlayerMap Tracking**: MatchManager maintains unique player IDs separate from hz.Player references
- **State Transitions**: Use centralized `transitGameState()` to avoid desynchronization
- **Audio Asset Setup**: Environmental sounds need audio properties attached to hosting entity
- **Testing Tools**: Use Debug Console gizmo for in-VR debugging (Build > Gizmos menu)
- **Trail Debugging**: Toggle Trail tool shows race path for development
- **End Testing**: TeleportToEnd tool jumps to course finish for testing

## See Also

- [Module 1 - Setup](./01-setup.md) - Architecture overview and prerequisites
- [Module 3 - Player Movement Systems](./03-player-movement-systems.md) - Player controller integration
- [Module 4 - Player HUD Systems](./04-player-hud-systems.md) - UI coordination with game states
- [Multiplayer Lobby Systems](../multiplayer-lobby/01-setup.md) - Related player management patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-2-overall-game-manager-systems (accessed 2025-09-26)
