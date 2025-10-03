---
title: "Local Events Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/local-events"
last_updated: "2025-09-26T12:00:00Z"
tags:
  [
    "horizon_worlds",
    "local_events",
    "typescript",
    "event_system",
    "component_communication",
  ]
summary: "Local events enable synchronous component-to-component communication within the same client, providing fine-grained control over TypeScript script interactions with custom data types."
---

## What & Why

Local events enable direct communication between TypeScript components running on the same client device. Unlike CodeBlock events which are global and networked, local events are synchronous and limited to scripts executing within the same client context. This provides greater control over data types, execution timing, and component coordination while maintaining optimal performance for local interactions.

## Key APIs / Concepts

- **LocalEvent<T>**: Generic event class for defining typed local events with custom payloads
- **Component.sendLocalEvent()**: Sends a local event to a target entity with data payload
- **Component.connectLocalEvent()**: Subscribes to local events from a specific entity
- **EventSubscription**: Handle returned from connectLocalEvent for controlling subscriptions
- **Target Entity**: The specific entity object that will receive or send the event
- **Event Object Reuse**: Recommended pattern to reuse the same event instance across scripts
- **Synchronous Execution**: Events block code execution until callback completes
- **Client Isolation**: Events only received by scripts on the same client

## How-To (Recipe)

1. **Define a Local Event**

   - Create typed LocalEvent instance with generic parameter for data structure
   - Specify event name for identification: `new LocalEvent<{message: String}>('eventName')`
   - Store as class property for reuse across methods

2. **Subscribe to Local Events**

   - Use `this.connectLocalEvent()` in component `start()` method
   - Provide target entity, event instance, and callback function
   - Store EventSubscription handle if you need to unsubscribe later

3. **Send Local Events**

   - Use `this.sendLocalEvent()` with target entity, event instance, and data
   - Ensure receiving components are already subscribed before sending
   - Handle timing with async.setTimeout() or Promises for robust execution

4. **Handle Event Data**
   - Accept typed data parameter in callback functions
   - Process event data immediately within callback
   - Keep callback functions lightweight for best performance

## Minimal Example

```typescript
import { Component, LocalEvent } from "horizon/core";

class MyEventExample extends Component {
  testEvent = new LocalEvent<{ message: String }>("testEvent");

  start() {
    // Subscribe to receive Local Event
    this.connectLocalEvent(
      this.entity,
      this.testEvent,
      (data: { message: String }) => {
        console.log(data.message);
      }
    );

    // Send event with delay to ensure listeners are ready
    this.async.setTimeout(() => {
      this.sendLocalEvent(this.entity, this.testEvent, {
        message: "My Local Event Test",
      });
    }, 500);
  }
}

Component.register(MyEventExample);
```

## Limits & Constraints

- **Client Isolation**: Events only received by scripts on the same client device
- **Synchronous Execution**: Events block code execution until callback completes
- **Timing Dependencies**: Registration must complete before events are sent
- **Local vs Server**: Server scripts and local scripts cannot communicate via local events
- **Event Object Identity**: Event objects tracked by instance, not name or payload
- **Performance Impact**: Heavy processing in callbacks can block execution thread

## Gotchas / Debugging

- Use async.setTimeout() or Promises to ensure proper event registration timing
- Local events from server scripts only reach other server scripts
- Local events from client scripts only reach other client scripts on same device
- Reuse the same LocalEvent instance across scripts for proper event handling
- Keep callback functions minimal to prevent performance bottlenecks
- For client-server communication, use CodeBlock events instead
- Event registration timing is non-deterministic - always handle async properly

## See Also

- [Events and Triggers System](./events-triggers-system.md): Overview of all event types and patterns
- [Local Scripting Overview](./local-scripting-ownership.md): Understanding client vs server execution
- [TypeScript Development Overview](./typescript-development-overview.md): Component architecture basics
- [Objects and Components Overview](./objects-components-overview.md): Entity and component relationships

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/local-events (accessed 2025-09-26)
