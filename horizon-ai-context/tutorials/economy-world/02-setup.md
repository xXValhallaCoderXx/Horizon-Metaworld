---
title: "Economy World Tutorial - Module 2: Setup"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-2-setup"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "in_world_items", "mhcp", "item_creation"]
summary: "Setup requirements and creating in-world items for economy tutorial: consumables, durables, item SKUs, and thumbnail creation process."
tutorial: "economy-world"
---

# Economy World Tutorial - Module 2: Setup

## What & Why

Module 2 covers the prerequisites and setup for creating an in-world economy, including MHCP membership requirements, creating consumable in-world items, and generating item thumbnails. In-world items are world-specific and must be created by world owners/editors. This module establishes the foundational items needed for the apple farmer tycoon economy.

## Key APIs / Concepts

- **MHCP Membership**: Meta Horizon Creator Program membership required
- **Monetization Terms of Service**: Must be accepted in creator portal
- **In-World Items**: World-specific items tied to individual worlds
- **Consumable Items**: Can be granted, spent, and removed from inventory (ideal for currencies/resources)
- **Durable Items**: Granted once, cannot be removed (permanent unlocks)
- **Item SKUs**: Unique string identifiers for each in-world item
- **Commerce Panel**: In-editor interface for managing in-world items
- **Item Thumbnails**: Visual representations for items in shop interfaces

## How-To (Recipe)

1. **Verify MHCP Requirements**
   - Ensure MHCP membership is active
   - Accept monetization Terms of Service in creator portal
   - Confirm world owner/editor permissions

2. **Create Required In-World Items**
   - Apple (consumable, Meta credits off)
   - Apple Pie (consumable, Meta credits off)  
   - Faster Apples (consumable upgrade, Meta credits off)
   - Faster Pies (consumable upgrade, Meta credits off)
   - Gem (consumable soft currency, Meta credits off)
   - Oven (consumable equipment, Meta credits off)

3. **Configure Item Properties**
   - Set item type to "consumable" for all items
   - Disable Meta credits (no real-money purchases)
   - Assign meaningful names and descriptions
   - Note unique SKU identifiers for code integration

4. **Create Item Thumbnails**
   - Search Asset Library for visual representations
   - Drag items into world for screenshot staging  
   - Position viewport camera with appropriate framing
   - Adjust camera speed for precise positioning
   - Capture and save screenshots locally
   - Upload images when creating in-world items

## Minimal Example

```typescript
// Example item SKUs after creation (actual SKUs will differ)
const ITEM_SKUS = {
    APPLE: "apple_sku_12345",
    PIE: "pie_sku_67890", 
    GEM: "gem_sku_54321",
    OVEN: "oven_sku_98765",
    FASTER_APPLES: "faster_apples_sku_11111",
    FASTER_PIES: "faster_pies_sku_22222"
} as const;

// Using created items in economy system
class EconomyManager extends hz.Component {
    onStart() {
        // Items are now available for World Inventory operations
        console.log("Economy items configured and ready for use");
    }
}
```

## Limits & Constraints

- **MHCP Membership**: Required for all in-world item creation
- **World Ownership**: Only owners and editors can create in-world items
- **World-Specific Items**: Items tied to individual worlds, not transferable
- **SKU Uniqueness**: Each item gets unique identifier automatically generated
- **Consumable vs Durable**: Choice affects inventory behavior permanently
- **Meta Credits Toggle**: Must be disabled for soft currency items
- **Thumbnail Requirements**: Visual representations needed for shop display

## Gotchas / Debugging

- **MHCP Prerequisites**: Verify membership and ToS acceptance before starting
- **Consumable Selection**: Ensure all economy items are set as consumable (not durable)
- **Meta Credits Configuration**: Double-check all items have Meta credits disabled
- **SKU Tracking**: Note unique SKUs for each item for code implementation
- **Thumbnail Quality**: Use clear, centered screenshots for better shop presentation
- **World Permissions**: Ensure proper editor access for collaborative development
- **Commerce Panel Access**: Items may take time to appear after creation

## See Also

- [In-World Purchase Guide](../mhcp-program-overview.md) - Complete item creation documentation
- [MHCP Program](../mhcp-program-overview.md) - Creator program requirements and benefits  
- [Commerce Panel Documentation](../desktop-editor-overview.md) - Editor interface for item management
- Module 1: Introduction - Economy concepts and World Inventory APIs
- Module 3: Configuring Gameplay Entities - Implementing apple trees and ovens
- Module 4: Adding The Shop - Shop gizmo integration with created items
- Module 5: Finishing Up - Testing and deployment considerations

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-2-setup (accessed 2025-09-26)
- https://developers.meta.com/horizon-worlds/learn/documentation/mhcp-program/monetization/meta-horizon-worlds-inworld-purchase-guide#creating-an-item (referenced)