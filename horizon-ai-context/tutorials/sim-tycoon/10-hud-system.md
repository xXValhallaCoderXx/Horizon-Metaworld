---
title: "HUD System for Mobile Sim Tycoon"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-10-hud-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "sim_tycoon", "hud", "mobile_ui", "custom_ui"]
summary: "Mobile-optimized HUD system displaying resources, currency, tools, and progress with touch-friendly controls and real-time updates."
tutorial: "sim-tycoon"
---

# HUD System for Mobile Sim Tycoon

The HUD (Heads-Up Display) system provides real-time visual feedback to players about their current state, resources, tools, and progress. It creates an engaging and informative user interface that keeps players informed about their game status.

## What & Why

Mobile sim tycoon games require constant player feedback about resource collection, tool status, currency balances, and progression. The HUD system:

- Displays critical game information without cluttering the view
- Provides touch-friendly controls optimized for mobile devices
- Updates in real-time as players interact with game systems
- Integrates with SimPlayer, ResourceNodes, Tools, and Store systems

## Key APIs / Concepts

- **HUD.ts**: Main script managing visual interface overlays
- **resourceCounters**: Real-time inventory and capacity tracking
- **currencyDisplays**: Green, blue, purple, and red currency balances
- **toolInformation**: Current tool tier, durability, and efficiency stats
- **progressBars**: Mining progress, extraction timers, activity feedback
- **Interactive Elements**: Touch-friendly buttons and controls
- **Mobile Optimization**: Large buttons, clear spacing, responsive layout

## Display Elements

### Resource Counters

- **Wood Counter**: Number of wood resources in inventory
- **Stone Counter**: Current stone resource count
- **Crystal Counter**: Crystal resources available
- **Capacity Bar**: Visual representation of inventory fullness

### Currency Displays

- **Green Currency**: Basic currency from wood conversion
- **Blue Currency**: Intermediate currency from stone conversion
- **Purple Currency**: Advanced currency from crystal conversion
- **Red Currency**: Premium currency from rare resource conversion

### Tool Information Panel

- **Tool Name**: Currently equipped tool identification
- **Tool Tier**: Current upgrade level and progression
- **Durability Bar**: Tool health and usage remaining
- **Efficiency Stats**: Tool performance metrics

### Progress Indicators

- **Mining Progress**: Real-time mining action progress
- **Extraction Timer**: Countdown for resource extraction completion
- **Respawn Timers**: When resource nodes will become available again
- **Upgrade Progress**: Progress toward next tool tier

## How-To (Implementation Recipe)

1. **Initialize HUD Script**

   - Create HUD.ts script in your project
   - Configure display elements and positioning
   - Set up update frequency and triggers

2. **Create Display Elements**

   - Design resource counter layouts
   - Implement currency tracking displays
   - Build tool information panels
   - Add progress bars and timers

3. **Integrate with Game Systems**

   - Connect to SimPlayer for state updates
   - Link to ResourceNodes for mining feedback
   - Interface with ToolGroups for equipment info
   - Connect to Store system for purchase feedback

4. **Optimize for Mobile**
   - Use large, touch-friendly button sizes
   - Implement clear spacing between elements
   - Add high contrast for visibility
   - Test responsive layout on different screen sizes

## Mobile Optimization Features

### Touch-Friendly Design

- **Large Buttons**: Easy to tap with fingers
- **Clear Spacing**: Prevents accidental touches
- **High Contrast**: Readable in various lighting conditions
- **Responsive Layout**: Adapts to different screen sizes

### Interactive Elements

- **Mine Button**: Primary action for resource extraction
- **Store Access**: Quick access to store interface
- **Tool Management**: Equipment and upgrade controls
- **Menu Navigation**: Settings and world navigation

## System Integrations

### SimPlayer Integration

- HUD receives real-time updates from SimPlayer state changes
- Tool equipment changes immediately update HUD displays
- Resource collection automatically updates counters
- Currency changes reflect instantly in displays

### Resource System Integration

- Mining actions trigger progress bar updates
- Resource collection updates inventory displays
- Capacity warnings when approaching limits
- Node respawn timers from ResourceNode system

### Store System Integration

- Purchase confirmations and feedback
- Currency deduction notifications
- Tool upgrade previews and comparisons
- Availability notifications for new items

