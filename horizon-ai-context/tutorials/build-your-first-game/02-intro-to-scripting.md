---
title: "Module 2 - Intro to Scripting"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "typescript",
    "scripting",
    "player_management",
    "events",
  ]
summary: "Introduction to TypeScript scripting in Horizon Worlds, creating PlayerManager component with Map storage, Code Block Events, and console logging."
tutorial: "build-your-first-game"
---

## What & Why

Build your first TypeScript script to track players entering and leaving the game world. Essential foundation for multiplayer game management, introducing Meta Horizon Worlds component architecture, event system, and debugging tools. Players can join/leave at any time, requiring robust player state tracking.

## Key APIs / Concepts

- **hz.Component**: Base class for all Horizon Worlds scripts; requires registration
- **propsDefinition**: Static object defining component properties and editor interface
- **start()**: Component lifecycle method executed when script first loads
- **connectCodeBlockEvent**: Subscribe to built-in world events (player enter/exit)
- **hz.CodeBlockEvents.OnPlayerEnterWorld**: Built-in event fired when player joins
- **hz.CodeBlockEvents.OnPlayerExitWorld**: Built-in event fired when player leaves
- **Map<number, hz.Player>**: TypeScript Map storing player ID → Player object pairs
- **console.log()**: Debug output to desktop editor console tab
- **Empty Object**: Invisible placeholder entity for attaching non-visual scripts

## How-To (Recipe)

1. **Create New Script**

   - Click **Scripts** in desktop editor menubar
   - Click **(+) icon** to create new script
   - Name it `PlayerManager`
   - Right-click → **Open in External Editor** (VS Code recommended)

2. **Add Player Storage**

   - Place below `static propsDefinition = {}`
   - Add: `private playerMap: Map<number, hz.Player> = new Map<number, hz.Player>();`

3. **Subscribe to Player Events**

   - In `start()` method, add event listeners
   - Use `this.connectCodeBlockEvent()` with callback functions
   - Handle `OnPlayerEnterWorld` and `OnPlayerExitWorld`

4. **Attach Script to Empty Object**

   - **Build menu** → **Empty Object**
   - Rename to `PlayerManager`, move outside play area
   - Select object → **Properties panel** → **Script dropdown**
   - Choose `PlayerManager:PlayerManager`

5. **Test with Console**
   - Click **Play button** to enter Preview mode
   - Check **Console tab** for log messages
   - Reset simulation to re-trigger player enter event

## Minimal Example

```typescript
import * as hz from "horizon/core";

class PlayerManager extends hz.Component<typeof PlayerManager> {
  static propsDefinition = {};

  private playerMap: Map<number, hz.Player> = new Map<number, hz.Player>();

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) => {
        this.handleOnPlayerEnter(player);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      (player: hz.Player) => {
        this.handleOnPlayerExit(player);
      }
    );
  }

  private handleOnPlayerEnter(player: hz.Player): void {
    if (!this.playerMap.has(player.id)) {
      this.playerMap.set(player.id, player);
      console.log(`added player ${player.name.get()}`);
    }
  }

  private handleOnPlayerExit(player: hz.Player): void {
    if (this.playerMap.has(player.id)) {
      this.playerMap.delete(player.id);
      console.log(`deleted player: ${player.name.get()}`);
    }
  }
}

hz.Component.register(PlayerManager);
```

## Limits & Constraints

- **Script Attachment**: Scripts only run when attached to entities in world
- **OnPlayerExitWorld**: Does not fire when exiting Preview mode
- **External Editor**: Visual Studio Code recommended; web interface may be deprecated
- **Console Access**: Available only in desktop editor Preview mode, not in published worlds
- **Component Registration**: All components must call `hz.Component.register()`

## Gotchas / Debugging

- Scripts won't execute until attached to a world entity
- Use Empty Objects for scripts not tied to visual elements
- OnPlayerExitWorld requires second player to test properly
- Console tab only shows logs during Preview mode simulation
- Callback functions should contain minimal logic; use separate handler methods
- Player enter events fire when entering Preview mode, not just multiplayer joins

## See Also

- [Module 1 - Build your first game](./01-build-your-first-game.md)
- [Module 3 - Build Game Manager](./03-build-game-manager.md)
- [Test Your World - Console Logging](../test-your-world#console-logging)
- [Visual Studio Code Download](https://code.visualstudio.com/download)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-2-intro-to-scripting (accessed 2025-09-25)
- https://code.visualstudio.com/download
- https://horizon.meta.com/creator/worlds_all/?locale=en_US
