---
title: "Module 4 - Broadcast Events"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-4-broadcast-events"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "events", "broadcast", "game_manager"]
summary: "Implement local broadcast events for game state communication, enabling decoupled component interaction through event publishing and subscription."
tutorial: "build-your-first-game"
---

# Module 4 - Broadcast Events

## What & Why

Instead of GameManager directly managing references to all other components, we implement broadcast events for decoupled communication. When game state changes, GameManager emits events that any component can subscribe to, creating a flexible event-driven architecture.

## Key APIs / Concepts

- `hz.LocalEvent<T>` - Creates typed local event with custom payload
- `sendLocalBroadcastEvent(event, data)` - Publishes event with data payload
- `connectLocalBroadcastEvent(event, callback)` - Subscribes to event with callback handler
- Event payload typing - Strongly typed data passed with events (e.g., `{state: GameState}`)

## How-To (Recipe)

1. **Create outbound event** - Define `hz.LocalEvent` to broadcast state changes
2. **Create inbound event** - Define `hz.LocalEvent` to receive state change requests
3. **Export events** - Make events available to other components via exports
4. **Emit on state change** - Call `sendLocalBroadcastEvent()` in `setGameState()`
5. **Subscribe to requests** - Use `connectLocalBroadcastEvent()` in `start()`

## Minimal Example

```typescript
import * as hz from "horizon/core";

// Event definitions (exported for other components)
export const gameStateChanged = new hz.LocalEvent<{ state: GameState }>(
  "gameStateChanged"
);
export const setGameState = new hz.LocalEvent<{ state: GameState }>(
  "setGameState"
);

class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {};
  private gameState!: GameState;

  start() {
    this.setGameState(GameState.Ready);

    // Subscribe to state change requests
    this.connectLocalBroadcastEvent(
      setGameState,
      (data: { state: GameState }) => {
        this.setGameState(data.state);
      }
    );
  }

  public setGameState(state: GameState): void {
    if (this.gameState === state) return;

    // State validation logic...
    this.gameState = state;

    // Broadcast state change to all subscribers
    this.sendLocalBroadcastEvent(gameStateChanged, { state: this.gameState });
  }
}

export enum GameState {
  "Ready",
  "Playing",
  "Finished",
}
```

## Limits & Constraints

- Events are local to the world instance (not cross-world)
- Event payloads must be serializable TypeScript objects
- Console warnings appear when no components are listening (expected during development)
- Event names should be unique strings to avoid conflicts

## Gotchas / Debugging

- **Console warnings for unsubscribed events** - Normal during development; warnings disappear when subscribers are added
- **Event data is wrapped in object** - Access payload via `data.state`, not direct `data`
- **Type safety** - Use TypeScript generics `<{state: GameState}>` for compile-time checking
- **Export events** - Other components need `import { gameStateChanged } from './GameManager'`

## See Also

- [Module 3 - Build Game Manager](./03-build-game-manager.md) - State machine foundation
- [Module 5 - Build Game Setup](./05-build-game-setup.md) - Using events for game flow
- [Events and Triggers System](../../events-triggers-system.md) - Broader event architecture

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-4-broadcast-events (accessed 2025-09-25)
