---
title: "Zone 4 - Advanced Lists: Sophisticated Dynamic List Systems in Horizon Worlds Custom UI"
description: "Comprehensive guide to advanced list implementations in the Custom UI Tutorial World, covering three sophisticated stations: Inventory systems with JSON data, paginated Stats Lists, and dynamic Player Lists for team management."
tags: [custom-ui, advanced-lists, inventory-systems, stats-lists, player-lists, json-data, pagination, dynamic-lists]
---

# Zone 4 - Advanced Lists: Sophisticated Dynamic List Systems

## What & Why

Zone 4 covers **sophisticated list implementations that can handle dynamic data and complex interactions**. This zone represents a significant step up from basic lists, implementing advanced features like JSON data processing, pagination, real-time updates, and multi-component architectures.

The three stations demonstrate increasingly complex list systems:
- **Inventory System** (Station #9): Dynamic JSON-driven inventory with variable item sizes and spatial display
- **Stats List** (Station #10): Paginated player statistics with navigation and dynamic updates
- **Player List** (Station #11): Real-time team management with dual lists and trigger-based interactions

These systems showcase the **separation of concerns pattern** where abstract base classes (`InventoryCore`, `PlayerListCore`) provide reusable logic while concrete implementations handle specific UI requirements.

## Key APIs/Concepts

### Station #9: Inventory System

**Core Architecture:**
- `InventoryCore.ts` - Abstract base class providing core logic and rendering pipeline
- `Inventory.ts` - Concrete UI component extending `InventoryCore` with specific dimensions
- `InventoryDemo.ts` - Game logic component linking triggers to inventory UI

**Key Properties:**
- `theme: number` - Color theme selection (blue=0, green=1, yellow=2)
- `trigger1–trigger2: Entity` - In-world trigger references
- `triggerVisual1–triggerVisual2: Entity` - Visual feedback entities
- `cuiGizmo: Entity` - Links game logic to UI component

**Core Methods:**
- `rebuildUI(player?)` - Processes and organizes loaded data into rows
- `InventoryAdd(id, parsedData, player?)` - Adds new items from pre-parsed RootData
- `InventoryDelete(id, player?)` - Removes list items by ID

### Station #10: Stats List (Paginated)

**Core Components:**
- `ListView.ts` - UI component handling rendering, pagination, and navigation
- `StatsListDemo.ts` - Game logic controller linking triggers to ListView methods

**Key Properties:**
- `jSONdata: string` - JSON data string for list content (editor/CodeBlock definable)
- `theme: number` - Predefined color theme selection
- `trigger1–trigger4: Entity` - Four in-world trigger entities
- `cuiGizmo: Entity` - Links to ListView UI component entity

**Pagination Methods:**
- `ListViewLoadJSON(data?, player?)` - Parses and loads new JSON data
- `updateDynamicList(player?)` - Private method refreshing UI display
- `goToPreviousPage(player?)` / `goToNextPage(player?)` - Navigation logic
- `ListViewUpdateValue(itemNum, newValue, player?)` - Dynamic item value updates

### Station #11: Player List (Dual Teams)

**Multi-Component Architecture:**
- `cuiItemList.ts` - Utility library for data structures and rendering functions
- `PlayerListCore.ts` - Abstract base class for player list management
- `PlayerList.ts` - Concrete UI component extending `PlayerListCore`
- `PlayerListDemo.ts` - Game logic controlling dual PlayerList components

**Dual List Properties:**
- `theme: number` - Color theme selection
- `trigger1/trigger2: Entity` - In-world trigger entities
- `triggerVisual1/triggerVisual2: Entity` - Team selection feedback visuals
- `list1/list2: Entity` - Entities containing PlayerList UI components
- `title1/title2: string` - Titles for the two player lists

**Player Management Methods:**
- `rebuildUI()` - Processes internal data and updates reactive binding
- `PlayerListAdd(id, name, itemHeight)` - Adds new player to data array
- `PlayerListDelete(id)` - Removes player from data array

## How-To

### Implementing Inventory Systems

1. **Create Abstract Base Class** (`InventoryCore.ts`):
   ```typescript
   // Extends UIComponent with common inventory logic
   // Defines rendering pipeline for item rows
   // Provides itemsPerRow-based organization
   ```

2. **Create Concrete Implementation** (`Inventory.ts`):
   ```typescript
   // Extends InventoryCore
   // Sets specific dimensions (width, height, item size)
   // Configures theme selection
   ```

3. **Setup Game Logic Controller** (`InventoryDemo.ts`):
   ```typescript
   // Links triggers to inventory operations
   // Handles JSON data parsing and formatting
   // Manages visual feedback through triggerVisual entities
   ```

### Building Paginated Lists

1. **Setup ListView Component** (`ListView.ts`):
   ```typescript
   // Handle paginated data display
   // Implement navigation between pages
   // Support multiple list item types
   // Process JSON data structure
   ```

2. **Create Controller Logic** (`StatsListDemo.ts`):
   ```typescript
   // Link in-world triggers to ListView methods
   // Provide default JSON data with editor override
   // Handle dynamic value updates
   ```

3. **Configure Data Sources**:
   ```typescript
   // JSON string format for list content
   // CodeBlock integration for dynamic data
   // Editor-based content definition
   ```

### Implementing Player Lists

1. **Create Utility Library** (`cuiItemList.ts`):
   ```typescript
   // Define data structures for list items
   // Implement rendering functions for different item types
   // Provide reusable list item functionality
   ```

2. **Build Base Class** (`PlayerListCore.ts`):
   ```typescript
   // Abstract base class for player management
   // Handle adding/deleting players
   // Manage UI data source updates
   ```

3. **Setup Dual List System**:
   ```typescript
   // Two separate PlayerList UI components
   // Trigger-based team assignment
   // Visual feedback for team selection
   // Dynamic player addition/removal
   ```

## Minimal Example

### Basic Inventory Setup
```typescript
// InventoryCore.ts - Abstract Base
export abstract class InventoryCore extends ui.UIComponent {
  rebuildUI(player?: hz.Player) {
    // Group items into rows based on itemsPerRow
    // Process and organize loaded data
  }
  
  InventoryAdd(id: string, parsedData: RootData, player?: hz.Player) {
    // Add new item list from parsed data
  }
  
  InventoryDelete(id: string, player?: hz.Player) {
    // Remove list by ID
  }
}

// Inventory.ts - Concrete Implementation
export class Inventory extends InventoryCore {
  theme: number = 0; // Theme selection
  
  constructor() {
    super();
    // Set specific dimensions and layout
  }
}

// InventoryDemo.ts - Game Logic
export class InventoryDemo extends hz.Component {
  trigger1: hz.Entity;
  cuiGizmo: hz.Entity;
  
  onPlayerEnterTrigger(player: hz.Player) {
    // Load inventory data and trigger display
    const inventoryUI = this.cuiGizmo.as(Inventory);
    inventoryUI.InventoryAdd("items", parsedData, player);
    inventoryUI.rebuildUI(player);
  }
}
```

### Basic Stats List Setup
```typescript
// ListView.ts - Paginated UI Component
export class ListView extends ui.UIComponent {
  jSONdata: string = "";
  theme: number = 0;
  
  ListViewLoadJSON(data?: string, player?: hz.Player) {
    // Parse and load new JSON data
    // Update pagination
  }
  
  goToPreviousPage(player?: hz.Player) {
    // Handle backward navigation
  }
  
  goToNextPage(player?: hz.Player) {
    // Handle forward navigation  
  }
}

// StatsListDemo.ts - Controller
export class StatsListDemo extends hz.Component {
  trigger1: hz.Entity;
  cuiGizmo: hz.Entity;
  jSONdata: string = defaultStatsData;
  
  onTriggerActivation() {
    const listView = this.cuiGizmo.as(ListView);
    listView.ListViewLoadJSON(this.jSONdata);
  }
}
```

### Basic Player List Setup  
```typescript
// PlayerListCore.ts - Abstract Base
export abstract class PlayerListCore extends ui.UIComponent {
  rebuildUI() {
    // Process internal data and update reactive binding
  }
  
  PlayerListAdd(id: string, name: string, itemHeight: number) {
    // Add new player to internal data array
  }
  
  PlayerListDelete(id: string) {
    // Remove player from internal data array
  }
}

// PlayerListDemo.ts - Dual List Controller
export class PlayerListDemo extends hz.Component {
  trigger1: hz.Entity;
  trigger2: hz.Entity;
  list1: hz.Entity;
  list2: hz.Entity;
  
  onPlayerEnterTrigger1(player: hz.Player) {
    const playerList = this.list1.as(PlayerList);
    playerList.PlayerListAdd(player.id, player.name, standardHeight);
    playerList.rebuildUI();
  }
}
```

## Limits & Constraints

### Inventory System Limitations
- JSON data must be pre-parsed into RootData objects
- Item organization limited to row-based layout (itemsPerRow property)
- Visual feedback limited to 2 trigger/visual entity pairs
- Theme selection restricted to 3 predefined options (blue/green/yellow)
- No built-in item sorting or filtering capabilities

### Stats List Limitations
- Pagination requires manual navigation (no auto-scroll)
- JSON data format must match expected structure
- Limited to 4 trigger entities for interactions
- Dynamic updates require specific item numbering
- No built-in search or filtering functionality

### Player List Limitations
- Dual list system hardcoded to exactly 2 teams
- Player identification relies on string IDs only
- No automatic conflict resolution for duplicate players
- Visual feedback limited to simple color changes
- No built-in player sorting or grouping options

### General Advanced List Constraints
- All systems require entity reference setup for cuiGizmo linkage
- Theme changes require component restart/refresh
- JSON processing happens synchronously (can impact performance)
- Trigger-based interactions only (no direct UI interaction)
- Limited customization of visual appearance beyond themes

## Gotchas/Debugging

### Inventory System Issues
- **Items Not Displaying**: Verify JSON data is properly parsed into RootData before calling `InventoryAdd()`
- **Row Layout Problems**: Check itemsPerRow property in source data matches expected layout
- **Trigger Visual Feedback**: Ensure triggerVisual entities are correctly linked and have color-changeable materials
- **Theme Not Applied**: Confirm theme value is 0, 1, or 2 and component has been rebuilt after theme change

### Stats List Issues
- **Pagination Not Working**: Verify JSON data structure includes proper pagination metadata
- **Dynamic Updates Failing**: Check itemNum parameter matches actual list position (0-indexed vs 1-indexed issues)
- **JSON Loading Errors**: Validate JSON structure matches ListView expectations before loading
- **Navigation Buttons Unresponsive**: Confirm page boundaries are properly calculated

### Player List Issues
- **Dual Lists Not Syncing**: Ensure separate cuiGizmo entities are assigned to list1 and list2 properties
- **Player Duplicates**: Implement ID checking before calling PlayerListAdd() to prevent duplicates
- **Team Visual Feedback**: Verify triggerVisual entities have proper material setup for color changes
- **Player Removal Issues**: Use exact player ID string for PlayerListDelete() - case sensitivity matters

### Common Debugging Steps
1. **Verify Entity References**: Check all cuiGizmo, trigger, and triggerVisual entities are properly assigned
2. **Validate Data Format**: Ensure JSON data matches expected structure for each list type
3. **Check Component Attachment**: Confirm UI components are attached to correct entities
4. **Monitor Network State**: Advanced lists synchronize data across players - check network connectivity
5. **Test Incremental Operations**: Add/remove one item at a time to isolate issues

### Performance Considerations
- Large JSON datasets can cause frame drops during parsing
- Frequent `rebuildUI()` calls impact performance - batch updates when possible
- Multiple concurrent list operations may cause synchronization issues
- Consider implementing data caching for frequently accessed inventory items

## See Also

- [Zone 3 - Bars](./03-zone-3-bars.md) - Progress indicators and loading bars
- [Zone 5 - Animation](../../../tutorials/custom-ui-tutorial-world/05-zone-5-animation.md) - UI animation systems and effects  
- [Custom UI Dynamic Lists](../../../custom-ui-dynamic-list.md) - Core dynamic list functionality
- [JSON Data Import](../../../typescript-development-overview.md#json-data-import) - Working with JSON data in TypeScript
- [Performance Optimization](../../../custom-ui-optimization.md) - Optimizing list performance

## Sources

- [Custom UI Tutorial World - Zone 4 Advanced Lists](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-4-advanced-lists) - Official Meta documentation
- Meta Horizon Worlds Desktop Editor - Custom UI Tutorial World Zone 4 implementation
- Custom UI API Reference - Advanced list components and JSON data handling