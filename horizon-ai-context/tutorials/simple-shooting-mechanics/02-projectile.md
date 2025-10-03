---
title: "Module 2 - Projectile"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-2-projectile"
last_updated: "2025-09-25T12:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "shooting_mechanics",
    "projectile_launcher",
    "collision_detection",
    "typescript",
  ]
summary: "Deep dive into Projectile Launcher gizmo configuration, projectile physics, and collision event handling with TypeScript."
tutorial: "simple-shooting-mechanics"
---

# Simple Shooting Mechanics Tutorial - Module 2: Projectile

## What & Why

The Projectile Launcher gizmo manages firing, tracking, and collision detection of short-lived projectile entities. When projectiles collide, they emit specific CodeBlock events that TypeScript scripts can handle to create impact effects and physics responses.

## Key APIs / Concepts

### Core Components

- **Projectile Launcher gizmo** - Entity that fires configurable projectiles
- **ProjectileScript.ts** - Script attached to launcher managing projectile behavior
- **CodeBlockEvents.OnProjectileHitEntity** - Event fired on object collision
- **CodeBlockEvents.OnProjectileHitPlayer** - Event fired on player collision

### Physics APIs

- `entity.as(PhysicalEntity)?.applyForceAtPosition()` - Apply collision forces
- `PhysicsForceMode.Impulse` - Force application mode for impacts
- `Vec3` - 3D vectors for position/direction calculations
- `normal.mulInPlace()` - Vector manipulation for impact direction

### Event System

- `this.connectCodeBlockEvent()` - Register event listeners
- `this.onHitGeneric()` - Common collision handling function

## How-To (Recipe)

### Setting Up Projectile Launcher

1. **Locate ProjectileLauncher Entity**

   - Search "ProjectileLauncher" in Hierarchy panel
   - Right-click → "Focus on selection"
   - Attach to end of gun entity

2. **Configure Launcher Properties**

   - **Projectile Preset**: Choose projectile type
   - **Speed**: Set m/s velocity (overridden by scripts)
   - **Player/Object Collision**: Define collision targets
   - **Static Collision**: Enable collision with static objects
   - **Gravity**: Set projectile gravity (overridden by scripts)
   - **Scale/Trail Length Scale**: Adjust visual appearance
   - **Projectile Color**: Set projectile color

3. **Attach ProjectileScript.ts**
   - Configure script properties in Properties panel
   - Set `projectileLauncher` reference to parent launcher
   - Configure force multiplier and effect entities

### Script Property Configuration

- **projectileLauncher**: Entity reference to parent launcher
- **objHitForceMultiplier**: Collision force scaling factor
- **objHitSFX**: Audio entity for impact sounds
- **objHitVFX**: Visual effect entity for impact effects

## Minimal Example

```typescript
// ProjectileScript.ts - Event registration in start() method
this.connectCodeBlockEvent(
  this.entity,
  CodeBlockEvents.OnProjectileHitEntity,
  this.onProjectileHitEntity.bind(this),
);

// Collision response handler
private onProjectileHitEntity(objectHit: Entity, position: Vec3, normal: Vec3, isStaticHit: boolean) {
  // Common hit effects (sound, particles)
  this.onHitGeneric(position, normal);

  if(isStaticHit) return; // Only apply force to dynamic objects

  console.log("projectile hit object");
  objectHit.as(PhysicalEntity)?.applyForceAtPosition(
    normal.mulInPlace(-1 * this.props.objHitForceMultipler),
    position,
    PhysicsForceMode.Impulse);
}
```

## Limits & Constraints

### Projectile Properties

- **Speed**: Configurable in m/s, but overridden by gun scripts
- **Gravity**: Configurable acceleration, but overridden by gun scripts
- **Collision Types**: Player, Object, Static collision separately configurable
- **Lifecycle**: Projectiles destroyed after collision

### Force Application

- **Player Protection**: Force multiplier not applied to player collisions (VR safety)
- **Dynamic Objects Only**: Static objects don't receive collision forces
- **Impact Position**: Force applied at exact collision point

## Gotchas / Debugging

- **"this" Context**: In ProjectileScript.ts, `this` refers to individual projectiles, not the launcher
- **Entity Type**: projectileLauncher property requires `Entity` type for dropdown selection
- **Static Detection**: `isStaticHit` parameter prevents force application to immovable objects
- **Console Logging**: Use `console.log()` for collision debugging in desktop editor
- **Vector Math**: `normal` points towards projectile's origin, requires negation for pushback force
- **Effect Positioning**: Audio/VFX entities positioned at collision point via `onHitGeneric()`

## See Also

- [Events and Triggers System](../../events-triggers-system.md) - CodeBlock event handling
- [Physics and Grabbable Entities](../../physics-grabbable-entities.md) - Force application mechanics
- [Gizmos Overview](../../gizmos-overview.md) - Projectile Launcher gizmo details
- [Module 1 - Setup](./01-setup.md) - Previous tutorial module
- [Module 3 - Simple Gun](./03-simple-gun.md) - Next tutorial module

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-2-projectile (accessed 2025-09-25)
