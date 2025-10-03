---
title: "Module 1 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-1-setup"
last_updated: "2025-09-25T12:00:00Z"
tags:
  [
    "horizon_worlds",
    "tutorial",
    "shooting_mechanics",
    "setup",
    "projectile_launcher",
    "raycast",
  ]
summary: "Introduction to building configurable gun and laser gun systems using Projectile Launcher and Raycast gizmos in Horizon Worlds."
tutorial: "simple-shooting-mechanics"
---

# Simple Shooting Mechanics Tutorial - Module 1: Setup

## What & Why

This tutorial teaches how to create configurable gun and laser gun systems using built-in components. Two weapon types demonstrate different projectile management approaches: physical projectiles via Projectile Launcher gizmo, and visual effects via Raycast gizmo.

## Key APIs / Concepts

### Weapon Systems

- **Projectile Launcher gizmo** - Physical projectile system with collision tracking
- **Raycast gizmo** - Invisible ray casting for instant-hit mechanics
- **Desktop Editor** - Build/Preview mode switching for testing
- **World Simulation** - Script execution control system

### Development Environment

- **Build Mode** - Entity placement and modification
- **Preview Mode** - World experience testing with WASD/mouse controls
- **Asset Library** - Access to owned and public assets
- **Console** - Debug output for TypeScript messages

## How-To (Recipe)

### Setting Up Tutorial World

1. **Access Tutorial World**

   - Open VR headset Create menu
   - Select Tutorials tab → Advanced Tutorials shelf
   - Locate "Simple Shooting Mechanics" world
   - Select to create owned copy

2. **Open in Desktop Editor**

   - Launch Meta Quest Link application
   - Select "Start in Desktop Mode"
   - Navigate to Creations Home → select tutorial copy

3. **Test Environment Setup**
   - Switch between Build/Preview modes using Play button
   - Enable/disable World Simulation for script testing
   - Access Asset Library and Console tabs at bottom

### Preview Mode Controls

- **Movement**: Mouse + `WASD` keys
- **Jump**: `SPACEBAR`
- **Exit Preview**: `ESC` to return to Build mode

## Minimal Example

```typescript
// Basic world testing setup - no code examples in Module 1
// Desktop editor workflow:
// 1. Click Play button → enters Preview mode with simulation
// 2. Test movement with WASD/mouse
// 3. Press ESC → return to Build mode
// 4. Use Console tab for debug output from scripts
```

## Weapon Types Overview

| Weapon Type | Projectile Management     | Description                                                |
| ----------- | ------------------------- | ---------------------------------------------------------- |
| Basic Gun   | Projectile Launcher gizmo | Physical object launched into world, tracked for collision |
| Laser Gun   | Raycast gizmo             | Invisible ray cast with visual effect representation       |

## Limits & Constraints

- Tutorial requires TypeScript 2.0.0
- Single-player experience (multiplayer testing optional)
- Preview mode movement at fixed speed
- Console debugging available in desktop editor only

## Gotchas / Debugging

- **Simulation vs Preview**: World Simulation can be disabled for art/layout inspection only
- **Asset Access**: Tutorial entities may not appear in your Asset Library (expected)
- **Preview ≠ Production**: Desktop preview differs from actual VR/mobile experience
- **Console Usage**: Essential debugging tool for TypeScript error messages

## See Also

- [Desktop Editor Overview](../../desktop-editor-overview.md) - Core development environment
- [Gizmos Overview](../../gizmos-overview.md) - Built-in interactive components
- [Module 2 - Projectile](./02-projectile.md) - Next tutorial module
- Access Tutorial Worlds - Getting started with tutorial prerequisites

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/simple-shooting-mechanics-tutorial/module-1-setup (accessed 2025-09-25)
