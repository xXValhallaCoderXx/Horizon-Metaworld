---
title: "Module 5 - Backpack Tool System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-5-backpack"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "sim_tycoon",
    "attachable_tools",
    "inventory",
    "capacity_management",
  ]
summary: "Implements attachable tools that provide passive inventory expansion with tier-based progression, specialization systems, and durability management for the sim tycoon game."
tutorial: "sim-tycoon"
---

# Module 5 - Backpack Tool System

The backpack is an attachable tool that increases the player's inventory capacity. Unlike grabbable tools like pickaxes, backpacks are attached to the player's torso and provide passive benefits while equipped.

## System Components

### Backpack.ts Script

The Backpack script manages attachable tools that modify player inventory capacity. As an attachable tool, it's worn by the player and provides continuous passive benefits.

**Key features:**

- **Inventory Expansion**: Increases the maximum number of resources a player can carry
- **Passive Effect**: Provides benefits while equipped without active use
- **Tier Progression**: Multiple tiers with increasing capacity and features
- **Visual Indication**: Shows current capacity and storage status
- **Attachment System**: Automatically attaches to player's torso slot

### Backpack Properties

Each backpack has configurable properties that define its storage capabilities:

- **`capacity`**: Maximum number of resource units that can be stored
- **`durability`**: How long the backpack lasts before needing repair
- **`efficiency`**: Modifier for resource collection or storage
- **`specialization`**: Bonus capacity for specific resource types
- **`repairCost`**: Currency cost to restore full durability
- **`upgradeCost`**: Cost to advance to the next tier

## Backpack Tiers

The reference world includes multiple backpack tiers with increasing capacity:

### Tier 1 - Basic Pouch

- **Capacity**: 20 resource units
- **Durability**: 100 uses
- **Efficiency**: 1.0x storage multiplier
- **Specialization**: None
- **Upgrade Cost**: 150 currency

### Tier 2 - Leather Backpack

- **Capacity**: 35 resource units
- **Durability**: 150 uses
- **Efficiency**: 1.1x storage multiplier
- **Specialization**: +5 wood capacity
- **Upgrade Cost**: 350 currency

### Tier 3 - Canvas Pack

- **Capacity**: 50 resource units
- **Durability**: 200 uses
- **Efficiency**: 1.2x storage multiplier
- **Specialization**: +8 stone capacity
- **Upgrade Cost**: 700 currency

### Tier 4 - Explorer's Pack

- **Capacity**: 75 resource units
- **Durability**: 300 uses
- **Efficiency**: 1.3x storage multiplier
- **Specialization**: +10 crystal capacity
- **Upgrade Cost**: 1500 currency

### Tier 5 - Master Pack

- **Capacity**: 100 resource units
- **Durability**: 500 uses
- **Efficiency**: 1.5x storage multiplier
- **Specialization**: +15 all resource types
- **Upgrade Cost**: 3000 currency

### Tier 6 - Dimensional Storage

- **Capacity**: 150 resource units
- **Durability**: Unlimited
- **Efficiency**: 2.0x storage multiplier
- **Specialization**: +25 all resource types
- **Upgrade Cost**: N/A (maximum tier)

## Inventory Mechanics

### Capacity Management

The backpack system manages player inventory through several mechanisms:

- **Base Capacity**: Each player starts with a minimal base inventory
- **Backpack Bonus**: Equipped backpack adds its capacity to the base amount
- **Overflow Protection**: Players cannot collect resources when at maximum capacity
- **Visual Feedback**: HUD displays current and maximum capacity
- **Weight Simulation**: Heavier inventories may affect movement speed

### Resource Storage

Backpacks can store multiple types of resources:

- **Universal Storage**: All backpacks can store any resource type
- **Specialized Slots**: Higher tier backpacks have bonus capacity for specific resources
- **Smart Stacking**: Similar resources automatically stack in inventory
- **Priority System**: Critical resources are protected from accidental loss

### Durability System

Unlike pickaxes, backpack durability works differently:

- **Passive Degradation**: Durability decreases slowly over time while equipped
- **Collection Impact**: Each resource collected reduces durability slightly
- **Full Inventory Stress**: Operating at maximum capacity increases wear
- **Repair Benefits**: Repaired backpacks gain temporary efficiency bonuses

## Integration with Other Systems

### SimPlayer Integration

