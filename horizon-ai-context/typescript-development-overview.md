---
title: "TypeScript Development Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-3-build-game-manager"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "typescript", "scripting", "components", "development"]
summary: "TypeScript development framework for Horizon Worlds using Component-based architecture, event systems, and debugging tools."
---

## What & Why

TypeScript provides the scripting foundation for Horizon Worlds, enabling interactive gameplay, multiplayer coordination, and dynamic content. Built around component-based architecture with event-driven communication between systems. Essential for any world requiring player interaction, state management, or real-time updates.

## Key APIs / Concepts

- **hz.Component<typeof ClassName>**: Base class using v2.0.0 generic type syntax
- **propsDefinition**: Static object defining component properties (no type annotations in v2.0.0)
- **start()**: Component lifecycle method executed when script loads
- **prestart()**: Early lifecycle method for setup before any start() calls (v2.0.0+)
- **connectCodeBlockEvent**: Subscribe to built-in world events (player actions, collisions)
- **connectLocalEvent**: Connect to local entity events (replaces connectEntityEvent)
- **hz.CodeBlockEvents**: Built-in event types (OnPlayerEnterWorld, OnPlayerExitWorld)
- **console.log()**: Debug output visible in desktop editor Console tab
- **Component.register()**: Required registration call for all custom components

## How-To (Recipe)

1. **Create Component Class**

   - Extend `hz.Component<typeof ClassName>`
   - Define `static propsDefinition = {}`
   - Implement `start()` method for initialization
   - Call `hz.Component.register(ClassName)` at file end

2. **Event System Usage**

   - Use `this.connectCodeBlockEvent()` for built-in events
   - Provide entity reference, event type, and callback function
   - Keep callback functions minimal; delegate to separate methods
   - Handle player enter/exit events for multiplayer management

3. **State Management Patterns**

   - Use TypeScript enums for defined state sets
   - Export enums for cross-component access
   - Implement finite state machines with switch statements
   - Validate state transitions based on business rules

4. **Development Workflow**
   - Create scripts via desktop editor Scripts panel
   - Open in external editor (VS Code recommended)
   - Attach to Empty Objects for non-visual logic
   - Test via Preview mode with console debugging

## Minimal Example

```typescript
import * as hz from "horizon/core";

class MyComponent extends hz.Component<typeof MyComponent> {
  static propsDefinition = {
    targetEntity: {type: hz.PropTypes.Entity}
  };

  private myState: string = "";

  start() {
    const target: hz.Entity | undefined = this.props.targetEntity;
    if (target != null) {
      this.connectLocalEvent(
        target,
        hz.CodeBlockEvents.OnPlayerEnterWorld,
        (player: hz.Player) => {
          this.handlePlayerEnter(player);
        }
      );
    }
    console.log("Component initialized");
  }

  private handlePlayerEnter(player: hz.Player): void {
    console.log(`Player ${player.name.get()} entered world`);
  }
}

hz.Component.register(MyComponent);

export enum MyStates {
  "Ready",
  "Active",
  "Complete",
}
```

## Limits & Constraints

- **Script Attachment**: Components only execute when attached to world entities
- **Console Access**: Debug output only available in desktop editor, not published worlds
- **External Editor**: Visual Studio Code strongly recommended over web interface
- **Component Registration**: All components must call register() method
- **Event Scope**: CodeBlockEvents are world-level; entity events handled differently
- **API Version**: TypeScript API v2.0.0 is current standard; previous versions deprecated
- **Property Nullability**: Entity/Asset properties require null checks in v2.0.0

## Gotchas / Debugging

- Scripts won't run until attached to entities in world
- Use Empty Objects for non-visual script containers
- OnPlayerExitWorld doesn't fire when exiting Preview mode
- Console tab only shows output during world simulation
- Export enums for cross-script access; import in dependent scripts
- Non-null assertion (!) required for uninitialized class properties

## From Tutorials

- [Module 2 - Intro to Scripting](./tutorials/build-your-first-game/02-intro-to-scripting.md): Component basics, Map data structures, player tracking
- [Module 3 - Build Game Manager](./tutorials/build-your-first-game/03-build-game-manager.md): Enums, finite state machines, TypeScript patterns
- [Module 4 - Broadcast Events](./tutorials/build-your-first-game/04-broadcast-events.md): Local events, typed event payloads, component communication
- [Module 5 - Build Game Setup](./tutorials/build-your-first-game/05-build-game-setup.md): Entity properties, array management, non-null assertions
- [Module 8 - Adding Polish](./tutorials/build-your-first-game/08-adding-polish.md): Entity casting, template literals, gizmo integration

## API Migration

- [TypeScript API v2.0.0 Changes](./typescript-v2-changes.md): Breaking changes and new features in current API version
- [TypeScript API v2.0.0 Upgrade Guide](./typescript-v2-upgrade-guide.md): Step-by-step migration from previous versions

## See Also

- [Events and Triggers System](./events-triggers-system.md)
- [Desktop Editor Overview](./desktop-editor-overview.md)
- [Player Management Patterns](./player-management.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting (accessed 2025-09-25)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-3-build-game-manager (accessed 2025-09-25)
