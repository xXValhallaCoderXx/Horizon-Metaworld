---
title: "Module 3 - Simple Gun"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-3-simple-gun"
last_updated: "2025-09-25T12:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "shooting_mechanics",
    "grabbable_objects",
    "input_handling",
    "gun_mechanics",
  ]
summary: "Complete gun system implementation with grabbable objects, ammo management, laser sight, and cross-platform input handling."
tutorial: "simple-shooting-mechanics"
---

# Simple Shooting Mechanics Tutorial - Module 3: Simple Gun

## What & Why

Builds a complete gun system using ProjectileLauncher gizmo attached to grabbable entities. The gun combines multiple components (projectile launcher, laser sight, ammo display, audio/visual effects) into a single interactive weapon with cross-platform input handling.

## Key APIs / Concepts

### Core Components

- **GunScript.ts** - Main gun logic script (Local execution mode)
- **Grabbable Properties** - Motion: Interactive, Interaction: Grabbable
- **Entity Ownership** - Manual ownership transfer for child objects
- **Event Subscriptions** - Grab/drop event handling

### Input Handling

- `CodeBlockEvents.OnGrabStart` / `OnGrabEnd` - Grab/drop detection
- Cross-platform aiming: VR laser dot, Desktop/Mobile reticles
- **Input debouncing** - Respond only on trigger release

### Gun Assembly Components

- **White cylinder** - Parent object and physical representation
- **ProjectileLauncher** - Projectile spawning system
- **LaserSight** - Raycast gizmo for laser targeting
- **Text Gizmos** - ClipAmmoText, TotalAmmoText for ammo display
- **Audio Gizmos** - GunFireSFX, GunReloadSFX
- **VFX Gizmo** - GunSmokeVFX particle effects

## How-To (Recipe)

### Setting Up Grabbable Gun Object

1. **Configure Grabbable Properties**

   - **Visible**: Enable (required to see)
   - **Collidable**: Enable
   - **Collision Layer**: Everything
   - **Motion**: Interactive
   - **Interaction**: Grabbable

2. **Advanced Grab Properties**

   - **Grab lock**: Retain entity in hand after grab
   - **Grab anchor**: Set relative grab point coordinates
   - **Avatar pose**: Set arm position while holding

3. **Script Configuration**
   - Set GunScript.ts execution mode to **Local** only
   - Scripts panel → Context menu → Execution mode > Local

### GunScript.ts Property Configuration

**Core References:**

- `projectileLauncher`: Reference to ProjectileLauncher entity
- `laserGizmo`: Reference to raycast gizmo for laser sight
- `laserPointer`: Reference to sphere for laser dot visualization

**Ammo System:**

- `ammoPerClip`: Shots per clip before reload
- `totalAmmo`: Total ammunition available
- `clipAmmoDisplay` / `totalAmmoDisplay`: Text gizmo references

**Effects:**

- `smokeFX`: Particle FX gizmo reference
- `gunFireSFX` / `gunReloadSFX`: Audio gizmo references

**Mechanics:**

- `projectileLauncherCooldownMs`: Cooldown between shots (milliseconds)
- `projectileSpeed` / `projectileGravity`: Override launcher properties
- `useLaserTargeting`: Toggle laser sight functionality

## Minimal Example

```typescript
// GunScript.ts - Event subscription setup
private grabbingEventSub!: EventSubscription;
private droppingEventSub!: EventSubscription;
private ammoLeft!: number;
private totalAmmo!: number;

public start() {
  const owner = this.entity.owner.get();

  // Only run on client, not server
  if (owner === this.world.getServerPlayer()) {
    console.log("Script owned by Server Player");
  } else {
    // Register grab/drop event listeners
    this.grabbingEventSub = this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnGrabStart,
      this.onWeaponGrabbed.bind(this)
    );

    this.droppingEventSub = this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnGrabEnd,
      this.onWeaponDropped.bind(this)
    );
  }
}
```

## Limits & Constraints

### Execution Requirements

- **GunScript.ts must run in Local execution mode only**
- Server/client ownership distinction required
- Manual ownership transfer for child objects (not automatic)

### Performance Considerations

- **Update loop optimization**: Avoid heavy calculations every frame
- **Frame-based alternatives**: Execute code every N frames instead of every update
- **Time-based thresholds**: Accumulate time to 0.5s thresholds
- **Event-driven approach**: Use custom events for async handling

### Platform Differences

- **VR**: Laser dot targeting
- **Desktop**: Reticle targeting
- **Mobile**: Reticle targeting

## Gotchas / Debugging

- **Ownership Transfer**: Child objects (ProjectileLauncher) need manual ownership assignment
- **Input Debouncing**: Responding on trigger release prevents double-firing
- **Local Execution**: Script must be set to Local mode for proper client-side execution
- **Update Performance**: Heavy update loop operations can cause frame drops
- **Raycast Performance**: Laser sight calculations run every frame when aiming
- **Entity References**: All gizmo references must be properly configured in Properties panel

## See Also

- [Physics and Grabbable Entities](../../physics-grabbable-entities.md) - Grabbable object configuration
- [Local Scripting and Entity Ownership](../../local-scripting-ownership.md) - Ownership transfer mechanics
- [Module 2 - Projectile](./02-projectile.md) - Previous tutorial module
- [Module 4 - Laser Gun](./04-laser-gun.md) - Next tutorial module

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-3-simple-gun (accessed 2025-09-25)
