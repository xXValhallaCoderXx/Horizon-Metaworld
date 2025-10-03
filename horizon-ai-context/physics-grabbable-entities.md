---
title: "Physics and Grabbable Entities"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "physics",
    "grabbable_entities",
    "gravity",
    "collision",
    "interaction",
  ]
summary: "Physics simulation and grabbable entity configuration for interactive objects in Horizon Worlds, covering gravity, motion, and interaction behaviors."
---

# Physics and Grabbable Entities

## What & Why

Physics simulation enables realistic object behavior in Horizon Worlds, from gravity-affected balls to interactive grabbable items. Essential for creating immersive experiences where objects respond naturally to player interactions, collisions, and environmental forces. Grabbable entities allow players to pick up, manipulate, and interact with world objects across VR, desktop, and mobile platforms.

## Key APIs / Concepts

### Physics Properties

- **Motion = "Interactive"**: Enable physics simulation for entity
- **Interaction = "Physics"**: Object responds to physics forces (gravity, collisions)
- **Interaction = "Grabbable"**: Object can be picked up and manipulated by players
- **Collidable**: Enable collision detection with other objects
- **Gravity**: Custom gravity values (default -9.81 m/s², custom values for gameplay)

### Position and Velocity Control

- `entity.position.get()` / `entity.position.set(vec3)`: Read/write entity position
- `entity.as(hz.PhysicalEntity)?.zeroVelocity()`: Reset object velocity to zero
- `hz.Vec3.zero`: Zero vector constant for position/velocity operations
- **Position preservation**: Store original positions for reset functionality

### Grab Events

- `hz.CodeBlockEvents.OnGrabStart`: Triggered when player grabs entity
- `hz.CodeBlockEvents.OnGrabEnd`: Triggered when player releases entity
- **Grab parameters**: `(isRightHand: boolean, player: hz.Player)` for VR hand detection
- **Cross-platform support**: Different grab mechanisms per platform

### Physics Casting

- `entity.as(hz.PhysicalEntity)`: Cast entity to access physics-specific methods
- **Null safety**: Use `?.` operator when casting may fail
- **Type safety**: Ensures access to physics methods like `zeroVelocity()`

## How-To (Recipe)

### 1. Basic Physics Object Setup

1. **Entity Configuration**:
   - Enable "Collidable" for collision detection
   - Set Motion = "Interactive" to enable physics
   - Set Interaction = "Physics" for gravity/collision response
   - Configure custom gravity if needed (e.g., -0.20 for slower fall)

### 2. Grabbable Object Setup

1. **Entity Configuration**:
   - Enable "Collidable" for collision detection
   - Set Motion = "Interactive" to enable interaction
   - Set Interaction = "Grabbable" to allow player pickup
   - Position appropriately for easy grabbing

### 3. Physics Reset Script

```typescript
import * as hz from "horizon/core";

class PhysicsResetScript extends hz.Component<typeof PhysicsResetScript> {
  static propsDefinition = {};
  originalPosition: hz.Vec3 = hz.Vec3.zero;

  start() {
    // Store original position for reset
    this.originalPosition = this.entity.position.get();

    // Listen for collision with floor/ground
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
        this.resetToStart();
      }
    );
  }

  private resetToStart(): void {
    // Reset position and stop movement
    this.entity.position.set(this.originalPosition);
    this.entity.as(hz.PhysicalEntity)?.zeroVelocity();
  }
}
```

### 4. Grabbable Interaction Script

```typescript
import * as hz from "horizon/core";

class GrabbableScript extends hz.Component<typeof GrabbableScript> {
  static propsDefinition = {};
  currentHolder: hz.Player | null = null;

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.currentHolder = player;
        console.log(
          `${player.name} grabbed with ${isRightHand ? "right" : "left"} hand`
        );
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.currentHolder = null;
        console.log(`${player.name} released the object`);
      }
    );
  }
}
```

## Minimal Example

Complete physics-enabled grabbable object with collision handling:

```typescript
import * as hz from "horizon/core";

class InteractivePhysicsObject extends hz.Component<
  typeof InteractivePhysicsObject
> {
  static propsDefinition = {};
  originalPosition: hz.Vec3 = hz.Vec3.zero;
  currentHolder: hz.Player | null = null;

  start() {
    this.originalPosition = this.entity.position.get();

    // Handle grabbing
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabStart,
      (isRightHand: boolean, player: hz.Player) => {
        this.currentHolder = player;
      }
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnGrabEnd,
      (player: hz.Player) => {
        this.currentHolder = null;
      }
    );

    // Handle collisions (e.g., with floor)
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
        // Reset if not being held
        if (!this.currentHolder) {
          this.entity.position.set(this.originalPosition);
          this.entity.as(hz.PhysicalEntity)?.zeroVelocity();
        }
      }
    );
  }
}

hz.Component.register(InteractivePhysicsObject);
```

