---
title: "FTUE (First-Time User Experience) System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-11-ftue-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "sim_tycoon", "ftue", "onboarding", "tutorial"]
summary: "Onboarding system for new players featuring a simplified tutorial zone with basic store mechanics and completion tracking."
tutorial: "sim-tycoon"
---

# FTUE (First-Time User Experience) System

The FTUE is a short tutorial where new players learn the basic game mechanics before teleporting to the main gameplay area. It provides a controlled environment for players to understand the core systems.

## What & Why

New players need guided introduction to complex sim tycoon mechanics without being overwhelmed. The FTUE system:

- Provides simplified, focused learning environment
- Teaches core mechanics (store navigation, tool purchasing)
- Tracks completion status to prevent repeat tutorials
- Smoothly transitions players to main gameplay area
- Integrates with SaveGame system for persistent progress

## Key APIs / Concepts

- **FTUE Zone**: Dedicated simplified environment for new players
- **hasCompletedFTUE()**: SaveGame method checking tutorial completion status
- **setFTUECompleted()**: Marks tutorial as finished and saves progress
- **ftueSpawnPoint**: Spawn location for tutorial area
- **World.ts Integration**: Spawn point determination based on FTUE status
- **Simplified Store**: Limited inventory containing only starter tools
- **Teleporter Activation**: Progression gate requiring tool purchase

## FTUE Flow Sequence

1. **Arrival**: New players spawn in the dedicated FTUE area
2. **Introduction**: Simple UI and guidance introduce core concepts
3. **Store Tutorial**: Players learn to navigate and use the store interface
4. **First Purchase**: Players must buy their first tool (green pickaxe)
5. **Teleporter Activation**: Purchase unlocks teleporter to main game area
6. **Completion Tracking**: FTUE completion is saved to prevent repeat tutorials

## How-To (Implementation Recipe)

1. **Configure FTUE Detection**

   - Set up spawn point determination in World.ts
   - Implement FTUE completion checking in SaveGame system
   - Create conditional spawning logic

2. **Design FTUE Zone**

   - Create simplified environment with essential elements only
   - Add basic store with limited inventory (green pickaxe only)
   - Place teleporter with activation requirements

3. **Implement Progress Tracking**

   - Add FTUE completion flags to save data structure
   - Create methods for checking and setting completion status
   - Integrate with existing save system

4. **Set Up Store Tutorial**
   - Configure FTUE store with starter inventory
   - Provide clear instructions and visual cues
   - Ensure players have sufficient starting currency

## Implementation Example

```typescript
// World.ts - FTUE spawn determination
// If we are First Time Users, port to the intro space
if (!simPlayer.saveGame?.hasCompletedFTUE() && this.props.ftueSpawnPoint) {
    this.props.ftueSpawnPoint.as(hz.SpawnPointGizmo).teleportPlayer(simPlayer.player)
}

// SaveGame.ts - FTUE tracking methods
hasCompletedFTUE(): boolean {
    return this.gameData.completedFTUE
}

setFTUECompleted(): void {
    this.gameData.completedFTUE = true
    this.save()
}
```

## FTUE Zone Design

### Simplified Environment

- **Focused Learning**: Only essential game elements are present
- **Reduced Complexity**: Limited options prevent overwhelming new players
- **Clear Objectives**: Obvious goals that guide player actions
- **Safe Practice**: No penalties for experimentation

### Store Configuration

- **Limited Inventory**: Only green pickaxe available for purchase
- **Starting Currency**: Players begin with enough currency for first purchase
- **Clear Instructions**: Visual and text cues guide the purchase process
- **Immediate Feedback**: Purchase completion triggers positive reinforcement

## Save System Integration

### Completion Tracking

The FTUE system tracks completion status through the SaveGame system:

- **New Players**: No save data means FTUE required
- **Returning Players**: Completion flag skips tutorial
- **Manual Reset**: Debug options can reset FTUE for testing

### Spawn Point Determination

- **New Players**: Spawn in FTUE zone for tutorial
- **Returning Players**: Spawn in main gameplay area
- **Manual Override**: Debug options can force FTUE spawning

## Limits & Constraints

- FTUE zone must be performance-optimized for smooth first impressions
- Starting currency must be sufficient for required purchase
- Tutorial length should respect player time (keep concise)
- FTUE completion must be properly saved to prevent loops
- Teleporter activation requirements must be clearly communicated

## Gotchas / Debugging

### Players Stuck in FTUE

- Verify purchase requirements are achievable with starting resources
- Check that FTUE completion is properly triggered by purchase
- Ensure teleporter activation conditions are met and clearly communicated

### FTUE Not Triggering for New Players

- Confirm SaveGame system is properly configured and initialized
- Check spawn point assignments and FTUE detection logic in World.ts
- Verify FTUE completion flag is correctly initialized as false for new players

### Completion Not Saving

- Verify SaveGame system is functioning and writing to player variables
- Check that setFTUECompleted() is called after purchase completion
- Ensure save operations complete before player can leave area

## Customization Options

### Modifying FTUE Content

- **Update Store Inventory**: Change which items are available in FTUE store
- **Adjust Starting Resources**: Modify initial currency or tool allocations
- **Customize Instructions**: Update guidance text and visual cues
- **Modify Requirements**: Change what constitutes FTUE completion

### Adding FTUE Steps

1. **Define New Objectives**: Create additional learning goals
2. **Implement Progress Tracking**: Track completion of each step
3. **Update Save Data**: Include new progress flags in save system
4. **Create Visual Feedback**: Provide clear indication of progress

### Environment Design

- **Simplified Layout**: Keep environment focused and uncluttered
- **Clear Pathways**: Guide player movement with obvious routes
- **Visual Hierarchy**: Use color, size, and positioning to highlight important elements
- **Consistent Theming**: Maintain visual consistency with main game

## Testing Checklist

### Core Functionality

- **New Player Experience**: Test with fresh save data
- **Completion Tracking**: Verify FTUE completion is properly saved
- **Spawn Behavior**: Confirm returning players skip FTUE
- **Store Functionality**: Ensure FTUE store works correctly
- **Teleporter Activation**: Test teleporter unlocking after purchase

### Edge Cases

- **Save Corruption**: Test behavior with corrupted FTUE flags
- **Network Issues**: Verify graceful handling of save failures
- **Multiple Sessions**: Test FTUE across multiple play sessions

## Best Practices

### Design Principles

- **Keep It Simple**: Focus on core mechanics only
- **Progressive Disclosure**: Introduce concepts gradually
- **Clear Feedback**: Provide obvious confirmation of success
- **Forgiving Design**: Allow experimentation without harsh penalties

### Technical Implementation

- **Efficient Save Operations**: Minimize save frequency during FTUE
- **Error Handling**: Gracefully handle edge cases and errors
- **Performance Optimization**: Keep FTUE zone lightweight
- **Accessibility**: Ensure FTUE works well on all supported devices

### Player Experience

- **Respect Player Time**: Keep FTUE concise and focused
- **Build Confidence**: Start with easy wins to build confidence
- **Set Expectations**: Clearly communicate what players will learn
- **Smooth Transition**: Provide seamless progression to main gameplay

## See Also

- [SaveGame System](09-savegame-system.md) - Progress tracking and completion persistence
- [Store System](07-store-system.md) - Purchase mechanics taught in FTUE
- [World Management](08-world-game-management.md) - Spawn point determination logic
- [HUD System](10-hud-system.md) - UI elements used in FTUE guidance
- [New User Experience Overview](../new-user-experience-overview.md) - General onboarding principles

## Sources

- Module 11 - FTUE System Tutorial (accessed 2025-09-26)