## Minimal Example

```typescript
// HUD.ts - Basic resource counter update
export class HUD {
  private resourceCounters = {
    wood: 0,
    stone: 0,
    crystal: 0,
  };

  updateResourceDisplay(resourceType: string, amount: number) {
    this.resourceCounters[resourceType] = amount;
    this.refreshResourceUI();
  }

  private refreshResourceUI() {
    // Update visual elements with current resource counts
    // Trigger capacity warnings if approaching limits
  }
}
```

## Performance Considerations

### Update Optimization

- **Selective Updates**: Only refresh changed elements
- **Batched Operations**: Group multiple updates together
- **Frame Rate Management**: Maintain smooth 60fps performance
- **Memory Pooling**: Reuse UI elements efficiently

### Mobile Performance

- **GPU Acceleration**: Hardware-accelerated rendering where possible
- **Texture Management**: Efficient sprite and texture usage
- **Draw Call Optimization**: Minimize rendering operations
- **Battery Impact**: Minimize CPU usage for longer play sessions

## Limits & Constraints

- Mobile screen real estate limits information density
- Touch target minimum sizes for usability (44px recommended)
- Performance overhead from frequent UI updates
- Battery life considerations for mobile devices
- Memory usage limits for UI elements and textures

## Gotchas / Debugging

### Common Display Issues

- **Overlapping Elements**: Ensure proper z-ordering and spacing
- **Scale Problems**: Test on various mobile screen resolutions
- **Update Lag**: Check if updates are batched properly for performance
- **Touch Responsiveness**: Verify touch targets meet minimum size requirements

### Performance Problems

- **Frame Rate Drops**: Monitor update frequency and optimize refresh cycles
- **Memory Leaks**: Properly dispose of UI elements when not needed
- **Battery Drain**: Check for excessive update loops or animations

### Integration Issues

- **Missing Updates**: Verify event connections between HUD and game systems
- **Incorrect Values**: Check data flow from SimPlayer to HUD displays
- **Timing Problems**: Ensure updates occur after system state changes

## Customization Options

### Visual Design Modifications

1. **Locate HUD.ts Script**: Find the display component to modify
2. **Adjust Properties**: Position, size, colors, visual styling
3. **Update Frequencies**: Change refresh rates and triggers
4. **Animation Effects**: Add transitions and feedback animations

### Adding New Display Elements

1. **Define Element**: Create new display component in HUD.ts
2. **Create Update Functions**: Build logic for data updates
3. **System Integration**: Connect to relevant game systems
4. **Visual Styling**: Add positioning and appearance
5. **Mobile Testing**: Verify usability on target devices

## Testing & Validation

### Cross-Device Testing

- **Screen Sizes**: Test on various mobile device screen sizes
- **Resolution Scaling**: Ensure proper scaling across different resolutions
- **Performance Testing**: Validate smooth operation on lower-end devices
- **Touch Responsiveness**: Verify all interactive elements work properly

### User Experience Validation

- **Readability Testing**: Ensure all text is clearly readable
- **Touch Target Sizing**: Verify buttons are appropriately sized
- **Information Hierarchy**: Check that important information is prominently displayed
- **Flow Testing**: Validate smooth user interaction patterns

## Best Practices

### Design Principles

- **Clarity First**: Information should be immediately understandable
- **Minimal Clutter**: Only show essential information by default
- **Contextual Relevance**: Display information relevant to the current activity
- **Consistent Feedback**: Provide clear feedback for all player actions

### Technical Implementation

- **Modular Design**: Create reusable UI components
- **Event-Driven Updates**: Use efficient event systems for updates
- **Error Handling**: Graceful degradation when systems fail
- **Documentation**: Clear documentation for future modifications

## See Also

- [SimPlayer Management](01-simplayer.md) - Player state system providing HUD data
- [Resource Nodes](02-resource-nodes.md) - Mining feedback and progress bars
- [Tool System](03-tools-and-toolgroups.md) - Tool status and upgrade information
- [Store System](07-store-system.md) - Purchase feedback and currency displays
- [Custom UI Overview](../custom-ui-overview.md) - General UI development principles

## Sources

- Module 10 - HUD System Tutorial (accessed 2025-09-26)
