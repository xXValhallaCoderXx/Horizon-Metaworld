---
title: "Multiplayer Lobby Provided Scripts"  
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-2-provided-scripts"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "multiplayer", "typescript", "component_architecture", "game_management"]
summary: "Overview of the pre-built TypeScript classes that manage multiplayer lobby functionality including player tracking, game state, and trigger events."
tutorial: "multiplayer-lobby"
---

# Multiplayer Lobby Provided Scripts

## What & Why

This module introduces the boilerplate TypeScript classes included with the multiplayer lobby tutorial. Each script handles specific aspects of the lobby system through component-based architecture. Understanding these classes is essential before implementing the TODO items in subsequent modules.

## Key Script Classes

### PlayerManager
- **Responsibility**: Tracks all players in the world, lobby status, and match participation
- **Event Handling**: Listens to Code Block Events for player enter/exit
- **Player Movement**: Moves players between lobby and match areas
- **State Synchronization**: Receives GameState changes from GameManager via broadcast events

### GameManager  
- **Responsibility**: Manages overall game state and transitions
- **Event System**: Listens for state change requests via broadcast events
- **Communication**: Sends messages to all players in the world
- **State Coordination**: Broadcasts GameState changes to other components

### StartGameTrigger
- **Responsibility**: Initiates game start sequence when triggered
- **Event Handling**: Listens to Code Block Event for player entry
- **Broadcasting**: Sends start game events to other components for processing

### EndGameTrigger
- **Responsibility**: Handles game completion when triggered
- **Event Handling**: Listens to Code Block Event for player entry at game end area
- **Broadcasting**: Sends end game events to other components for processing

### GameUtils
- **Responsibility**: Shared utilities, classes, and enums
- **Import Pattern**: Can be imported by any other component
- **Reusability**: Contains common functionality for lobby system

## Key APIs & Concepts

### Core Event System
- `Code Block Events` - Built-in events for player world interactions
- `Broadcast Events` - Custom events for component communication
- Event-driven architecture for decoupled components

### Component Communication Pattern
- GameManager ←→ PlayerManager (GameState synchronization)
- Trigger components → GameManager (state change requests)
- All components ← GameManager (player messaging)

## Architecture Pattern

```typescript
// Event flow example
StartGameTrigger → broadcasts start event
GameManager → receives event, changes state
PlayerManager → receives state change, moves players
```

## How-To (Review Scripts)

1. **Examine PlayerManager**
   - Player tracking implementation
   - Code Block Event connections
   - Broadcast event listeners

2. **Review GameManager**
   - State management logic
   - Broadcast event handling
   - Player messaging system

3. **Understand Trigger Scripts**
   - Code Block Event setup
   - Broadcasting mechanisms
   - Component coordination

4. **Study GameUtils**
   - Shared enums and classes
   - Import/export patterns
   - Utility functions

## Implementation Notes

- **TODO Items**: Remaining modules focus on completing TODO items in these scripts
- **Component Independence**: Each script handles specific responsibilities
- **Event-Driven Design**: Loose coupling through broadcast events
- **Reusable Architecture**: Can be adapted for other multiplayer scenarios

## Limits & Constraints

- Scripts require completion of TODO items to function
- Event system depends on proper Code Block Event setup
- Player messaging limited to world-wide broadcasts
- State changes must go through GameManager coordination

## Gotchas / Debugging

- **Event Registration**: Code Block Events must be properly connected
- **Broadcast Setup**: Event names must match between senders and receivers  
- **State Synchronization**: GameState changes must be coordinated across components
- **Component Dependencies**: Scripts depend on each other through event system

## See Also

- [Module 1 - Setup](./01-setup.md) - Tutorial environment setup
- [Module 3 - Handling players entering and exiting](./03-handling-players-entering-and-exiting.md) - Player event implementation
- [Events and Triggers System](../../events-triggers-system.md) - General event system concepts
- [TypeScript Development Overview](../../typescript-development-overview.md) - Component architecture

## Checkpoint

Module 2 completion:
- ✅ Familiar with all base script classes and their responsibilities
- ✅ Understanding of event-driven architecture
- ✅ Ready to implement TODO items in remaining modules

The remaining tutorial modules involve completing the TODO items in these provided scripts to create a fully functional multiplayer lobby system.

## Sources

- [Multiplayer Lobby Tutorial - Module 2](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-2-provided-scripts) (accessed 2025-09-25)