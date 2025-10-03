---
title: "Tools and ToolGroups Management System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-3-tools-and-toolgroups"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "sim_tycoon", "tool_system", "pooling", "inventory"]
tutorial: "sim-tycoon"
summary: "Tool management system using ToolGroups for pooling and distributing grabbable and attachable tools across players with progression tiers."
---

# Tools and ToolGroups Management System

The tool system manages different types of tools that players can equip and use, organized into ToolGroups that handle spawning, pooling, and distribution. This system provides efficient tool lifecycle management with automatic pooling and player assignment tracking.

## Key APIs / Concepts

- **ToolGroup Component**: Factory and pool manager for tool collections
- **Tool Pooling**: Maintains pools of tool instances to reduce spawning overhead
- **Dynamic Spawning**: Creates new tools when pools are empty
- **Return Management**: Handles tool return to pools when no longer needed
- **Player Assignment**: Tracks which tools are assigned to which players
- **toolName**: Unique identifier for tool type
- **tier**: Numerical progression level (1-6)
- **durability**: Health/usage points before tool breaks
- **efficiency**: Modifier for tool effectiveness
- **cost**: Currency required for purchase/upgrade
- **equipGrabbable()**: Assigns hand-held tools to players
- **equipAttachable()**: Assigns torso-mounted tools to players

## How-To (Recipe)

1. **Set Up ToolGroup**

   - Create ToolGroup entity for each tool type
   - Configure pooling parameters (max size, initial count)
   - Link to tool prefab/template

2. **Create Tool Categories**

   - **Grabbable Tools**: Hand-held items (pickaxes)
   - **Attachable Tools**: Torso-mounted items (backpacks)
   - Define tier progression (1-6 levels)
   - Set base properties (durability, efficiency, cost)

3. **Implement Tool Assignment**

   - Player requests tool through store/upgrade system
   - ToolGroup checks pool availability
   - If pool empty, spawn new tool instance
   - Remove from pool and assign to player
   - Return previous tool to respective pool

4. **Configure Tool Properties**

   - Set tier-based progression scaling
   - Define efficiency multipliers per tier
   - Configure cost scaling for upgrades
   - Set durability values per tool type

5. **Integration with SimPlayer**
   - Update toolMap with new tool types
   - Implement tool switching logic
   - Handle tool return on player disconnect
   - Track tool ownership state

## Minimal Example

```typescript
// ToolGroup.ts core functionality
export class ToolGroup {
  private toolPool: Tool[] = [];
  private assignedTools: Map<Player, Tool> = new Map();

  public requestTool(player: Player): Tool {
    // Check if tool available in pool
    let tool = this.toolPool.pop();

    // If pool empty, spawn new instance
    if (!tool) {
      tool = this.spawnNewTool();
    }

    // Return previous tool if player has one
    this.returnPlayerTool(player);

    // Assign new tool to player
    this.assignedTools.set(player, tool);
    return tool;
  }

  public returnTool(player: Player) {
    const tool = this.assignedTools.get(player);
    if (tool) {
      this.toolPool.push(tool);
      this.assignedTools.delete(player);
    }
  }
}

// SimPlayer tool management
export class SimPlayer {
  public equipGrabbable(toolName: string) {
    // Return current grabbable to pool
    if (this.currentGrabbable) {
      this.currentGrabbable.toolGroup.returnTool(this);
    }

    // Equip new tool
    this.currentGrabbable = this.toolMap.get(toolName).requestTool(this);
  }
}
```

## Limits & Constraints

- **Tool Categories**: Two main types (Grabbable, Attachable) - one active per category per player
- **Progression Tiers**: 6 tier levels with scaling costs and efficiency
- **Pool Management**: Configurable max pool sizes to prevent memory issues
- **Player Limits**: One grabbable tool and one attachable tool per player
- **Performance**: Pool size should scale with expected concurrent players

## Gotchas / Debugging

- **Pool Exhaustion**: Ensure pools can grow when needed or set appropriate maximums
- **Tool Return**: Always return tools when players switch or disconnect
- **Memory Management**: Monitor pool sizes in high-traffic scenarios
- **Tier Balancing**: Higher tiers should provide meaningful improvements over cost
- **Assignment Tracking**: Verify tool ownership is properly updated on all transactions
- **Cleanup**: Implement proper tool cleanup when players leave world

## Integration Points

- **SimPlayer System**: Tool assignment and switching mechanics
- **Store System**: Tool purchasing and upgrade transactions
- **Inventory System**: Capacity modifications from attachable tools
- **Resource System**: Tool durability affecting mining efficiency
- **UI/HUD System**: Tool status and upgrade availability displays
- **Save System**: Persistent tool progression across sessions

## Tool Categories

### Grabbable Tools (Pickaxes)

- Held in player's hand for active use
- Used for mining and resource extraction
- Only one grabbable tool active at a time
- Automatically returned when switching tools

### Attachable Tools (Backpacks)

- Attached to player's torso
- Provide passive inventory capacity increases
- Only one attachable tool active at a time
- Remain equipped until manually switched

## Progression System

**Tier 1**: Basic starting tools (low cost, low efficiency)
**Tier 2**: First upgrade level (moderate improvement)
**Tier 3**: Intermediate tools (balanced cost/benefit)
**Tier 4**: Advanced tools (significant efficiency gains)
**Tier 5**: Expert-level tools (high cost, high performance)
**Tier 6**: Master-tier tools (premium performance, maximum cost)

## Performance Optimization

- **Tool Pooling**: Reuses instances instead of constant spawning
- **Memory Management**: Controlled tool instance counts
- **Instant Assignment**: Tools immediately available from pools
- **Cleanup Automation**: Automatic tool lifecycle management
- **Pool Growth**: Pools start empty and grow as needed

## See Also

- [Resource Nodes System](02-resource-nodes.md) - Tool interaction with mining nodes
- [SimPlayer Management](01-simplayer.md) - Player tool assignment integration
- [Pickaxe Tool Implementation](04-pickaxe-tool.md) - Specific grabbable tool example
- [Backpack Tool Implementation](05-backpack-tool.md) - Specific attachable tool example
- [Store System](07-store-system.md) - Tool purchasing and upgrade mechanics

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-3-tools-and-toolgroups (accessed 2025-09-26)
