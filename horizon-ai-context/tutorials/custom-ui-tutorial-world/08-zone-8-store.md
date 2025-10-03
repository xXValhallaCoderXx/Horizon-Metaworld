---
title: Zone 8 - Store | Custom UI Tutorial World
description: Comprehensive technical documentation of Zone 8 Store systems from the Custom UI Tutorial World, covering complete e-commerce storefront implementation with Store.ts UI control, StoreData.ts product catalog, StoreLayout.ts design configuration, StoreTypes.ts type definitions, and StoreDemo.ts purchase handling with modular architecture and network events
author: Horizon Worlds Context Curator
zone: 8
stations: 1
components: [Store, StoreData, StoreLayout, StoreTypes, StoreDemo]
source_url: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-8-store
---

# Zone 8 - Store | Custom UI Tutorial World

## What & Why

**Zone 8 - Store** demonstrates the most sophisticated Custom UI system in the tutorial world: a comprehensive storefront implementation capable of handling complex e-commerce interactions. This zone showcases a complete, production-ready store architecture built with modular TypeScript components:

1. **Store.ts** - Main UI control panel managing visual design and user interactions
2. **StoreData.ts** - Product catalog containing all item information and assets
3. **StoreLayout.ts** - Visual layout blueprint defining positioning and styling
4. **StoreTypes.ts** - Type definitions and data structure specifications
5. **StoreDemo.ts** - Demonstration controller orchestrating purchase logic and player state

This store system exemplifies advanced Custom UI architecture patterns including separation of concerns, type safety, modular design, and comprehensive player state management across multiplayer environments.

## Key APIs/Concepts

### Core Store Architecture Principles
- **Modular File Organization** - Separation of UI logic, data, layout, types, and controller functionality
- **Type-Safe Development** - Comprehensive TypeScript type definitions and enums for data integrity
- **UI Binding System** - Automatic UI updates when data changes using binding connections
- **Network Event Architecture** - Purchase events with comprehensive transaction data
- **Player State Management** - Individual wallet and inventory tracking per player
- **Dynamic Content Management** - Runtime modification of items, prices, and availability

### Primary Scripts & Components

#### Station #18: Storefront
**Complete e-commerce system with modular architecture and comprehensive functionality**

##### Store.ts - Main Control Panel
**Primary UI component managing store interface and user interactions**

**StoreFront Class Features:**
- **UI Blueprint**: Core user interface management for tabs, items visibility, and currency display
- **Binding System**: Automatic UI updates when values like player currency change
- **UI Functions**: Specialized rendering functions for tabs, item lists, and detailed item views

**Exported Functions:**
- `SetStoreReady()`: Initializes store for player display
- `SetStoreStatusIcons()`: Configures "Owned" and "Locked" status icons
- `SetStoreCurrency()`: Sets currency icon assets
- `SetStoreTabs()` / `SetStoreTabNames()`: Configures store tab names
- `SetStoreItems()`: Populates store tabs with item lists
- `SetPlayerCurrency()`: Updates individual player currency amounts
- `SetItemStatus()`: Changes item status (Buyable → Owned, etc.)
- `SetFirstVisibleActive()`: Auto-selects first visible tab on store open
- `SetItemPrice()`: Dynamic item price modification

##### StoreData.ts - Product Catalog
**Comprehensive item database and asset management**

**Item Organization:**
- **Item Lists**: Categorized collections (GreenList, BlueList, FreeList) corresponding to store sections like "Pickaxes" and "Backpacks"
- **Item Properties**: Each item contains ID, name, description, price, display image
- **Asset Management**: Centralized definition of all store images, icons, and status indicators

**Example Item Structure:**
```typescript
{
  id: "green_pickaxe_01",
  name: "Green Pickaxe",
  description: "A powerful mining tool with enhanced durability",
  price: [100, 0, 0], // Currency array format
  image: greenPickaxeAsset
}
```

##### StoreLayout.ts - Visual Design Blueprint
**Complete layout specification for store appearance**

**Layout Features:**
- **Constants System**: Pixel-perfect positioning with `panelWidth: 1920`, `panelHeight: 1080`
- **Visual Diagram**: Commented layout showing "Tabs", "Currency", and "Detail Area" sections
- **Modular Styling**: Appearance changes without affecting logic in other files
- **Responsive Design**: Layout adapts to different screen configurations

##### StoreTypes.ts - Type Definition System
**TypeScript type safety and data structure rules**

**Type Definitions:**
- **CurrencyType**: `number[]` - Multi-currency support as number arrays
- **ItemStatus Enum**: `Buyable | Upgrade | Owned | Locked | Hidden` - Strict status validation
- **Custom Data Types**: Comprehensive type system ensuring data integrity across all store components

##### StoreDemo.ts - Controller and Purchase Logic
**Orchestration system connecting player data to store display**

