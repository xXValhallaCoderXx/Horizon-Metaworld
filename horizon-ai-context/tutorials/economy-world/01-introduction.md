---
title: "Economy World Tutorial - Module 1: Introduction"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-1-introduction"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "world_inventory", "tycoon_games", "monetization"]
summary: "Introduction to in-world economies, World Inventory APIs, and tycoon game design principles with apple farmer example."
tutorial: "economy-world"
---

# Economy World Tutorial - Module 1: Introduction

## What & Why

This tutorial teaches how to create in-world economies using Horizon Worlds' World Inventory APIs and shop gizmo system. In-world economies enhance player engagement through unlockable items, progression systems, and meaningful rewards that persist across sessions. The tutorial uses a tycoon-style apple farmer game to demonstrate core economic loops and monetization concepts.

## Key APIs / Concepts

- **World Inventory System**: Persistent per-player item storage that automatically syncs across sessions
- **hz.WorldInventory.grantItemToPlayer()**: Grant items to player inventory
- **hz.WorldInventory.consumeItemForPlayer()**: Remove items from player inventory  
- **hz.WorldInventory.getPlayerEntitlementQuantity()**: Query player item quantities
- **Shop Gizmo**: UI component for in-world purchases and transactions
- **In-World Economy**: Unlockable items, progression systems, soft currencies (distinct from real-money monetization)
- **MHCP Requirement**: Meta Horizon Creator Program membership required for monetization features

## How-To (Recipe)

1. **Differentiate Economy vs Monetization**
   - In-World Economy: Unlockable items, progression, customization (may use soft currency)
   - Monetization: Items purchasable only with real-world currency
   - Design economy first, add monetization selectively

2. **Design Core Economic Loop**
   - Define player actions that generate value
   - Create upgrade paths and progression rewards
   - Balance time investment vs reward payout
   - Consider social value of cosmetic items

3. **Implement World Inventory Integration**
   - Use grantItemToPlayer() for rewards and earnings
   - Use consumeItemForPlayer() for purchases and crafting
   - Query quantities with getPlayerEntitlementQuantity()
   - Design around persistent cross-session storage

4. **Plan Tycoon-Style Mechanics**
   - Resource collection → Processing → Sales → Upgrades cycle
   - Multiple upgrade paths (efficiency, capacity, variety)
   - Meaningful choices and optimization strategies

## Minimal Example

```typescript
// Apple Farmer Tycoon core loop example
class AppleFarmerManager extends hz.Component {
    // Grant apples when collected from trees
    onAppleCollected(player: hz.Player) {
        hz.WorldInventory.grantItemToPlayer(player, "apple", 1);
        console.log(`Granted 1 apple to ${player.name}`);
    }
    
    // Convert 5 apples to 1 pie via oven
    onCookPie(player: hz.Player) {
        const appleCount = hz.WorldInventory.getPlayerEntitlementQuantity(player, "apple");
        if (appleCount >= 5) {
            hz.WorldInventory.consumeItemForPlayer(player, "apple", 5);
            hz.WorldInventory.grantItemToPlayer(player, "pie", 1);
            console.log(`Player ${player.name} cooked a pie`);
        }
    }
    
    // Sell pie for gems (soft currency)
    onSellPie(player: hz.Player) {
        const pieCount = hz.WorldInventory.getPlayerEntitlementQuantity(player, "pie");
        if (pieCount >= 1) {
            hz.WorldInventory.consumeItemForPlayer(player, "pie", 1);
            hz.WorldInventory.grantItemToPlayer(player, "gems", 10);
            console.log(`Player ${player.name} sold pie for 10 gems`);
        }
    }
}
```

## Limits & Constraints

- **MHCP Membership**: Required for creating in-world items and currency
- **Terms of Service**: Must accept monetization ToS in creator portal
- **Automatic World Inventory**: Created per-world, handles persistence automatically
- **Item SKU System**: Items identified by string identifiers
- **Cross-Session Persistence**: Items automatically saved/loaded per player
- **API Rate Limits**: Not specified, monitor for performance impact

## Gotchas / Debugging

- **Economy vs Monetization Confusion**: Design engaging progression first, add paid items sparingly
- **MHCP Prerequisites**: Verify program membership before implementing monetization features
- **Item SKU Consistency**: Use consistent string identifiers across all inventory operations
- **Balance Considerations**: Test reward pacing to avoid grinding or trivial progression
- **Player Retention**: Design meaningful long-term goals and upgrade paths
- **Social Value**: Consider how items create status and community interaction

## See Also

- [World Inventory API Reference](../typescript-development-overview.md) - Complete API documentation
- [Gizmos Overview](../gizmos-overview.md) - Shop gizmo implementation details
- [Custom UI Overview](../custom-ui-overview.md) - UI systems for economic interfaces
- Module 2: Setup - Tutorial world configuration and prerequisites
- Module 3: Configuring Gameplay Entities - Apple trees, ovens, and interactive elements
- Module 4: Adding The Shop - Shop gizmo integration and purchase flows
- Module 5: Finishing Up - Polish, testing, and deployment considerations

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-1-introduction (accessed 2025-09-26)