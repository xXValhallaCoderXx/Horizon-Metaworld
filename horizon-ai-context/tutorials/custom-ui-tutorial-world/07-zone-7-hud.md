---
title: Zone 7 - HUD | Custom UI Tutorial World
description: Comprehensive technical documentation of Zone 7 HUD systems from the Custom UI Tutorial World, covering Head-up Display implementation with InventoryHUD overlay, HUD component for health/score/icons, and HUDDemo controller with Screen Overlay configuration and player state management
author: Horizon Worlds Context Curator
zone: 7
stations: 1
components: [InventoryHUD, HUD, HUDDemo]
source_url: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-7-hud
---

# Zone 7 - HUD | Custom UI Tutorial World

## What & Why

**Zone 7 - HUD** demonstrates sophisticated Head-up Display implementations that provide persistent UI elements for players throughout their game experience. This zone showcases a comprehensive HUD system built around the **Screen Overlay** Custom UI gizmo configuration, covering:

1. **InventoryHUD.ts** - Overlay inventory system extending InventoryCore base class with close button functionality
2. **HUD.ts** - Core HUD component managing health bars, scores, and icons with automatic UI binding updates
3. **HUDDemo.ts** - Main game logic controller managing player state synchronization and trigger-based interactions

HUD systems are essential for game interfaces requiring persistent information display across all device platforms (VR, mobile, web), providing critical player feedback without interrupting gameplay flow.

## Key APIs/Concepts

### Core HUD Principles
- **Screen Overlay Configuration** - Custom UI gizmo configured as Screen Overlay type for persistent display
- **Component-Based Architecture** - Modular system with separated UI components and game logic controllers
- **Player State Management** - Per-player tracking of health, score, inventory visibility, and icon states
- **Automatic UI Binding** - Dynamic display updates when data changes without manual refresh
- **Built-in Network Events** - Standard Horizon Worlds event system for player lifecycle and trigger management
- **Cross-Platform Compatibility** - HUD design optimized for VR, mobile, and web platform consistency

### Primary Scripts & Components

#### Station #17: HUD
**Comprehensive Head-up Display system with modular inventory and persistent player information**

##### InventoryHUD Component (`InventoryHUD.ts`)
**UI component extending InventoryCore base class for overlay inventory management**

**Properties:**
- `theme`: Number selecting predefined color theme (blue, green, or yellow) for UI panel

**Architecture:**
- Extends InventoryCore base class for inherited inventory functionality
- Specifically designed as overlay with integrated close button functionality
- Handles presentation and layout of inventory panel as screen overlay
- Provides modular inventory system integration within HUD context

##### HUD Component (`HUD.ts`)
**Dedicated UI component managing core player information display**

**Properties:**
- `showPercentage`: Boolean determining whether health bar displays percentage text

**Methods:**
- `updateHealthBar(newPercentHealth, player)`: Public method changing health value and triggering health bar animation
- `updateScore(newScore, player)`: Public method updating player's score text display
- `updateIcon(newIcon, player)`: Public method changing displayed icon

**Features:**
- UI bindings for automatic display updates when data changes
- Health bar with optional percentage display and animation support
- Score display with dynamic text updates
- Icon management with asset-based icon switching
- Player-specific state management for multiplayer environments

##### HUDDemo Controller Component (`HUDDemo.ts`)
**Main game logic controller managing HUD system state and trigger interactions**

**Properties:**
- `trigger1–trigger4`: Entity properties linked to triggers changing health bar value
- `cuiGizmo`: Entity linking to entity holding HUD UI component
- `cuiInventoryGizmo`: Entity linking to entity holding InventoryHUD UI component
- `scoreTrigger1–scoreTrigger2`: Entity properties linked to triggers increasing or decreasing player score
- `iconTrigger1–iconTrigger3`: Entity properties linked to triggers changing HUD icon
- `icon1–icon3`: Asset properties holding image assets for icons

**Network Events:**
- `hz.CodeBlock events.OnPlayerEnterWorld`: Fired when player joins world, initializes player's score, inventory, and HUD visibility
- `hz.CodeBlock events.OnPlayerExitWorld`: Fired when player leaves world, handles cleanup
- `hz.CodeBlock events.OnPlayerEnterTrigger`: Fired when player enters trigger zone, primary event driving HUD updates

## How-To

### Implementing Basic HUD System