**Core Functionality:**
- **Store Initialization**: Sets up store UI with data from other components
- **Player Management**: Creates individual "wallet" and "inventory" for each player
- **Purchase Event Handling**: Listens for `playerPurchaseEvent` network events
- **Transaction Processing**: Complete purchase validation, inventory updates, and UI synchronization

**Exported Functions:**
- `SetSimulatedInventory()`: Updates player item ownership levels
- `GetSimulatedInventory()`: Queries player item ownership status

**Purchase Logic Flow:**
1. **canPurchase Check**: Validates player currency sufficiency
2. **Inventory Update**: Processes item type and ownership changes
3. **Wallet Update**: Deducts purchase cost from player currency
4. **UI Update**: Synchronizes display with new player state

### Network Events

#### playerPurchaseEvent
**Comprehensive purchase transaction event**

```typescript
{
  itemId: string,
  price: CurrencyType,
  player: Player,
  storeId: string,
  timestamp: number
}
```

**Event Flow:**
1. Player initiates purchase in Store.ts UI
2. `playerPurchaseEvent` fired with transaction details
3. StoreDemo.ts receives event and validates purchase
4. Purchase logic executes with inventory and currency updates
5. UI updates reflect new player state

## How-To

### Implementing Basic Store Setup

1. **Store Component Architecture:**
   ```typescript
   // Store.ts - Main UI control system
   export class StoreFront extends BaseCustomUI {
     static propsDefinition = {
       // Store configuration properties
     };

     private currentTab: number = 0;
     private playerCurrencies: Map<Player, CurrencyType> = new Map();

     onReady() {
       this.initializeStoreBindings();
       this.setupUIEventHandlers();
     }
   }
   ```

2. **Data Catalog Setup:**
   ```typescript
   // StoreData.ts - Product information
   export const GreenList: StoreItem[] = [
     {
       id: "green_pickaxe_01",
       name: "Green Pickaxe",
       description: "Enhanced mining efficiency",
       price: [100, 0, 0],
       image: greenPickaxeAsset,
       prerequisites: []
     },
     // Additional items...
   ];

   export const StoreImages = {
     ownedIcon: ownedIconAsset,
     lockedIcon: lockedIconAsset,
     currencyIcons: [goldIconAsset, silverIconAsset, bronzeIconAsset]
   };
   ```

3. **Type Safety Implementation:**
   ```typescript
   // StoreTypes.ts - Type definitions
   export type CurrencyType = number[];

   export enum ItemStatus {
     Buyable = "Buyable",
     Upgrade = "Upgrade", 
     Owned = "Owned",
     Locked = "Locked",
     Hidden = "Hidden"
   }

   export interface StoreItem {
     id: string;
     name: string;
     description: string;
     price: CurrencyType;
     image: Asset;
     prerequisites?: string[];
   }
   ```

### Implementing Purchase System

1. **Purchase Event Network Architecture:**
   ```typescript
   // Store.ts - Purchase initiation
   private handleItemPurchase(item: StoreItem, player: Player) {
     const purchaseData = {
       itemId: item.id,
       price: item.price,
       player: player,
       storeId: this.entity.id,
       timestamp: Date.now()
     };

     this.sendNetworkBroadcast("playerPurchaseEvent", purchaseData);
   }
   ```

2. **Purchase Logic Controller:**
   ```typescript
   // StoreDemo.ts - Purchase handling
   export class StoreDemo extends BaseComponent {
     private playerWallets: Map<Player, CurrencyType> = new Map();
     private playerInventories: Map<Player, Map<string, number>> = new Map();

     onReady() {
       this.connectNetworkBroadcast("playerPurchaseEvent", (data) => {
         this.handlePurchase(data);
       });
     }

     private handlePurchase(purchaseData: PurchaseEventData) {
       if (this.canAfford(purchaseData.player, purchaseData.price)) {
         this.processPurchase(purchaseData);
       }
     }
   }
   ```

3. **Player State Management:**
   ```typescript
   // StoreDemo.ts - State management
   private processPurchase(purchaseData: PurchaseEventData) {
     // Deduct currency
     const wallet = this.playerWallets.get(purchaseData.player);
     const newWallet = this.subtractCurrency(wallet, purchaseData.price);
     this.playerWallets.set(purchaseData.player, newWallet);

     // Update inventory
     const inventory = this.playerInventories.get(purchaseData.player);
     inventory.set(purchaseData.itemId, (inventory.get(purchaseData.itemId) || 0) + 1);

     // Update UI
     this.updateStoreDisplay(purchaseData.player, purchaseData.itemId);
   }
   ```

### Implementing Layout System

