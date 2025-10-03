---
title: "Particle VFX System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-14-particle-vfx-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "particle_effects", "visual_effects", "mobile_optimization"]
summary: "Visual feedback system providing particle effects for mining, tool usage, resource collection, and game events with mobile performance optimization."
tutorial: "sim-tycoon"
---

# Particle VFX System

## What & Why

The particle VFX system provides visual feedback for mining actions, tool usage, resource collection, and other game events to enhance the player experience in Horizon Worlds sim tycoon games. It creates immersive visual responses that help players understand their actions and game state changes while maintaining optimal performance on mobile devices.

## Key APIs / Concepts

- **VFXSystem.ts**: Core script managing visual effects throughout the game
- **miningParticles**: Particle effects for different resource types being mined
- **collectionEffect**: Visual effect when resources are collected
- **toolTrails**: Trail effects for different tool tiers
- **conversionBurst**: Effect played during resource conversion
- **achievementEffect**: Celebration effect for achievements
- **Object Pooling**: Reuse particle effect instances for performance
- **Culling System**: Disable effects when not visible to players
- **Level of Detail**: Reduce complexity based on distance

## How-To (Recipe)

1. **Set up VFX system**
   - Create VFXSystem.ts script to manage all particle effects
   - Configure different particle effect types for game events
   - Set up object pooling for performance optimization

2. **Configure mining effects**
   - Create wood chips and dust particles for wood mining
   - Add stone fragments and sparks for stone mining
   - Implement glowing crystal shards for crystal mining

3. **Set up tool effects**
   - Add simple spark effects for basic tools
   - Create elaborate particle trails for advanced tools
   - Implement premium effects with animations for master tools

4. **Integrate with game systems**
   - Connect VFX triggers to ResourceNode scripts
   - Link tool actions to corresponding particle effects
   - Add achievement celebration effects for milestones

5. **Optimize for mobile**
   - Implement efficient particle management with culling
   - Add quality scaling based on device performance
   - Limit simultaneous particle systems and update rates

## Minimal Example

```typescript
// VFX System integration example
class VFXSystem {
  // Trigger mining effect based on resource type
  playMiningEffect(resourceType: string, position: Vector3) {
    switch(resourceType) {
      case "wood":
        this.spawnWoodChips(position);
        break;
      case "stone": 
        this.spawnStoneFragments(position);
        break;
      case "crystal":
        this.spawnCrystalShards(position);
        break;
    }
  }
  
  // Tool effect based on tier
  playToolEffect(toolTier: string, position: Vector3) {
    const effect = this.getPooledEffect(toolTier);
    effect.position = position;
    effect.play();
  }
}

// Resource collection feedback
onResourceCollected(amount: number) {
  vfxSystem.playCollectionEffect(player.position);
  if (inventory.isNearFull()) {
    vfxSystem.playCapacityWarning();
  }
}
```

## Limits & Constraints

- **Effect Duration**: Keep effects brief to reduce processing load
- **Particle Count**: Limit simultaneous particle systems for performance
- **Update Frequency**: Optimize particle update rates for mobile devices
- **Quality Scaling**: Adaptive quality based on device performance
- **Mobile Optimization**: Simplified effects for mobile platform constraints
- **Object Pooling**: Required for efficient particle system management
- **Culling Distance**: Disable effects when not visible to reduce overhead

## Gotchas / Debugging

- **Performance First**: Always prioritize smooth gameplay over visual flair
- **Mobile Battery**: Excessive particle effects can drain mobile device batteries
- **Memory Management**: Properly clean up effect instances to prevent leaks
- **Visual Clarity**: Effects should clearly communicate their purpose without overwhelming
- **Consistency**: Similar actions should have similar visual styles
- **Timing**: Effects must feel responsive and well-timed with game actions
- **Distance Culling**: Effects not visible to players should be automatically disabled

## See Also

- [Resource Nodes](02-resource-nodes.md) - Mining action integration
- [Tool System](03-tools-and-toolgroups.md) - Tool effect coordination  
- [Achievement System](16-achievement-quest-system.md) - Celebration effect triggers
- [Mobile Development](../web-mobile-development/README.md) - Mobile optimization strategies

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-14-particle-vfx-system (accessed 2025-09-26)