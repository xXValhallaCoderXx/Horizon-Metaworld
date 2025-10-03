---
title: Zone 0 - Setup | Custom UI Tutorial World
description: Comprehensive guide to Custom UI Tutorial World fundamentals, covering Custom UI gizmo configuration, system requirements, color palettes, fonts, setup procedures, and foundational concepts for developing Custom UI interfaces in Meta Horizon Worlds
author: Horizon Worlds Context Curator
zone: 0
stations: 0
components: []
source_url: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-0-setup
---

# Zone 0 - Setup | Custom UI Tutorial World

## What & Why

**Zone 0 - Setup** provides the foundational knowledge and configuration required to begin developing Custom UI interfaces in Meta Horizon Worlds. This introductory zone establishes the core concepts, system requirements, and setup procedures necessary for working with the Custom UI Tutorial World and developing sophisticated user interfaces.

Custom UI in Horizon Worlds enables creators to build rich, interactive interfaces that enhance player experience across VR, mobile, and web platforms. The tutorial world provides hands-on learning through 9 progressive zones, each building upon the previous to create increasingly complex UI systems from basic buttons to complete e-commerce storefronts.

## Key APIs/Concepts

### Core Custom UI Architecture
- **Custom UI Gizmo System** - Primary mechanism for creating UI interfaces in Horizon Worlds
- **UIComponent Framework** - Base class for all Custom UI components with lifecycle management
- **Property Definition System** - Type-safe property configuration for UI components
- **Binding System** - Dynamic data binding between UI elements and component state
- **Event-Driven Architecture** - Network events and trigger-based interactions
- **Cross-Platform Compatibility** - Unified interface system working across VR, mobile, and web

### Custom UI Gizmo Configuration
- **Placement Requirements** - Custom UI gizmos must be placed as world objects
- **Component Assignment** - TypeScript components attached to gizmo entities
- **Theme System** - Predefined color palettes and styling configurations
- **Layout Management** - Positioning and sizing across different screen configurations
- **Asset Integration** - Font assets, image assets, and visual resource management

### Development Environment Setup
- **TypeScript Integration** - Modern TypeScript development for type-safe UI components
- **Desktop Editor Workflow** - Development environment configuration and best practices
- **Asset Management** - Font assets, color palettes, and visual resource organization
- **Testing Procedures** - Cross-platform testing methodologies for VR, mobile, and web
- **Performance Optimization** - UI rendering performance and memory management

### Color Palette System
- **Predefined Themes** - Built-in color schemes for consistent visual design
- **Custom Color Configuration** - RGB color specification and theme customization
- **Accessibility Considerations** - Color contrast and visibility across platforms
- **Dynamic Theme Switching** - Runtime theme modification capabilities

### Font System
- **Font Asset Integration** - Custom font loading and configuration
- **Typography Hierarchy** - Font sizing and weight configurations
- **Localization Support** - Multi-language font handling
- **Readability Optimization** - Font sizing for mobile and VR platforms

## How-To

### Initial Setup Procedures

1. **Environment Preparation:**
   - Ensure Horizon Worlds Desktop Editor access
   - Verify TypeScript development environment
   - Configure project workspace for Custom UI development

2. **Custom UI Gizmo Placement:**
   - Place Custom UI gizmo in world environment
   - Configure gizmo properties for intended use case
   - Assign appropriate component scripts to gizmo entity

3. **Component Development Setup:**
   - Create TypeScript component extending UIComponent base class
   - Define component properties using type-safe property definitions
   - Implement component lifecycle methods (onReady, onUpdate, onDestroy)

4. **Theme Configuration:**
   - Select appropriate color theme for UI aesthetic
   - Configure color palette properties
   - Test theme appearance across different lighting conditions

### Basic Component Implementation

1. **Property Definition Pattern:**
   ```typescript
   static propsDefinition = {
     theme: { type: "number", default: 0 },
     title: { type: "string", default: "Default Title" },
     isVisible: { type: "boolean", default: true }
   };
   ```

2. **Component Initialization:**
   ```typescript
   onReady() {
     this.initializeBindings();
     this.setupEventHandlers();
     this.applyTheme();
   }
   ```

3. **Binding System Usage:**
   ```typescript
   private initializeBindings() {
     this.setBinding("titleText", this.props.title);
     this.setBinding("visibility", this.props.isVisible);
   }
   ```

### Cross-Platform Optimization

1. **Responsive Design Principles:**
   - Design for multiple screen sizes and aspect ratios
   - Implement touch-friendly interaction areas for mobile
   - Optimize for VR comfort and readability

2. **Performance Considerations:**
   - Minimize UI update frequency for smooth performance
   - Optimize asset loading and memory usage
   - Test across all supported platforms

3. **Accessibility Features:**
   - Ensure sufficient color contrast for readability
   - Implement appropriate font sizes for different platforms
   - Test UI visibility in various lighting conditions