1. **Screen Overlay Configuration:**
   ```typescript
   // Configure Custom UI gizmo as Screen Overlay type
   // This ensures persistent display across all platforms
   // HUD.ts - Core HUD component setup
   class HUD extends BaseCustomUI {
     static propsDefinition = {
       showPercentage: { type: "boolean", default: true }
     };

     onReady() {
       this.initializeHUDBindings();
     }
   }
   ```

2. **Player State Management:**
   ```typescript
   // HUDDemo.ts - Controller with per-player state tracking
   class HUDDemo extends BaseComponent {
     static propsDefinition = {
       cuiGizmo: { type: "entity" },
       cuiInventoryGizmo: { type: "entity" },
       trigger1: { type: "entity" },
       trigger2: { type: "entity" },
       trigger3: { type: "entity" },
       trigger4: { type: "entity" }
     };

     private playerStates: Map<Player, PlayerHUDState> = new Map();

     onReady() {
       this.setupPlayerEventHandlers();
     }
   }
   ```

3. **Built-in Network Event Integration:**
   ```typescript
   // HUDDemo.ts - Standard network event handling
   setupPlayerEventHandlers() {
     this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterWorld", (player: Player) => {
       this.initializePlayerHUD(player);
     });

     this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerExitWorld", (player: Player) => {
       this.cleanupPlayerHUD(player);
     });

     this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterTrigger", (player: Player, trigger: Entity) => {
       this.handleTriggerInteraction(player, trigger);
     });
   }
   ```

### Implementing Health Bar System

1. **Health Bar Component Setup:**
   ```typescript
   // HUD.ts - Health bar with animation support
   updateHealthBar(newPercentHealth: number, player: Player) {
     const clampedHealth = Math.max(0, Math.min(100, newPercentHealth));
     
     // Update health bar binding with animation
     this.setPlayerBinding(player, "healthPercent", clampedHealth);
     this.setPlayerBinding(player, "healthText", this.props.showPercentage ? `${clampedHealth}%` : "");
     
     // Trigger health bar animation
     this.animateHealthBar(player, clampedHealth);
   }

   private animateHealthBar(player: Player, targetHealth: number) {
     // Smooth health bar animation implementation
     this.animateBinding(player, "healthBarWidth", targetHealth + "%", 0.5);
   }
   ```

2. **Score Management System:**
   ```typescript
   // HUD.ts - Dynamic score updates
   updateScore(newScore: number, player: Player) {
     this.setPlayerBinding(player, "scoreText", newScore.toString());
     
     // Optional score change animation
     this.animateScoreChange(player, newScore);
   }

   private animateScoreChange(player: Player, newScore: number) {
     // Brief highlight animation for score changes
     this.setPlayerBinding(player, "scoreHighlight", true);
     setTimeout(() => {
       this.setPlayerBinding(player, "scoreHighlight", false);
     }, 500);
   }
   ```

### Implementing Modular Inventory Integration

1. **InventoryHUD Extension Pattern:**
   ```typescript
   // InventoryHUD.ts - Extending InventoryCore for overlay functionality
   class InventoryHUD extends InventoryCore {
     static propsDefinition = {
       ...InventoryCore.propsDefinition,
       theme: { type: "number", default: 0 } // 0=blue, 1=green, 2=yellow
     };

     onReady() {
       super.onReady();
       this.setupOverlayFeatures();
     }

     private setupOverlayFeatures() {
       // Add close button functionality specific to overlay
       this.connectUIEvent("closeButton", "click", () => {
         this.hideInventory();
       });
     }
   }
   ```

2. **Controller Integration:**
   ```typescript
   // HUDDemo.ts - Coordinating HUD and Inventory components
   private handleTriggerInteraction(player: Player, trigger: Entity) {
     if (trigger === this.props.trigger1) {
       // Health modification trigger
       this.props.cuiGizmo.updateHealthBar(75, player);
     } else if (trigger === this.props.scoreTrigger1) {
       // Score modification trigger
       const currentScore = this.getPlayerScore(player);
       this.props.cuiGizmo.updateScore(currentScore + 10, player);
     } else if (trigger === this.props.iconTrigger1) {
       // Icon change trigger
       this.props.cuiGizmo.updateIcon(this.props.icon1, player);
     }
   }
   ```

## Minimal Example

