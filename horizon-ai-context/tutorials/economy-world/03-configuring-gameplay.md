---
title: "Economy World Tutorial - Module 3: Configuring Gameplay Entities"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-3-configuring-gameplay"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "trigger_gizmos", "interval_timers", "world_inventory_integration"]
summary: "Configure apple spawners, ovens, and player HUDs with SimpleLootItem and Oven TypeScript scripts for complete tycoon gameplay loop."
tutorial: "economy-world"
---

# Economy World Tutorial - Module 3: Configuring Gameplay Entities

## What & Why

Module 3 implements the core tycoon gameplay loop by configuring apple spawners, ovens, and player HUD systems with TypeScript scripts. Apple spawners use SimpleLootItem.ts to grant items on collection with respawn timers. Ovens use Oven.ts extending PurchaseableItem.ts to handle purchasing and apple-to-pie conversion with timed baking processes. Player HUDs display real-time inventory updates via Custom UI gizmos.

## Key APIs / Concepts

- **SimpleLootItem.ts**: Script managing collectable items with respawn mechanics
- **Oven.ts**: Script extending PurchaseableItem for purchase and crafting workflows  
- **PurchaseableItem.ts**: Base class handling World Inventory purchase transactions
- **TriggerGizmo**: Root entity for player interaction detection
- **Custom UI Gizmos**: HUD display for real-time inventory tracking
- **Interval Timers**: `async.setInterval()` for animation and countdown timing
- **State Management**: Update function switching between animation and respawn states
- **Entity Composition**: Mesh, PFX, Dynamic Light layering for visual feedback

## How-To (Recipe)

1. **Configure Apple Spawners**
   - Set lootSKU property to Apple item SKU from Commerce panel
   - Configure respawn delay and enable respawn behavior
   - Test trigger detection and inventory granting
   - Verify visual feedback (animation, effects, lighting)

2. **Set Up Player HUD System**  
   - Configure Custom UI gizmos with PlayerHud script
   - Set currencyName, currencySKU, and currencyTexture for each item type
   - Link PlayerHudManager for automatic player assignment
   - Test real-time inventory display updates

3. **Configure Oven Purchase and Crafting**
   - Set priceSKU to Gem item SKU for oven purchase
   - Set itemSKU to Oven item SKU for ownership tracking
   - Configure piePriceSKU (Apple), pieSKU (Apple Pie), and bake duration
   - Link TextGizmos for price display and error messaging
   - Set mesh references for visibility management

4. **Test Complete Economic Loop**
   - Collect apples → inventory increases
   - Purchase oven with gems → ownership granted
   - Bake pie with 5 apples → timed conversion process
   - Verify error handling for insufficient resources

## Minimal Example

```typescript
// SimpleLootItem.ts core functionality
class SimpleLootItem extends hz.Component<typeof SimpleLootItem> {
    private update: (deltaTime: number) => void = deltaTime => {};
    private active: boolean = true;
    
    start() {
        this.update = this.animateMesh; // Default state
        this.updateIntervalId = this.async.setInterval(() => {
            this.update(this.updateDelayS);
        }, this.updateDelayS * 1000);
    }
    
    onTriggerEnter(player: hz.Player) {
        if (this.active) {
            // Grant item to world inventory
            WorldInventory.grantItemToPlayer(
                player, this.props.lootSKU, this.props.lootCount
            );
            
            // Broadcast pickup event
            this.sendNetworkBroadcastEvent(SimpleLootItemEvents.OnPickupLoot, {
                player, sku: this.props.lootSKU, count: this.props.lootCount
            });
            
            this.deactivate(); // Hide and start respawn timer
        }
    }
    
    deactivate() {
        this.active = false;
        // Hide visuals, switch to respawn countdown
        this.update = this.awaitRespawn;
        this.respawnRemaining = this.props.respawnDelay;
    }
}

// Oven.ts purchase and crafting logic
class Oven extends PurchaseableItem<typeof Oven> {
    onPlayerEnterTrigger(player: hz.Player) {
        if (this.owner === player) {
            if (!this.purchased) {
                this.onAttemptPurchase(player); // Inherited from PurchaseableItem
            } else {
                this.attemptPieBake(); // Custom crafting logic
            }
        }
    }
    
    attemptPieBake() {
        WorldInventory.getPlayerEntitlementQuantity(
            this.owner, this.props.piePriceSKU
        ).then(quantity => {
            if (quantity >= this.props.piePriceAmount) {
                // Consume apples, start baking timer
                WorldInventory.consumeItemForPlayer(
                    this.owner, this.props.piePriceSKU, this.props.piePriceAmount
                );
                this.startBakingPie();
            } else {
                this.updateFailText(`Not enough apples. ${
                    this.props.piePriceAmount - quantity
                } more needed!`);
            }
        });
    }
}
```

## Limits & Constraints

- **MHCP Prerequisites**: Still required for World Inventory operations
- **Entity Composition Requirements**: TriggerGizmo must be root for SimpleLootItem
- **Update Frequency**: 0.1s default interval for smooth animation (100ms)
- **State Management**: Single update function pointer switches behavior
- **Ownership Model**: One owner per oven, tracked via World Inventory
- **Baking Duration**: Configurable but affects perceived value (default 15s)
- **Error Handling**: TextGizmo references required for user feedback
- **SKU Configuration**: All item SKUs must match Commerce panel entries exactly

## Gotchas / Debugging

- **SKU Mismatch**: Copy exact SKUs from Commerce panel, avoid manual typing
- **Update Function Switching**: Ensure proper state transitions in SimpleLootItem
- **Entity References**: All mesh, text, and effect references must be properly linked
- **Trigger Ownership**: OnPlayerEnterTrigger only fires for correct owner assignment
- **Async Operations**: World Inventory queries return Promises, handle appropriately
- **Respawn Logic**: Check respawnEnabled property before setting up countdown
- **Visual Feedback**: Layer particle effects, lighting, and animation for clear communication
- **Testing Sequence**: Test individual components before full economic loop

## See Also

- [Events and Triggers System](../events-triggers-system.md) - TriggerGizmo implementation patterns
- [TypeScript Development Overview](../typescript-development-overview.md) - Component inheritance and async operations
- [Custom UI Overview](../custom-ui-overview.md) - PlayerHUD implementation details
- [Gizmos Overview](../gizmos-overview.md) - TriggerGizmo and TextGizmo configuration
- Module 2: Setup - In-world item creation and MHCP requirements
- Module 4: Adding The Shop - Shop gizmo integration with World Inventory
- Module 5: Finishing Up - Testing, polish, and deployment considerations

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-3-configuring-gameplay (accessed 2025-09-26)