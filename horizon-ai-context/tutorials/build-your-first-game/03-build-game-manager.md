---
title: "Module 3 - Build Game Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-3-build-game-manager"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "game_manager",
    "state_machine",
    "typescript",
    "enums",
  ]
summary: "Create GameManager component with finite state machine using TypeScript enums to manage Ready, Playing, and Finished game states."
tutorial: "build-your-first-game"
---

## What & Why

Build a centralized game state manager to control game progression through defined phases. Essential pattern for multiplayer games requiring coordination of player actions, collectible spawning, and win conditions. Uses finite state machine pattern with TypeScript enums for predictable state transitions.

## Key APIs / Concepts

- **GameState enum**: Exported TypeScript enum defining Ready, Playing, Finished states
- **Finite State Machine**: Pattern restricting state transitions based on business rules
- **switch statement**: Control flow for handling different game states
- **setGameState()**: Public method for controlled state transitions with validation
- **enum export**: Making enums available to other components via `export enum`
- **Non-null assertion (!)**: TypeScript operator indicating variable will be initialized
- **Private variables**: Class members only accessible within component scope

## How-To (Recipe)

1. **Create GameManager Script**

   - Click **Scripts** in desktop editor menubar
   - Click **(+) icon** → name `GameManager`
   - Right-click → **Open in External Editor**

2. **Define Game State Enum**

   - At bottom of file, add exported enum
   - Define states: Ready, Playing, Finished
   - Export for access by other components

3. **Add State Variable**

   - Inside class: `private gameState!: GameState;`
   - Non-null assertion (!) tells compiler it will be initialized

4. **Create State Management Function**

   - Add `setGameState(state: GameState): void` method
   - Early return if state unchanged
   - Use switch statement with transition rules
   - Add console logging for debugging

5. **Set Initial State**

   - In `start()` method: `this.setGameState(GameState.Ready)`
   - Replaces direct variable assignment

6. **Test Implementation**
   - Create Empty Object, attach GameManager script
   - Press Play button, check Console tab for state logging

## Minimal Example

```typescript
import * as hz from "horizon/core";

class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {};

  private gameState!: GameState;

  start() {
    this.setGameState(GameState.Ready);
  }

  public setGameState(state: GameState): void {
    if (this.gameState === state) {
      return;
    }

    switch (state) {
      case GameState.Ready:
        if (this.gameState !== GameState.Playing) {
          this.gameState = GameState.Ready;
        }
        break;
      case GameState.Playing:
        if (this.gameState === GameState.Ready) {
          this.gameState = GameState.Playing;
        }
        break;
      case GameState.Finished:
        this.gameState = GameState.Finished;
        break;
    }

    console.log(`new game state is: ${GameState[this.gameState]}`);
  }
}

hz.Component.register(GameManager);

export enum GameState {
  "Ready",
  "Playing",
  "Finished",
}
```

## Limits & Constraints

- **State Transition Rules**:
  - Ready cannot be set from Playing state
  - Playing can only be set from Ready state
  - Finished can be set from any state
- **Enum Values**: Only defined enum values accepted for game states
- **Script Attachment**: Must attach to Empty Object entity for execution
- **Export Requirement**: Enum must be exported for access by other scripts

## Gotchas / Debugging

- Missing `break;` statements in switch causes fall-through execution
- Non-null assertion (!) required for uninitialized class properties
- State transitions silently fail if business rules not met
- Console logging essential for verifying state changes during development
- Remember to attach script to Empty Object before testing
- GameState enum access uses bracket notation: `GameState[this.gameState]`

## See Also

- [Module 2 - Intro to Scripting](./02-intro-to-scripting.md)
- [Module 4 - Broadcast Events](./04-broadcast-events.md)
- [Empty Object Pattern](../scripting-patterns#empty-objects)
- [Finite State Machines in Game Development](https://gameprogrammingpatterns.com/state.html)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-3-build-game-manager (accessed 2025-09-25)
