---
title: "Entering the Match"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-5-entering-the-match"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "player_teleportation", "spawn_points", "match_coordination", "active_gameplay"]
summary: "Implementation of player teleportation from lobby to match area using SpawnPointGizmo and PlayerManager coordination."
tutorial: "multiplayer-lobby"
---

# Entering the Match

## What & Why

This module handles the transition from lobby to active match by teleporting all lobby players to the match area when the game state changes to Active. It uses SpawnPointGizmo entities and entity properties for coordinated player movement.

## Key Concepts

### Player Teleportation
- **SpawnPointGizmo**: Built-in gizmo for player positioning
- **Entity Properties**: Script properties that reference world entities
- **Coordinated Movement**: All lobby players moved simultaneously

### Match Spawn Point Setup
- Match area has dedicated spawn point
- Connected via script properties in desktop editor
- PlayerManager coordinates teleportation

## Key APIs & Components

### SpawnPointGizmo
- `teleportPlayer(player)` - Move player to spawn point location
- `entity.as(hz.SpawnPointGizmo)` - Cast entity to gizmo type
- Built-in collision and positioning handling

### Entity Properties Pattern
```typescript
props: {
  matchSpawnPoint: { type: hz.PropTypes.Entity }
}
```

### PlayerManager State Handling
- Listens for GameState.Active broadcast
- Iterates through lobby players  
- Teleports each to match spawn point
- Updates player tracking data

## How-To (Implementation)

1. **Add Match Spawn Point Property**
   ```typescript
   // TODO: create a prop for the Match Spawn Point  
   matchSpawnPoint: { type: hz.PropTypes.Entity },
   ```

2. **Connect Entity in Desktop Editor**
   - Select Player Manager Object
   - In Script Properties panel
   - Drag Match Spawn Point entity to property field

3. **Implement Player Teleportation**
   ```typescript
   // TODO: respawn the player at the Match Spawn Point location
   this.props.matchSpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
   ```

4. **Update Player Tracking**
   ```typescript
   // TODO: update match MatchPlayers
   this.matchPlayers.moveToMatch(player);
   ```

## Complete Implementation Flow

```typescript
// PlayerManager.ts - handling Active game state
handleGameStateChange(state: GameState) {
  if (state === GameState.Active) {
    // Move all lobby players to match
    for (const player of this.lobbyPlayers) {
      this.props.matchSpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
      this.matchPlayers.moveToMatch(player);
    }
  }
}
```

## Entity Property Pattern

This tutorial demonstrates the standard pattern for connecting world entities to scripts:
1. **Declare Property**: Define PropTypes.Entity in script props
2. **Connect in Editor**: Use desktop editor UI to link entity
3. **Cast and Use**: Cast to specific gizmo type and call methods

## Limits & Constraints

- One spawn point per match area
- All lobby players teleported simultaneously  
- No individual player choice in teleportation
- Spawn point must be properly positioned in match area

## Gotchas / Debugging

- **Entity Connection**: Ensure spawn point entity is connected in desktop editor
- **Gizmo Casting**: Use `.as(hz.SpawnPointGizmo)` before calling teleportPlayer
- **Null Checking**: Use optional chaining (`?.`) for entity safety
- **Player State**: Ensure players are properly tracked before teleportation

## See Also

- [Module 4 - Starting the Game](./04-starting-the-game.md) - Game start countdown
- [Module 6 - Completing the Match and Returning Players](./06-completing-the-match-and-returning-players.md) - Return teleportation
- [Gizmos Overview](../../gizmos-overview.md) - SpawnPointGizmo details
- [Objects and Components Overview](../../objects-components-overview.md) - Entity property patterns

## Sources

- [Multiplayer Lobby Tutorial - Module 5](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-5-entering-the-match) (accessed 2025-09-25)