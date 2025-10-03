---
title: "World and Game Management"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-8-world-management"
last_updated: "2025-09-26T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "sim_tycoon",
    "world_management",
    "game_state",
    "player_lifecycle",
  ]
tutorial: "sim-tycoon"
summary: "World system manages overall game state, player lifecycle, and coordinates all systems working together as the central orchestrator for sim tycoon experiences."
---

# World and Game Management

The World system manages the overall game state, player lifecycle, and coordinates all the different systems working together. It serves as the central orchestrator for the sim tycoon experience.

## What & Why

The World.ts script acts as the main game controller that orchestrates all sim tycoon systems. It handles player lifecycle management, system initialization, event coordination, global state management, and performance monitoring to ensure a cohesive multiplayer experience.

## Key APIs / Concepts

- **World.ts**: Main game controller script managing all system coordination
- **Player Management**: Tracks all players and their associated SimPlayer instances
- **System Initialization**: Sets up all game systems when the world starts
- **Event Coordination**: Manages communication between different systems
- **Global State**: Maintains world-wide settings and configurations
- **Performance Monitoring**: Tracks system performance and optimizes accordingly

## How-To (Recipe)

### Player Joining Process

1. World.ts detects the new player entity
2. Creates associated SimPlayer wrapper
3. Assigns starting tools from ToolGroups
4. Attempts to load existing player progress
5. Sets up player-specific UI elements
6. Places player in appropriate starting location
7. Determines if FTUE should be triggered

### Player Departure Handling

1. All equipped tools are returned to their pools
2. Current progress is saved to player variables
3. Player inventory is processed appropriately
4. SimPlayer instance is properly disposed
5. Tool pools are optimized for remaining players

## Minimal Example

```typescript
// World configuration example
const worldConfig = {
  maxPlayers: 8,
  resourceMultipliers: {
    spawnRate: 1.0,
    despawnTime: 300,
  },
  economicRates: {
    baseCurrency: 1.0,
    inflationRate: 0.05,
  },
  performanceSettings: {
    maxEntities: 500,
    updateFrequency: 60,
  },
};
```

## Core Responsibilities

### Player Lifecycle Management

- Detects when players join the world
- Creates SimPlayer instances for new players
- Manages player spawning and initial setup
- Handles player disconnection cleanup
- Maintains player count limits (max 8 players)

### System Coordination

- Initializes ToolGroups and ensures tool availability
- Sets up resource nodes and their respawn timers
- Configures store systems and pricing
- Establishes save game connections
- Coordinates HUD and UI systems

### World State Management

- Maintains global game settings and rules
- Tracks world-wide statistics and metrics
- Manages time-based events and cycles
- Handles world reset and cleanup operations
- Ensures consistent state across all systems

## System Integration

### Resource Management

- Coordinates resource node spawning and distribution
- Manages global resource availability and balancing
- Handles cross-player resource interactions
- Optimizes resource generation based on player count

### Economic Oversight

- Monitors currency flow and inflation
- Adjusts pricing and rewards based on player behavior
- Manages global economic events or bonuses
- Ensures economic balance across all players

### Performance Optimization

- Monitors system performance and resource usage
- Dynamically adjusts system complexity based on player count
- Manages entity pooling and cleanup
- Optimizes update frequencies for better performance

## Configuration Management

### Global Settings

- **Player Limits**: Maximum concurrent players (default: 8)
- **Respawn Rates**: Global multipliers for resource respawn times
- **Economic Rates**: Base conversion rates and pricing scales
- **Difficulty Settings**: Global modifiers for mining difficulty
- **Event Triggers**: World-wide events and their conditions

### System Parameters

- **Tool Pool Sizes**: Initial and maximum sizes for tool pools
- **Save Intervals**: How frequently player data is saved
- **Performance Thresholds**: Limits for system optimization
- **Debug Settings**: Development and testing configurations

## Event System

### Global Events

- **Resource Bonuses**: Temporary increases in resource generation
- **Economic Events**: Market fluctuations or special pricing
- **Tool Promotions**: Temporary upgrade discounts
- **Seasonal Changes**: Time-based world modifications

### System Notifications

- **Player Achievements**: Broadcasts significant player accomplishments
- **System Status**: Performance warnings or optimization notifications
- **Economic Updates**: Changes to global pricing or rates
- **Maintenance Alerts**: System updates or scheduled events

## Integration Points

### Save System Integration

- Coordinates save operations across all players
- Manages world state persistence
- Handles save file migration and updates
- Ensures data consistency and backup

### UI System Integration

- Provides global UI state management
- Coordinates HUD updates across players
- Manages shared UI elements and notifications
- Handles UI performance optimization

### Tool System Integration

- Manages global tool availability and distribution
- Coordinates tool pool optimization
- Handles tool balancing and progression
- Manages tool event systems and rewards

## Limits & Constraints

- Maximum 8 concurrent players per world instance
- Performance monitoring required for system optimization
- Event-driven architecture necessary for system communication
- Memory management critical for SimPlayer instances and tool pools

## Gotchas / Debugging

- Keep World.ts focused on coordination rather than implementation
- Use event-driven architecture for system communication
- Implement proper error handling and recovery
- Design for scalability within the 8-player limit
- Monitor and log system performance metrics
- Document configuration options and their effects

## Customization Guide

### Modifying World Settings

1. Locate the World.ts script configuration section
2. Adjust global parameters:
   - `maxPlayers`: Maximum concurrent players
   - `resourceMultipliers`: Global resource generation rates
   - `economicRates`: Base currency and pricing scales
   - `performanceSettings`: Optimization thresholds

### Adding World Events

1. Define event conditions and triggers
2. Implement event effects on game systems
3. Create notification systems for players
4. Add event persistence for cross-session continuity

### Performance Tuning

1. Monitor player count and system load
2. Adjust pool sizes based on usage patterns
3. Optimize update frequencies for different systems
4. Implement dynamic quality scaling for performance

## Best Practices

### System Design

- Keep World.ts focused on coordination rather than implementation
- Use event-driven architecture for system communication
- Implement proper error handling and recovery
- Design for scalability within the 8-player limit

### Performance Optimization

- Monitor and log system performance metrics
- Implement graceful degradation for high load
- Use efficient data structures for player tracking
- Optimize frequent operations and update cycles

### Maintainability

- Document configuration options and their effects
- Implement comprehensive logging for debugging
- Design modular systems that can be easily modified
- Provide clear interfaces between different systems

## See Also

- [SimPlayer System](01-simplayer.md) - Player state management and lifecycle
- [SaveGame System](09-savegame-system.md) - Data persistence and world state management
- [HUD System](10-hud-system.md) - UI coordination and global state management

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-8-world-management (accessed 2025-09-26)
