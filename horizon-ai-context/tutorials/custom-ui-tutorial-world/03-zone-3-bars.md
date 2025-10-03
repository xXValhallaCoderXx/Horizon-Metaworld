---
title: "Zone 3 - Bars: Progress Indicators and Health Visualization in Horizon Worlds Custom UI"
description: "Comprehensive guide to loading bars and health bars in the Custom UI Tutorial World, covering two critical UI components: LoadingBar/LoadingBarDemo for progress indication and HealthBar/HealthBarDemo for health visualization with color-coded feedback."
tags: [custom-ui, progress-bars, loading-indicators, health-bars, ui-components, animation, visual-feedback]
---

# Zone 3 - Bars: Progress Indicators and Health Visualization

## What & Why

Zone 3 focuses on **progress bars and loading indicators** that provide essential visual feedback to players in Horizon Worlds. This zone implements two critical bar-based UI components:

**Loading Bars** serve as visual feedback during world transitions and loading states, keeping players informed that the system is actively processing rather than frozen. They're essential for covering loading times when worlds need to load new rooms or content.

**Health Bars** are critical informational tools in combat and interactive systems, positioned over entities to provide real-time health status with automatic color-coding that changes from green to yellow to red based on health percentage.

Both systems demonstrate the **dual-component architecture** pattern: separating UI rendering components (`LoadingBar.ts`, `HealthBar.ts`) from game logic controllers (`LoadingBarDemo.ts`, `HealthBarDemo.ts`) for better maintainability and reusability.

## Key APIs/Concepts

### Station #7: Loading Bar System

**Core Components:**
- `LoadingBar.ts` - UI component extending `ui.UIComponent` for visual rendering
- `LoadingBarDemo.ts` - Game logic extending `hz.Component` for demo control

**Key Properties:**
- `theme: number` - Selects visual themes (default, green, yellow)
- `trigger1–trigger4: Entity` - Physical trigger references for activation
- `cuiGizmo: Entity` - Links game logic to UI component

**Primary Method:**
- `startLoadingBar(timeInMS)` - Initiates loading animation with specified duration

### Station #8: Health Bar System

**Core Components:**
- `HealthBar.ts` - UI component with automatic color-coding based on health percentage
- `HealthBarDemo.ts` - Game logic controller for health bar demo

**Key Properties:**
- `theme: number` - Visual theme selection (default, green, yellow)
- `showPercentage: boolean` - Controls percentage text display
- `trigger1–trigger4: Entity` - Trigger entities for health value changes
- `cuiGizmo: Entity` - Game logic to UI component linkage

**Primary Methods:**
- `updateName(name)` - Changes displayed name above health bar
- `updateHealthBar(newPercentHealth)` - Sets target health value

## How-To

### Implementing Loading Bars

1. **Create UI Component** (`LoadingBar.ts`):
   ```typescript
   // Extends ui.UIComponent for visual rendering
   // Handles progress animation and theme selection
   // Uses repeating timer for smooth progress increments
   ```

2. **Setup Game Logic** (`LoadingBarDemo.ts`):
   ```typescript
   // Extends hz.Component for demo control
   // Configures trigger entities and cuiGizmo references
   // Calls startLoadingBar(timeInMS) on trigger events
   ```

3. **Configure Triggers**:
   - Set up 4 trigger entities in world
   - Link triggers to LoadingBarDemo component
   - Configure cuiGizmo entity with LoadingBar component

### Implementing Health Bars

1. **Create Health UI Component** (`HealthBar.ts`):
   ```typescript
   // Extends UIComponent with automatic color transitions
   // Implements derived binding for color-coding
   // Supports name display and percentage options
   ```

2. **Setup Health Logic** (`HealthBarDemo.ts`):
   ```typescript
   // Extends hz.Component for health management
   // Handles trigger-based health value changes
   // Calls updateHealthBar() and updateName() methods
   ```

3. **Position Over Entities**:
   - Place health bar above enemy/entity heads
   - Configure world-space positioning
   - Link cuiGizmo to HealthBar component

