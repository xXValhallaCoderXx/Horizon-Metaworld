---
title: "Module 4 - Pickaxe Tool System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-4-pickaxe"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "sim_tycoon", "grabbable_tools", "mining", "progression"]
summary: "Implements the primary grabbable mining tool with durability system, tier progression, and resource extraction mechanics for the sim tycoon gameplay loop."
tutorial: "sim-tycoon"
---

# Module 4 - Pickaxe Tool System

The pickaxe is the primary grabbable tool used by players to mine resource nodes and extract materials. It represents the core interaction mechanism in the sim tycoon gameplay loop.

## System Components

### Pickaxe.ts Script

The Pickaxe script handles the behavior and mechanics of pickaxe tools. As a grabbable tool, it's held in the player's hand and used for active mining operations.

**Key features:**

- **Mining Action**: Primary function for extracting resources from nodes
- **Durability System**: Health that decreases with each use
- **Tier Progression**: Six tiers with increasing efficiency and cost
- **Visual Feedback**: Mining effects and tool degradation indicators
- **Sound Integration**: Audio feedback for mining actions

### Pickaxe Properties

Each pickaxe has configurable properties that define its performance:

- **`miningPower`**: Amount of damage dealt to resource nodes per use
- **`durability`**: Total number of uses before the tool breaks
- **`miningSpeed`**: Time between mining actions (lower is faster)
- **`efficiency`**: Resource extraction multiplier
- **`repairCost`**: Currency cost to restore full durability
- **`upgradeCost`**: Cost to advance to the next tier

## Pickaxe Tiers

The reference world includes six pickaxe tiers, each providing meaningful progression:

### Tier 1 - Basic Pickaxe

- **Mining Power**: 5 damage per hit
- **Durability**: 50 uses
- **Mining Speed**: 2.0 seconds between actions
- **Efficiency**: 1.0x resource multiplier
- **Upgrade Cost**: 100 currency

### Tier 2 - Iron Pickaxe

- **Mining Power**: 8 damage per hit
- **Durability**: 75 uses
- **Mining Speed**: 1.8 seconds between actions
- **Efficiency**: 1.2x resource multiplier
- **Upgrade Cost**: 250 currency

### Tier 3 - Steel Pickaxe

- **Mining Power**: 12 damage per hit
- **Durability**: 100 uses
- **Mining Speed**: 1.6 seconds between actions
- **Efficiency**: 1.4x resource multiplier
- **Upgrade Cost**: 500 currency

### Tier 4 - Diamond Pickaxe

- **Mining Power**: 18 damage per hit
- **Durability**: 150 uses
- **Mining Speed**: 1.4 seconds between actions
- **Efficiency**: 1.6x resource multiplier
- **Upgrade Cost**: 1000 currency

### Tier 5 - Platinum Pickaxe

- **Mining Power**: 25 damage per hit
- **Durability**: 200 uses
- **Mining Speed**: 1.2 seconds between actions
- **Efficiency**: 1.8x resource multiplier
- **Upgrade Cost**: 2000 currency

### Tier 6 - Master Pickaxe

- **Mining Power**: 35 damage per hit
- **Durability**: 300 uses
- **Mining Speed**: 1.0 seconds between actions
- **Efficiency**: 2.0x resource multiplier
- **Upgrade Cost**: N/A (maximum tier)

## Mining Mechanics

### Mining Process

1. Player activates the pickaxe near a resource node
2. Pickaxe deals damage based on its mining power
3. Resource node health decreases by the damage amount
4. Pickaxe durability decreases by 1
5. If node health reaches zero, resources are extracted
6. Resources are multiplied by pickaxe efficiency
7. Mining cooldown based on pickaxe speed before next action

### Durability Management

- Each mining action consumes 1 durability point
- When durability reaches zero, the pickaxe breaks and must be repaired
- Broken pickaxes cannot be used until repaired
- Repair costs are proportional to the pickaxe tier
- Players receive warnings when durability is low

### Resource Extraction

The pickaxe efficiency affects how many resources are extracted:

- Base extraction is determined by the resource node
- Pickaxe efficiency multiplies the base amount
- Higher tier pickaxes extract more resources per successful mine
- Efficiency also affects the chance of bonus resource drops

## Integration with Other Systems

### SimPlayer Integration

- Pickaxes are managed through the `SimPlayer.equipGrabbable()` method
- Only one pickaxe can be equipped at a time
- Current pickaxe state is saved between sessions
- Durability and tier progression persist across play sessions

### ToolGroup Integration

- Pickaxes are pooled and managed by PickaxeToolGroup
- When a player switches pickaxes, the old one returns to the pool
- New pickaxes are spawned dynamically when needed

## Customization Examples

### Modifying Pickaxe Stats

1. Select the pickaxe entity in the Desktop Editor
2. Locate the Pickaxe component
3. Adjust the following properties:
   - `miningPower`: Damage per hit
   - `durability`: Total uses before breaking
   - `miningSpeed`: Cooldown between actions
   - `efficiency`: Resource multiplier
   - `repairCost`: Cost to restore durability
   - `upgradeCost`: Cost to advance tier

### Adding New Pickaxe Tiers

1. Create a new pickaxe entity
2. Configure the Pickaxe component with new tier stats
3. Update the PickaxeToolGroup to include the new tier
4. Add the new tier to store and upgrade systems
5. Ensure visual progression matches tier advancement

### Creating Specialized Pickaxes

1. Design pickaxes optimized for specific resource types
2. Implement bonus damage against certain node types
3. Add special effects or abilities for unique pickaxes
4. Create acquisition methods (rewards, crafting, etc.)

## Visual and Audio Design

### Visual Progression

- Each tier should have distinct visual appearance
- Higher tiers should appear more impressive and powerful
- Tool degradation should be visually indicated
- Mining effects should scale with tool power

### Audio Feedback

- Unique sounds for each tier of pickaxe
- Different audio for different resource types
- Durability warnings through audio cues
- Satisfying mining impact sounds

## Balancing Considerations

### Progression Balance

- Each tier should feel like a meaningful upgrade
- Cost scaling should create interesting economic decisions
- Durability should balance convenience with resource management
- Mining speed improvements should feel impactful

### Economic Integration

- Upgrade costs should align with resource generation rates
- Repair costs should be meaningful but not punitive
- Tool progression should drive the core gameplay loop
- Higher tiers should enable access to better resource areas

### Performance Optimization

- Efficient pooling reduces spawning overhead
- Mining calculations should be optimized for frequent use
- Visual effects should scale appropriately with player count
- Audio management should prevent overlapping sound issues

## Limits & Constraints

- Six tier progression system (expandable through customization)
- One equipped pickaxe per player at a time
- Durability system requires repair mechanics integration
- Tool progression must integrate with store and economy systems

## Gotchas & Debugging

- Ensure PickaxeToolGroup includes all tier variants for proper pooling
- Broken pickaxes must be properly disabled until repaired
- Mining cooldowns prevent exploit of rapid-fire mining
- Visual and audio feedback requires proper event handling
- Tier progression balance affects entire game economy

## See Also

- [Module 1 - SimPlayer](01-simplayer.md) - Player state management and tool equipment
- [Module 2 - Resource Nodes](02-resource-nodes.md) - Target objects for pickaxe mining
- [Module 3 - Tools and ToolGroups](03-tools-and-toolgroups.md) - Tool management system
- [Module 5 - Backpack Tool](05-backpack-tool.md) - Companion tool for resource storage
- [Module 6 - Resource Converter System](06-resource-converter-system.md) - Processing mined resources

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-4-pickaxe (accessed 2025-09-26)
