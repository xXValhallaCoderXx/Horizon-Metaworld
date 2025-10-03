---
title: "Module 3 - The Puzzle Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-3-the-puzzle-manager"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile_tutorial",
    "puzzle_manager",
    "events",
    "timeout",
  ]
summary: "Build a Puzzle Manager component that displays hints to players and manages puzzle completion by tracking players in rooms and moving objects when puzzles are solved."
tutorial: "web-mobile-development"
---

# Module 3 - The Puzzle Manager

## What & Why

The Puzzle Manager is a room-specific component that enhances player experience by providing timed hints and managing puzzle completion flow. It automatically displays hints to struggling players and coordinates object movement (doors, platforms) when puzzles are solved, creating a smooth progression system for cross-platform puzzle games.

## Key APIs / Concepts

- **NetworkEvent** - `OnFinishPuzzle` for puzzle completion coordination
- **LocalEvent** - `OnMoveObject` for moving completion objects (doors)
- **CodeBlockEvents** - `OnPlayerEnterTrigger`/`OnPlayerExitTrigger` for room tracking
- **Timer management** - `setTimeout()`/`setInterval()` for hint timing
- **Player tracking** - Array-based active player management
- **HUD integration** - `sendNetworkBroadcastEvent()` for hint display

## How-To (Recipe)

1. **Define puzzle events** in shared `sysEvents` script
2. **Track room occupancy** using trigger zone entry/exit events
3. **Start hint timer** when first player enters room (30s delay)
4. **Display timed hints** via HUD system with repeat intervals
5. **Listen for completion** via `OnFinishPuzzle` network event
6. **Move objects** by sending `OnMoveObject` to target entities
7. **Clean up timers** when puzzle completes

## Minimal Example

```typescript
// Events in sysEvents script
OnFinishPuzzle: new hz.NetworkEvent("OnFinishPuzzle"),
OnMoveObject: new hz.LocalEvent("OnMoveObject"),

// Puzzle Manager component
class sysPuzzleManager extends hz.Component<typeof sysPuzzleManager> {
  static propsDefinition = {
    hintText: {type: hz.PropTypes.String},
    hintDelay: {type: hz.PropTypes.Number, default: 30},
    hintDuration: {type: hz.PropTypes.Number, default: 5},
    hintRepeatTime: {type: hz.PropTypes.Number, default: 30},
    objectToMove: {type: hz.PropTypes.Entity},
  };

  private activePlayersList = new Array<hz.Player>();
  private isActive = false;
  private timeoutID = -1;
  private intervalID = -1;

  start() {
    // Track players entering room
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      (player: hz.Player) => {
        if (!this.activePlayersList.includes(player)) {
          this.activePlayersList.push(player);
        }
        if (!this.isActive) this.OnStartPuzzle();
      }
    );

    // Track players leaving room
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitTrigger,
      (player: hz.Player) => {
        if (this.activePlayersList.includes(player)) {
          this.activePlayersList.splice(this.activePlayersList.indexOf(player), 1);
        }
      }
    );

    // Listen for puzzle completion
    this.connectNetworkEvent(this.entity, sysEvents.OnFinishPuzzle, () => {
      this.OnFinishPuzzle();
    });
  }

  private OnStartPuzzle() {
    this.isActive = true;
    this.timeoutID = this.async.setTimeout(() => {
      // Display initial hint
      this.sendNetworkBroadcastEvent(sysEvents.OnDisplayHintHUD, {
        players: this.activePlayersList,
        text: this.props.hintText,
        duration: this.props.hintDuration
      });

      // Set up repeating hints
      this.intervalID = this.async.setInterval(() => {
        this.sendNetworkBroadcastEvent(sysEvents.OnDisplayHintHUD, {
          players: this.activePlayersList,
          text: this.props.hintText,
          duration: this.props.hintDuration
        });
      }, this.props.hintRepeatTime * 1000);
    }, this.props.hintDelay * 1000);
  }

  private OnFinishPuzzle() {
    this.async.clearTimeout(this.timeoutID);
    this.async.clearInterval(this.intervalID);
    if (this.props.objectToMove) {
      this.sendLocalEvent(this.props.objectToMove, sysEvents.OnMoveObject, {});
    }
  }
}
```

## Limits & Constraints

- **Timer precision**: JavaScript timers (1000ms = 1 second conversion)
- **Player tracking**: Array-based list management for active players
- **Event coupling**: Requires HUD system from Module 2 for hint display
- **Object movement**: Target entities must implement `OnMoveObject` event handling

## Gotchas / Debugging

- **Timer cleanup essential**: Always clear timeouts/intervals on puzzle completion
- **Player list maintenance**: Remove players on exit to avoid ghost hints
- **Event dependencies**: Ensure `sysEvents` script is imported correctly
- **Null object checks**: Verify `objectToMove` entity exists before sending events
- **Testing timing**: Use Preview Mode and wait 30s for hint activation

## See Also

- [Module 2 - HUD System](./02-hud-system.md) - Required HUD for hint display
- [Module 4 - Camera Manager](./04-camera-manager.md) - Next component in tutorial
- [Events and Triggers System](../events-triggers-system.md) - Event system concepts
- [Local Events documentation](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/local-events/)
- [Broadcast Events documentation](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/broadcast-events/)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-3-the-puzzle-manager (accessed 2025-09-25)
