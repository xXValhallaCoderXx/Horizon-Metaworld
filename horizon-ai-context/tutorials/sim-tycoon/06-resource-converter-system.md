---
title: "Module 6 - Resource Converter System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-6-resource-converter"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "sim_tycoon", "resource_processing", "triggers", "economy"]
summary: "Implements trigger-based resource conversion system that transforms collected materials into currency with visual and audio feedback integration for the sim tycoon economy."
tutorial: "sim-tycoon"
---

# Module 6 - Resource Converter System

The resource converter turns resources (gems or ore) collected by players into currency. The conversion happens when a player enters a trigger zone, converting all their resources in their inventory into the corresponding currencies. The system also updates HUD elements, adds to the player's score, and plays visual and sound effects.

## System Components

### ResourceConverter.ts Script

This script contains two parts:

- **`convertOre()`** – A function that handles the conversion process
- **`OreToCurrencyTrigger`** – A trigger component that detects when a player enters and calls the conversion

#### Property Description

- **`targetVfxEntity`** – Entity where the conversion visual effect will play when resources are turned into currency

#### Core Functions

- **`convertOre(player, rcData)`** – Converts all ore (green, blue, purple, red) into corresponding currencies using the player's stat multipliers
- **`OreToCurrencyTrigger.start()`** – Calls `convertOre()` for the entering player

## How to Deploy

1. Add `ResourceConverter.ts` to your project
2. Create a trigger entity in the world (e.g., a conversion station)
3. Attach `OreToCurrencyTrigger` to the trigger
4. Assign a `targetVfxEntity` for the conversion effect

## How to Use

1. Players mine resources (gems or ore) with tools like the pickaxe
2. When a player steps into the trigger, `OreToCurrencyTrigger` runs
3. All resources in player inventory are converted into currency
4. The HUD and leaderboard score update automatically
5. Visual and sound effects play to signal the conversion

## Key APIs & Concepts

### Trigger System Integration

- **Trigger Zone Detection**: Uses collision detection to identify player entry
- **Player Identification**: Automatically identifies the entering player entity
- **State Validation**: Checks player inventory before processing conversion

### Resource Processing

- **Multi-Resource Support**: Handles multiple resource types (green, blue, purple, red ore)
- **Conversion Mapping**: Maps each resource type to corresponding currency
- **Multiplier Application**: Applies player stat multipliers to conversion rates
- **Inventory Clearing**: Removes converted resources from player inventory

### Feedback Systems

- **Visual Effects**: Triggers VFX at designated entity location
- **Audio Feedback**: Plays success/failure sound effects
- **UI Updates**: Refreshes HUD display and leaderboard scores
- **Score Integration**: Updates player progression metrics

## Implementation Example

```typescript
// Basic conversion trigger setup
class OreToCurrencyTrigger extends Component<Triggers.Gizmo> {
  targetVfxEntity?: Entity;

  start() {
    this.connectBroadcastEvent(
      TriggerEvents.onPlayerEnterTrigger,
      (player: Player) => {
        const rcData = { targetVfxEntity: this.targetVfxEntity };
        convertOre(player, rcData);
      }
    );
  }
}

// Resource conversion function
function convertOre(player: Player, rcData: any) {
  // Get player inventory and stats
  // Process each resource type
  // Apply multipliers and convert to currency
  // Update UI and play effects
}
```

## Modifications

### Adding New Resource Types

- Extend `convertOre()` with additional conversions
- Define new resource-to-currency mappings
- Update inventory checking logic
- Add corresponding visual/audio effects

### Adjusting Conversion Rates

- Change conversion multipliers by adjusting `playerStats`
- Implement dynamic rate scaling based on player progression
- Add time-based conversion bonuses
- Create tier-based multiplier systems

### Customizing Effects

- Customize effects by swapping `SFX_ConvertItem`, `SFX_UI_Reject`, or `VFX`
- Implement different effects for different resource types
- Add particle systems for successful conversions
- Create unique audio cues for various currencies

### Advanced Features

- Add cooldowns or limits so conversion can only happen under certain conditions
- Implement batch conversion bonuses
- Create resource quality multipliers
- Add conversion efficiency upgrades

## Integration with Other Systems

### SimPlayer Integration

- Accesses player inventory through SimPlayer state management
- Updates player currency balances via SimPlayer methods
- Integrates with player stat multiplier system
- Maintains player progression tracking

### HUD System Integration

- Triggers real-time HUD updates after conversion
- Updates currency display counters
- Refreshes inventory capacity indicators
- Shows conversion success notifications

### Score and Leaderboard Integration

- Adds converted currency value to player score
- Updates global leaderboard rankings
- Tracks conversion milestones and achievements
- Maintains historical conversion statistics

## Balancing Considerations

### Conversion Rates

- Balance resource-to-currency ratios with mining effort
- Ensure higher-tier resources provide meaningful value increases
- Consider player progression when setting base conversion rates
- Account for tool efficiency multipliers in final calculations

### Economic Impact

- Conversion stations should be strategically placed
- Consider travel time to conversion points in overall game balance
- Implement conversion fees or efficiency costs where appropriate
- Monitor currency inflation from conversion rates

### Player Experience

- Provide clear feedback on conversion success
- Make conversion process feel rewarding and satisfying
- Ensure conversion stations are easily identifiable
- Balance convenience with strategic positioning

## Limits & Constraints

- Trigger-based activation requires physical player presence
- Single conversion point may create bottlenecks in multiplayer
- Resource types must be predefined in conversion mapping
- Visual effects limited to designated VFX entity location

## Gotchas & Debugging

- Ensure trigger collision detection is properly configured
- Verify `targetVfxEntity` is assigned for visual feedback
- Check player inventory state before attempting conversion
- Handle edge cases where player has no resources to convert
- Ensure proper cleanup of conversion state after processing
- Validate currency updates are properly synchronized

## See Also

- [Module 2 - Resource Nodes](02-resource-nodes.md) - Source of resources for conversion
- [Module 4 - Pickaxe Tool](04-pickaxe-tool.md) - Tool for collecting resources
- [Module 5 - Backpack Tool](05-backpack-tool.md) - Storage system for collected resources
- [Module 7 - Store System](07-store-system.md) - Currency spending destination
- [Module 10 - HUD System](10-hud-system.md) - UI display for conversion feedback

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-6-resource-converter (accessed 2025-09-26)
