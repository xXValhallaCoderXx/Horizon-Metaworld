---
title: "Module 8 - Adding Polish"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-8-adding-polish"
last_updated: "2025-09-25T00:00:00Z"
tags:
  ["horizon_worlds", "tutorial", "text_gizmos", "ui", "polish", "scoreboard"]
summary: "Add UI polish with Text gizmos for dynamic scoreboard display, including entity casting, text property manipulation, and state-based message updates."
tutorial: "build-your-first-game"
---

# Module 8 - Adding Polish

## What & Why

Completes the game with UI polish by implementing a dynamic scoreboard using Text gizmos. Demonstrates entity casting, text property manipulation, and integrating UI updates with existing game state events. Provides user feedback for game states and progress tracking.

## Key APIs / Concepts

- **Text gizmo** - Built-in UI element for displaying dynamic text in 3D space
- `entity.as(hz.TextGizmo)` - Entity casting to access gizmo-specific properties
- `textGizmo.text.set(string)` - Update text content dynamically
- **Template literals** - String interpolation for dynamic content (e.g., `\`Gems: \${count}\``)
- **Entity property casting** - Converting generic entities to specific gizmo types
- **UI-state integration** - Updating UI elements from game state changes

## How-To (Recipe)

1. **Add Text gizmo** - Use Build menu > Gizmos > Text Gizmo in world
2. **Position scoreboard** - Place text visible from gameplay area
3. **Create entity property** - Add text gizmo as component property
4. **Wire in Properties panel** - Connect Text gizmo entity to component prop
5. **Create update method** - Single method to handle all text updates
6. **Cast to TextGizmo** - Use `entity.as(hz.TextGizmo)` for text API access
7. **Integrate with game states** - Call update method from state change handlers

## Minimal Example

```typescript
// GameManager.ts - Text gizmo integration
class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {
    // ... other props
    scoreboard: { type: hz.PropTypes.Entity }, // Text gizmo reference
  };

  private updateScoreboard(text: string): void {
    // Cast entity to TextGizmo to access text property
    this.props.scoreboard!.as(hz.TextGizmo)!.text.set(text);
  }

  private onGameStateReady(): void {
    this.totalGemsCollected.clear();
    this.updateScoreboard("Ready");
  }

  private onGameStatePlaying(): void {
    // ... gem positioning logic
    this.updateScoreboard("Game On!");
  }

  private onGameStateFinished(): void {
    this.updateScoreboard("Game Over");
  }

  private handleGemCollect(gem: hz.Entity): void {
    if (!this.totalGemsCollected.has(gem.id)) {
      this.totalGemsCollected.set(gem.id, gem);

      // Dynamic text with template literal
      this.updateScoreboard(`Gems Collected: ${this.totalGemsCollected.size}`);
    }

    if (this.totalGemsCollected.size === this.gems.length) {
      this.setGameState(GameState.Finished);
    }
  }
}
```

## Text Gizmo Setup

**In Desktop Editor:**

1. Build menu > Gizmos > Text Gizmo
2. Position text high and visible from course
3. Name entity "Scoreboard" in Properties panel
4. Connect to GameManager scoreboard property

**Entity Casting Chain:**

```typescript
this.props
  .scoreboard! // Entity property (could be undefined)
  .as(hz.TextGizmo)! // Cast to TextGizmo type
  .text // Access text property
  .set(text); // Update text content
```

## Limits & Constraints

- Text gizmos are 3D world objects - position carefully for visibility
- Entity casting required to access gizmo-specific APIs
- Text property uses `set()` method, not direct assignment
- Template literals work for dynamic content but watch performance with frequent updates
- UI updates should be centralized through single update method

## Gotchas / Debugging

- **Entity casting syntax** - Must cast `entity.as(hz.TextGizmo)` before accessing `text` property
- **Non-null assertions** - Use `!` when confident entity props are wired (`this.props.scoreboard!`)
- **Property wiring** - Must connect Text gizmo to component prop in Properties panel
- **Template literal syntax** - Use backticks `` `Gems: ${count}` `` not quotes for interpolation
- **Text visibility** - Position text gizmos where players can see them during gameplay
- **State integration** - Update scoreboard from all relevant state change points

## Extension Ideas

The tutorial suggests several expansion possibilities:

- **Environment** - Add skydome via Environment gizmo
- **Audio** - State-specific music and sound effects
- **Sound FX** - Collection sounds via event listeners
- **Game mechanics** - Enemies, dropping gems, individual player scores
- **Multiplayer** - Winner determination and leaderboards

## See Also

- [Module 7 - Collecting Gems and Keeping Score](./07-collecting-gems-and-keeping-score.md) - Game state foundation
- [Gizmos Overview](../../gizmos-overview.md) - Text and other gizmo types
- [UI and Interface Design](../../ui-interface-design.md) - Advanced UI patterns
- [TypeScript Development Overview](../../typescript-development-overview.md) - Entity casting patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-8-adding-polish (accessed 2025-09-25)