1. **Layout Constants:**
   ```typescript
   // StoreLayout.ts - Design specification
   export const StoreLayoutConstants = {
     // Panel dimensions
     panelWidth: 1920,
     panelHeight: 1080,

     // Tab configuration
     tabHeight: 80,
     tabSpacing: 10,

     // Currency display
     currencyPanelHeight: 60,
     currencyIconSize: 40,

     // Item grid
     itemGridColumns: 4,
     itemGridSpacing: 20,
     itemThumbnailSize: 120
   };
   ```

2. **Dynamic Layout Application:**
   ```typescript
   // Store.ts - Layout integration
   private applyLayout() {
     this.setBinding("panelWidth", StoreLayoutConstants.panelWidth);
     this.setBinding("panelHeight", StoreLayoutConstants.panelHeight);
     this.setBinding("tabHeight", StoreLayoutConstants.tabHeight);
     
     this.calculateItemGridLayout();
   }
   ```

## Minimal Example

### Basic Store Implementation
```typescript
// Store.ts - Minimal storefront
export class StoreFront extends BaseCustomUI {
  static propsDefinition = {};
  
  private tabs: string[] = ["Weapons", "Armor", "Items"];
  private currentTab: number = 0;

  onReady() {
    this.initializeStore();
  }

  SetStoreReady() {
    this.setBinding("isReady", true);
    this.setBinding("tabs", this.tabs);
    this.setBinding("currentTab", this.currentTab);
  }

  SetStoreItems(tabIndex: number, items: StoreItem[]) {
    this.setBinding(`tab${tabIndex}Items`, items);
  }

  SetPlayerCurrency(player: Player, currency: CurrencyType) {
    this.setPlayerBinding(player, "currency", currency);
  }

  private handlePurchaseClick(item: StoreItem, player: Player) {
    this.sendNetworkBroadcast("playerPurchaseEvent", {
      itemId: item.id,
      price: item.price,
      player: player,
      storeId: this.entity.id
    });
  }
}

// StoreDemo.ts - Minimal controller
export class StoreDemo extends BaseComponent {
  static propsDefinition = {
    storeGizmo: { type: "entity" }
  };

  private playerWallets: Map<Player, CurrencyType> = new Map();

  onReady() {
    this.initializeStore();
    this.setupPurchaseHandling();
  }

  private initializeStore() {
    // Initialize store with sample data
    const sampleItems = [
      { id: "sword", name: "Iron Sword", price: [50, 0, 0], image: swordAsset },
      { id: "shield", name: "Wooden Shield", price: [25, 0, 0], image: shieldAsset }
    ];

    this.props.storeGizmo.SetStoreReady();
    this.props.storeGizmo.SetStoreItems(0, sampleItems);
  }

  private setupPurchaseHandling() {
    this.connectNetworkBroadcast("playerPurchaseEvent", (data) => {
      if (this.canAfford(data.player, data.price)) {
        this.processPurchase(data);
      }
    });
  }

  private canAfford(player: Player, price: CurrencyType): boolean {
    const wallet = this.playerWallets.get(player) || [0, 0, 0];
    return wallet.every((amount, index) => amount >= price[index]);
  }

  private processPurchase(data: PurchaseEventData) {
    // Deduct currency and update UI
    const wallet = this.playerWallets.get(data.player);
    const newWallet = wallet.map((amount, index) => amount - data.price[index]);
    this.playerWallets.set(data.player, newWallet);

    this.props.storeGizmo.SetPlayerCurrency(data.player, newWallet);
    this.props.storeGizmo.SetItemStatus(data.itemId, "Owned");
  }
}
```

### Type-Safe Store Data
```typescript
// StoreTypes.ts - Essential types
export type CurrencyType = [number, number, number]; // [Gold, Silver, Bronze]

export enum ItemStatus {
  Buyable = "Buyable",
  Owned = "Owned",
  Locked = "Locked"
}

export interface StoreItem {
  id: string;
  name: string;
  price: CurrencyType;
  image: Asset;
}

// StoreData.ts - Sample catalog
export const WeaponItems: StoreItem[] = [
  {
    id: "iron_sword",
    name: "Iron Sword",
    price: [50, 0, 0],
    image: ironSwordAsset
  },
  {
    id: "steel_axe", 
    name: "Steel Axe",
    price: [75, 0, 0],
    image: steelAxeAsset
  }
];
```

## Limits & Constraints

### Performance Considerations
- **Item Count Scalability**: Large product catalogs may impact UI rendering performance
- **Player State Memory**: Extensive player inventories and wallets consume significant memory
- **Network Event Frequency**: High-frequency purchases can cause network congestion
- **UI Update Overhead**: Complex binding updates with large item lists may cause frame drops
- **Asset Loading**: Dynamic item image loading may cause brief display delays

