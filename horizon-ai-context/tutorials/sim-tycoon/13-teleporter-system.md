---
title: "Teleporter System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-13-teleporter-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "teleportation", "navigation", "ftue"]
summary: "Fast travel system providing conditional and unconditional teleportation between world areas, with FTUE progression integration and access control."
tutorial: "sim-tycoon"
---

# Teleporter System

## What & Why

The teleporter system provides fast travel between different areas of the world in Horizon Worlds sim tycoon games. It supports both unlockable teleporters for FTUE progression and always-available teleporters for general world navigation. This system enables efficient player movement while maintaining progression gates and world exploration incentives.

## Key APIs / Concepts

- **Teleporter.ts**: Core script managing teleportation functionality and access control
- **destinationSpawnPoint**: Target spawn point for teleportation
- **requiresCompletion**: Boolean flag for FTUE completion requirement  
- **requiredTools**: List of tools player must own to use teleporter
- **unlockMessage**: Text displayed when teleporter becomes available
- **lockedMessage**: Text shown when teleporter is inaccessible
- **canUseTeleporter()**: Method checking player eligibility for teleporter use
- **Visual States**: Available, Locked, Activating, Cooldown teleporter appearances

## How-To (Recipe)

1. **Create basic teleporter**
   - Create teleporter entity at desired location
   - Attach Teleporter.ts script to the entity
   - Configure destination spawn point

2. **Set access requirements**
   - Configure `requiresCompletion` for FTUE gating
   - Set `requiredTools` list for tool-based access
   - Define unlock and locked messages

3. **Integrate with save system**
   - Link FTUE completion status to teleporter availability
   - Track player progress affecting teleporter access
   - Save teleporter unlock achievements between sessions

4. **Configure visual feedback**
   - Set up distinct visual states (available/locked/activating)
   - Add interaction prompts with destination information
   - Implement progress indicators for conditional unlocks

5. **Test teleporter flow**
   - Verify teleportation mechanics and transitions
   - Test with various player progression states
   - Ensure proper integration with existing systems

## Minimal Example

```typescript
// Check if player can use FTUE teleporter
canUseTeleporter(player: hz.Player): boolean {
  const simPlayer = getSimPlayer(player);
  return simPlayer.hasRequiredTool("green_pickaxe") && 
         simPlayer.saveGame.hasCompletedFTUE();
}

// Basic teleporter configuration
teleporter.destinationSpawnPoint = targetSpawn;
teleporter.requiresCompletion = true;
teleporter.requiredTools = ["green_pickaxe"];
teleporter.unlockMessage = "Teleporter now available!";
teleporter.lockedMessage = "Complete tutorial first";
```

## Limits & Constraints

- **Performance Impact**: Minimize expensive condition checks during interaction
- **Visual Optimization**: Use efficient particle effects and animations
- **Network Efficiency**: Optimize multiplayer synchronization for teleporter states
- **Memory Management**: Properly clean up teleporter effects and states
- **Mobile Compatibility**: Ensure teleporters work well on mobile devices
- **Loading Performance**: Preload destinations and implement progressive loading

## Gotchas / Debugging

- **FTUE Integration**: FTUE teleporter only allows one-way travel from tutorial to main area
- **Tool Verification**: Happens automatically during teleporter interaction
- **State Synchronization**: Ensure multiplayer consistency for teleporter states
- **Error Handling**: Implement graceful fallbacks for failed teleportations
- **Unlock Conditions**: Player must buy green pickaxe from FTUE store to unlock progression teleporter
- **Access Control**: Advanced area teleporters might require higher-tier tools
- **Performance Monitoring**: Track teleportation performance metrics

## See Also

- [FTUE System](11-ftue-system.md) - First-time user experience integration
- [Save Game System](09-savegame-system.md) - Player progress persistence
- [Tool System](03-tools-and-toolgroups.md) - Tool ownership requirements
- [World Management](08-world-game-management.md) - Area coordination systems

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-13-teleporter-system (accessed 2025-09-26)