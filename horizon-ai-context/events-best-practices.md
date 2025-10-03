---
title: "Events Best Practices"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/events-best-practices"
last_updated: "2025-09-26T15:00:00Z"
tags: ["horizon_worlds", "events_best_practices", "event_management", "performance", "code_organization"]
summary: "Best practices for managing events in Horizon Worlds TypeScript, including subscription management, timing considerations, and code organization patterns."
---

## What & Why

Event best practices provide essential guidelines for efficient event management in Horizon Worlds TypeScript development. These practices address common pitfalls around performance, memory management, timing issues, and code organization. Following these patterns ensures scalable, maintainable event-driven architecture while avoiding memory leaks and race conditions.

## Key APIs / Concepts

- **EventSubscription.disconnect()**: Method to unsubscribe from events and prevent memory leaks
- **this.async.setTimeout()**: Delay mechanism to ensure proper event timing during initialization
- **Event Consolidation**: Single module pattern for organizing all world events
- **CodeBlock Interoperability**: Using CodeBlock events to bridge TypeScript and visual scripting
- **Subscription Management**: Storing and cleaning up event subscription handles
- **Event Module Pattern**: Centralized event definitions for reusability

## How-To (Recipe)

1. **Manage Event Subscriptions Properly**
   - Store EventSubscription handles returned from event connections
   - Call `disconnect()` when components no longer need to receive events
   - Set subscription references to null after disconnecting

2. **Handle Initialization Timing**
   - Wrap immediate event sends in `this.async.setTimeout()` with small delay (500ms)
   - Ensure all scripts have time to register their event listeners during world initialization
   - Use delays when sending events from `start()` method

3. **Consolidate Events in Modules**
   - Create single module files containing all event definitions
   - Export event objects for reuse across multiple scripts
   - Define event names and types in one central location

4. **Bridge TypeScript and CodeBlocks**
   - Use CodeBlock events for interoperability between TypeScript and visual scripting
   - Implement complex calculations in TypeScript, send results via CodeBlock events
   - Leverage TypeScript-only APIs while maintaining CodeBlock compatibility

## Minimal Example

```typescript
// EventContainer.ts - Centralized event definitions
import { LocalEvent, CodeBlockEvent, Color, Entity, Player, PropTypes } from 'horizon/core';

const EventContainer = {
  testLocalEvent: new LocalEvent<{
    player: Player,
    entity: Entity,
  }>('testLocalEvent'),

  testBroadcastEvent: new LocalEvent<{
    color: Color,
  }>('testBroadcastEvent'),

  testCodeBlockEvent: new CodeBlockEvent<[
    caller: Entity,
    text: string,
    duration: number
  ]>('testCodeBlockEvent', [
    PropTypes.Entity,
    PropTypes.String,
    PropTypes.Number
  ]),
};

export default EventContainer;

// Component using proper subscription management
import { Component, World } from 'horizon/core';
import EventContainer from './EventContainer';

class BestPracticeExample extends Component {
  private updateSubscription: any = null;

  start() {
    // Store subscription handle
    this.updateSubscription = this.connectLocalBroadcastEvent(
      World.onUpdate,
      (data: {deltaTime: number}) => {
        // Update logic here
      }
    );

    // Delay event sending to ensure listeners are ready
    this.async.setTimeout(() => {
      this.sendLocalEvent(
        this.entity,
        EventContainer.testLocalEvent,
        { player: this.getOwner(), entity: this.entity }
      );
    }, 500);
  }

  onDestroy() {
    // Clean up subscription
    if (this.updateSubscription !== null) {
      this.updateSubscription.disconnect();
      this.updateSubscription = null;
    }
  }
}
```

## Limits & Constraints

- **Memory Management**: EventSubscriptions must be manually disconnected to prevent leaks
- **Initialization Timing**: Events sent immediately during `start()` may not reach all listeners
- **CodeBlock Compatibility**: CodeBlock events limited to basic data types (numbers, strings, entities)
- **Event Module Scope**: Centralized events must be accessible to all scripts that need them
- **Performance Impact**: Excessive event firing can impact frame rate

## Gotchas / Debugging

- Always disconnect event subscriptions in component cleanup methods
- Use `async.setTimeout()` when sending events during world initialization
- Recreating identical events across multiple files creates maintenance overhead
- CodeBlock events can only pass basic types - no complex objects or custom classes
- Event subscription handles should be stored if you need to disconnect later
- Missing initialization delays can cause events to be dropped
- Centralized event modules reduce coupling but require careful dependency management
- Test event timing thoroughly during world initialization phases

## See Also

- [Events and Triggers System](./events-triggers-system.md): Overview of all event types and patterns
- [Local Events Overview](./local-events-overview.md): Component-to-component communication
- [World Update Events](./world-update-events.md): Frame-based event patterns
- [CodeBlock Events Overview](./codeblock-events-overview.md): Cross-script communication patterns
- [TypeScript Development Overview](./typescript-development-overview.md): Component architecture basics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/events-best-practices (accessed 2025-09-26)