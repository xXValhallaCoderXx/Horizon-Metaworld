---
title: "Batting Cage Tutorial - Adding and Manipulating Objects"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "collision_detection",
    "physics",
    "grabbable_entities",
    "local_scripting",
    "ownership",
    "cross_platform",
  ]
tutorial: "batting-cage"
summary: "Complete tutorial for creating a batting cage game covering entity setup, collision detection, physics behaviors, local scripting, and cross-platform deployment."
---

# Batting Cage Tutorial - Adding and Manipulating Objects

## What & Why

The Batting Cage tutorial demonstrates core Horizon Worlds game development patterns through a simple interactive baseball game. Players grab a bat and try to hit a falling baseball, showcasing fundamental concepts like entity behaviors, collision detection, physics simulation, and local scripting for improved performance. This tutorial is essential for understanding object manipulation, cross-platform compatibility, and entity ownership patterns.

## Key APIs / Concepts

### Entity Properties & Behaviors

- **Collidable**: Enables collision detection between entities
- **Motion = "Interactive"**: Makes entities physically interactive
- **Interaction = "Grabbable"/"Physics"**: Defines interaction type
- **Gravity**: Custom gravity values (default: -9.81 m/s², tutorial uses -0.20 for slower fall)
- **Gameplay Tags**: String identifiers for collision filtering ("floor", "ball")

### Collision System

- **Collision Events From = "Objects Tagged"**: Filter collisions by gameplay tags
- **Object Tag**: Specify which tagged objects trigger collision events
- `hz.CodeBlockEvents.OnEntityCollision`: Event triggered on entity collisions
- Collision callback parameters: `(collidedWith, collisionAt, normal, relativeVelocity, localColliderName, otherColliderName)`

### Grabbing & Ownership

- `hz.CodeBlockEvents.OnGrabStart`: Triggered when player grabs entity
- `hz.CodeBlockEvents.OnGrabEnd`: Triggered when player releases entity
- `entity.owner.set(player)`: Transfer ownership to specific player
- `this.world.getServerPlayer()`: Get server player reference for ownership reset

### Physics & Position Control

- `entity.position.get()` / `entity.position.set(vec3)`: Position management
- `entity.as(hz.PhysicalEntity)?.zeroVelocity()`: Reset entity velocity
- `hz.Vec3.zero`: Zero vector constant

### UI & Feedback

- `this.world.ui.showPopupForPlayer(player, message, duration)`: Display player-specific popup messages

### Local Scripting & Ownership Transfer

- **Script Execution Mode = "Local"**: Run scripts on player's device for reduced latency
- `override receiveOwnership(state, fromPlayer, toPlayer)`: Handle ownership transfer to script
- `override transferOwnership(fromPlayer, toPlayer): State`: Prepare state for ownership transfer

## How-To (Recipe)

### 1. Setup Basic World

1. Create new world in desktop editor
2. Spawn SpawnPoint gizmo (avatar spawn location)
3. Create basic objects: Cylinder (Bat), Sphere (Ball), Cube (Floor)
4. Resize and position objects appropriately

### 2. Configure Entity Behaviors

1. **Ball setup**:

   - Enable Collidable
   - Set Motion = "Interactive", Interaction = "Physics"
   - Enable Gravity with custom value (-0.20 for slower fall)
   - Add Gameplay Tag "ball"
   - Set Collision Events From = "Objects Tagged", Object Tag = "floor"

2. **Bat setup**:

   - Enable Collidable
   - Set Motion = "Interactive", Interaction = "Grabbable"
   - Set Collision Events From = "Objects Tagged", Object Tag = "ball"

3. **Floor setup**:
   - Add Gameplay Tag "floor"

### 3. Create Ball Reset Script

```typescript
import * as hz from "horizon/core";

class BallScript extends hz.Component<typeof BallScript> {
  static propsDefinition = {};
  originalPosition: hz.Vec3 = hz.Vec3.zero;

  start() {
    this.originalPosition = this.entity.position.get();

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnEntityCollision,
      (
        collidedWith,
        collisionAt,
        normal,
        relativeVelocity,
        localColliderName,
        otherColliderName
      ) => {
        this.entity.position.set(this.originalPosition!);
        this.entity.as(hz.PhysicalEntity)?.zeroVelocity();
      }
    );
  }
}
hz.Component.register(BallScript);
```

### 4. Create Bat Interaction Script