### Basic HUD Implementation
```typescript
// HUD.ts - Minimal HUD component
export class HUD extends BaseCustomUI {
  static propsDefinition = {
    showPercentage: { type: "boolean", default: true }
  };

  onReady() {
    this.initializeBindings();
  }

  updateHealthBar(newPercentHealth: number, player: Player) {
    const health = Math.max(0, Math.min(100, newPercentHealth));
    this.setPlayerBinding(player, "healthPercent", health);
    
    if (this.props.showPercentage) {
      this.setPlayerBinding(player, "healthText", `${health}%`);
    }
  }

  updateScore(newScore: number, player: Player) {
    this.setPlayerBinding(player, "scoreText", newScore.toString());
  }

  updateIcon(newIcon: Asset, player: Player) {
    this.setPlayerBinding(player, "iconAsset", newIcon);
  }

  private initializeBindings() {
    // Set up initial binding structure
    this.setBinding("healthPercent", 100);
    this.setBinding("scoreText", "0");
    this.setBinding("iconAsset", null);
  }
}

// HUDDemo.ts - Minimal controller
export class HUDDemo extends BaseComponent {
  static propsDefinition = {
    cuiGizmo: { type: "entity" },
    trigger1: { type: "entity" },
    scoreTrigger1: { type: "entity" },
    iconTrigger1: { type: "entity" },
    icon1: { type: "asset" }
  };

  private playerScores: Map<Player, number> = new Map();

  onReady() {
    this.setupEvents();
  }

  private setupEvents() {
    this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterWorld", (player: Player) => {
      this.initializePlayer(player);
    });

    this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterTrigger", (player: Player, trigger: Entity) => {
      this.handleTrigger(player, trigger);
    });
  }

  private initializePlayer(player: Player) {
    this.playerScores.set(player, 0);
    this.props.cuiGizmo.updateHealthBar(100, player);
    this.props.cuiGizmo.updateScore(0, player);
  }

  private handleTrigger(player: Player, trigger: Entity) {
    if (trigger === this.props.trigger1) {
      // Damage trigger
      this.props.cuiGizmo.updateHealthBar(50, player);
    } else if (trigger === this.props.scoreTrigger1) {
      // Score trigger
      const currentScore = this.playerScores.get(player) || 0;
      const newScore = currentScore + 10;
      this.playerScores.set(player, newScore);
      this.props.cuiGizmo.updateScore(newScore, player);
    } else if (trigger === this.props.iconTrigger1) {
      // Icon change trigger
      this.props.cuiGizmo.updateIcon(this.props.icon1, player);
    }
  }
}
```

### Inventory HUD Integration
```typescript
// InventoryHUD.ts - Minimal overlay inventory
export class InventoryHUD extends InventoryCore {
  static propsDefinition = {
    ...InventoryCore.propsDefinition,
    theme: { type: "number", default: 0 }
  };

  onReady() {
    super.onReady();
    this.setupOverlay();
  }

  private setupOverlay() {
    // Configure as overlay with close functionality
    this.setBinding("isOverlay", true);
    this.setBinding("theme", this.getThemeName());
    
    // Close button handler
    this.connectUIEvent("closeButton", "click", () => {
      this.setVisible(false);
    });
  }

  private getThemeName(): string {
    const themes = ["blue", "green", "yellow"];
    return themes[this.props.theme] || "blue";
  }
}
```

## Limits & Constraints

### Performance Considerations
- **Update Frequency**: Frequent HUD updates can impact performance, especially with multiple players
- **Animation Overhead**: Complex health bar animations may cause frame rate drops on lower-end devices
- **Player State Memory**: Large numbers of concurrent players require efficient state management
- **Network Event Load**: High-frequency trigger events can cause network congestion

### Technical Limitations
- **Screen Overlay Rendering**: Screen Overlay type has rendering priority limitations across platforms
- **Theme Restrictions**: Limited to predefined theme options (blue, green, yellow for InventoryHUD)
- **Asset Loading**: Icon changes require asset loading which may cause brief display delays
- **Platform Differences**: HUD positioning and scaling may vary between VR, mobile, and web
- **Z-Order Management**: Screen Overlay elements have fixed z-order that cannot be dynamically changed

### Platform Constraints
- **VR Considerations**: HUD elements must account for VR comfort guidelines and field of view limitations
- **Mobile Optimization**: HUD elements must scale appropriately for small screen sizes and touch interaction
- **Web Performance**: Browser-based rendering may have different performance characteristics
- **Cross-Platform Consistency**: Ensuring consistent HUD appearance and behavior across all platforms

## Gotchas/Debugging

### Common Implementation Issues

