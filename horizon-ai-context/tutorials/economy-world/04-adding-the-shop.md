---
title: "Economy World Tutorial - Module 4: Adding The Shop"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-4-adding-the-shop"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "shop_gizmo", "world_shop", "utility_items"]
summary: "Implement World Shop gizmo for pie-to-gem transactions and utility power-up purchases (Faster Pies, Faster Apples) with proper UI configuration."
tutorial: "economy-world"
---

# Economy World Tutorial - Module 4: Adding The Shop

## What & Why

Module 4 completes the economic loop by adding a World Shop gizmo that enables players to sell pies for gems and purchase utility upgrades. The shop converts earned pies into gems (soft currency) and offers "Faster Pies" and "Faster Apples" power-ups that enhance earning potential while preserving gameplay engagement. This maintains the perceived value of resources by requiring continued player action rather than direct item purchases.

## Key APIs / Concepts

- **World Shop Gizmo**: Built-in UI component for in-world commerce
- **Item Exchange Configuration**: Setting up sell/buy ratios between items
- **Utility Power-ups**: Upgrades that enhance efficiency rather than replace gameplay
- **Perceived Value Preservation**: Design principle maintaining resource importance
- **Shop UI Configuration**: Display settings, item limits, and balance indicators  
- **Quantity Ratios**: Exchange rates between different item types
- **Shop Properties Panel**: Configuration interface for commerce settings

## How-To (Recipe)

1. **Add World Shop Gizmo to World**
   - Open Build Menu → Gizmos
   - Find and drag World Shop gizmo into world
   - Position under "Cook Shop" area with proper rotation (180° Y-axis if needed)
   - Use rotate tool ("E" key) for orientation adjustment

2. **Configure Pie-to-Gem Exchange** 
   - Select World Shop gizmo in Properties panel
   - Item 1: Select "Gem" with quantity "1" 
   - Set exchange item to "Apple Pie" with quantity "10"
   - Result: 10 Apple Pies = 1 Gem transaction

3. **Add Utility Power-up Items**
   - Item 2: "Faster Pies" for 20 Gems (increases pie baking efficiency)
   - Item 3: "Faster Apples" for 30 Gems (increases apple spawn/collection rate)
   - Configure proper quantity ratios for each exchange

4. **Optimize Shop UI Presentation**
   - Set "Displayed title" to "Cook Shop"
   - Set "# Shop Items" to 3 (reduces clutter)  
   - Set "Display item balance" to "Apple Pie" (shows player's sellable inventory)
   - Test shop functionality and visual clarity

## Minimal Example

```typescript
// Shop configuration values (set via Properties panel, not code)
const SHOP_CONFIG = {
    // Exchange rates
    PIES_PER_GEM: 10,        // 10 pies = 1 gem
    FASTER_PIES_COST: 20,    // 20 gems for faster pies
    FASTER_APPLES_COST: 30,  // 30 gems for faster apples
    
    // Display settings  
    DISPLAYED_TITLE: "Cook Shop",
    SHOP_ITEMS_COUNT: 3,
    BALANCE_DISPLAY_ITEM: "Apple Pie"
};

// World Shop gizmo handles transactions automatically
// No custom scripting required - uses World Inventory APIs internally
// Players interact directly with shop UI to:
// 1. Sell pies for gems
// 2. Buy utility upgrades with gems
// 3. View current balances and available items
```

## Limits & Constraints

- **MHCP Requirements**: Still applies for all in-world item operations
- **Item Limit**: Shop can display configurable number of items (set to 3 for clarity)
- **Exchange Ratios**: Must be whole numbers, no fractional quantities supported
- **UI Constraints**: Shop interface automatically handles World Inventory integration
- **Positioning**: Shop gizmo requires proper world placement and orientation
- **Item Dependencies**: All referenced items must exist in Commerce panel
- **Display Balance**: Only one item type can be shown as balance indicator

## Gotchas / Debugging

- **Gizmo Orientation**: World Shop may spawn facing wrong direction, use rotate tool
- **Item Selection Order**: Configure items in logical sequence (sell before buy)
- **Exchange Rate Balance**: Price utility items to maintain meaningful progression
- **Perceived Value Design**: Avoid making core resources directly purchaseable with money
- **UI Clutter**: Limit displayed items to essential transactions only
- **Item Balance Display**: Choose most relevant currency for player decision-making
- **Testing Workflow**: Verify complete economic loop (collect → bake → sell → upgrade)

## See Also

- [Gizmos Overview](../gizmos-overview.md) - World Shop gizmo configuration and usage
- [World Inventory API Reference](../typescript-development-overview.md) - Underlying transaction mechanisms
- [Custom UI Overview](../custom-ui-overview.md) - Alternative shop implementation approaches
- Module 3: Configuring Gameplay Entities - Oven and apple spawner setup
- Module 5: Finishing Up - Testing complete economic loop and polish
- Module 1: Introduction - Economic design principles and tycoon mechanics
- Module 2: Setup - In-world item creation and MHCP prerequisites

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-4-adding-the-shop (accessed 2025-09-26)