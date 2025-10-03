---
title: "Objects and Components Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-5-build-game-setup"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection"
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "entities",
    "components",
    "properties",
    "collisions",
    "objects",
  ]
summary: "Entity-component architecture in Horizon Worlds covering object properties, collision detection, component properties, and reference object patterns."
---

# Objects and Components Overview

## What & Why

Horizon Worlds uses an entity-component architecture where world objects (entities) host behavior scripts (components). Essential for game logic organization, property management, collision detection, and dynamic object manipulation. Enables modular, reusable code patterns and flexible world design.

## Key APIs / Concepts

### Entity Management

- **hz.Entity** - Base type for all world objects
- **this.entity** - Reference to entity hosting the component
- **entity.id** - Unique identifier (bigint) for entity tracking
- **entity.position** - 3D position manipulation via Vec3
- **Reference objects** - Empty objects used as positioning anchors

### Component Properties

- **hz.PropTypes.Entity** - Component property type for world object references
- **this.props.<propName>** - Access component properties set via Properties panel
- **propsDefinition** - Static object defining component's configurable properties
- **Entity arrays** - Converting individual entity props to arrays for iteration

### Collision System

- **Collision Layer** - Controls which entities can interact (e.g., "Players Only")
- **Motion** and **Interaction** properties - Configure entity interactivity
- **Collision Events** - Enable collision detection for specific player body parts
- **Grabbable** behavior - Control player grabbing permissions
- **Gameplay Tags** - String identifiers for collision filtering ("floor", "ball", "player")
- **Collision Events From** - Filter collisions by specific tagged objects
- **Object Tag** - Target specific gameplay tags for collision events
- **hz.CodeBlockEvents.OnEntityCollision** - Entity-to-entity collision event

## How-To (Recipe)

### Entity Property Setup

1. **Define Properties** - Add `hz.PropTypes.Entity` entries to `propsDefinition`
2. **Wire in Editor** - Use Properties panel to connect world objects to component props
3. **Convert to Arrays** - Assign individual props to local variables, then push to arrays
4. **Access Properties** - Use `this.props.<propName>` in component methods

### Reference Object Pattern

1. **Create Empty Objects** - Add Empty objects via Build menu for positioning references
2. **Position References** - Place empty objects where entities should appear/move
3. **Name for Clarity** - Rename empty objects in Properties panel for identification
4. **Wire to Components** - Connect reference objects to component properties
5. **Use for Positioning** - Set entity positions to reference object positions

### Collision Configuration

1. **Set Collision Layer** - Configure which entity types can interact
2. **Enable Motion** - Set to "Interactive" for collision detection
3. **Configure Interaction** - Set to "Grabbable" but control grabbing permissions
4. **Enable Collision Events** - Set to "Players" for player collision detection
5. **Limit Body Parts** - Enable "Player Torsos" only to avoid duplicate events
6. **Control Grabbing** - Set "Who Can Grab" to "Script Assignee(s)" to prevent default behavior

### Entity-to-Entity Collision Setup

1. **Add Gameplay Tags** - Tag entities with identifiers (e.g., "floor", "ball")
2. **Set Collision Events From** - Configure to "Objects Tagged" for filtered detection
3. **Specify Object Tag** - Target specific tags for collision events
4. **Enable Collidable** - Both entities must have collision enabled
5. **Configure Physics** - Set Motion="Interactive" and appropriate Interaction type

## Minimal Example

```typescript
// Entity properties and array management
class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {
    gemOne: { type: hz.PropTypes.Entity },
    gemTwo: { type: hz.PropTypes.Entity },
    gemThree: { type: hz.PropTypes.Entity },
    // ... more gems
  };

  private gems: hz.Entity[] = [];

  start() {
    // Convert individual props to array (required by API v2.0.0)
    const gem1: Readonly<hz.Entity> | undefined = this.props.gemOne;
    const gem2: Readonly<hz.Entity> | undefined = this.props.gemTwo;
    const gem3: Readonly<hz.Entity> | undefined = this.props.gemThree;

    this.gems.push(gem1!, gem2!, gem3!);

    // Send entity events to all gems
    this.gems.forEach((gem: hz.Entity) => {
      this.sendLocalEvent(gem, moveGemToCourse, {});
    });
  }
}

// Reference object positioning
class GemController extends hz.Component {
  static propsDefinition = {
    coursePositionRef: { type: hz.PropTypes.Entity }, // Reference object
  };

  private hiddenLocation = new hz.Vec3(0, -100, 0);

  start() {
    // Hide entity initially
    this.entity.position.set(this.hiddenLocation);
  }

  private moveToPosition(): void {
    // Use reference object position
    this.entity.position.set(this.props.coursePositionRef!.position.get());
  }
}

// Collision detection setup
class CollisionHandler extends hz.Component {
  start() {
    // Player collision
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerCollision,
      (collidedWith: hz.Player) => {
        this.handlePlayerCollision(collidedWith);
      }
    );

    // Entity-to-entity collision
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnEntityCollision,
      (
        collidedWith: hz.Entity,
        collisionAt: hz.Vec3,
        normal: hz.Vec3,
        relativeVelocity: hz.Vec3,
        localColliderName: string,
        otherColliderName: string
      ) => {
        this.handleEntityCollision(collidedWith);
      }
    );
  }

  private handlePlayerCollision(player: hz.Player): void {
    console.log("Player collision detected");
  }

  private handleEntityCollision(entity: hz.Entity): void {
    console.log("Entity collision detected");
    // Reset position or other collision response
    this.entity.position.set(this.originalPosition);
  }
}
```

