---
title: "Module 1 - Introduction"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-1-setup"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "nux", "tutorial", "onboarding", "asset_templates", "mobile", "cross_platform"]
summary: "Introduction to New User Experience (NUX) tutorial covering asset templates, nine essential NUX components, and cross-platform player onboarding systems."
tutorial: "new-user-experience"
---

# Module 1 - Introduction

## What & Why

A New User Experience (NUX), sometimes called the first-time user experience (FTUE) or tutorial, covers the first few minutes of gameplay that new players encounter. The NUX introduces the experience, interface, and mechanics, and may include tutorials that teach players how to play. A successful NUX accomplishes two key metrics: **Day 1 Retention** (do players return after their first session?) and **Quick Wins** (do players understand goals and have fun quickly?).

This tutorial teaches how to create a simple and effective NUX for your game using ready-made asset templates in a reusable, flexible co-op, cross-platform setup where all players walk through tutorial steps to learn basic controls and objectives.

## Key APIs / Concepts

- **NUX Asset Templates**: Pre-configured sets of scripts and entities from Asset Library
- **Nine Essential NUX Components**: Waypoint indicators, quest UIs, tutorial prompts, interactive dialogue systems
- **3D Arrow (Waypoint indicator UI)**: Arrow floating in 3D space pointing direction player should go
- **Quest waypoint UI**: Exclamation point waypoints marking locations for players
- **Quest giving/completing UIs**: Display next objective and completion notifications
- **Tutorial framework UI**: Pauses game and teaches mechanics
- **Hint text UI**: Provides reminders of what players need to do
- **Branching dialogue UI**: Allows interactive dialogues with NPCs
- **"Grab Me" VFX**: Attention indicator UI with VFX on grabbable objects
- **Controller tutorial UI**: Animated and static controller images for VR usage

## How-To (Recipe)

1. **Prerequisites**: Verify access to New User Experience tutorial world copy via desktop editor
2. **Setup Environment**: Open Meta Quest Link application, locate Meta Horizon app in Library tab
3. **Access Tutorial**: Select "Start in Desktop Mode", navigate to Creation Home > My worlds
4. **Open Tutorial World**: Select and open your copy of tutorial template in desktop editor
5. **Deploy Assets**: Open Asset Library, navigate to appropriate category, select desired NUX asset
6. **Configure Scripts**: Each prefab documented at script top with summary, description, related scripts, setup instructions
7. **Test Implementation**: Use Preview mode and simulation controls, switch between Build and Preview modes
8. **Resolve References**: If scripts show broken references, shutdown server to resolve

## Minimal Example

```typescript
// NUX asset deployment pattern
// 1. Asset Library > NUX Category > Select Asset
// 2. Import to world (preconfigured scripts + entities)
// 3. Script documentation includes:
//    - Summary and description
//    - Related scripts list
//    - Setup instructions (connections, customization)
```

## Limits & Constraints

- **Mobile Optimization Required**: Templates optimized for cross-platform performance
- **Asset Library Dependency**: NUX components distributed as Asset Library templates
- **Script Reference Resolution**: May require server shutdown if broken references appear
- **Desktop Editor Required**: Tutorial assumes familiarity with desktop editor application

## Gotchas / Debugging

- **Broken Script References**: Shutdown server if scripts appear with broken references after import
- **Tutorial Prerequisites**: Requires desktop editor familiarity - start with "Build your first game" if new
- **Asset Library Navigation**: Must open Asset Library and navigate to appropriate category for NUX assets
- **Mobile Testing**: Desktop users must be signed in first for mobile/desktop world exploration

## See Also

- [Module 2 - Tutorial Manager](./02-tutorial-manager.md) - Script management and coordination
- [Module 3 - Hint Text](./03-hint-text.md) - Player guidance and reminder systems
- [Module 4 - Quest and Dialogue](./04-quest-and-dialogue.md) - Interactive quest and dialogue systems
- [Getting Started with Tutorials](../getting-started-with-tutorials/tutorial-prerequisites.md) - Prerequisites and assumptions
- [Access Tutorial Worlds](../getting-started-with-tutorials/access-tutorial-worlds.md) - Tutorial world access instructions

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-1-setup (accessed 2025-09-26)