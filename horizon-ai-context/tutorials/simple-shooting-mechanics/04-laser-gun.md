---
title: "Module 4 - Laser Gun"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-4-laser-gun"
last_updated: "2025-09-25T12:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "shooting_mechanics",
    "raycast_gizmo",
    "laser_beam",
    "visual_effects",
  ]
summary: "Laser gun implementation using Raycast gizmo for instant-hit mechanics with dynamic beam visualization and continuous damage."
tutorial: "simple-shooting-mechanics"
---

# Simple Shooting Mechanics Tutorial - Module 4: Laser Gun

## What & Why

The laser gun uses Raycast gizmo for instant-hit detection without physical projectiles. Instead of launching objects, it projects an invisible ray and visually represents the beam by scaling a cylinder entity between gun and target. This creates continuous beam weapons with real-time collision detection.

## Key APIs / Concepts

### Core Components

- **Raycast gizmo** - Projects invisible ray for collision detection
- **LaserGunScript.ts** - Main laser gun logic
- **LaserShot** - Red cylinder scaled to create beam visualization
- **LaserProjector** - Raycast gizmo instance

### Raycast System

- `RaycastGizmo.raycast()` - Cast ray with position/direction
- `LayerType.Both` - Collision detection parameter
- **No physical projectiles** - Instant hit detection
- **Distance-based hits** - Maximum range configuration

### Visual Beam System

- **Z-scale manipulation** - Stretch cylinder to beam length
- **Real-time positioning** - Update beam every frame
- **Dynamic length** - Scale based on hit distance

## How-To (Recipe)

### Setting Up Raycast Gizmo

1. **Configure LaserProjector (Raycast Gizmo)**

   - **Collide with**: Players, Objects Tagged, or Both
   - **Object tag**: Specify tags for targetable objects (optional)
   - **Raycast distance**: Maximum hit detection range in meters

2. **Laser Gun Assembly Components**
   - **LaserShot**: Red cylinder entity for beam visualization
   - **LaserProjector**: Raycast gizmo for collision detection
   - **LaserShootingSFX** / **LaserShotHitSFX**: Audio effects
   - **LaserHitVFX**: Particle effects at impact point

### LaserGunScript.ts Properties

**Core Mechanics:**

- `maxLaserLength`: Maximum beam length (meters)
- `laserProjector`: Raycast gizmo entity reference
- `laserBeam`: Laser shot entity for visual beam
- `laserBeamWidth`: Width of laser beam

**Combat Properties:**

- `laserBeamPushPower`: Force applied to hit objects
- `laserBeamSFX` / `laserBeamHitSFX`: Audio effect references
- `laserBeamHitVFX`: Visual effect at impact point

### Web/Mobile Configuration

- **Crosshair Type**: Set to "None" for better experience
- **Use HWXS Grab Anchor**: Enable for web/mobile grab anchors
- **HWXS Anchor Position/Rotation**: Match VR values
- **Right mouse button**: Aiming control for desktop/mobile

## Minimal Example

```typescript
// LaserGunScript.ts - Raycast collision detection
const raycastPosition = this.props.laserProjector.position.get();
const raycastForward = this.props.laserProjector.forward.get();
const laserGizmo = this.props.laserProjector.as(RaycastGizmo);

var raycastHit = laserGizmo?.raycast(raycastPosition, raycastForward, {
  layerType: LayerType.Both,
});

// Apply continuous force to hit objects
if (raycastHit && hitEntity) {
  hitEntity.applyForce(
    raycastHit.normal.mulInPlace(
      -data.deltaTime * this.props.laserBeamPushPower
    ),
    PhysicsForceMode.VelocityChange
  );
}

// Dynamic beam scaling and positioning
laserBeamScale.z = laserLength / thisEntityScaleZ;
this.props.laserBeam.scale.set(laserBeamScale);
this.props.laserBeam.moveRelativeTo(
  this.entity,
  new Vec3(0, 0, laserLength / (2 * thisEntityScaleZ))
);
```

## Limits & Constraints

### Raycast vs Projectile Differences

- **No physical objects** - Visual representation only
- **No ammo/clip management** - Continuous firing capability
- **No cooldown period** - Instant repeated firing
- **Distance-limited** - Raycast gizmo maximum range
- **Instant hit** - No travel time like projectiles

### Performance Considerations

- **OnUpdate execution** - Runs every frame while firing (expensive)
- **Raycast calculations** - Performed each frame during firing
- **Visual beam updates** - Scale/position recalculated continuously

### Platform Differences

- **VR**: Natural laser pointing
- **Desktop/Mobile**: Right mouse button for aiming
- **Web/Mobile**: Requires grab anchor configuration

## Gotchas / Debugging

- **maxLaserLength vs Raycast distance**: Script property should be less than gizmo property
- **Object tagging**: Empty tag means hit any object (acceptable for simple worlds)
- **Player collisions**: Current script has placeholder but doesn't implement player hits
- **Performance impact**: OnUpdate every frame can cause hitching with complex calculations
- **Visual beam positioning**: Z-scale manipulation requires careful math for proper beam appearance
- **Force application**: Uses `deltaTime` for frame-rate independent continuous force
- **Cross-platform aiming**: Desktop/mobile need different grab anchor settings than VR

## See Also

- [Gizmos Overview](../../gizmos-overview.md) - Raycast gizmo detailed documentation
- [Module 3 - Simple Gun](./03-simple-gun.md) - Previous tutorial module (comparison)
- [Module 5 - Summary](./05-summary.md) - Next tutorial module
- [Physics and Grabbable Entities](../../physics-grabbable-entities.md) - Force application mechanics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-4-laser-gun (accessed 2025-09-25)
