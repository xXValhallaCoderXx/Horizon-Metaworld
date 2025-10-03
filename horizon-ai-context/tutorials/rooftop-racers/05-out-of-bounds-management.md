---
title: "Module 5 - Player Out of Bounds Management Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-5-player-out-of-bounds-management-systems"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "player_management", "respawning", "bounds_checking", "tutorial"]
tutorial: "rooftop-racers"
summary: "Implementation of out-of-bounds detection and player respawning systems using perimeter triggers and Y-axis checking with dynamic spawn point tracking."
---

# Module 5 - Player Out of Bounds Management Systems

## What & Why

The Out of Bounds (OOB) system prevents players from falling off the racing course and provides automatic respawning at safe locations. Uses **dual detection** via perimeter triggers and Y-axis checking as failsafe, combined with dynamic spawn point tracking that follows player progress along the course.

## Key APIs / Concepts

- **PlayerOOBManager.ts**: Global script managing OOB detection and respawn logic
- **PlayerOOBRespawner.ts**: Individual respawn point registration script
- **SpawnPoint tracking**: Dynamic spawn points that follow player progress
- **Perimeter triggers**: Boundary detection around playable area
- **Y-axis checking**: Height-based fallthrough detection
- **Object pooling**: Respawner assignment from pool for efficiency

### OOB Detection Methods
- **Perimeter trigger**: Boundary breach detection
- **Y-coordinate check**: `OOBYWorldHeight` property for minimum height
- **Interval checking**: `asyncIntervalID` for continuous Y-axis monitoring

## How-To (Recipe)

1. **Set up perimeter triggers** around the playable race area
2. **Define Y-axis threshold** via `OOBYWorldHeight` property
3. **Place spawn points** throughout the course for respawning
4. **Attach PlayerOOBManager.ts** to manager object
5. **Attach PlayerOOBRespawner.ts** to each spawn point entity
6. **Initialize player mapping** for respawner assignment from pool
7. **Register event listeners** for player enter/exit and OOB events
8. **Track spawn points** dynamically as players progress on ground
9. **Handle respawn logic** with fade transition and teleportation

## Minimal Example

```typescript
// PlayerOOBManager.ts - Main OOB management
preStart() {
    // Initialize player tracking
    this.playerMap = new Map();
    
    // Player lifecycle listeners
    this.connectToCodeBlockEvent("playerManager", "onPlayerEnterWorld", this.handleOnPlayerEnterWorld);
    this.connectToCodeBlockEvent("playerManager", "onPlayerExitWorld", this.handleOnPlayerExitWorld);
    
    // OOB event listeners
    this.connectBroadcastEvent("onRegisterOOBSpawner", this.onRegisterOOBSpawner);
    
    // Continuous Y-axis checking
    this.asyncIntervalID = this.async.setInterval(() => {
        this.checkPlayerHeights();
    }, this.checkIntervalMs);
}

handleOnPlayerEnterWorld(player) {
    // Assign respawner from pool
    const respawner = this.objPool.getAvailable();
    
    // Subscribe to OOB events for this player
    const oobSub = Events.onPlayerOutofBounds.subscribe((data) => {
        if (data.player === player) {
            this.respawnPlayer(player);
        }
    });
    
    this.playerMap.set(player.id, { respawner, oobSub });
}

// PlayerOOBRespawner.ts - Spawn point registration
start() {
    // Register this spawn point with the manager
    this.sendBroadcastEvent("onRegisterOOBSpawner", { spawner: this });
}
```

## Limits & Constraints

- **Server execution**: OOB calculations run on server for performance and accuracy
- **Ground tracking**: Spawn points only update when player touches ground
- **Accessible areas**: Avoid areas where players cannot return to main course
- **Respawn height**: Players respawn above last known ground position for safety
- **Pool management**: Respawners must be returned to pool when player exits

## Gotchas / Debugging

- **Dual failsafe**: Use both perimeter triggers AND Y-axis checking
- **Ground contact**: Spawn point tracking requires player to be on ground
- **Server vs client**: Don't give individual OOB controllers to players (slower)
- **Respawn timing**: Game state affects respawn behavior (active game vs lobby)
- **Pool cleanup**: Must return respawners to pool and disconnect subscriptions on player exit
- **Safety margin**: Respawn height above ground prevents immediate re-triggering
- **Interval performance**: Balance check frequency vs performance impact

## See Also

- [Module 2 - Overall Game Manager Systems](./02-game-manager-systems.md) - Game state management affecting respawn behavior
- [Module 4 - Player HUD Systems](./04-player-hud-systems.md) - HUD pool pattern similar to respawner pool
- [Module 6 - Helper and Base Classes](./06-helper-base-classes.md) - Base classes for object pooling

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-5-player-out-of-bounds-management-systems (accessed 2025-09-26)