## Entity Configuration (Properties Panel)

### Physics Object

- **Motion**: "Interactive"
- **Interaction**: "Physics"
- **Collidable**: Enabled
- **Gravity**: Custom value (e.g., -0.20 for slower fall)
- **Collision Events From**: "Objects Tagged" (if filtering needed)
- **Object Tag**: Target collision tag (e.g., "floor")

### Grabbable Object

- **Motion**: "Interactive"
- **Interaction**: "Grabbable"
- **Collidable**: Enabled
- **Who Can Grab**: "Everyone" or "Script Assignee(s)"
- **Grab Handles**: Optional explicit grab points

## Limits & Constraints

### Physics Limitations

- **Gravity range**: Extreme gravity values may cause instability
- **Collision precision**: High-speed objects may tunnel through thin colliders
- **Performance impact**: Many physics objects can affect frame rate
- **Network sync**: Physics state synchronizes across clients

### Platform Differences

- **VR**: Full 6DOF manipulation, hand tracking, realistic grabbing
- **Desktop**: Limited to E key grab/release, no rotation/movement while grabbed
- **Mobile**: Touch-based interaction, simplified grab mechanics

### Grabbable Constraints

- **Concurrent grabs**: Only one player can grab an object at a time
- **Grab range**: Objects must be within reach distance
- **Ownership transfer**: Grabbing transfers entity ownership to player

## Gotchas / Debugging

### Common Issues

- **Objects falling through floor**: Ensure both objects have Collidable enabled
- **Grab not working**: Check Motion="Interactive" and Interaction="Grabbable"
- **Physics not responding**: Verify Motion="Interactive" is set
- **Velocity not resetting**: Use `entity.as(hz.PhysicalEntity)?.zeroVelocity()`
- **Position jumping**: Store original position in `start()`, not during collision

### Platform-Specific Issues

- **Desktop grab limitations**: Can't swing or throw objects, only hold/release
- **VR grab detection**: Check `isRightHand` parameter for hand-specific logic
- **Mobile interaction**: Limited physics manipulation compared to VR
- **Cross-platform testing**: Behavior may vary across platforms

### Performance Considerations

- **Physics overhead**: Limit number of simultaneously active physics objects
- **Collision events**: Too many collision events can impact performance
- **Gravity calculations**: Custom gravity values affect physics performance
- **Network bandwidth**: Physics state synchronization consumes bandwidth

## Design Patterns

### Physics Object Lifecycle

1. **Initialization**: Store original position/state in `start()`
2. **Interaction**: Handle grab/release events
3. **Physics Response**: React to collisions and gravity
4. **Reset**: Return to original state when needed
5. **Cleanup**: Handle ownership transfer and state preservation

### Collision Response Strategies

- **Reset on floor**: Return to original position when hitting ground
- **Bounce/damping**: Apply physics forces for realistic response
- **State change**: Trigger game logic on specific collisions
- **Filtering**: Use gameplay tags to respond to specific collision types

### Cross-Platform Compatibility

- **Input abstraction**: Handle different grab mechanisms per platform
- **Visual feedback**: Provide clear indicators for grabbable objects
- **Fallback behaviors**: Graceful degradation for limited platforms
- **Testing strategy**: Verify behavior across VR, desktop, mobile

## From Tutorials

- [Batting Cage Tutorial](./tutorials/batting-cage/01-batting-cage-tutorial.md): Complete physics setup with gravity, collision detection, grabbable bat, and ball reset mechanics

## See Also

- [Objects and Components Overview](./objects-components-overview.md) - Entity behavior configuration
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Performance optimization with local scripts
- [Events and Triggers System](./events-triggers-system.md) - Collision and grab event handling

### Related Documentation

- [Grabbable entities](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/grabbable-entities/intro-to-grabbable-entities/) - Grabbable entity concepts
- [Button press handling](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/grabbable-entities/action-buttons/#how-to-handle-button-presses) - Secondary actions

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/batting-cage-tutorial (accessed 2025-09-25)
