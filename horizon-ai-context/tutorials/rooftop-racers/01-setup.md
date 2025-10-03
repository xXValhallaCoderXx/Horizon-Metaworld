---
title: "Rooftop Racers Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-1-setup"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "rooftop_racers",
    "tutorial_setup",
    "racing_game",
    "multiplayer",
    "typescript",
  ]
summary: "Setup module for Rooftop Racers sample world - a complete multiplayer racing game demonstrating advanced TypeScript systems."
tutorial: "rooftop-racers"
---

# Rooftop Racers Setup

## What & Why

Rooftop Racers is a complete multiplayer traversal racing game sample world that demonstrates advanced game systems in Horizon Worlds. Up to 8 players race across virtual city rooftops using jump, double-jump, boost-jump, and sprint mechanics. This tutorial series provides a comprehensive learning resource for building complete games with production-level architecture.

## Key APIs / Concepts

- **Manager Pattern**: Singleton managers communicate via global events (Events.ts)
- **Environmental Sound Manager**: Ambient audio based on race conditions
- **Game Manager**: Overall game state coordination
- **Race Manager**: Start/stop/process individual races
- **Match Manager**: Player matchmaking and formation management
- **Player Controller Manager**: Input mapping to game actions
- **HUD Manager**: Screen display coordination (elapsed time, position, power-ups)
- **Out of Bounds Manager**: Position monitoring and respawn handling
- **Local vs Server Scripts**: Manager files + Local execution scripts (e.g. HUDManager.ts + HUDLocal.ts)
- **Entity Pooling**: Manager pools assign/reclaim entities per player
- **Ownership Transfer**: Server to player and back for network consistency

## How-To (Recipe)

1. **Access Tutorial World**

   - Open Rooftop Racers in desktop editor
   - Explore in Build/Preview mode to understand structure

2. **Examine Game Systems**

   - Review manager scripts in Scripts panel
   - Navigate Hierarchy panel to find Empty Object hosts
   - Locate scripts behind starting area reference objects

3. **Study Architecture**

   - Events globally defined in Events.ts
   - Manager files handle entity pools and assignment
   - Local scripts execute client-side for individual players
   - SpawnPoint gizmos server-controlled for position tracking

4. **Learning Pathways**
   - **Play**: Experience game to identify interesting systems
   - **Explore**: Use in-world signposts pointing to TypeScript files
   - **Code**: Read comments in TypeScript files
   - **Apply**: Extract systems for use in your own worlds

## Minimal Example

```typescript
// Manager pattern example - singleton communication via events
export class RaceManager extends hz.Component<typeof RaceManager> {
  static propsDefinition = {};

  preStart() {
    // Connect to global events defined in Events.ts
    this.connectLocalBroadcastEvent(hz.LocalEvent, this.onRaceEvent);
  }

  onRaceEvent(data: RaceEventData) {
    // Process race state changes
    // Communicate with other managers via broadcast events
  }
}
```

## Limits & Constraints

- **Players**: Maximum 8 players per race
- **Prerequisites**: Requires familiarity with desktop editor and basic TypeScript
- **Complexity**: Advanced coding - may not suit beginning developers
- **TypeScript Version**: Built with TypeScript 2.0.0

## Gotchas / Debugging

- **Manager Communication**: Events globally defined in Events.ts, except MatchManager provides direct status access
- **Local vs Server**: HUD/PlayerController use manager + local script pattern for client execution
- **Entity Assignment**: Pool entities assigned per player enter, returned on exit
- **Position Tracking**: Out of Bounds uses server control due to position authority
- **Resource Location**: Scripts hosted on Empty Objects behind starting area

## See Also

- [Build Your First Game Tutorial](../build-your-first-game/01-build-your-first-game.md) - Basic concepts foundation
- [Spawning and Pooling Tutorial](../spawning-pooling/01-setup.md) - Entity pool management
- [Multiplayer Lobby Tutorial](../multiplayer-lobby/01-setup.md) - Player coordination patterns
- [Web and Mobile Development Tutorial](../web-mobile-development/01-setup.md) - Cross-platform techniques
- [Module 2 - Game Manager Systems](./02-game-manager-systems.md) - Next module in series

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/horizon-traversal-sample-world/module-1-setup (accessed 2025-09-26)
