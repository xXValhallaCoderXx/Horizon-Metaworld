---
title: "World Update Events"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/world-update-events"
last_updated: "2025-09-26T15:00:00Z"
tags: ["horizon_worlds", "world_update_events", "delta_time", "broadcast_events", "frame_loop"]
summary: "Frame-based events that execute during the world update loop, providing delta time for smooth motion and physics calculations between rendered frames."
---

## What & Why

World update events are broadcast events that fire between each rendered frame on the player's headset, providing essential timing data for smooth motion and physics. These events enable scripts to hook into the world's update loop, receiving delta time (duration in milliseconds since last update) for frame-rate independent calculations. Critical for animations, physics simulations, and any time-dependent game logic that needs to run continuously.

## Key APIs / Concepts

- **World.onUpdate**: Main update event fired after physics calculations
- **World.onPrePhysicsUpdate**: Update event fired before physics calculations  
- **this.connectLocalBroadcastEvent**: Method to subscribe to world update events
- **deltaTime**: Time in milliseconds since the last update (event parameter)
- **EventSubscription**: Handle returned from event connection for managing subscriptions
- **Frame-rate Independence**: Using delta time for consistent behavior across devices
- **Update Loop Stages**: Pre-physics and post-physics execution timing
- **Broadcast Events**: World events are broadcast to all listening components

## How-To (Recipe)

1. **Subscribe to Update Events**
   - Use `this.connectLocalBroadcastEvent()` in component `start()` method
   - Choose between `World.onUpdate` or `World.onPrePhysicsUpdate` based on timing needs
   - Provide callback function to handle the event data

2. **Handle Delta Time**
   - Accept `data: {deltaTime: number}` parameter in callback function
   - Use delta time for frame-rate independent calculations
   - Multiply movement/animation values by deltaTime for consistent speed

3. **Manage Event Subscriptions**
   - Store EventSubscription handle if you need to unsubscribe later
   - Call `subscription.disconnect()` to stop receiving events when no longer needed
   - Set subscription reference to null after disconnecting

4. **Choose Appropriate Update Stage**
   - Use `World.onUpdate` for most game logic, UI updates, and post-physics operations
   - Use `World.onPrePhysicsUpdate` for input handling or pre-physics state changes

## Minimal Example

```typescript
import { Component, World } from 'horizon/core';

class WorldUpdateEventExample extends Component {
  start() {
    this.connectLocalBroadcastEvent(
      World.onUpdate,
      (data: {deltaTime: number}) => {
        // Perform an action during the Update step.
        console.log(`Frame took ${data.deltaTime}ms`);
      }
    );

    this.connectLocalBroadcastEvent(
      World.onPrePhysicsUpdate,
      (data: {deltaTime: number}) => {
        // Perform an action during the Pre-Physics Update step.
        // Useful for input processing before physics
      }
    );
  }
}

Component.register(WorldUpdateEventExample);
```

## Limits & Constraints

- **Performance Impact**: Update events fire every frame - avoid heavy processing in callbacks
- **Event Parameter**: Only deltaTime is provided; no other world state information
- **Execution Order**: Pre-physics events run before physics, standard update events after
- **Memory Management**: Must manually disconnect subscriptions to prevent memory leaks
- **Frame Rate Dependency**: Event frequency tied to rendering frame rate

## Gotchas / Debugging

- World update events fire every frame - performance-critical code path
- Always use delta time for calculations to ensure frame-rate independence
- Consider using EventSubscription handles to manage and cleanup event listeners
- Pre-physics vs post-physics timing can affect interaction with physics objects
- Heavy processing in update callbacks can cause frame rate drops
- For periodic operations, consider using timers instead of counting frames
- Debug frame timing issues by logging deltaTime values

## See Also

- [Events and Triggers System](./events-triggers-system.md): Overview of all event types and patterns
- [Local Events Overview](./local-events-overview.md): Component-to-component communication
- [Events Best Practices](./events-best-practices.md): Event management and organization patterns
- [TypeScript Development Overview](./typescript-development-overview.md): Component architecture basics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/world-update-events (accessed 2025-09-26)