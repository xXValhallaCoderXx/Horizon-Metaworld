---
title: "CodeBlock Events Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/codeblock-events"
last_updated: "2025-09-26T15:00:00Z"
tags: ["horizon_worlds", "codeblock_events", "built_in_events", "cross_scripting", "player_events"]
summary: "Bridge between TypeScript and visual scripting using CodeBlock events for cross-script communication, built-in world events, and player interactions."
---

## What & Why

CodeBlock events enable communication between TypeScript and visual CodeBlock scripts, providing a bridge for mixed scripting approaches. These events communicate asynchronously with all players by default, ensuring consistent server-managed world behavior. Critical for migrating from CodeBlock to TypeScript gradually, accessing built-in world events, and maintaining compatibility between different scripting paradigms.

## Key APIs / Concepts

- **CodeBlockEvent<T>**: Generic class for defining custom CodeBlock events with typed parameters
- **Component.sendCodeBlockEvent**: Method to send events to CodeBlock or TypeScript scripts
- **Component.connectCodeBlockEvent**: Method to subscribe to CodeBlock events
- **PropTypes**: Type definitions for CodeBlock-compatible data types (String, Number, Entity)
- **CodeBlockEvents**: Built-in events enum (OnPlayerEnterWorld, OnGrabStart, etc.)
- **Built-in Events**: Pre-defined world events for common interactions and state changes
- **Cross-Script Communication**: Events between different scripting systems
- **Basic Data Types Only**: Restriction to CodeBlock-compatible types only

## How-To (Recipe)

1. **Define Custom CodeBlock Events**
   - Specify parameter names and types using TypeScript generics
   - Provide event name as string identifier
   - List PropTypes array matching parameter types in order

2. **Send CodeBlock Events**
   - Use `this.sendCodeBlockEvent()` with target entity, event, and parameters
   - Include 500ms delay with `async.setTimeout()` to ensure listeners are ready
   - Target can be entity, player, or specific component owner

3. **Subscribe to CodeBlock Events**
   - Use `this.connectCodeBlockEvent()` with entity, event, and callback
   - Handle typed parameters in callback function
   - Store EventSubscription for later cleanup if needed

4. **Use Built-in Events**
   - Access via `CodeBlockEvents` enum for common world interactions
   - Subscribe to player events, collision events, grab events, etc.
   - No custom definition needed - use predefined event types

## Minimal Example

```typescript
import { Component, CodeBlockEvent, CodeBlockEvents, Entity, Player, PropTypes } from 'horizon/core';

class CodeBlockEventExample extends Component {
  // Custom CodeBlock event definition
  customEvent = new CodeBlockEvent<[playerName: string, score: number]>(
    'customEvent',
    [PropTypes.String, PropTypes.Number]
  );

  start() {
    // Subscribe to built-in CodeBlock events
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => {
        console.log(`Player ${player.name.get()} entered the world`);
        
        // Send custom event to the player after delay
        this.async.setTimeout(() => {
          this.sendCodeBlockEvent(
            player,
            this.customEvent,
            player.name.get(),
            100
          );
        }, 500);
      }
    );

    // Subscribe to custom CodeBlock event
    this.connectCodeBlockEvent(
      this.entity,
      this.customEvent,
      (playerName: string, score: number) => {
        console.log(`${playerName} scored ${score} points`);
      }
    );

    // Subscribe to grab events
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: Player) => {
        console.log(`${player.name.get()} grabbed with ${isRightHand ? 'right' : 'left'} hand`);
      }
    );
  }
}

Component.register(CodeBlockEventExample);
```

## Limits & Constraints

- **Data Type Restrictions**: Only basic types available in CodeBlock (numbers, strings, entities)
- **Server Management**: Events communicate asynchronously with all players by default
- **PropTypes Requirement**: Must specify PropTypes array matching parameter types exactly
- **Timing Dependencies**: Registration must complete before events are sent
- **Cross-Platform Compatibility**: Limited to CodeBlock-compatible functionality only

## Gotchas / Debugging

- CodeBlock events restricted to basic data types - no complex objects or custom classes
- Always use `async.setTimeout()` when sending events during initialization
- PropTypes array must match parameter types and order exactly
- Event names must be unique strings to avoid conflicts
- Built-in events have predefined parameter signatures - check API docs for details
- Target entity determines who receives the event (entity owner vs all players)
- Memory management - disconnect subscriptions when no longer needed
- Server scripts can only communicate with other server scripts via CodeBlock events

## Built-in CodeBlock Events (Common)

### Player Events
- **OnPlayerEnterWorld/OnPlayerExitWorld**: Player join/leave notifications
- **OnPlayerCollision**: Player-to-player or player-to-entity collisions
- **OnPlayerEnterTrigger/OnPlayerExitTrigger**: Trigger zone interactions

### Interaction Events
- **OnGrabStart/OnGrabEnd**: Single-hand grab interactions
- **OnMultiGrabStart/OnMultiGrabEnd**: Two-hand grab interactions
- **OnAttachStart/OnAttachEnd**: Object attachment to players

### Input Events
- **OnIndexTriggerDown/OnIndexTriggerUp**: Controller trigger presses
- **OnButton1Down/OnButton1Up**: Controller button 1 interactions
- **OnButton2Down/OnButton2Up**: Controller button 2 interactions

### System Events
- **OnAssetSpawned/OnAssetDespawned**: Asset spawning lifecycle
- **OnAssetSpawnFailed**: Asset spawning error handling
- **OnProjectileLaunched**: Projectile firing events
- **OnProjectileHitPlayer/OnProjectileHitEntity**: Projectile collision events

### Economy Events
- **OnItemPurchaseSucceeded/OnItemPurchaseFailed**: Purchase transactions
- **OnPlayerConsumeSucceeded/OnPlayerConsumeFailed**: Item consumption
- **OnPlayerSpawnedItem**: Item spawning by players

## See Also

- [Events and Triggers System](./events-triggers-system.md): Overview of all event types and patterns
- [Local Events Overview](./local-events-overview.md): TypeScript-specific event communication
- [Events Best Practices](./events-best-practices.md): Event management and organization patterns
- [World Update Events](./world-update-events.md): Frame-based event patterns
- [TypeScript Development Overview](./typescript-development-overview.md): Component architecture basics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/codeblock-events (accessed 2025-09-26)