1. **Screen Overlay Configuration Problems:**
   ```typescript
   // Common mistake - not configuring Custom UI gizmo as Screen Overlay
   // This results in HUD not displaying persistently
   
   // Correct approach - verify gizmo configuration
   onReady() {
     if (this.gizmo.overlayType !== "Screen Overlay") {
       console.error("HUD: Custom UI gizmo must be configured as Screen Overlay type");
       return;
     }
     this.initializeHUD();
   }
   ```

2. **Player State Management Issues:**
   ```typescript
   // Debug player state tracking problems
   private handleTrigger(player: Player, trigger: Entity) {
     if (!this.playerScores.has(player)) {
       console.error("HUD: Player not initialized in state tracking", player);
       this.initializePlayer(player);
     }
     
     console.log("Trigger interaction:", player, trigger.name);
   }
   ```

3. **Entity Reference Validation:**
   ```typescript
   // Verify entity references exist
   onReady() {
     if (!this.props.cuiGizmo) {
       console.error("HUDDemo: cuiGizmo entity reference missing!");
       return;
     }
     
     if (!this.props.cuiInventoryGizmo) {
       console.warn("HUDDemo: cuiInventoryGizmo entity reference missing");
     }
     
     this.validateTriggerReferences();
   }
   ```

### Network Event Debugging

1. **Event Handler Verification:**
   ```typescript
   // Debug network event handling
   setupPlayerEventHandlers() {
     this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterWorld", (player: Player) => {
       console.log("Player entered world:", player.displayName);
       this.initializePlayerHUD(player);
     });

     this.connectCodeBlockEvent("hz.CodeBlock events.OnPlayerEnterTrigger", (player: Player, trigger: Entity) => {
       console.log("Trigger entered:", player.displayName, trigger.name);
       this.handleTriggerInteraction(player, trigger);
     });
   }
   ```

2. **Health Bar Update Issues:**
   ```typescript
   // Debug health bar updates
   updateHealthBar(newPercentHealth: number, player: Player) {
     console.log("Updating health bar:", player.displayName, newPercentHealth);
     
     if (isNaN(newPercentHealth)) {
       console.error("Invalid health value:", newPercentHealth);
       return;
     }
     
     const clampedHealth = Math.max(0, Math.min(100, newPercentHealth));
     if (clampedHealth !== newPercentHealth) {
       console.warn("Health value clamped:", newPercentHealth, "->", clampedHealth);
     }
   }
   ```

### Performance Monitoring

1. **Update Frequency Monitoring:**
   ```typescript
   // Monitor HUD update performance
   private lastUpdateTime = 0;
   private updateCount = 0;

   updateScore(newScore: number, player: Player) {
     const now = performance.now();
     if (now - this.lastUpdateTime < 100) { // Less than 100ms since last update
       this.updateCount++;
       if (this.updateCount > 10) {
         console.warn("HUD: High frequency updates detected, consider throttling");
       }
     } else {
       this.updateCount = 0;
     }
     this.lastUpdateTime = now;

     this.setPlayerBinding(player, "scoreText", newScore.toString());
   }
   ```

2. **Memory Usage Monitoring:**
   ```typescript
   // Monitor player state memory usage
   private cleanupPlayerHUD(player: Player) {
     const deleted = this.playerStates.delete(player);
     console.log("Cleaned up player HUD:", player.displayName, "Success:", deleted);
     
     if (this.playerStates.size > 50) {
       console.warn("Large number of player states tracked:", this.playerStates.size);
     }
   }
   ```

## See Also

- **Zone 0 - Setup**: Custom UI system fundamentals and Screen Overlay configuration
- **Zone 3 - Bars**: Health bar implementation and animation techniques  
- **Zone 4 - Advanced Lists**: InventoryCore base class and inventory system architecture
- **Zone 5 - Animation**: UI animation techniques for health bars and score displays
- **Screen Overlay Configuration**: Custom UI gizmo overlay type setup and best practices
- **Player State Management**: Multiplayer state tracking patterns and performance optimization
- **Cross-Platform HUD Design**: Platform-specific considerations for VR, mobile, and web

## Sources

- **Primary**: [Zone 7 - HUD | Custom UI Tutorial World](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-7-hud)
- **Tutorial Structure**: Custom UI Tutorial World multi-zone learning experience
- **Code Examples**: Live interactive HUD system with InventoryHUD, HUD, and HUDDemo demonstrations
- **Component Architecture**: Screen Overlay implementation with modular component design and player state management