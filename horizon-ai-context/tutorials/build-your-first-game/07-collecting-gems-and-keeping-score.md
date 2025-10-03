---
title: "Module 7 - Collecting Gems and Keeping Score"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-7-collecting-gems-and-keeping-score"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "score_tracking",
    "game_state",
    "maps",
    "win_conditions",
  ]
summary: "Implement complete gem collection system with score tracking using Maps, win condition detection, and game reset mechanics for replay functionality."
tutorial: "build-your-first-game"
---

# Module 7 - Collecting Gems and Keeping Score

## What & Why

Completes the game loop by implementing gem collection tracking, win condition detection, and reset functionality. Uses separation of concerns: gems manage their own collection behavior, GameManager tracks overall progress using Map data structures to prevent duplicate counting and enable complex win conditions.

## Key APIs / Concepts

- `Map<bigint, hz.Entity>` - Entity tracking using unique entity IDs
- `map.has(entity.id)` and `map.set(entity.id, entity)` - Duplicate-safe entity tracking
- `map.size` vs `array.length` - Different size properties for Maps and arrays
- `map.clear()` - Reset tracking for game replay
- **Broadcast events for collection** - Gems emit collection events for multiple subscribers
- **Entity ID tracking** - Using `entity.id` (bigint) as unique identifiers
- **Game reset patterns** - Additional trigger zones for state transitions

## How-To (Recipe)

1. **Create collection tracking** - Add `Map<bigint, hz.Entity>` to GameManager for collected gems
2. **Create collection event** - Define `collectGem` broadcast event with entity payload
3. **Subscribe to collections** - GameManager listens for gem collection events
4. **Handle collection logic** - Check duplicates, update map, test win conditions
5. **Implement gem collection** - Gems hide themselves and broadcast collection event
6. **Add reset trigger** - Second trigger zone to return game to Ready state
7. **Clear tracking on reset** - Reset collection map when game restarts

## Minimal Example

```typescript
// GameManager.ts - Score tracking and win conditions
export const collectGem = new hz.LocalEvent<{ gem: hz.Entity }>("collectGem");

class GameManager extends hz.Component<typeof GameManager> {
  private totalGemsCollected: Map<bigint, hz.Entity> = new Map<
    bigint,
    hz.Entity
  >();
  private gems: hz.Entity[] = [];

  start() {
    // ... other initialization
    this.connectLocalBroadcastEvent(collectGem, (data: { gem: hz.Entity }) => {
      this.handleGemCollect(data.gem);
    });
  }

  private handleGemCollect(gem: hz.Entity): void {
    // Prevent duplicate counting
    if (!this.totalGemsCollected.has(gem.id)) {
      this.totalGemsCollected.set(gem.id, gem);
    }

    // Check win condition
    if (this.totalGemsCollected.size === this.gems.length) {
      this.setGameState(GameState.Finished);
    }
  }

  private onGameStateReady(): void {
    this.totalGemsCollected.clear(); // Reset for replay
  }
}

// GemController.ts - Collection behavior
import { collectGem } from "GameManager";

class GemController extends hz.Component {
  private hiddenLocation = new hz.Vec3(0, -100, 0);

  private handleCollision(): void {
    // Hide gem
    this.entity.position.set(this.hiddenLocation);

    // Broadcast collection
    this.sendLocalBroadcastEvent(collectGem, { gem: this.entity });
  }
}

// ResetGameTrigger.ts - Game reset
import { GameState, setGameState } from "GameManager";

class ResetGameTrigger extends hz.Component<typeof ResetGameTrigger> {
  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      (enteredBy: hz.Player) => {
        this.sendLocalBroadcastEvent(setGameState, { state: GameState.Ready });
      }
    );
  }
}
```

## Limits & Constraints

- Entity IDs are `bigint` type - use for Map keys, not regular numbers
- Map and Array have different size properties (`size` vs `length`)
- Reset only works from Finished state in basic implementation
- Collection events fire once per collision (gems handle their own hiding)
- Map-based tracking prevents duplicate counting but requires entity ID uniqueness

## Gotchas / Debugging

- **Map vs Array syntax** - `map.size` not `map.length`, `array.length` not `array.size`
- **Entity ID types** - Use `entity.id` (bigint) as Map key, not entity reference
- **Duplicate prevention** - Always check `map.has(id)` before `map.set(id, entity)`
- **Win condition timing** - Check after Map update, not before
- **Reset behavior** - `map.clear()` must be called in Ready state handler
- **Broadcast vs Entity events** - Collection uses broadcast for multiple listeners (scoreboard, audio, etc.)
- **Game state dependencies** - Reset trigger may need state checking for complex reset logic

## Design Patterns

**Separation of Concerns:**

- **Individual gems** - Handle their own collection behavior (hiding, broadcasting)
- **GameManager** - Tracks overall progress and win conditions
- **Multiple subscribers** - Broadcast events enable scoreboard, audio, effects to all listen

**Entity Tracking:**

- Use Map with entity IDs for duplicate-safe counting
- Prefer Map over simple counters for complex win conditions
- Clear tracking on state transitions for replay support

## See Also

- [Module 6 - Game Start and Collection](./06-game-start-and-collection.md) - Collision detection setup
- [Module 8 - Adding Polish](./08-adding-polish.md) - UI and visual enhancements
- [Events and Triggers System](../../events-triggers-system.md) - Event architecture patterns
- [TypeScript Development Overview](../../typescript-development-overview.md) - Map and entity handling

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-7-collecting-gems-and-keeping-score (accessed 2025-09-25)
