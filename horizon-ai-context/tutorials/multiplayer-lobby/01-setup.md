---
title: "Multiplayer Lobby Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-1-setup"
last_updated: "2025-09-25T12:00:00Z"
tags: ["horizon_worlds", "multiplayer", "lobby_system", "player_management", "tutorial", "desktop_editor"]
summary: "Tutorial setup for building multiplayer lobby systems that manage drop-in/drop-out gameplay with player tracking and teleportation."
tutorial: "multiplayer-lobby"
---

# Multiplayer Lobby Setup

## What & Why

This tutorial covers building a multiplayer lobby system for Horizon Worlds games where players can join and leave dynamically. The lobby manages player states, coordinates game sessions, and handles transitions between lobby and gameplay areas. Essential for any multiplayer world that needs to accommodate drop-in/drop-out player behavior.

## Key Learning Objectives

- **Player Movement**: Teleport players to different world locations
- **Event Handling**: Respond to player join/leave events  
- **UI Integration**: Use native Horizon Worlds popup UI system
- **State Management**: Track player game statuses across sessions

## Key Game Development Areas

- Track all players and their game statuses
- Enable players to manually trigger new game starts
- Communicate game status to all lobby players
- Automatically teleport lobby players into matches
- Return all players to lobby when games end

## Prerequisites

- Review [Getting Started with Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites)
- Complete [Build your first game](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/build-your-first-game/module-1-build-your-first-game) tutorial
- Access to desktop editor via Meta Quest Link

## How-To (Setup)

1. **Launch Desktop Editor**
   - Open Meta Quest Link on desktop
   - Select Meta Horizon Worlds application
   - Choose "Start in Desktop Mode"
   - Navigate to Creations Home

2. **Create Tutorial World**
   - Access tutorial world through desktop editor
   - Copy is automatically created for exploration
   - World opens in Build mode by default

3. **Understand Editor Modes**
   - **Build Mode**: Default mode for world construction
   - **Preview Mode**: Navigate world with mouse/WASD controls
   - **Simulation Mode**: Press Play button to execute TypeScript scripts

4. **Test Environment**
   - Switch between Build and Preview modes (ESC to exit Preview)
   - Use SPACEBAR to jump in Preview mode
   - Access Asset Library and Console tabs at bottom
   - Use Console tab for debugging TypeScript messages

## Development Environment

### Editor Interface
- **Asset Library**: Access to owned and shared assets
- **Console Tab**: Debug output and error messages from TypeScript
- **Simulation Controls**: Play/Stop/Reset buttons for script execution

### Movement Controls (Preview Mode)
- Mouse + WASD for movement
- SPACEBAR for jumping
- ESC to return to Build mode
- Single movement speed (test jumping distances carefully)

## Multiplayer Testing Considerations

Since this tutorial focuses on multiplayer functionality, coordinate with friends for testing. The lobby system requires multiple players to validate:
- Player join/leave detection
- State synchronization across clients  
- Teleportation coordination
- UI popup visibility across players

## Limits & Constraints

- Tutorial world assets may not appear in personal Asset Library
- Preview mode movement speed is fixed (not representative of final gameplay)
- Script execution requires simulation mode (Play button)
- VR mode available but optional for development

## Gotchas / Debugging

- **Script Execution**: TypeScript only runs when simulation is active (Play button pressed)
- **Mode Confusion**: Preview mode ≠ simulation mode for script testing
- **Asset Access**: Tutorial entities may be inaccessible in Asset Library but still functional
- **Console Logging**: Essential debugging tool - check Console tab for TypeScript output

## See Also

- [Access Tutorial Worlds](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/access-tutorial-worlds) - Tutorial world workflow
- [Use Assets from Tutorials](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/use-assets-from-tutorials) - Asset transfer process
- [Operational Modes](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/getting-started/user-interface/operational-modes) - Build vs Preview vs Simulation modes
- [Module 2 - Provided Scripts](./02-provided-scripts.md) - Next tutorial module

## Checkpoint

Module 1 completion checklist:
- ✅ Verified tutorial prerequisites  
- ✅ Opened tutorial world in desktop editor
- ✅ Tested world navigation (Build/Preview modes)
- ✅ Located Asset Library and Console tabs
- ✅ Understanding of simulation controls for TypeScript testing

Next: Module 2 will examine the included TypeScript scripts that power the lobby system.

## Sources

- [Multiplayer Lobby Tutorial - Module 1](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/multiplayer-lobby-tutorial/module-1-setup) (accessed 2025-09-25)