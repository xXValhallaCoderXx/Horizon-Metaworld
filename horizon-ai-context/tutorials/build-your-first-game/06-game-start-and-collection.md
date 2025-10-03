---
title: "Module 6 - Game Start and Collection"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "trigger_zones",
    "collisions",
    "code_block_events",
    "gizmos",
  ]
summary: "Implement game triggering with Trigger Zone gizmos and player collision detection using Code Block Events for interactive gem collection mechanics."
tutorial: "build-your-first-game"
---

# Module 6 - Game Start and Collection

## What & Why

Implements two core game mechanics: triggering game start via Trigger Zone gizmos and enabling gem collection through player collision events. Uses built-in Code Block Events (`OnPlayerEnterTrigger`, `OnPlayerCollision`) to handle interactive player behaviors without complex physics programming.

## Key APIs / Concepts

- **Trigger Zone gizmo** - Built-in area detection for player entry/exit events
- `hz.CodeBlockEvents.OnPlayerEnterTrigger` - Built-in event fired when player enters trigger area
- `hz.CodeBlockEvents.OnPlayerCollision` - Built-in event fired when player collides with entity
- `this.connectCodeBlockEvent(entity, event, callback)` - Subscribe to Code Block Events
- **Collision Layer** - Controls which entities can interact (e.g., "Players Only")
- **Motion** and **Interaction** properties - Enable entity interactivity
- **Grabbable** behavior control - Configure player grabbing permissions

## How-To (Recipe)

1. **Add Trigger Zone** - Use Build menu > Gizmos > Trigger Zone for start area
2. **Create trigger script** - Attach script to trigger zone entity
3. **Connect trigger event** - Use `OnPlayerEnterTrigger` to detect player entry
4. **Configure gem properties** - Set Collision Layer, Motion, Interaction in Properties panel
5. **Enable collision events** - Set which player body parts trigger collisions
6. **Connect collision events** - Use `OnPlayerCollision` in gem controllers
7. **Test interaction** - Verify trigger starts game and collisions register

## Minimal Example

```typescript
// StartGameTrigger.ts - Trigger zone script
import { setGameState, GameState } from "GameManager";

class StartGameTrigger extends hz.Component {
  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      (enteredBy: hz.Player) => {
        this.handleOnPlayerEnter();
      }
    );
  }

  private handleOnPlayerEnter(): void {
    this.sendLocalBroadcastEvent(setGameState, { state: GameState.Playing });
  }
}

// GemController.ts - Collision detection
class GemController extends hz.Component {
  start() {
    // Other initialization...

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerCollision,
      (collidedWith: hz.Player) => {
        this.handleCollision();
      }
    );
  }

  private handleCollision(): void {
    console.log("gem collision");
    // Handle gem collection logic
  }
}
```

## Entity Configuration

**Gem Properties (via Properties panel):**

- **Collision Layer:** "Players Only"
- **Motion:** "Interactive"
- **Interaction:** "Grabbable"
- **Collision Events:** "Players"
- **Player body parts:** Enable "Player Torsos" only (disable heads/hands)
- **Who Can Grab:** "Script Assignee(s)" (prevents default grab behavior)

## Limits & Constraints

- Trigger zones are gizmos - add via Build menu, not code
- Collision events limited to configured body parts (torso recommended for collection games)
- Grabbable behavior requires explicit scripting when set to "Script Assignee(s)"
- Code Block Events are built-in - cannot create custom ones
- Player collision detection requires proper positioning at chest height

## Gotchas / Debugging

- **Multiple collision events** - Use "Player Torsos" only to avoid duplicate triggers from heads/hands
- **Trigger zone placement** - Must be positioned where players will walk through
- **Gem visibility timing** - Gems start hidden, appear only after trigger activation
- **Console debugging** - Use `console.log()` in collision handlers to verify events fire
- **Properties panel setup** - Must configure collision settings for each gem individually
- **Reference object height** - Position gems at chest level for reliable torso collision detection

## See Also

- [Module 5 - Build Game Setup](./05-build-game-setup.md) - Gem positioning system
- [Module 7 - Collecting Gems and Keeping Score](./07-collecting-gems-and-keeping-score.md) - Collection logic
- [Events and Triggers System](../../events-triggers-system.md) - Code Block Events overview
- [Gizmos Overview](../../gizmos-overview.md) - Trigger Zone and other gizmos

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection (accessed 2025-09-25)
