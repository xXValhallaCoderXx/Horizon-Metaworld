# Zone 1 - Option Lists

## What & Why

Zone 1 of the Custom UI Tutorial World introduces fundamental interactive option list components that allow players to make choices within Custom UI interfaces. This zone covers four distinct types of option controls: toggle lists (independent selections), radio lists (mutually exclusive selections), task lists (completion tracking), and comparative API examples. These controls form the foundation of player decision-making interfaces in Horizon Worlds.

Toggle lists provide players with multiple independent choices where any combination of options can be selected simultaneously. Radio lists enforce mutual exclusivity, allowing only one selection at a time and automatically deselecting others. Task lists offer completion tracking functionality for player objectives. Together, these components enable rich interactive experiences for configuration panels, preference settings, quest systems, and player choice mechanics.

## Key APIs/Concepts

### Core Component Architecture

The option lists in this zone follow a dual-script architecture:

- **UIComponent Script**: Acts as the blueprint defining appearance and user interaction behavior
- **Controller Script**: Provides "wiring" between UI components and game world entities, events, and programmatic control

### ToggleList Component System

**ToggleList Script (UIComponent)**:
- Self-contained widget that can be placed in game worlds
- Defines visual appearance and direct user interaction handling
- Supports dynamic theme switching via `cuiThemeStyle` objects

**ToggleListDemo Script (Controller)**:
- Links UI to physical world objects and trigger events
- Provides programmatic control interface
- Manages visual feedback synchronization

### Network Events

- `OnPlayerEnterTrigger`: Built-in CodeBlock event triggered when players enter designated trigger areas
- `cuiSetupTrigger`: Function that subscribes to trigger events and executes parameter-defined functions

## How-To

### Setting Up Toggle Lists

1. **Configure Theme Properties**:
   ```typescript
   theme: hz.PropTypes.Number // Used in switch statement for cuiThemeStyle selection
   ```

2. **Link Trigger Entities**:
   ```typescript
   trigger1, trigger2: hz.PropTypes.Entity // Entities with Trigger components
   ```

3. **Connect UI Reference**:
   ```typescript
   cuiGizmo: hz.PropTypes.Entity // Entity containing ToggleList UI component
   ```

4. **Initialize Labels and Values**:
   ```typescript
   label1, label2: hz.PropTypes.String  // Initial toggle text labels
   value1, value2: hz.PropTypes.Boolean // Starting checked/unchecked states
   ```

5. **Set Up Visual Feedback**:
   ```typescript
   triggerVisual1, triggerVisual2: hz.PropTypes.Entity // Visual feedback entities
   ```

### Programmatic Control Methods

**Text Updates**:
```typescript
ToggleListUpdateText(index: number, text: string) // Change toggle label
```

**State Management**:
```typescript
ToggleListSetLine(index: number, checked: boolean) // Set toggle state
ToggleListGetLine(index: number): boolean // Get current toggle state
```

### Event Integration

Subscribe to trigger events using `cuiSetupTrigger`:
```typescript
// Automatically triggered when player enters trigger volume
// Executes series of functions passed as parameters
```

## Minimal Example

```typescript
// ToggleList setup with 4 toggles
public theme = 1; // Color scheme selector
public trigger1: Entity; // Player entry trigger
public cuiGizmo: Entity; // UI component reference
public label1 = "Option A"; // Toggle text
public value1 = false; // Starting state
public triggerVisual1: Entity; // Visual feedback

start() {
    // Initialize toggle with label and state
    this.cuiGizmo.getComponent(ToggleList).ToggleListUpdateText(0, this.label1);
    this.cuiGizmo.getComponent(ToggleList).ToggleListSetLine(0, this.value1);
    
    // Set up trigger event
    cuiSetupTrigger(this.trigger1, this.handleTriggerEnter);
}

handleTriggerEnter = () => {
    // Update visual feedback based on toggle state
    const isChecked = this.cuiGizmo.getComponent(ToggleList).ToggleListGetLine(0);
    this.triggerVisual1.color = isChecked ? Color.green : Color.red;
}
```

## Limits & Constraints

### Toggle List Limitations
- Fixed to 4 line items per toggle list component
- Theme changes require predefined `cuiThemeStyle` objects
- Visual feedback requires separate entities for each toggle

### Radio List Constraints
- Enforces single selection (mutual exclusivity)
- Automatic deselection of other options when new selection made
- Limited to 4 options per component

### Task List Restrictions
- Completion state management requires careful event coordination
- Toggle behavior in Properties panel affects completion tracking method

### API Example Usage
- Not intended as droppable world asset
- Designed for comparative demonstration only
- Shows differences between option list types in single interface

## Gotchas/Debugging

### Common Integration Issues
1. **Missing `getComponents()` Reference**: Controller must properly reference UIComponent via `cuiGizmo` entity
2. **Trigger Volume Setup**: Ensure trigger entities have proper Trigger components configured
3. **Visual Feedback Sync**: Color property updates may not reflect immediately - verify entity references

### Theme Switching Problems
- Verify `cuiThemeStyle` objects exist for all theme numbers used in switch statements
- Theme changes affect entire UI color scheme - test with different player preferences

### Event Flow Debugging
- Use console logging in `cuiSetupTrigger` callback functions
- Verify trigger volumes are properly sized and positioned
- Check that `OnPlayerEnterTrigger` events are firing consistently

### State Management Issues
- Boolean property initialization order matters - set values before UI updates
- Toggle state queries may return stale data - implement proper update sequencing

## See Also

- [Zone 0 - Setup](./00-zone-0-setup.md) - Custom UI Tutorial World configuration
- [Zone 2 - Basics](./02-zone-2-basics.md) - Basic Custom UI components
- [Zone 4 - Advanced Lists](./04-zone-4-advanced-lists.md) - Complex list implementations
- [Custom UI Controls](../../custom-ui-controls-overview.md) - Complete Custom UI control reference
- [Events & Triggers System](../../events-triggers-system.md) - Event handling architecture

## Sources

- Meta Horizon Worlds Custom UI Tutorial World - Zone 1: Option Lists
- URL: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-1-option-lists
- Tutorial World Access: Custom UI Tutorial World via Horizon Worlds