## Minimal Example

### Basic Custom UI Component
```typescript
// BasicUIExample.ts - Minimal Custom UI component
export class BasicUIExample extends UIComponent {
  static propsDefinition = {
    theme: { type: "number", default: 0 },
    title: { type: "string", default: "Hello Custom UI" },
    buttonText: { type: "string", default: "Click Me" }
  };

  onReady() {
    this.setupUI();
  }

  private setupUI() {
    // Initialize UI bindings
    this.setBinding("titleText", this.props.title);
    this.setBinding("buttonText", this.props.buttonText);
    this.setBinding("theme", this.props.theme);
    
    // Setup button click handler
    this.connectUIEvent("button", "click", this.onButtonClick.bind(this));
  }

  private onButtonClick() {
    console.log("Button clicked!");
    this.setBinding("titleText", "Button was clicked!");
  }
}
```

### Theme Configuration Example
```typescript
// Theme switching implementation
private applyTheme() {
  const themes = [
    { primary: "#007bff", secondary: "#6c757d" }, // Blue theme
    { primary: "#28a745", secondary: "#6c757d" }, // Green theme  
    { primary: "#dc3545", secondary: "#6c757d" }  // Red theme
  ];
  
  const selectedTheme = themes[this.props.theme] || themes[0];
  this.setBinding("primaryColor", selectedTheme.primary);
  this.setBinding("secondaryColor", selectedTheme.secondary);
}
```

## Limits & Constraints

### Technical Limitations
- **Platform Performance** - UI rendering performance varies across VR, mobile, and web platforms
- **Memory Constraints** - Large UI systems may impact performance on lower-end devices
- **Asset Size Limits** - Font and image assets have size restrictions
- **Network Synchronization** - UI state synchronization requires careful event management
- **TypeScript Compilation** - Development workflow depends on TypeScript compilation pipeline

### Design Constraints
- **Screen Size Variations** - UI must work across vastly different screen sizes and resolutions
- **Input Method Differences** - VR controllers, touch input, and mouse/keyboard require different interaction patterns
- **Platform-Specific Limitations** - Some features may not be available on all platforms
- **Color Space Limitations** - Color representation may vary across different display technologies

### Development Constraints
- **Asset Pipeline** - Custom fonts and images require specific import procedures
- **Testing Requirements** - Comprehensive testing across all supported platforms necessary
- **Performance Profiling** - UI performance must be validated on target hardware configurations
- **Version Compatibility** - Custom UI API changes may require component updates

## Gotchas/Debugging

### Common Setup Issues

1. **Gizmo Configuration Problems:**
   - Verify Custom UI gizmo is properly placed in world
   - Ensure component script is correctly assigned to gizmo entity
   - Check that gizmo properties match component property definitions

2. **TypeScript Compilation Errors:**
   - Validate property definitions use correct type specifications
   - Ensure all required imports are included
   - Verify component extends UIComponent base class correctly

3. **Binding System Issues:**
   - Check binding names match UI template expectations
   - Verify binding values are set before UI rendering
   - Ensure binding updates trigger UI refresh correctly

### Theme and Visual Problems

1. **Color Display Issues:**
   - Test colors across different lighting conditions
   - Verify color contrast meets accessibility requirements
   - Check color values are in expected format (RGB, hex, etc.)

2. **Font Rendering Problems:**
   - Ensure font assets are properly imported and configured
   - Verify font sizes are appropriate for target platforms
   - Test font readability across different screen sizes

3. **Layout Issues:**
   - Test UI layout across different aspect ratios
   - Verify responsive design works on all platforms
   - Check UI elements don't overlap or get clipped

### Performance Debugging

1. **Frame Rate Issues:**
   - Profile UI update frequency and optimize high-frequency updates
   - Monitor memory usage during UI operations
   - Test performance on minimum specification hardware

2. **Network Synchronization:**
   - Debug network event timing and sequencing
   - Verify UI state synchronization across multiple players
   - Monitor network traffic for excessive UI-related events

## See Also

- **Zone 1 - Option Lists**: Toggle lists, radio buttons, and selection interfaces
- **Zone 2 - Basics**: Fundamental UI components and interaction patterns
- **Custom UI API Documentation**: Complete API reference for Custom UI development
- **TypeScript Development Guide**: Best practices for TypeScript in Horizon Worlds
- **Cross-Platform Development**: Platform-specific optimization techniques
- **Performance Optimization**: UI performance tuning and memory management

## Sources

- **Primary**: [Zone 0 - Setup | Custom UI Tutorial World](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-0-setup)
- **Tutorial Structure**: Custom UI Tutorial World progressive learning experience
- **Development Environment**: Horizon Worlds Desktop Editor and TypeScript integration
- **API Documentation**: Custom UI component architecture and development patterns