---
title: "Room B: Secret Code Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7-room-b-secret-code"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "web_mobile", "focused_interaction", "puzzle_mechanics"]
tutorial: "web-mobile-development"
summary: "Overview of the second puzzle room featuring object rotation and keypad interaction using the Focused Interaction API for web and mobile platforms."
---

# Room B: Secret Code Overview

## What & Why

Introduces the second puzzle room where players must turn over four objects to reveal numeric codes, then enter them into a keypad in the correct sequence to open the exit door. Highlights the complexity differences between VR interactions (direct grab/rotate) versus web/mobile interactions requiring the Focused Interaction API.

## Key APIs / Concepts

- **Focused Interaction API** - Handles mouse clicks and touch taps on 2D screens
- **Object Rotation Mechanics** - Cross-platform object manipulation
- **Keypad Input System** - Sequential code entry validation
- **Cross-Platform Input Handling** - VR vs web/mobile interaction patterns

## Module Structure

This room implementation is divided into specialized sub-modules:

- **Module 7A**: The Focused Interaction Manager - Core touch/click input system
- **Module 7B**: Use drag inputs to rotate objects - Object manipulation mechanics
- **Module 7C**: Use tap inputs to interact with keypad - Sequential input validation

## VR vs Web/Mobile Interaction Paradigms

### VR Interaction

- Direct object grabbing and rotation
- Physical collision detection for button presses
- Intuitive spatial manipulation

### Web/Mobile Interaction

- Focused Interaction API for screen-based input
- Touch and drag gesture recognition
- 2D screen coordinate to 3D world space mapping

## See Also

- [The Focused Interaction Manager](07a-focused-interaction-manager.md) - Core input handling system
- [Use drag inputs to rotate objects](07b-drag-inputs-rotate-objects.md) - Object rotation implementation
- [Use tap inputs to interact with keypad](07c-tap-inputs-keypad.md) - Keypad interaction system

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-7-room-b-secret-code (accessed 2025-09-26)
