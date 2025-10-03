---
title: "SaveGame System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-9-savegame-system"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "sim_tycoon",
    "save_system",
    "persistence",
    "player_variables",
  ]
summary: "Persistent player progress system using Horizon's player variables to save tools, resources, currency, and progression between play sessions."
tutorial: "sim-tycoon"
---

# SaveGame System

The SaveGame system handles persistence of player progress between play sessions. It ensures that tools, resources, currency, and progression are maintained when players leave and return to the world.

## What & Why

Player progress persistence is critical for sim tycoon games where advancement takes multiple sessions. The SaveGame system:

- Serializes player state into Horizon's player variable system
- Automatically saves on tool changes, purchases, and milestones
- Handles data validation, corruption recovery, and version migration
- Integrates with SimPlayer, ToolGroups, and Store systems

## Key APIs / Concepts

- **SaveGame.ts**: Main persistence script managing serialization/deserialization
- **Player Variables**: Horizon's persistent storage system for player data
- **VariableGroups**: Container for organizing related player variables
- **pvarsBaseName**: Configuration string matching your VariableGroup name
- **saveGameKey**: Variable name for storing serialized save data
- **Data Validation**: Integrity checking and corruption recovery
- **Version Migration**: Automatic save format updates

## Tracked Player Data

- **equippedTools**: Currently equipped grabbable and attachable tools
- **playerStats**: Currency amounts, scores, and progression metrics
- **inventoryData**: Current resource inventory and capacity
- **progressFlags**: Tutorial completion, achievement unlocks, milestones
- **playTime**: Total time spent in the world
- **lastSaveTime**: Timestamp of most recent save operation

## How-To (Setup Recipe)

1. **Create VariableGroup in Desktop Editor**

   - Navigate to Systems > VariableGroups
   - Create new group (e.g., "PlayerData")

2. **Add Player Variable**

   - Inside VariableGroup, add player variable named `SaveGame`
   - This stores the serialized player data

3. **Configure SaveGame.ts Script**

   - Set `pvarsBaseName = "PlayerData:";` (match your group name + colon)
   - Set `saveGameKey = "SaveGame";` (match your variable name)

4. **Initialize Tool Integration**
   - Ensure ToolGroup initialization occurs before player join
   - Verify tool names match between save data and ToolGroups

## Configuration Example

```typescript
// In SaveGame.ts
const pvarsBaseName = "PlayerData:"; // Match your VariableGroup name
const saveGameKey = "SaveGame"; // Match your player variable name
```

## Save Data Structure

### Tool Data

```typescript
equippedTools: {
  grabbable: "tier3_pickaxe",
  attachable: "tier2_backpack"
}
```

### Player Statistics

```typescript
playerStats: {
  greenCurrency: 150,
  blueCurrency: 75,
  purpleCurrency: 25,
  redCurrency: 5,
  totalScore: 2500
}
```

### Progress Tracking

```typescript
progressFlags: {
  tutorialCompleted: true,
  firstUpgrade: true,
  maxTierReached: 3
}
```

## Save Operations

### Automatic Saving Triggers

- **Tool Changes**: When players equip new tools or upgrades
- **Currency Updates**: After resource conversion or purchases
- **Progress Milestones**: Achievement completion, tier advancement
- **Periodic Saves**: Regular intervals to prevent data loss
- **Session End**: When players leave the world

### Manual Save Triggers

- Store purchases trigger immediate saves
- Major progression events force save operations
- Administrative save commands for testing

## Data Loading Process

### Player Join Sequence

1. **Variable Check**: System checks if player has existing save data
2. **Data Retrieval**: Loads saved data from player variables
3. **Validation**: Verifies data integrity and format compatibility
4. **State Restoration**: Applies saved data to SimPlayer instance
5. **Tool Assignment**: Equips saved tools through ToolGroup system
6. **UI Updates**: Refreshes HUD to reflect loaded state

### New Player Handling

- Default starting state is applied
- Initial tools are assigned
- Starting currency amounts are set
- Tutorial flags are initialized
- First save is created immediately

## Limits & Constraints

- Save data size should be kept compact for performance
- Player variables have storage limits (exact limits not specified)
- Save frequency should balance data safety with performance
- VariableGroup and variable names must match script configuration exactly

## Gotchas / Debugging

### Save Data Not Persisting

- Verify VariableGroup and player variable are correctly configured
- Check that `pvarsBaseName` matches exactly (including colon)
- Ensure variable name matches `saveGameKey` setting

### Tool Equipment Not Saved

- Confirm tool assignment occurs after save data loading
- Verify ToolGroup initialization happens before player join
- Check that tool names match between save data and ToolGroups

### Data Corruption Recovery

- System includes validation checks before loading
- Fallback defaults for corrupted data
- Automatic version migration for older save formats
- Comprehensive error logging for debugging

## System Integrations

### SimPlayer Integration

- Save system tightly coupled with SimPlayer state management
- All SimPlayer state changes trigger save operations
- Load operations directly update SimPlayer properties

### Tool System Integration

- Tool assignments saved and restored automatically
- Tool upgrade purchases immediately persisted
- Tool durability and condition maintained across sessions

### Store System Integration

- All purchases trigger immediate save operations
- Currency balances preserved accurately
- Purchase history tracking for analytics

## Performance Considerations

### Save Operation Optimization

- **Batch Operations**: Group multiple changes into single save
- **Selective Saving**: Only save changed data to reduce overhead
- **Compression**: Use efficient data serialization formats
- **Throttling**: Limit save frequency to prevent performance issues

### Memory Management

- **Data Cleanup**: Remove unnecessary save data over time
- **Size Limits**: Implement reasonable limits on save data size
- **Garbage Collection**: Properly dispose of temporary save objects

## Customization Options

### Adding New Save Data

1. **Extend Data Structure**: Add new fields to save data interface
2. **Update Serialization**: Include new data in save operations
3. **Update Deserialization**: Handle new data during load operations
4. **Provide Defaults**: Set appropriate default values for new players
5. **Test Migration**: Ensure existing saves work with new format

### Modifying Save Frequency

- Locate save trigger conditions in SaveGame.ts
- Adjust automatic save intervals
- Add or remove manual save triggers
- Balance save frequency with performance considerations

## Testing & Validation

### Required Test Cases

- **New Player Flow**: Test first-time player experience
- **Return Player Flow**: Verify existing save data loading
- **Data Migration**: Test save format updates
- **Error Conditions**: Test corruption and recovery scenarios

### Debugging Tools

- **Save Data Inspector**: View and edit save data for testing
- **Manual Save/Load**: Force save and load operations
- **Data Validation Reports**: Detailed validation failure information
- **Performance Monitoring**: Track save operation timing and frequency

## See Also

- [SimPlayer Management](01-simplayer.md) - Player state system that SaveGame persists
- [Tool System](03-tools-and-toolgroups.md) - Tool assignments saved by SaveGame
- [Store System](07-store-system.md) - Purchases trigger SaveGame operations
- [HUD System](10-hud-system.md) - UI updates reflect loaded save data

## Sources

- Module 9 - SaveGame System Tutorial (accessed 2025-09-26)
