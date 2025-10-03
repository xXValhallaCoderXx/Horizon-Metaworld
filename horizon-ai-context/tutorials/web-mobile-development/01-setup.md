---
title: "Module 1 - Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-1-setup"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "web_mobile", "tutorial", "setup"]
tutorial: "web-mobile-development"
summary: "Initial setup and introduction to the Web and Mobile Players tutorial, covering prerequisites, world access, and cross-platform testing setup."
---

# Module 1 - Setup

## What & Why

This tutorial teaches you to create a simple puzzle game optimized for mobile, web, and VR platforms. You'll learn to implement web/mobile-specific features, camera control, cross-platform interactions, and optimal user experiences across all devices. This module covers the foundational setup and prerequisites.

## Key Learning Objectives

- Create user interfaces for web and mobile players
- Control camera using the Camera API for cross-platform experiences
- Configure grabbable objects with animations and projectiles for 2D screens
- Implement mechanics optimized for 2D screens using the Focused Interaction API
- Explore different puzzle mechanics for building puzzle games

## Learning Pathways

**Novice**: Complete all tutorial steps to build hands-on experience with TypeScript and world-building.

**Intermediate**: Clone the completed world and review modules for key learnings.

**Experienced**: Read module introductions, focus on Additional Documentation sections.

## Prerequisites

### Required
- Meta Account and Meta Horizon Worlds Profile
- Meta Horizon Worlds app installed on Quest device
- Desktop editor downloaded and installed on PC device

### Optional
- IDE (Visual Studio Code recommended) connected to desktop editor
- TypeScript Version 4.7.4 for TypeScript API v2.0.0 compatibility

## How-To (Recipe)

1. **Access Tutorial World (VR required)**
   - Launch Meta Horizon Worlds
   - Open **Create** menu
   - Select **Tutorials** tab
   - Choose **"Developing for Mobile and Web Players: Follow Along"** from Advanced Tutorials shelf

2. **Explore Complete World (Optional)**
   - Select **"Developing for Mobile and Web Players: Completed Examples"** from Tutorials tab

3. **Set Up Development Environment**
   - Open world in desktop editor
   - Explore in Build mode or Preview mode
   - Set up cross-platform testing environment (VR, Web desktop, Mobile)

## Game Overview

The puzzle game consists of:
- **Lobby** with 3 puzzle rooms
- Each room has a **closed exit door**
- Players must **solve puzzles** to open doors
- **Features Lab** for testing individual web/mobile features

### Tutorial Module Structure

| Module | Focus Area |
|--------|-----------|
| Module 2 | HUD System for player hints |
| Module 3 | Puzzle Manager for hint display and door control |
| Module 4 | Camera Manager for perspective and FOV control |
| Module 5 | Player Manager for entry/exit handling |
| Module 6 | Room A: Magic Wand (grabbables and projectiles) |
| Module 7 | Room B: Secret Code (Focused Interaction API) |
| Module 8 | Room C: Target Practice (device-specific mechanics) |
| Module 9 | Summary and extension ideas |

## Cross-Platform Testing Setup

The tutorial supports three platforms:
- **VR** (Quest devices)
- **Web** (desktop browsers)
- **Mobile** (smartphone browsers)

For testing setup, see [Preview Device documentation](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/getting-started/preview-mode#preview-device).

## Limits & Constraints

- Tutorial built on **TypeScript API version 2.0.0**
- IDE must run **TypeScript Version 4.7.4**
- World creation requires **VR headset** for initial setup
- Cross-platform testing requires access to multiple device types

## Gotchas / Debugging

- **VR requirement**: Initial world creation must be done in VR, not desktop editor
- **API version**: Ensure TypeScript API v2.0.0 compatibility
- **Follow Along vs Complete**: "Follow Along" version requires coding; "Complete" version shows finished implementation
- **Features Lab**: Won't work in Follow Along version until code is completed

## See Also

- [Access Tutorial Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds) - Tutorial world access workflow
- [Tutorial Prerequisites](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites) - Detailed prerequisite information
- [Build Your First Game](./build-your-first-game/01-build-your-first-game.md) - Recommended prerequisite tutorial for beginners
- [Use Assets from Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/use-assets-from-tutorials) - Using tutorial assets in your own worlds
- [TypeScript API v2.0.0 Upgrade](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/upgrade-world-to-typescript-api-v200) - API upgrade information

## Sources

- [Developing for Web and Mobile Players Tutorial - Module 1 Setup](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-1-setup) (Accessed: 2025-09-25)
- [API v2.0.0 Documentation](https://horizon.meta.com/resources/scripting-api/index.md/?api_version=2.0.0)