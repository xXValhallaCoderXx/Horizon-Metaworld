---
title: "Local Scripting and Entity Ownership"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "local_scripting",
    "ownership",
    "performance",
    "multiplayer",
    "latency",
  ]
summary: "Local script execution and entity ownership patterns for improved performance and reduced latency in multiplayer Horizon Worlds experiences."
---

# Local Scripting and Entity Ownership

## What & Why

Local scripting shifts script execution from the server to individual player devices, dramatically reducing latency for interactive experiences. Entity ownership determines which player's device runs the script, enabling smooth real-time interactions like grabbing, collision detection, and physics simulation. Essential for responsive VR/AR experiences and multiplayer game performance.

## Key APIs / Concepts

### Script Execution Modes

- **Script Execution Mode = "Local"**: Execute script on player's device instead of server
- **Script Execution Mode = "Server"**: Default server-side execution (higher latency)

### Ownership Management

- `entity.owner.set(player)`: Transfer entity ownership to specific player
- `this.world.getServerPlayer()`: Get server player reference for ownership reset
- **Automatic ownership transfer**: Grabbing entities implicitly transfers ownership
- **Ownership scope**: Affects which device runs attached scripts

### Ownership Transfer Methods

- `override receiveOwnership(state, fromPlayer, toPlayer)`: Handle incoming ownership
- `override transferOwnership(fromPlayer, toPlayer): State`: Prepare state for transfer
- **State preservation**: Maintain component state across ownership changes
- **Type definitions**: Define `State` type for transferred data

### Grab Events & Ownership

- `hz.CodeBlockEvents.OnGrabStart`: Triggered when player grabs entity
- `hz.CodeBlockEvents.OnGrabEnd`: Triggered when player releases entity
- **Implicit ownership**: Grabbing automatically transfers entity ownership to grabber
- **Explicit ownership**: Manual ownership transfer via `entity.owner.set()`

## How-To (Recipe)

### 1. Enable Local Scripting

1. Select script component in Hierarchy
2. Set "Script Execution Mode" to "Local" in Properties Panel
3. Implement ownership transfer methods if needed
4. Test with multiple players to verify performance

### 2. Basic Ownership Transfer on Grab

```typescript
class GrabbableScript extends hz.Component<typeof GrabbableScript> {
  static propsDefinition = {};
  currentHolder: hz.Player | null = null;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.currentHolder = player;
        // Ownership transfers automatically on grab
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.currentHolder = null;
        // Reset to server ownership if needed
        this.entity.owner.set(this.world.getServerPlayer());
      }
    );
  }
}
```

### 3. Cross-Entity Ownership Management

```typescript
class BatScript extends hz.Component<typeof BatScript> {
  static propsDefinition = {
    ball: { type: hz.PropTypes.Entity },
  };
  batHolder: hz.Player | null = null;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.batHolder = player;
        // Transfer related entity ownership for consistency
        this.props.ball?.owner.set(player);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.batHolder = null;
        // Reset both entities to server
        this.props.ball?.owner.set(this.world.getServerPlayer());
      }
    );
  }
}
```

### 4. State Preservation Across Ownership

```typescript
type State = {
  originalPosition: hz.Vec3;
  customValue: number;
};

class StatefulScript extends hz.Component<typeof StatefulScript> {
  private originalPosition: hz.Vec3 = hz.Vec3.zero;
  private customValue: number = 0;

  override receiveOwnership(
    state: State,
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): void {
    // Restore state when receiving ownership
    this.originalPosition = state.originalPosition;
    this.customValue = state.customValue;
  }

  override transferOwnership(
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): State {
    // Package state when transferring ownership
    return {
      originalPosition: this.originalPosition,
      customValue: this.customValue,
    };
  }
}
```

## Minimal Example

Complete local script with ownership management:

```typescript
import * as hz from "horizon/core";

type State = {};

class LocalInteractiveScript extends hz.Component<
  typeof LocalInteractiveScript
> {
  static propsDefinition = {};
  currentPlayer: hz.Player | null = null;

  start() {
    // Handle grab events with ownership
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.currentPlayer = player;
        console.log(`${player.name} grabbed the object`);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.currentPlayer = null;
        console.log(`${player.name} released the object`);
      }
    );
  }

  // Preserve player reference across ownership changes
  override receiveOwnership(
    state: State,
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): void {
    this.currentPlayer = toPlayer;
  }

  override transferOwnership(
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): State {
    return {};
  }
}

hz.Component.register(LocalInteractiveScript);
```

## Limits & Constraints

### Performance Considerations

- **Network synchronization**: Local scripts still sync state across clients
- **Ownership transfer cost**: Frequent ownership changes can impact performance
- **State size limits**: Keep transferred state minimal for efficiency
- **Client device limits**: Local execution uses player's device resources

### Ownership Rules

- **Single ownership**: Each entity can only be owned by one player at a time
- **Automatic transfer**: Grabbing implicitly transfers ownership
- **Server fallback**: Entities default to server ownership when no player owns them
- **Ownership persistence**: Ownership persists until explicitly changed or player leaves

### Script Execution Context

- **Local only on ownership**: Script runs locally only when player owns the entity
- **Server execution otherwise**: Non-owned entities run scripts on server
- **State synchronization required**: Local state changes must sync with other clients

## Gotchas / Debugging

### Common Issues

- **Missing ownership methods**: Must implement both `receiveOwnership()` and `transferOwnership()`
- **State loss on transfer**: Forgot to preserve important state in transfer methods
- **Ownership confusion**: Not clear which player owns entity at any given time
- **Cross-entity consistency**: Related entities (bat/ball) should have consistent ownership

### Performance Problems

- **Excessive ownership transfers**: Rapidly changing ownership causes network overhead
- **Large state transfers**: Heavy State objects slow down ownership changes
- **Missing server fallback**: Not resetting to server ownership when appropriate

### Debugging Techniques

- **Console logging**: Track ownership changes and state transfers
- **Player name logging**: `console.log(player.name)` to identify ownership
- **State validation**: Verify state preservation across ownership transfers
- **Multi-player testing**: Test with multiple players to verify ownership behavior

## Design Patterns

### Ownership Strategies

- **Grabber ownership**: Transfer ownership to whoever grabs the entity
- **Server reset**: Return ownership to server when no longer needed
- **Related entity consistency**: Keep related entities under same ownership
- **Explicit control**: Manual ownership management for specific game logic

### State Management

- **Minimal state**: Only transfer essential data to reduce network overhead
- **State validation**: Verify state integrity after ownership transfer
- **Default values**: Provide sensible defaults for missing state data
- **Immutable patterns**: Avoid modifying transferred state objects directly

## From Tutorials

- [Batting Cage Tutorial](./tutorials/batting-cage/01-batting-cage-tutorial.md): Complete local scripting implementation with grab events, ownership transfer, and state preservation

## See Also

- [Objects and Components Overview](./objects-components-overview.md) - Entity management and component patterns
- [Events and Triggers System](./events-triggers-system.md) - Event-driven communication
- [TypeScript Development Overview](./typescript-development-overview.md) - Component development patterns

### Related Documentation

- [Ownership in Meta Horizon Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/ownership-in-horizon-worlds) - Official ownership documentation

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial (accessed 2025-09-25)
