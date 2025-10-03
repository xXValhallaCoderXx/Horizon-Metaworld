---
title: "Room C: Target Practice - Experience Bifurcation and Slingshot Mechanics"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-8-room-c-target-practice"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile",
    "experience_bifurcation",
    "physics",
    "slingshot",
  ]
tutorial: "web-mobile-development"
summary: "Demonstrate experience bifurcation by creating device-specific mechanics: VR cannon vs web/mobile slingshot, showcasing when to diverge rather than emulate experiences."
---

# Room C: Target Practice - Experience Bifurcation and Slingshot Mechanics

## What & Why

Introduces the strategic concept of experience bifurcation—creating fundamentally different mechanics for different platforms rather than attempting to emulate complex VR interactions on web/mobile. Demonstrates this through parallel game mechanics: VR players use a complex multi-control cannon while web/mobile players get a physics-based slingshot optimized for touch interfaces.

## Key APIs / Concepts

### Experience Bifurcation Strategy

- **Emulation** vs **Bifurcation** decision framework
- Device-specific mechanic selection based on platform strengths
- Parallel content paths maintaining competitive balance

### Platform-Specific Teleportation

- `hz.SpawnPointGizmo.teleportPlayer()` - Device-based player routing
- `player.deviceType.get()` - Runtime device detection
- Trigger-based automatic platform routing

### Physics-Based Slingshot System

- `hz.PhysicalEntity.applyForce()` - Projectile launch mechanics
- `springPushTowardPosition()` - Elastic rope simulation
- `zeroVelocity()` and physics state control

## How-To (Recipe)

### 1. Implement Device Detection and Routing

- Create trigger zone that detects entering players
- Check device type and teleport to appropriate platform
- Separate VR cannon area from web/mobile slingshot area

### 2. Build Physics-Based Slingshot Interaction

- Use invisible pull plane for touch raycast targeting
- Handle touch start/move/end events with focused interaction
- Calculate force vectors from pull distance and direction

### 3. Implement Elastic Rope Visual Effects

- Create rope entities as scaled cylinders between anchor points
- Update rope position, rotation, and scale based on pouch movement
- Apply spring physics to pouch when not actively controlled

### 4. Apply Launch Physics and Collision Management

- Calculate launch force from start position to release position
- Apply impulse force to ball entity with configurable multiplier
- Manage collision states to prevent interference during launch

## Minimal Example

```typescript
// Device-based teleportation
this.connectCodeBlockEvent(
  this.entity,
  hz.CodeBlockEvents.OnPlayerEnterTrigger,
  (player: hz.Player) => {
    if (player.deviceType.get() === hz.PlayerDeviceType.VR) {
      this.props.vrSpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
    } else {
      this.props.nonVrSpawnPoint
        ?.as(hz.SpawnPointGizmo)
        ?.teleportPlayer(player);
    }
  }
);

// Slingshot release physics
this.connectNetworkEvent(
  this.entity,
  sysEvents.OnFocusedInteractionInputEnded,
  (data) => {
    const ballPosition = ball?.position.get();
    const deltaVector = ballPosition.sub(ballStartPosition);

    // Apply launch force based on pull distance
    ball
      ?.as(hz.PhysicalEntity)
      ?.applyForce(
        deltaVector?.mul(-1 * this.props.maxForce),
        hz.PhysicsForceMode.Impulse
      );

    // Re-enable physics and collision after launch
    ball?.simulated.set(true);
    this.async.setTimeout(() => ball?.collidable.set(true), 150);
  }
);

// Elastic rope visual effect
const deltaVector = pouch.position.get().sub(anchor.position.get());
const midpoint = anchor.position.get().add(deltaVector.div(2));

this.entity.position.set(midpoint);
this.entity.lookAt(pouch.position.get());
this.entity.scale.set(
  new hz.Vec3(this.defaultScale.x, this.defaultScale.y, deltaVector.magnitude())
);
```

## Experience Design Philosophy

### When to Bifurcate vs Emulate

**Bifurcate When:**

- VR mechanics rely heavily on precise hand tracking
- Complex multi-control interfaces that don't translate to touch
- Spatial interactions that lose meaning on 2D screens
- Performance-intensive mechanics unsuitable for mobile

**Emulate When:**

- Core mechanics translate naturally across platforms
- Simple interaction patterns work universally
- Maintaining exact gameplay parity is critical
- Development resources are limited

### Bifurcation Best Practices

- Ensure both experiences offer equivalent fun factor
- Maintain competitive balance across platforms
- Test extensively on all target devices
- Design parallel progression paths

## Limits & Constraints

- **Physics Performance**: Mobile devices may struggle with complex physics calculations
- **Touch Precision**: Limited compared to VR hand tracking precision
- **Force Calculation**: Linear force application may not feel realistic
- **Collision Timing**: 150ms delay required to prevent self-collision
- **Spring Physics**: Stiffness/damping values need per-device tuning

## Gotchas / Debugging

- **Platform Testing**: Must verify mechanics work well on all three platforms
- **Force Scaling**: `maxForce` multiplier requires careful tuning for game balance
- **Collision States**: Ensure proper collision enable/disable sequencing
- **Physics State Management**: Verify simulated state transitions don't cause glitches
- **Touch Plane Positioning**: Invisible pull plane must be properly positioned for intuitive interaction
- **Spring Physics Conflicts**: Ensure spring forces don't interfere with player control

## See Also

- [Room A: The Magic Wand](06-room-a-magic-wand.md) - Camera API and grabbable mechanics
- [Use drag inputs to rotate objects](07b-drag-inputs-rotate-objects.md) - Advanced focused interaction patterns
- [The Focused Interaction Manager](07a-focused-interaction-manager.md) - Core input handling system

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-8-room-c-target-practice (accessed 2025-09-26)
