---
title: "Module 5 - Build Game Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-5-build-game-setup"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "entities",
    "components",
    "properties",
    "gem_controller",
  ]
summary: "Build game setup system using entity properties, component communication, and reference objects for dynamic gem positioning and visibility control."
tutorial: "build-your-first-game"
---

# Module 5 - Build Game Setup

## What & Why

Implements the core game setup requirements: gems hidden during Ready state, populated during Playing state. Uses separation of concerns - GameManager controls "when" gems move, individual GemController components control "where" they position. Leverages component properties, entity arrays, and reference objects for flexible positioning.

## Key APIs / Concepts

- `hz.PropTypes.Entity` - Component property type for world object references
- `this.props.<propName>` - Access component properties set via Properties panel
- `this.sendLocalEvent(entity, event, data)` - Send event directly to specific entity
- `this.connectLocalEvent(entity, event, callback)` - Subscribe to entity-targeted events
- `this.entity.position.set(vec3)` - Set entity world position
- Reference objects - Empty objects used as positioning anchors
- Hide-and-show technique - Performance-efficient visibility control vs spawning/despawning

## How-To (Recipe)

1. **Define entity properties** - Add `hz.PropTypes.Entity` entries to `propsDefinition`
2. **Wire properties in editor** - Use Properties panel to connect world objects to component props
3. **Create entity array** - Convert individual props to array for iteration
4. **Create entity events** - Define local events for direct entity communication
5. **Send entity events** - Loop through entities using `sendLocalEvent()`
6. **Build controller component** - Create component to handle entity-specific behavior
7. **Use reference objects** - Position entities relative to Empty object anchors

## Minimal Example

```typescript
// GameManager.ts - Managing multiple entities
class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {
    gemOne: { type: hz.PropTypes.Entity },
    gemTwo: { type: hz.PropTypes.Entity },
    // ... more gems
  };

  private gems: hz.Entity[] = [];

  start() {
    // Convert props to array
    const gem1: Readonly<hz.Entity> | undefined = this.props.gemOne;
    const gem2: Readonly<hz.Entity> | undefined = this.props.gemTwo;
    this.gems.push(gem1!, gem2!);
  }

  private onGameStatePlaying(): void {
    // Send entity events
    this.gems.forEach((gem: hz.Entity) => {
      this.sendLocalEvent(gem, moveGemToCourse, {});
    });
  }
}

// GemController.ts - Individual entity behavior
export const moveGemToCourse = new hz.LocalEvent<{}>("moveGemToCourse");

class GemController extends hz.Component {
  static propsDefinition = {
    coursePositionRef: { type: hz.PropTypes.Entity },
  };

  private hiddenLocation = new hz.Vec3(0, -100, 0);

  start() {
    // Hide gem initially
    this.entity.position.set(this.hiddenLocation);

    // Subscribe to entity events
    this.connectLocalEvent(this.entity, moveGemToCourse, () => {
      this.onMoveGemToCourseEvent();
    });
  }

  private onMoveGemToCourseEvent(): void {
    // Move to reference object position
    this.entity.position.set(this.props.coursePositionRef!.position.get());
  }
}
```

## Limits & Constraints

- Entity Array props not supported - must use individual entity properties
- Properties panel props cannot directly serve as inputs to other scripted objects (API v2.0.0)
- Must assign props to local variables before array operations
- Entity positions use Vec3 coordinate system
- Hidden positions should be far enough to be invisible (e.g., -100 Y units)

## Gotchas / Debugging

- **Props to local variables** - Must assign `this.props.gemOne` to `const gem1` before array operations
- **Non-null assertion** - Use `!` operator when confident entity props are set (e.g., `gem1!`)
- **Entity vs component events** - `sendLocalEvent()` targets specific entities, `sendLocalBroadcastEvent()` broadcasts to all
- **Reference object workflow** - Create Empty objects, position them, then wire to component props
- **Properties panel mapping** - Rename entities for easier identification in dropdown lists
- **Import/export events** - GemController must import events from GameManager module

## See Also

- [Module 4 - Broadcast Events](./04-broadcast-events.md) - Event foundation
- [Module 6 - Game Start and Collection](./06-game-start-and-collection.md) - Using positioned gems
- [Objects and Components Overview](../../objects-components-gizmos.md) - Entity system details

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-5-build-game-setup (accessed 2025-09-25)