- Backpacks are managed through the `SimPlayer.equipAttachable()` method
- Only one backpack can be equipped at a time
- Capacity changes immediately upon equipping/unequipping
- Current backpack state is saved between sessions

### ToolGroup Integration

- Backpacks are pooled and managed by BackpackToolGroup
- When a player switches backpacks, the old one returns to the pool
- Inventory contents are preserved during backpack changes
- Pool management ensures efficient memory usage

### HUD Integration

- Real-time capacity display in player interface
- Visual indicators for capacity warnings
- Resource type breakdown in inventory view
- Storage optimization suggestions

## Attachment Mechanics

### Equipping Process

1. Player selects a backpack through store or upgrade interface
2. Current backpack (if any) is detached and returned to pool
3. New backpack is attached to player's torso attachment point
4. Player capacity is immediately updated to new backpack's values
5. HUD refreshes to show new capacity information

### Visual Attachment

- Backpacks appear visually attached to the player's back
- Different tiers have distinct visual appearances
- Attachment points are automatically configured
- Visual scaling adjusts to player avatar size
- Attachment state is synchronized across all players

## Customization Examples

### Modifying Backpack Stats

1. Select the backpack entity in the Desktop Editor
2. Locate the Backpack component
3. Adjust the following properties:
   - `capacity`: Total storage space
   - `durability`: Longevity before repair needed
   - `efficiency`: Storage optimization multiplier
   - `specialization`: Bonus capacity for specific resources
   - `repairCost`: Cost to restore durability
   - `upgradeCost`: Cost to advance tier

### Adding Specialized Backpacks

- Create backpack variants optimized for specific gameplay styles
- Implement mining-focused packs with tool storage
- Design trading packs with enhanced valuable resource capacity
- Create exploration packs with utility item storage

### Creating Unique Mechanics

- **Auto-Sort Backpacks**: Automatically organize inventory
- **Resource Conversion**: Convert common resources to rare ones
- **Portable Storage**: Allow temporary inventory expansion
- **Shared Storage**: Enable inventory sharing between players

## Balancing Considerations

### Capacity Progression

- Each tier should provide meaningful inventory improvements
- Upgrade costs should align with increased resource generation
- Capacity should enable new gameplay strategies
- Maximum capacity should support extended play sessions

### Economic Impact

- Larger inventories enable longer mining sessions
- Reduced trips to storage/conversion points
- Higher efficiency should come at proportional cost
- Repair mechanics should create ongoing resource sink

### Player Progression

- Backpack upgrades should feel essential for advancement
- Capacity limitations should drive upgrade decisions
- Specialization should create interesting choice points
- Maximum tier should feel like a significant achievement

## Performance Optimization

### Memory Management

- Efficient inventory data structures for large capacities
- Optimized attachment/detachment processes
- Minimal visual update overhead
- Smart pooling to reduce creation/destruction costs

### UI Optimization

- Smooth capacity bar updates
- Efficient inventory grid rendering
- Optimized resource counter displays
- Responsive attachment state changes

## Advanced Features

### Smart Inventory Management

- Automatic resource sorting by type or value
- Intelligent space optimization algorithms
- Predictive capacity warnings
- Resource usage pattern analysis

### Social Features

- Inventory sharing or trading capabilities
- Comparative capacity displays
- Backpack showcasing systems
- Achievement tracking for inventory milestones

## Limits & Constraints

- Six tier progression system (expandable through customization)
- One equipped backpack per player at a time
- Attachment point limited to torso slot
- Passive durability system requires time-based degradation tracking

## Gotchas & Debugging

- Ensure BackpackToolGroup includes all tier variants for proper pooling
- Inventory contents must persist during backpack changes
- Visual attachment synchronization critical for multiplayer consistency
- Capacity calculations must account for specialization bonuses
- Durability degradation rates should balance convenience with progression

## See Also

- [Module 1 - SimPlayer](01-simplayer.md) - Player state management and attachment systems
- [Module 3 - Tools and ToolGroups](03-tools-and-toolgroups.md) - Tool management and pooling
- [Module 4 - Pickaxe Tool](04-pickaxe-tool.md) - Grabbable tool comparison
- [Module 6 - Resource Converter System](06-resource-converter-system.md) - Resource processing destinations
- [Module 10 - HUD System](10-hud-system.md) - Interface elements for capacity display

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-5-backpack (accessed 2025-09-26)
