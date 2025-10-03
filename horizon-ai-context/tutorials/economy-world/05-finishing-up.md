---
title: "Economy World Tutorial - Module 5: Finishing Up"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-5-finishing-up"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "economy", "debug_tools", "testing", "tutorial_completion"]
summary: "Configure DebugEconomyUI tools for testing, complete economic loop verification, and tutorial extensions for continued learning."
tutorial: "economy-world"
---

# Economy World Tutorial - Module 5: Finishing Up

## What & Why

Module 5 completes the Economy World tutorial by setting up debug tools for testing, verifying the complete economic loop, and providing extension ideas for continued learning. The DebugEconomyUI system enables developers to grant themselves items during testing to validate shop functionality and gameplay mechanics before publication. This ensures proper economic balance and player experience validation.

## Key APIs / Concepts

- **DebugEconomyUI Script**: Testing tool for granting items during development
- **SKU Configuration**: Linking debug tools to specific in-world items
- **Active Property**: Enable/disable debug tools per item type
- **Keyboard Hotkeys**: 'H' key opens debug panel during preview
- **Testing Workflow**: Systematic verification of complete economic loop
- **Publication Safety**: Disable debug tools before making world discoverable
- **Tutorial Extensions**: Ideas for expanding economic complexity
- **Economic Loop Verification**: End-to-end testing methodology

## How-To (Recipe)

1. **Configure Debug Tools for Testing**
   - Navigate to Systems > Commerce and copy item SKUs
   - In Hierarchy panel, expand DebugEconomy empty object
   - Select DebugApples, set Active to true, paste Apple SKU into itemSKU
   - Configure DebugOvens and DebugGems similarly as needed
   - Set unused debug tools Active to false to reduce clutter

2. **Test Complete Economic Loop**
   - Enable DebugApples tool, disable others for focused testing
   - Preview world in desktop editor
   - Verify starting with 1 oven ownership
   - Collect 5 apples manually through gameplay
   - Use oven to bake apple pie (test 15-second timer)
   - Press 'H' to open debug panel, grant +5 apples
   - Repeat baking process to accumulate 10 pies
   - Test shop: trade 10 pies for 1 gem
   - Verify HUD updates and inventory persistence

3. **Validate Economic Balance**
   - Test utility power-up purchases (Faster Pies, Faster Apples)
   - Verify error handling for insufficient resources
   - Check respawn timers and visual feedback systems
   - Test multiple player sessions for persistence verification

4. **Prepare for Publication**
   - Disable all DebugEconomyUI tools (set Active to false)
   - Conduct final testing without debug tools
   - Verify balanced progression and meaningful choices
   - Test multiplayer functionality if applicable

## Minimal Example

```typescript
// DebugEconomyUI configuration (set via Properties panel)
const DEBUG_CONFIG = {
    // For testing apple collection and baking
    DEBUG_APPLES: {
        active: true,
        itemSKU: "apple_sku_12345", // Copy from Commerce panel
        grantAmount: 5,
        hotkey: "H"
    },
    
    // For testing oven purchases  
    DEBUG_GEMS: {
        active: false, // Disable when testing other systems
        itemSKU: "gem_sku_67890",
        grantAmount: 10
    },
    
    // For testing multiple oven ownership
    DEBUG_OVENS: {
        active: false,
        itemSKU: "oven_sku_54321", 
        grantAmount: 1
    }
};

// Testing workflow validation
const ECONOMIC_LOOP_TEST = {
    steps: [
        "Collect 5 apples (manual or debug)",
        "Bake pie using owned oven (15s timer)",
        "Accumulate 10 pies total", 
        "Sell 10 pies for 1 gem in shop",
        "Purchase utility upgrades with gems",
        "Verify HUD updates and persistence"
    ]
};
```

## Limits & Constraints

- **Debug Tool Security**: Must disable before publication to prevent exploitation
- **SKU Dependency**: Debug tools require exact SKU matches from Commerce panel
- **Single Hotkey**: 'H' key opens currently active debug panel
- **Testing Scope**: Debug tools only function in Preview mode, not published worlds
- **Item Grant Limits**: Configure reasonable amounts to avoid breaking economic balance
- **Publication Safety**: Discoverable worlds should never have active debug tools
- **Performance Impact**: Multiple debug tools may affect editor performance

## Gotchas / Debugging

- **Debug Tool Visibility**: Only one debug tool should be active at a time for clarity
- **SKU Copy-Paste**: Always copy exact SKUs from Commerce panel, never type manually
- **Testing Sequence**: Follow systematic testing workflow to catch edge cases
- **Timer Verification**: Confirm 15-second baking timer feels balanced and engaging
- **Inventory Persistence**: Test multiple play sessions to verify World Inventory behavior
- **Publication Checklist**: Always disable debug tools before making world public
- **Error Handling**: Test all failure cases (insufficient items, invalid transactions)
- **Balance Testing**: Ensure progression feels rewarding without being trivial

## Tutorial Extensions

**Crop Expansion Ideas:**
- Add pumpkin crop with different pie types and recipes
- Implement wheat → flour → bread production chain
- Create seasonal crops with time-based availability

**Upgrade System Enhancements:**
- Permanent oven upgrades that persist across sessions
- Auto-harvest features for specific apple spawners
- Multi-tier upgrade paths with increasing costs

**Economic Complexity:**
- Multiple currency types for different upgrade branches
- Player-to-player trading systems using World Inventory
- Limited-time offers and dynamic pricing in shop

## See Also

- [Desktop Editor Overview](../desktop-editor-overview.md) - Preview mode testing and debugging
- [World Inventory API Reference](../typescript-development-overview.md) - Persistence and session management
- [MHCP Program](../mhcp-program-overview.md) - Publication guidelines and monetization policies
- Module 1: Introduction - Economic design principles and tycoon mechanics
- Module 2: Setup - In-world item creation and prerequisites  
- Module 3: Configuring Gameplay Entities - Core gameplay implementation
- Module 4: Adding The Shop - World Shop gizmo and transactions

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/economy-world-tutorial/module-5-finishing-up (accessed 2025-09-26)