```typescript
import * as hz from "horizon/core";

class BatScript extends hz.Component<typeof BatScript> {
  static propsDefinition = {};
  batHolder: hz.Player | null = null;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.batHolder = player;
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.batHolder = null;
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnEntityCollision,
      (
        collidedWith,
        collisionAt,
        normal,
        relativeVelocity,
        localColliderName,
        otherColliderName
      ) => {
        if (this.batHolder) {
          this.world.ui.showPopupForPlayer(
            this.batHolder,
            "Good job hitting the ball!",
            5
          );
        }
      }
    );
  }
}
hz.Component.register(BatScript);
```

### 5. Configure Local Scripting for Performance

1. Set both BallScript and BatScript execution mode to "Local"
2. Update BatScript with ownership management:
   - Add `ball` property to props definition
   - Transfer ball ownership on grab/release
   - Implement `receiveOwnership()` and `transferOwnership()` methods

### 6. Cross-Platform Deployment

1. **Publish world**: Set Name, World Rating, Comfort Rating, Tags
2. **Enable cross-platform**: Toggle "Compatible with Web and Mobile"
3. **Mobile testing**: Send preview build link via Preview Configuration
4. **VR testing**: Launch from Meta Horizon Worlds Create page

## Minimal Example

Complete working BatScript with local ownership:

```typescript
import * as hz from "horizon/core";

type State = {};

class BatScript extends hz.Component<typeof BatScript> {
  static propsDefinition = {
    ball: { type: hz.PropTypes.Entity },
  };
  batHolder: hz.Player | null = null;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.batHolder = player;
        this.props.ball?.owner.set(player);
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.batHolder = null;
        this.props.ball?.owner.set(this.world.getServerPlayer());
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnEntityCollision,
      (
        collidedWith,
        collisionAt,
        normal,
        relativeVelocity,
        localColliderName,
        otherColliderName
      ) => {
        if (this.batHolder) {
          this.world.ui.showPopupForPlayer(
            this.batHolder,
            "Good job hitting the ball!",
            5
          );
        }
      }
    );
  }

  override receiveOwnership(
    state: State,
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): void {
    this.batHolder = toPlayer;
  }

  override transferOwnership(
    fromPlayer: hz.Player,
    toPlayer: hz.Player
  ): State {
    return {};
  }
}
hz.Component.register(BatScript);
```

## Limits & Constraints

### Physics & Performance

- Custom gravity values affect performance (lighter values like -0.20 vs default -9.81)
- Local scripting reduces network latency but requires ownership management
- Entity ownership transfers automatically on grab actions

### Platform Limitations

- **VR**: Full bat swinging mechanics with Quest controllers
- **Desktop**: Limited to grab/release (no swinging), use E key to grab
- **Mobile**: Requires specific preview configuration and app notifications

### Collision System

- Collision filtering requires Gameplay Tags for specificity
- Collision Events From = "Objects Tagged" needed for selective collision detection
- Only works with entities that have Collidable enabled

## Gotchas / Debugging

### Common Issues

- **Scripts not executing**: Check Script Execution Mode and attachment to correct entities
- **Collision not detected**: Verify both entities have Collidable enabled and proper tags
- **Ball not resetting**: Ensure collision events are configured with correct tag filtering
- **Bat can't be grabbed**: Check Motion = "Interactive" and Interaction = "Grabbable"
- **Ownership transfer problems**: Must implement both `receiveOwnership()` and `transferOwnership()`

### Platform-Specific

- **VR**: Bat swinging requires proper controller trigger usage (secondary trigger)
- **Mobile**: Preview builds require Meta Horizon app notifications
- **Desktop**: Limited interaction - no swinging, only grab/release with E key

### Performance

- Local scripting improves latency but complicates state management
- Entity ownership affects which device runs the script
- State preservation required during ownership transfers

## See Also

- [Objects and Components Overview](../../objects-components-overview.md) - Entity-component architecture basics
- [Events and Triggers System](../../events-triggers-system.md) - Event-driven communication patterns
- [Desktop Editor Overview](../../desktop-editor-overview.md) - Primary development environment
- [TypeScript Development Overview](../../typescript-development-overview.md) - Component-based scripting framework
- [Gizmos Overview](../../gizmos-overview.md) - Built-in interactive components

### Related Documentation

- [Ownership in Meta Horizon Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/ownership-in-horizon-worlds) - Entity ownership patterns
- [Button press handling](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/grabbable-entities/action-buttons/#how-to-handle-button-presses) - Secondary actions
- [Grabbable entities](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/grabbable-entities/intro-to-grabbable-entities/) - Grabbable entity concepts
- [Testing on mobile](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/how-to-test-on-web-and-mobile#mobile) - Cross-platform testing

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial (accessed 2025-09-25)
