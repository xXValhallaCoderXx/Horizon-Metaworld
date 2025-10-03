---
title: "Module 4 - Player HUD Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-4-player-hud-systems"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "ui_hud", "player_management", "object_pooling", "tutorial"]
tutorial: "rooftop-racers"
summary: "Implementation of player HUD systems using object pooling to display race position and timing information for each player."
---

# Module 4 - Player HUD Systems

## What & Why

The Player HUD systems create and manage individual heads-up displays for each player showing race position and timing information. Uses **object pooling** to efficiently assign pre-created HUD objects to players as they enter/exit the world, rather than creating/destroying HUDs dynamically.

## Key APIs / Concepts

- **HUDManager.ts**: Global script managing HUD pool and player-to-HUD mapping
- **HUDLocal.ts**: Local script controlling individual player HUD display and updates
- **HUDPool**: Container object managing available HUD entities
- **PlayerHUDCtrlMap**: Mapping system connecting players to their assigned HUDs
- **Object Pooling Pattern**: Pre-created HUD entities reused for performance

### HUD Components
- **HUDLocal object**: Container entity with attached script
- **Hud text1**: Displays current race position during race
- **Hud text2**: Displays running race time

## How-To (Recipe)

1. **Create HUD pool** behind starting area with multiple HUD objects
2. **Attach HUDManager.ts** to empty manager object
3. **Attach HUDLocal.ts** to each HUD entity in pool
4. **Initialize pool and mapping** in HUDManager preStart()
5. **Register player enter/exit listeners** for automatic HUD assignment
6. **Subscribe to network events** in HUDLocal for real-time updates
7. **Handle ownership changes** to initialize player-specific HUD state
8. **Update display** based on race events and timing information

## Minimal Example

```typescript
// HUDManager.ts - Pool management
preStart() {
    // Initialize HUD pool and player mapping
    this.HUDPool = new HUDPool();
    this.PlayerHUDCtrlMap = new Map();
    
    // Handle player lifecycle
    this.connectToCodeBlockEvent("playerManager", "onPlayerEnterWorld", this.onPlayerEnterWorld);
    this.connectToCodeBlockEvent("playerManager", "onPlayerExitWorld", this.onPlayerExitWorld);
    
    // Register HUD objects to pool
    this.connectBroadcastEvent("onRegisterRaceHUD", this.onRegisterRaceHUD);
}

// HUDLocal.ts - Individual HUD control
preStart() {
    // Assign HUD entities from properties
    this.assignHUDEntities();
    
    // Subscribe to race events when ownership changes (assigned to player)
    this.connectToAssetEvent(this.as, "onOwnershipChange", () => {
        this.createEventSubscriptions();
    });
}

createEventSubscriptions() {
    // Subscribe to race state changes
    this.playerGotBoostSub = Events.onPlayerGotBoost.subscribe(this.onPlayerGotBoost);
    this.racePosUpdateSub = Events.onRacePosUpdate.subscribe(this.onRacePosUpdate);
    this.stopRacePosUpdatesSub = Events.onStopRacePosUpdates.subscribe(this.onStopRacePosUpdates);
}
```

## Limits & Constraints

- **Pool size**: Number of HUD objects must match expected concurrent players
- **Entity hierarchy**: HUD objects must be properly structured with text components
- **Network synchronization**: Race position and timing updates require network events
- **Memory management**: HUD objects remain in memory but are reused via pooling
- **Ownership model**: HUD assignment depends on Horizon's entity ownership system

## Gotchas / Debugging

- **Pool initialization**: HUD objects must register with pool before players enter
- **Ownership timing**: HUD initialization occurs on ownership change, not creation
- **Event cleanup**: Must disconnect event subscriptions when returning HUD to pool
- **Search tip**: Use "HUD" in Hierarchy panel to locate HUD objects
- **Reset behavior**: HUD values and position reset when returned to pool
- **Update frequency**: HUD updates tied to `hz.World.onUpdate` for smooth display

## See Also

- [Module 2 - Overall Game Manager Systems](./02-game-manager-systems.md) - Race state management
- [Module 3 - Player Movement Systems](./03-player-movement-systems.md) - Boost jump mechanics displayed in HUD
- [Module 5 - Player Out of Bounds Management](./05-out-of-bounds-management.md) - Position tracking

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-4-player-hud-systems (accessed 2025-09-26)