### Technical Limitations
- **Currency System Constraints**: Fixed multi-currency array format limits currency type flexibility
- **Type System Boundaries**: TypeScript enums restrict runtime flexibility for item status
- **Layout Pixel Precision**: Fixed pixel layouts may not adapt well to all screen sizes
- **Purchase Validation**: Client-side validation vulnerable to manipulation without server verification
- **Data Persistence**: No built-in persistence system for player purchases across sessions

### Platform Constraints
- **Memory Management**: Large stores with many items require careful memory cleanup
- **Cross-Platform Rendering**: Layout constants may require adjustment for different platforms
- **Mobile Optimization**: Touch interaction requires larger UI elements than desktop
- **VR Considerations**: 3D space store interfaces may need different layout approaches
- **Network Reliability**: Purchase events may be lost in unstable network conditions

## Gotchas/Debugging

### Common Implementation Issues

1. **Currency Array Mismatch:**
   ```typescript
   // Incorrect - mismatched currency array lengths
   const playerWallet = [100, 50]; // Only 2 currencies
   const itemPrice = [10, 5, 2]; // 3 currencies - will cause errors

   // Correct - consistent currency array format
   const playerWallet: CurrencyType = [100, 50, 25];
   const itemPrice: CurrencyType = [10, 5, 2];
   ```

2. **Type Safety Validation:**
   ```typescript
   // Debug type-related issues
   private validateItemStatus(status: string): ItemStatus {
     if (!Object.values(ItemStatus).includes(status as ItemStatus)) {
       console.error("Invalid item status:", status);
       return ItemStatus.Buyable; // Safe default
     }
     return status as ItemStatus;
   }
   ```

3. **Purchase Event Debugging:**
   ```typescript
   // Monitor purchase events
   private handlePurchase(data: PurchaseEventData) {
     console.log("Purchase event received:", {
       player: data.player.displayName,
       item: data.itemId,
       price: data.price,
       timestamp: data.timestamp
     });

     if (!this.validatePurchaseData(data)) {
       console.error("Invalid purchase data:", data);
       return;
     }

     this.processPurchase(data);
   }
   ```

### Player State Management Issues

1. **Memory Leak Prevention:**
   ```typescript
   // Clean up player data on exit
   private handlePlayerExit(player: Player) {
     this.playerWallets.delete(player);
     this.playerInventories.delete(player);
     
     console.log("Player state cleaned up:", player.displayName);
     console.log("Remaining players:", this.playerWallets.size);
   }
   ```

2. **State Synchronization Debugging:**
   ```typescript
   // Verify UI matches player state
   private debugPlayerState(player: Player) {
     const wallet = this.playerWallets.get(player);
     const inventory = this.playerInventories.get(player);
     
     console.log(`Player ${player.displayName} state:`, {
       wallet: wallet,
       inventorySize: inventory?.size || 0,
       uiCurrency: this.getPlayerBinding(player, "currency")
     });
   }
   ```

### Performance Monitoring

1. **Item Loading Performance:**
   ```typescript
   // Monitor store initialization performance  
   SetStoreItems(tabIndex: number, items: StoreItem[]) {
     const startTime = performance.now();
     
     this.setBinding(`tab${tabIndex}Items`, items);
     
     const endTime = performance.now();
     if (endTime - startTime > 16) { // More than 1 frame
       console.warn(`Slow store update: ${endTime - startTime}ms for ${items.length} items`);
     }
   }
   ```

2. **Network Event Frequency:**
   ```typescript
   // Track purchase event frequency
   private purchaseEventCount = 0;
   private lastPurchaseTime = 0;

   private handlePurchase(data: PurchaseEventData) {
     const now = performance.now();
     if (now - this.lastPurchaseTime < 1000) { // Within 1 second
       this.purchaseEventCount++;
       if (this.purchaseEventCount > 10) {
         console.warn("High frequency purchases detected - potential spam");
       }
     } else {
       this.purchaseEventCount = 0;
     }
     this.lastPurchaseTime = now;
   }
   ```

## See Also

- **Zone 0 - Setup**: Custom UI system fundamentals and gizmo configuration
- **Zone 4 - Advanced Lists**: Complex list implementations and inventory system patterns
- **Zone 7 - HUD**: Player state management and Screen Overlay techniques
- **TypeScript Development**: Best practices for type-safe Custom UI development
- **E-commerce Design Patterns**: Store architecture and transaction processing best practices
- **Network Event Architecture**: Multiplayer event handling and state synchronization
- **Performance Optimization**: Large-scale Custom UI system optimization techniques

## Sources

- **Primary**: [Zone 8 - Store | Custom UI Tutorial World](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-8-store)
- **Tutorial Structure**: Custom UI Tutorial World multi-zone learning experience  
- **Code Examples**: Complete storefront implementation with Store.ts, StoreData.ts, StoreLayout.ts, StoreTypes.ts, and StoreDemo.ts
- **Architecture Patterns**: Advanced modular Custom UI system design with separation of concerns and type safety