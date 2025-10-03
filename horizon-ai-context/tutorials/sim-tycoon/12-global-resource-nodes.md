---
title: "Global Resource Nodes"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-12-global-resource-nodes"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "sim_tycoon",
    "multiplayer",
    "shared_resources",
    "collaboration",
  ]
summary: "Shared finite resource sources requiring collaborative effort from multiple players with reward distribution and reset mechanics."
tutorial: "sim-tycoon"
---

# Global Resource Nodes

Global Resource Nodes are shared finite resource sources for all players, which reset after being fully mined. Unlike individual ResourceNodes, these require collaborative effort from multiple players and provide shared rewards when completed.

## What & Why

Multiplayer games need social mechanics that encourage collaboration. Global Resource Nodes:

- Create shared objectives requiring multiple players to complete
- Distribute rewards fairly among contributors based on effort
- Implement reset mechanics to provide ongoing content
- Integrate with quest systems to reward teamwork
- Provide visual feedback through synchronized progress bars

## Key APIs / Concepts

- **GlobalResourceNode.ts**: Main script defining shared resource mechanics
- **resourceType**: StringID for the type of resource provided
- **workToExtract**: Total collective work needed to complete the node
- **nodeReward**: Total reward pool shared among contributors
- **nodeResetTime**: Cooldown period before node respawns
- **registerHit()**: Method to record player contributions and update progress
- **allocateRewards()**: Distributes rewards based on contribution levels
- **Shared Progress**: All players contribute to the same progress bar

## Core Properties

- **resourceType**: StringID for the type of resource the node provides
- **toolType**: Tool type required to mine the node
- **workToExtract**: Amount of collective work needed to finish the node
- **nodeReward**: Total reward shared among contributors when completed
- **nodeResetTime**: Time in seconds before the node becomes available again
- **nodeVisuals**: Parent object containing node meshes
- **healthBar/healthWrapper/healthBarNumeric**: UI elements showing progress

## How-To (Implementation Recipe)

1. **Add GlobalResourceNode Script**

   - Add GlobalResourceNode.ts to your project
   - Create entities for each global resource node in your world
   - Attach the script to each entity

2. **Configure Node Properties**

   - Set resource type, work required, and rewards
   - Configure reset timing and visual elements
   - Set up health bar UI elements for progress display

3. **Set Up Collision Detection**

   - Make the node entity collidable
   - Add "RESOURCE" gameplay tag to the collidable object
   - Ensure tools can detect and interact with nodes

4. **Integrate with Tool System**
   - Ensure tools call registerHit() on global resource nodes
   - Implement contribution tracking and progress updates
   - Handle reward distribution when nodes complete

## Key Differences from Regular Resource Nodes

### Shared Progress

- All players contribute to the same progress bar
- Node depletes for everyone when fully mined
- Progress is visible to all players through health bar UI

### Collaborative Rewards

- Rewards are distributed among all contributing players
- Contribution tracking determines reward allocation
- Higher contributors receive larger reward shares

### Reset Mechanics

- Node becomes unavailable when fully depleted
- Cooldown timer before respawning
- Visual feedback during reset period
- All players see synchronized reset state

## Main Functions

```typescript
// Core global node functionality
start(); // Stores original health bar states and checks visuals
registerHit(player, progressAdded); // Adds contribution, updates progress
allocateRewards(); // Divides rewards among players when completed
resetNode(); // Starts resetting the node after completion
```

## Integration with Quest System

Global Resource Nodes integrate with the achievement system:

- "Teamwork!" quest is awarded when players receive resources from global nodes
- Encourages collaborative gameplay patterns
- Provides social incentives for group activities

## Balancing Considerations

### Work Requirements

- Higher work requirements encourage more collaboration
- Should be balanced against player count and tool efficiency
- Consider peak and off-peak player populations

### Reward Distribution

- Fair distribution encourages participation
- Consider minimum contribution thresholds
- Balance individual vs. group benefits

### Reset Timing

- Cooldown should create anticipation without frustration
- Allow time for players to spend rewards and return
- Consider time zones and player availability patterns

## Limits & Constraints

- Shared nodes require multiple players to be efficient
- Reset timers must balance availability with scarcity
- Reward pools need balancing to prevent exploitation
- Progress synchronization adds network overhead
- UI elements need optimization for multiple simultaneous users

## Gotchas / Debugging

### Nodes Not Resetting Properly

- Verify reset timer configuration is correct
- Check that node completion triggers reset properly
- Ensure visual states are restored during reset

### Uneven Reward Distribution

- Confirm contribution tracking is working correctly
- Check allocation logic for fair distribution algorithms
- Verify minimum contribution thresholds

### Progress Synchronization Issues

- Test with multiple players to verify shared progress
- Check network state synchronization
- Ensure UI updates consistently for all players

## Customization Options

### Progress Visualization

- Customize health bar appearance and positioning
- Add particle effects for mining progress
- Implement sound feedback for collaboration milestones

### Reward Mechanics

- Implement bonus rewards for first/last contributors
- Add rare resource chances for global nodes
- Create special global nodes with unique rewards

### Social Features

- Add notification systems for node completion
- Implement contributor leaderboards
- Create team-based mining challenges

## Deployment Checklist

1. Add GlobalResourceNode.ts to your project
2. Create entities for each global resource node
3. Attach script to each entity
4. Configure properties (resource type, work required, rewards)
5. Make node entity collidable with "RESOURCE" tag
6. Set up health bar UI elements for progress display
7. Ensure tools call registerHit() on these nodes
8. Test with multiple players for proper collaboration

## Performance Considerations

- Monitor network traffic from progress synchronization
- Optimize UI update frequency for health bars
- Consider player limits for simultaneous mining
- Implement efficient reward calculation algorithms

## See Also

- [Resource Nodes](02-resource-nodes.md) - Individual player resource systems
- [Tool System](03-tools-and-toolgroups.md) - Mining tools that interact with global nodes
- [Achievement System](16-achievement-quest-system.md) - Quest integration for teamwork rewards
- [Multiplayer Systems](../multiplayer-lobby-systems.md) - General multiplayer mechanics

## Sources

- Module 12 - Global Resource Nodes Tutorial (accessed 2025-09-26)
