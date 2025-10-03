---
title: "New User Experience and Onboarding Systems"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-1-setup"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "nux", "onboarding", "tutorial_systems", "player_guidance"]
summary: "Overview of NUX asset templates, tutorial slide systems, hint text notifications, and player onboarding patterns for effective first-time user experiences."
---

# New User Experience and Onboarding Systems

## What & Why

A New User Experience (NUX), sometimes called the first-time user experience (FTUE) or tutorial, covers the first few minutes of gameplay that new players encounter. A successful NUX accomplishes two key metrics: **Day 1 Retention** (do players return after their first session?) and **Quick Wins** (do players understand goals and have fun quickly?).

Poor onboarding causes players to leave before reaching exciting content, while smooth NUX systems help new players understand basics without frustration, making them more likely to stay engaged.

## Key APIs / Concepts

- **NUX Asset Templates**: Pre-configured scripts and entities from Asset Library for rapid implementation
- **InfoSlide API**: Horizon's native slideshow presentation system for tutorial content
- **TutorialController/TutorialSlide**: Hierarchical slide management with trigger-based activation
- **HintText System**: Adaptive notification displays with dynamic font sizing
- **Waypoint Indicators**: 3D arrows and quest markers guiding player movement
- **"Grab Me" VFX**: Visual attention indicators on interactive objects
- **Cross-Platform Optimization**: Mobile and desktop responsive onboarding elements
- **Trigger Zone Integration**: Location-based tutorial activation

## How-To (Recipe)

1. **Deploy NUX Asset Templates**: Access Asset Library, navigate to NUX category, import desired components
2. **Setup Tutorial Slide System**: Create TutorialController entity, configure trigger zones, add TutorialSlide components
3. **Implement Hint Text Notifications**: Create Custom UI with HintText script, configure triggers and messages
4. **Add Waypoint Guidance**: Position 3D directional arrows and quest exclamation point markers
5. **Configure Interactive Elements**: Setup "Grab Me" VFX on key objects, add controller image tutorials
6. **Test Cross-Platform**: Verify mobile and desktop functionality, adjust layouts as needed
7. **Optimize for Retention**: Create clear progression, quick wins, and contextual help systems

## Minimal Example

```typescript
// Tutorial slide activation example
tutorialController.playTutorial(player);

// Hint text notification
this.sendNetworkBroadcastEvent(UIEvents.notification, {
  player: [playerArray],
  title: "Quick Start",
  message: "Welcome! Press F to interact with objects.",
  time: 5,
  bgColor: "#0288d1",
});

// Asset Library deployment pattern
// 1. Open Asset Library > NUX Category
// 2. Select desired template (pre-configured)
// 3. Import to world (includes scripts + entities)
```

## Limits & Constraints

- **Asset Library Dependency**: NUX components require Asset Library template imports
- **Mobile Performance**: Templates optimized for cross-platform but verify mobile performance
- **Player Count**: Hint text supports 3 players by default (expandable via component duplication)
- **Trigger Zone Requirements**: Most systems require trigger zone configuration for activation
- **Script Reference Resolution**: May need server shutdown if broken references appear after import

## Gotchas / Debugging

- **Asset Template Deployment**: Import templates from Asset Library rather than creating from scratch
- **Cross-Platform Testing**: Test on both VR and mobile devices for layout consistency
- **Tutorial Progression**: Ensure clear sequence - players should understand next steps immediately
- **Trigger Positioning**: Place trigger zones strategically where players naturally explore
- **Quick Win Design**: Provide satisfying interactions within first 30 seconds of gameplay

## From Tutorials

Complete tutorial series available covering all NUX components:

- [Module 1 - Introduction](./tutorials/new-user-experience/01-introduction.md) - NUX concepts and asset template overview
- [Module 2 - Tutorial Manager](./tutorials/new-user-experience/02-tutorial-manager.md) - InfoSlide API slideshow system
- [Module 3 - Hint Text](./tutorials/new-user-experience/03-hint-text.md) - Adaptive notification system

## See Also

- [Tutorial Systems Overview](./tutorial-systems-overview.md) - Broader tutorial implementation patterns
- [Custom UI Overview](./custom-ui-overview.md) - Custom interface development for NUX
- [Events and Triggers System](./events-triggers-system.md) - Event-driven NUX activation
- [Mobile Development Overview](./web-mobile-development-overview.md) - Cross-platform considerations

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-1-setup (accessed 2025-09-26)
