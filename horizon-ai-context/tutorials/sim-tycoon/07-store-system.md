---
title: "Store System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-7-store-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "sim_tycoon", "store_system", "economy", "tools"]
tutorial: "sim-tycoon"
summary: "Store system enables players to purchase tools and upgrades using earned currency, managing the purchase flow with validation, tool distribution, and progression tracking."
---

# Store System

The store system enables players to purchase tools and upgrades using the currency they've earned from converting resources. It provides an interface for players to progress their tools and capabilities.

## What & Why

The store system manages the purchase flow for tools and upgrades in sim tycoon games. It validates purchases, handles currency transactions, and distributes tools to players through integration with ToolGroups and SimPlayer systems.

## Key APIs / Concepts

- **StoreSystem.ts**: Core system managing purchase validation and tool distribution
- **toolCosts**: Mapping of tool names to their purchase costs
- **upgradeCosts**: Costs for upgrading existing tools to higher tiers
- **discountRates**: Optional discount percentages for bulk purchases
- **availableTools**: List of tools currently available for purchase
- **purchaseHistory**: Tracking of player purchases for analytics

## How-To (Recipe)

1. Player approaches store trigger or interface
2. Store displays available tools and their costs
3. Player selects desired tool or upgrade
4. System validates player has sufficient currency
5. Currency is deducted from player account
6. Tool is distributed through ToolGroup system
7. Player's SimPlayer state is updated
8. Purchase is recorded for save persistence

## Minimal Example

```typescript
// Store system configuration example
const storeConfig = {
  toolCosts: {
    pickaxe_tier_1: 50,
    pickaxe_tier_2: 150,
    backpack_basic: 100,
  },
  upgradeCosts: {
    pickaxe_upgrade: 75,
    backpack_upgrade: 125,
  },
};
```

## Key Features

### Purchase Validation

- Ensures players have sufficient currency for purchases
- Provides feedback if insufficient funds
- Suggests alternative lower-cost options

### Tool Distribution

- Handles giving tools to players through the ToolGroup system
- Pool Management: ToolGroup provides tool from pool or spawns new instance
- Player Assignment: Tool is assigned to player through SimPlayer
- Previous Tool Return: Old tool is returned to its respective pool

### Currency Management

- Deducts costs and tracks player spending
- Currency is immediately deducted from player balance
- Transaction is logged for tracking
- Player statistics are updated
- HUD displays reflect new balance

### Progress Tracking

- Records purchases for save system persistence
- Purchase history is saved between sessions
- Tool ownership persists across play sessions
- Currency balances are maintained
- Upgrade progress is tracked

## Purchase Categories

### Pickaxe Purchases

- Tool tier upgrades for better mining efficiency
- Specialized pickaxes for specific resource types
- Repair services for damaged tools

### Backpack Purchases

- Capacity upgrades for larger inventories
- Specialized storage for specific resources
- Enhanced efficiency backpacks

### Utility Purchases

- Temporary boosts or multipliers
- Cosmetic upgrades for tools
- Special abilities or enhancements

## Integration Points

### SimPlayer Integration

- Purchase validation through player currency
- Tool assignment through `equipGrabbable`/`equipAttachable`
- State persistence through save system
- Progress tracking for achievements

### ToolGroup Integration

- Store requests specific tool from appropriate ToolGroup
- Handles tool pooling and management
- Equipment swapping when purchasing new tools

### HUD Integration

- Real-time currency display during shopping
- Purchase confirmation dialogs
- Tool comparison interfaces
- Upgrade recommendation systems

## Economic Balancing

### Cost Scaling

- **Early Tools**: Affordable with basic resource conversion
- **Mid-Tier Tools**: Require moderate grinding or resource optimization
- **High-Tier Tools**: Significant investment requiring efficient play
- **Top-Tier Tools**: Major achievement requiring substantial progression

### Progression Pacing

- **Quick Early Wins**: First few upgrades should be achievable quickly
- **Meaningful Choices**: Mid-game should present interesting upgrade decisions
- **Long-term Goals**: High-end items should provide aspirational targets
- **Endgame Content**: Top-tier items should require mastery of all systems

## Limits & Constraints

- Tool distribution depends on ToolGroup pool availability
- Currency transactions are immediate and irreversible
- Purchase history requires save system integration
- Performance optimized through cached tool pools and batch processing

## Gotchas / Debugging

- Ensure sufficient currency validation before expensive operations
- Tools must be returned to pools when replaced
- Save system integration required for persistence
- UI updates should be optimized to prevent memory leaks
- Test progression flow when modifying costs

## Advanced Features

### Dynamic Pricing

- Supply and Demand: Prices fluctuate based on player behavior
- Seasonal Sales: Special pricing during events
- Bulk Discounts: Better rates for large purchases
- Loyalty Programs: Rewards for frequent customers

### Social Features

- Gift System: Players can purchase items for others
- Trading Post: Player-to-player item exchange
- Group Purchases: Collaborative buying for expensive items
- Leaderboards: Track top spenders or collectors

## See Also

- [SimPlayer System](01-simplayer.md) - Player state management and currency tracking
- [ToolGroups System](03-tools-and-toolgroups.md) - Tool management and pooling
- [Resource Converter System](06-resource-converter-system.md) - Currency generation through resource conversion

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-7-store-system (accessed 2025-09-26)
