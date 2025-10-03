---
title: "In-World Economy Systems Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-1-introduction"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "world_inventory", "shop_gizmo", "monetization"]
summary: "Comprehensive guide to implementing persistent in-world economies using World Inventory APIs, shop systems, and tycoon-style gameplay mechanics."
---

# In-World Economy Systems Overview

## What & Why

In-world economies enhance player engagement through persistent progression systems, unlockable items, and meaningful reward loops that span multiple play sessions. Unlike direct monetization, in-world economies focus on soft currencies, timed interactions, and upgrade paths that maintain perceived value while encouraging regular gameplay participation.

## Key APIs / Concepts

- **World Inventory System**: Persistent per-player item storage with automatic cross-session synchronization
- **hz.WorldInventory.grantItemToPlayer(player, sku, quantity)**: Grant items to player inventory
- **hz.WorldInventory.consumeItemForPlayer(player, sku, quantity)**: Remove items from player inventory
- **hz.WorldInventory.getPlayerEntitlementQuantity(player, sku)**: Query current item quantities (returns Promise)
- **World Shop Gizmo**: Built-in UI component for item exchanges and transactions
- **In-World Items**: World-specific assets with unique SKU identifiers (consumable vs durable)
- **MHCP Requirements**: Meta Horizon Creator Program membership needed for economy features

## How-To (Recipe)

1. **Design Economic Core Loop**
   - Define resource collection → processing → sales → upgrade cycle
   - Balance time investment with reward payout ratios
   - Create multiple upgrade paths for player choice and optimization
   - Distinguish between in-world economy and real-money monetization

2. **Create In-World Items via Commerce Panel**
   - Set up consumable items for currencies and resources
   - Configure durable items for permanent unlocks only
   - Generate item thumbnails using Asset Library screenshots
   - Note unique SKU identifiers for code integration

3. **Implement Collection and Crafting Systems**
   - Use TriggerGizmos with SimpleLootItem patterns for resource spawning
   - Implement timed crafting processes to increase perceived value
   - Add visual feedback layers (particle effects, lighting, animation)
   - Handle ownership and state management for multiplayer consistency

4. **Configure Shop and Transaction Systems**
   - Deploy World Shop gizmo with proper item exchange ratios
   - Design utility power-ups that enhance efficiency rather than replace gameplay
   - Limit shop display to essential items for reduced UI clutter
   - Test complete economic loops before publication

## Minimal Example

```typescript
// Core economy manager with World Inventory integration
class EconomyManager extends hz.Component {
    private readonly EXCHANGE_RATES = {
        APPLES_PER_PIE: 5,
        PIES_PER_GEM: 10,
        GEM_COST_FASTER_PIES: 20
    };
    
    // Resource collection event handler
    onResourceCollected(player: hz.Player, resourceSKU: string, amount: number) {
        hz.WorldInventory.grantItemToPlayer(player, resourceSKU, amount);
        this.updatePlayerHUD(player, resourceSKU);
    }
    
    // Crafting system with timer-based value addition
    async attemptCrafting(player: hz.Player, inputSKU: string, outputSKU: string) {
        const inputCount = await hz.WorldInventory.getPlayerEntitlementQuantity(player, inputSKU);
        const requiredAmount = this.EXCHANGE_RATES.APPLES_PER_PIE;
        
        if (inputCount >= requiredAmount) {
            // Consume input resources
            hz.WorldInventory.consumeItemForPlayer(player, inputSKU, requiredAmount);
            
            // Start timed crafting process (adds perceived value)
            this.startCraftingTimer(player, outputSKU, 15); // 15 second bake time
        } else {
            this.displayErrorMessage(player, `Need ${requiredAmount - inputCount} more ${inputSKU}`);
        }
    }
    
    // Shop transaction handling (World Shop gizmo handles UI automatically)
    private startCraftingTimer(player: hz.Player, outputSKU: string, durationSeconds: number) {
        this.async.setTimeout(() => {
            hz.WorldInventory.grantItemToPlayer(player, outputSKU, 1);
            this.updatePlayerHUD(player, outputSKU);
        }, durationSeconds * 1000);
    }
}
```

## Limits & Constraints

- **MHCP Membership**: Required for all in-world item creation and monetization features
- **World-Specific Items**: Items tied to individual worlds, not transferable between worlds
- **SKU Uniqueness**: Each item receives auto-generated unique identifier
- **Cross-Session Persistence**: World Inventory automatically handles save/load per player
- **Consumable vs Durable**: Item type choice affects inventory behavior permanently
- **Shop Transaction Limits**: World Shop gizmo requires whole number exchange ratios
- **API Rate Limits**: Not specified, monitor World Inventory call frequency for performance

## Gotchas / Debugging

- **Economy vs Monetization Design**: Focus on engaging progression before adding paid items
- **SKU Management**: Always copy exact SKUs from Commerce panel to avoid mismatch errors
- **Timer-Based Value**: Use crafting delays to maintain perceived value of processed goods
- **Error Handling**: Implement clear feedback for insufficient resources or failed transactions
- **Testing Workflow**: Use DebugEconomyUI tools during development, disable before publication
- **Balance Validation**: Test complete economic loops to ensure meaningful progression choices
- **Visual Feedback**: Layer particle effects, lighting, and audio for rewarding interactions

## From Tutorials

- [Economy World Tutorial](./tutorials/economy-world/01-introduction.md) - Complete 5-module apple farmer tycoon implementation with World Inventory APIs and shop integration

## See Also

- [World Inventory API Reference](./typescript-development-overview.md) - Complete API documentation and patterns
- [Gizmos Overview](./gizmos-overview.md) - Shop gizmo configuration and TriggerGizmo usage
- [Custom UI Overview](./custom-ui-overview.md) - Alternative approaches to economic UI systems  
- [MHCP Program Overview](./mhcp-program-overview.md) - Creator program requirements and monetization policies
- [Events and Triggers System](./events-triggers-system.md) - Event-driven patterns for economic interactions

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-1-introduction (accessed 2025-09-26)