## Entity Configuration (Properties Panel)

**Collision-Enabled Entities:**

- **Collision Layer:** "Players Only"
- **Motion:** "Interactive"
- **Interaction:** "Grabbable"
- **Collision Events:** "Players"
- **Body Parts:** Enable "Player Torsos" only
- **Who Can Grab:** "Script Assignee(s)" (prevents default grab behavior)

**Entity-to-Entity Collision:**

- **Collidable:** Both entities must be enabled
- **Motion:** "Interactive" required for physics interaction
- **Interaction:** "Physics" for physics objects, "Grabbable" for interactive objects
- **Collision Events From:** "Objects Tagged" for filtered detection
- **Object Tag:** Specify target gameplay tag
- **Gameplay Tags:** Add to entities for collision filtering

**Reference Objects:**

- Use Empty objects from Build menu
- Position where entities should appear
- Name descriptively (e.g., "gem1-position-ref")
- Connect to component properties

## Limits & Constraints

- **Entity Array Props** - Not directly supported; use individual entity properties
- **Props to Variables** - API v2.0.0 requires assignment to local variables before array operations
- **Entity IDs** - Use `bigint` type for unique identification and Map operations
- **Collision Detection** - Requires proper entity configuration and positioning
- **Reference Object Performance** - Lightweight Empty objects preferred over complex geometry

## Gotchas / Debugging

**Property Management:**

- **Local variable requirement** - Must assign `this.props.gemOne` to `const gem1` before array operations
- **Non-null assertions** - Use `!` when confident props are wired (e.g., `gem1!`)
- **Property wiring** - Must connect entities in Properties panel after defining `propsDefinition`

**Collision Detection:**

- **Body part configuration** - Use "Player Torsos" only to avoid multiple collision events
- **Entity positioning** - Reference objects should be at chest height for reliable torso collision
- **Collision layer scoping** - Set to "Players Only" to avoid unintended interactions
- **Grabbable vs collision** - Set "Script Assignee(s)" to enable collision without default grab behavior
- **Gameplay tag filtering** - Use tags to control which entities trigger collision events
- **Entity collision setup** - Both entities need Collidable enabled for OnEntityCollision events
- **Collision event parameters** - OnEntityCollision provides collision position, normal, velocity data

**Reference Objects:**

- **Empty object workflow** - Create → Position → Name → Wire to props → Use in code
- **Position updates** - Use `.position.get()` and `.position.set()` for position manipulation
- **Naming convention** - Use descriptive names for easier Properties panel management

## Design Patterns

**Entity Management:**

- Individual properties converted to arrays for iteration
- Map-based entity tracking using entity IDs
- Reference objects for flexible positioning
- Hide-and-show technique for performance over spawning/despawning

**Component Architecture:**

- Single responsibility components (GemController, PlayerManager, GameManager)
- Event-driven communication between components
- Property-based configuration via Properties panel
- Separation of "when" (managers) vs "where" (individual controllers)

## From Tutorials

- [Module 2 - Intro to Scripting](./tutorials/build-your-first-game/02-intro-to-scripting.md): Empty object attachment, component basics
- [Module 5 - Build Game Setup](./tutorials/build-your-first-game/05-build-game-setup.md): Entity properties, reference objects, component arrays
- [Module 6 - Game Start and Collection](./tutorials/build-your-first-game/06-game-start-and-collection.md): Collision configuration, player interaction setup
- [Module 7 - Collecting Gems and Keeping Score](./tutorials/build-your-first-game/07-collecting-gems-and-keeping-score.md): Entity ID tracking with Maps
- [Batting Cage Tutorial](./tutorials/batting-cage/01-batting-cage-tutorial.md): Entity-to-entity collision, gameplay tags, physics objects, grabbable entities

## See Also

- [TypeScript Development Overview](./typescript-development-overview.md) - Component patterns and entity handling
- [Events and Triggers System](./events-triggers-system.md) - Component communication
- [Performance Considerations](./performance-optimization.md) - Entity management best practices

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-5-build-game-setup (accessed 2025-09-25)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-6-game-start-and-collection (accessed 2025-09-25)
- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial (accessed 2025-09-25)
