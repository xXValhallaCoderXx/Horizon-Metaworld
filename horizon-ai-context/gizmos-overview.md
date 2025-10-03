---
title: "Gizmos Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-8-adding-polish"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "gizmos", "trigger_zones", "text_gizmos", "ui"]
summary: "Built-in interactive components in Horizon Worlds including Trigger Zones for area detection and Text Gizmos for dynamic UI display."
---

# Gizmos Overview

## What & Why

Gizmos are pre-built interactive components in Horizon Worlds that provide common game functionality without custom scripting. Essential for user interfaces, area detection, environmental effects, and player interactions. Enable rapid prototyping and reduce development complexity for standard game mechanics.

## Key Gizmo Types

### Trigger Zone Gizmos

- **Purpose**: Detect player entry/exit from defined 3D areas
- **Use Cases**: Game start triggers, checkpoint detection, zone-based events
- **Events**: `OnPlayerEnterTrigger`, `OnPlayerExitTrigger`
- **Configuration**: Position, scale, collision detection settings

### Text Gizmos

- **Purpose**: Display dynamic text content in 3D space
- **Use Cases**: Scoreboards, instructions, game state displays
- **API**: `entity.as(hz.TextGizmo).text.set(string)`
- **Configuration**: Font, size, color, positioning, visibility

## How-To (Recipe)

### Adding Gizmos

1. **Access via Build Menu** - Build menu > Gizmos in desktop editor
2. **Drag and Place** - Click and drag gizmo type into world
3. **Position and Scale** - Use Move and Scale tools for proper placement
4. **Configure Properties** - Set gizmo-specific settings in Properties panel

### Trigger Zone Setup

1. **Add Trigger Zone** - Build menu > Gizmos > Trigger Zone
2. **Position at Entry Point** - Place where players should trigger action
3. **Scale to Coverage Area** - Match trigger size to intended detection zone
4. **Attach Script** - Create component script and attach to trigger entity
5. **Subscribe to Events** - Use `connectCodeBlockEvent` for player entry detection

### Text Gizmo Setup

1. **Add Text Gizmo** - Build menu > Gizmos > Text Gizmo
2. **Position for Visibility** - Place where players can see during gameplay
3. **Name Entity** - Give descriptive name in Properties panel
4. **Wire to Component** - Add as entity property to controlling script
5. **Cast and Update** - Use entity casting to access text manipulation methods

## Minimal Example

```typescript
// Trigger Zone - Game start detection
class StartGameTrigger extends hz.Component {
  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      (enteredBy: hz.Player) => {
        this.handlePlayerEnter();
      }
    );
  }

  private handlePlayerEnter(): void {
    // Trigger game start logic
    this.sendLocalBroadcastEvent(setGameState, { state: GameState.Playing });
  }
}

// Text Gizmo - Dynamic scoreboard
class GameManager extends hz.Component {
  static propsDefinition = {
    scoreboard: { type: hz.PropTypes.Entity }, // Text gizmo reference
  };

  private updateScoreboard(text: string): void {
    // Cast entity to TextGizmo to access text property
    this.props.scoreboard!.as(hz.TextGizmo)!.text.set(text);
  }

  private handleGameStateChange(newState: GameState): void {
    switch (newState) {
      case GameState.Ready:
        this.updateScoreboard("Ready");
        break;
      case GameState.Playing:
        this.updateScoreboard("Game On!");
        break;
      case GameState.Finished:
        this.updateScoreboard("Game Over");
        break;
    }
  }
}
```

## Limits & Constraints

**Trigger Zones:**

- Area-based detection only (no individual entity targeting)
- Requires proper collision layer configuration
- Player torso positioning affects detection reliability

**Text Gizmos:**

- 3D world objects (not 2D overlay UI)
- Entity casting required for text manipulation
- Performance considerations with frequent updates
- Visibility depends on world positioning and player location

## Gotchas / Debugging

**Trigger Zones:**

- **Positioning matters** - Triggers must be placed in player pathways
- **Scale appropriately** - Match trigger size to intended detection area
- **Collision layers** - Configure "Players Only" for game-specific triggers
- **Script attachment** - Trigger scripts must be attached to trigger entity

**Text Gizmos:**

- **Entity casting syntax** - Must use `entity.as(hz.TextGizmo)` before accessing text property
- **Property wiring** - Connect Text gizmo to component prop in Properties panel
- **Visibility planning** - Position text where players can see during gameplay
- **Template literals** - Use backticks for string interpolation: `` `Score: ${count}` ``

## Design Patterns

**Trigger-Based Game Flow:**

- Start triggers on entry platforms
- Reset triggers in designated areas
- Multiple triggers for different game phases
- State-based trigger behavior (some triggers only work in certain states)

**Dynamic UI Updates:**

- Centralized update methods for text manipulation
- State-driven UI changes
- Template literals for dynamic content
- Consistent messaging across game states

## From Tutorials

- [Module 6 - Game Start and Collection](./tutorials/build-your-first-game/06-game-start-and-collection.md): Trigger Zone setup, OnPlayerEnterTrigger events, collision configuration
- [Module 7 - Collecting Gems and Keeping Score](./tutorials/build-your-first-game/07-collecting-gems-and-keeping-score.md): Reset triggers for game replay
- [Module 8 - Adding Polish](./tutorials/build-your-first-game/08-adding-polish.md): Text Gizmo implementation, entity casting, scoreboard integration

## See Also

- [Events and Triggers System](./events-triggers-system.md) - Code Block Events from gizmos
- [UI and Interface Design](./ui-interface-design.md) - Text gizmo UI patterns
- [Game State Management](./game-state-management.md) - State-driven gizmo behavior

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection (accessed 2025-09-25)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-8-adding-polish (accessed 2025-09-25)
