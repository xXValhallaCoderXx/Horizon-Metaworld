---
title: "Events and Triggers System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting"
last_updated: "2025-09-26T12:00:00Z"
tags:
  ["horizon_worlds", "events", "triggers", "codeblock_events", "multiplayer"]
summary: "Event-driven communication system in Horizon Worlds using Code Block Events for player actions, world state changes, and component coordination."
---

## What & Why

Event system enables reactive programming in Horizon Worlds, allowing components to respond to player actions, world changes, and custom triggers. Critical for multiplayer coordination, game state management, and decoupled component communication. Implements Observer pattern for scalable, maintainable world logic.

## Key APIs / Concepts

- **connectCodeBlockEvent**: Subscribe components to built-in world events
- **hz.CodeBlockEvents**: Enumeration of available built-in event types
- **OnPlayerEnterWorld**: Event fired when players join the world
- **OnPlayerExitWorld**: Event fired when players leave the world
- **OnPlayerEnterTrigger**: Event fired when player enters trigger zone
- **OnPlayerCollision**: Event fired when player collides with entity
- **Event Callbacks**: Functions executed when subscribed events occur
- **Event Parameters**: Data passed to callbacks (player objects, collision data)
- **this.entity**: Reference to entity hosting the subscribing component
- **Local Events**: TypeScript-specific events for direct component communication (see [Local Events Overview](./local-events-overview.md))
- **Broadcast Events**: Events published to all listening components
- **Entity Events**: Events sent directly to specific entities

## How-To (Recipe)

1. **Subscribe to Built-in Events**

   - Use `this.connectCodeBlockEvent()` in component `start()` method
   - Provide: entity reference, event type, callback function
   - Example: `this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterWorld, callback)`

2. **Handle Event Data**

   - Accept event parameters in callback functions
   - For player events: receive `hz.Player` objects with properties
   - Extract player data: `player.id`, `player.name.get()`
   - Store or process event data as needed

3. **Implement Callback Functions**

   - Keep callback functions minimal and focused
   - Delegate complex logic to separate private methods
   - Handle edge cases (duplicate events, invalid states)
   - Use console logging for debugging event flow

4. **Coordinate Multiple Events**
   - Subscribe to multiple event types in single component
   - Share data structures across event handlers
   - Validate event context before processing
   - Consider event ordering and timing implications

## Minimal Example

```typescript
import * as hz from "horizon/core";

class EventHandler extends hz.Component<typeof EventHandler> {
  static propsDefinition = {};

  private playerCount: number = 0;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) => {
        this.handlePlayerEnter(player);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      (player: hz.Player) => {
        this.handlePlayerExit(player);
      }
    );
  }

  private handlePlayerEnter(player: hz.Player): void {
    this.playerCount++;
    console.log(
      `Player ${player.name.get()} entered. Count: ${this.playerCount}`
    );
  }

  private handlePlayerExit(player: hz.Player): void {
    this.playerCount--;
    console.log(
      `Player ${player.name.get()} exited. Count: ${this.playerCount}`
    );
  }
}

hz.Component.register(EventHandler);
```

## Limits & Constraints

- **OnPlayerExitWorld**: Does not fire when exiting Preview mode
- **Event Scope**: Code Block Events are world-level, not entity-specific
- **Callback Context**: Event handlers run in component context only
- **Performance**: Avoid heavy processing in callback functions
- **Testing**: Some events require multiple players to test properly

## Gotchas / Debugging

- Player exit events don't trigger during Preview mode exit
- Events only fire for components attached to world entities
- Use console logging to verify event subscription and firing
- Callback functions should delegate to separate methods for maintainability
- Check for duplicate events and implement guards as needed
- Preview mode player enter fires when entering simulation, not just multiplayer

## From Tutorials

- [Module 2 - Intro to Scripting](./tutorials/build-your-first-game/02-intro-to-scripting.md): Player enter/exit event handling, Map-based player tracking
- [Module 4 - Broadcast Events](./tutorials/build-your-first-game/04-broadcast-events.md): Local events, sendLocalBroadcastEvent, connectLocalBroadcastEvent patterns
- [Module 6 - Game Start and Collection](./tutorials/build-your-first-game/06-game-start-and-collection.md): Trigger zones, OnPlayerEnterTrigger, OnPlayerCollision events
- [Sim Tycoon Tutorial](./tutorials/sim-tycoon/08-world-game-management.md): Complex event coordination between player management, resource nodes, tools, and shop systems

## See Also

- [Local Events Overview](./local-events-overview.md): Detailed guide to TypeScript local events
- [World Update Events](./world-update-events.md): Frame-based events for animations and physics
- [CodeBlock Events Overview](./codeblock-events-overview.md): Cross-script communication and built-in events
- [Events Best Practices](./events-best-practices.md): Event management patterns and optimization
- [TypeScript Development Overview](./typescript-development-overview.md)
- [Objects and Components Overview](./objects-components-overview.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting (accessed 2025-09-25)
