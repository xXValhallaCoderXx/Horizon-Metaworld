---
title: "Resource Nodes System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-2-resource-nodes"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "sim_tycoon",
    "resource_nodes",
    "mining",
    "gameplay_systems",
  ]
tutorial: "sim-tycoon"
summary: "Interactive resource nodes that players mine for materials, featuring health systems, respawn mechanics, and configurable properties for wood, stone, and crystal resources."
---

# Resource Nodes System

Resource nodes are interactive objects that players mine to collect materials, serving as the primary source of resources in sim tycoon games. They provide the foundation for resource-gathering gameplay loops with health management, respawn mechanics, and visual feedback systems.

## Key APIs / Concepts

- **ResourceNode Component**: Core script handling mining interactions, health management, and respawn
- **maxHealth**: Maximum health points before node depletion
- **resourceType**: Resource produced (wood, stone, crystal)
- **resourceAmount**: Quantity generated per successful mine
- **respawnTime**: Seconds before depleted node respawns
- **miningDifficulty**: Damage required per mining action
- **Health System**: Damage-based depletion mechanics
- **Respawn Mechanics**: Automatic node regeneration after cooldown
- **Multi-player Support**: Multiple players can mine same node simultaneously

## How-To (Recipe)

1. **Create Resource Node Entity**

   - Place node object in world
   - Add ResourceNode component
   - Configure basic properties (health, resource type, amount)

2. **Configure Node Properties**

   - Set `maxHealth` for mining difficulty
   - Choose `resourceType` (wood/stone/crystal)
   - Define `resourceAmount` per successful mine
   - Set `respawnTime` for availability balance

3. **Set Up Resource Types**

   - Wood nodes: 10 health, 1-3 wood, 30s respawn
   - Stone nodes: 20 health, 1-2 stone, 45s respawn
   - Crystal nodes: 30 health, 1 crystal, 60s respawn

4. **Configure Visual/Audio Feedback**

   - Mining sparks and particle effects
   - Health indicator visuals
   - Mining sounds per resource type
   - Respawn notification effects

5. **Balance Node Distribution**
   - Distribute nodes to encourage exploration
   - Place rare resources in less accessible areas
   - Scale node density to support max player count

## Minimal Example

```typescript
// ResourceNode.ts core functionality
export class ResourceNode {
  private maxHealth: number = 20;
  private currentHealth: number = 20;
  private resourceType: string = "stone";
  private resourceAmount: number = 2;
  private respawnTime: number = 45;

  onMined(damage: number, player: Player) {
    this.currentHealth -= damage;

    if (this.currentHealth <= 0) {
      // Generate resources for player
      player.addResource(this.resourceType, this.resourceAmount);

      // Start respawn timer
      this.startRespawnTimer();
    }
  }

  private startRespawnTimer() {
    setTimeout(() => {
      this.currentHealth = this.maxHealth;
      this.showRespawnEffects();
    }, this.respawnTime * 1000);
  }
}
```

## Limits & Constraints

- **Resource Types**: 3 main types (wood, stone, crystal) - custom types require inventory system updates
- **Node Health**: 10-30 points typical range for balanced gameplay
- **Respawn Times**: 30-60 seconds for resource availability balance
- **Multi-player Mining**: Supported but may require balancing for fairness
- **Performance**: Node density should match world size and player capacity

## Gotchas / Debugging

- **Inventory Full**: Nodes should provide feedback when player inventory at capacity
- **Tool Compatibility**: All tool types accepted but different efficiency rates apply
- **Respawn Timing**: Balance respawn rates with resource scarcity needs
- **Visual Feedback**: Health indicators essential for player understanding
- **Distribution Balance**: Higher-value resources need appropriate placement difficulty
- **Progressive Scaling**: Late-game nodes should require upgraded tools for efficiency

## Integration Points

- **Tool System**: Accepts damage from all tool types with varying efficiency
- **Inventory System**: Auto-adds generated resources to player inventory
- **HUD System**: Displays mining progress, node health, and resource notifications
- **Audio System**: Provides mining sounds, impact audio, and completion feedback
- **VFX System**: Handles mining sparks, depletion effects, and respawn animations

## Advanced Customization

**Node Clusters**: Group similar resource types with varied health/respawn timers
**Progressive Depletion**: Nodes become harder to mine as health decreases
**Environmental Effects**: Time-of-day or weather impacts on mining efficiency
**Social Mechanics**: Shared nodes requiring multiple players or ownership systems

## See Also

- [Tool System and ToolGroups](03-tools-and-toolgroups.md) - Tool damage and efficiency mechanics
- [Player Inventory System](01-simplayer.md) - Resource storage and capacity
- [HUD System](10-hud-system.md) - Mining progress and resource displays
- [Audio System](15-audio-system.md) - Mining feedback and resource notifications

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-2-resource-nodes (accessed 2025-09-26)