## Minimal Example

### Basic Loading Bar Setup
```typescript
// LoadingBar.ts - UI Component
export class LoadingBar extends ui.UIComponent {
  theme: number = 0; // Theme selection
  
  startLoadingBar(timeInMS: number) {
    // Implement timer-based progress animation
    // Incrementally increase progressValue
  }
}

// LoadingBarDemo.ts - Controller
export class LoadingBarDemo extends hz.Component {
  trigger1: hz.Entity;
  cuiGizmo: hz.Entity;
  
  onPlayerEnterTrigger() {
    // Activate loading bar on trigger entry
    this.cuiGizmo.as(LoadingBar).startLoadingBar(3000);
  }
}
```

### Basic Health Bar Setup
```typescript
// HealthBar.ts - UI Component
export class HealthBar extends ui.UIComponent {
  theme: number = 0;
  showPercentage: boolean = true;
  
  updateHealthBar(newPercentHealth: number) {
    // Set target health value
    // Automatic color transition based on percentage
  }
  
  updateName(name: string) {
    // Update displayed name above bar
  }
}

// HealthBarDemo.ts - Controller
export class HealthBarDemo extends hz.Component {
  trigger1: hz.Entity;
  cuiGizmo: hz.Entity;
  
  onTriggerActivation() {
    // Change health values based on triggers
    this.cuiGizmo.as(HealthBar).updateHealthBar(75);
    this.cuiGizmo.as(HealthBar).updateName("Enemy");
  }
}
```

## Limits & Constraints

### Loading Bar Limitations
- Fixed animation duration once started
- Limited to 3 predefined themes
- Requires manual timer management
- No built-in cancellation mechanism

### Health Bar Limitations
- Color transitions limited to green→yellow→red progression
- Percentage display is boolean (on/off only)
- Fixed positioning relative to entity
- No support for multiple health types (shields, armor, etc.)

### General Bar Constraints
- Entity reference requirements for cuiGizmo linkage
- Trigger-based activation only in demo setup
- Theme changes require component restart
- Limited customization of visual appearance

## Gotchas/Debugging

### Loading Bar Issues
- **Animation Not Starting**: Verify cuiGizmo entity reference is correctly assigned
- **Incorrect Duration**: Check timeInMS parameter is positive integer
- **Theme Not Applying**: Ensure theme value is 0, 1, or 2 for valid themes
- **Multiple Activations**: Loading bar may overlap if triggered repeatedly

### Health Bar Issues
- **Color Not Changing**: Verify health percentage is between 0-100
- **Name Not Displaying**: Check updateName() is called after component initialization
- **Positioning Problems**: Ensure health bar entity is properly positioned in world space
- **Percentage Toggle**: showPercentage changes may require component refresh

### Common Debug Steps
1. **Verify Entity References**: Confirm cuiGizmo points to correct Custom UI entity
2. **Check Trigger Setup**: Ensure all trigger entities are properly configured
3. **Component Attachment**: Verify UI components are attached to correct entities
4. **Method Call Timing**: Check that update methods are called after component initialization

### Network Considerations
- Bar updates are networked to all players automatically
- Frequent health bar updates may impact performance
- Loading bars should be synchronized across players for consistent experience

## See Also

- [Zone 2 - Basics](./02-zone-2-basics.md) - Basic Custom UI components and interactions
- [Zone 4 - Advanced Lists](../../../tutorials/custom-ui-tutorial-world/04-zone-4-advanced-lists.md) - Advanced list-based UI components
- [Custom UI API Overview](../../../custom-ui-overview.md) - Comprehensive Custom UI system documentation
- [Performance Optimization](../../../custom-ui-optimization.md) - Custom UI performance best practices

## Sources

- [Custom UI Tutorial World - Zone 3 Bars](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-3-bars) - Official Meta documentation
- Meta Horizon Worlds Desktop Editor - Custom UI Tutorial World Zone 3 implementation
- Custom UI API Reference - Progress bar and health indicator components