---
title: Zone 6 - Scroll Views | Custom UI Tutorial World  
description: Comprehensive technical documentation of Zone 6 Scroll Views systems from the Custom UI Tutorial World, covering basic text scrolling with ScrollText/ScrollTextDemo components and advanced scroll lists with ScrollList/ScrollListDemo and cuiUtil utility framework
author: Horizon Worlds Context Curator
zone: 6
stations: 2
components: [ScrollText, ScrollTextDemo, ScrollList, ScrollListDemo, cuiUtil]
source_url: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-6-scroll-views
---

# Zone 6 - Scroll Views | Custom UI Tutorial World

## What & Why

**Zone 6 - Scroll Views** demonstrates sophisticated scrollable UI components that enable displaying large amounts of content in compact interface spaces. This zone showcases two distinct scrolling approaches:

1. **Basic Text Scroll (Station #15)** - Simple text scrolling for displaying large text blocks like instructions or game lore
2. **Advanced Scroll View (Station #16)** - Complex scrollable lists with JSON data integration, formatting, images, and multi-source data combination

These scrolling systems are essential for creating information-dense interfaces that maintain usability on all device form factors, particularly important for mobile and VR experiences where screen real estate is limited.

## Key APIs/Concepts

### Core Scrolling Principles
- **Content Overflow Management** - Displaying more content than fits in visible area through scrolling
- **Dynamic Content Updates** - Runtime text and list content modification
- **Theme-Based Styling** - Consistent visual theming across scrollable components  
- **Trigger-Based Interaction** - In-world spatial triggers to control scroll content
- **JSON Data Integration** - Formatted data sources for complex list content
- **Multi-Source Data Aggregation** - Combining different data sets into unified scrollable views

### Primary Scripts & Components

#### Station #15: Basic Text Scroll
**Simple scrollable text display for instructions, lore, and large text content**

##### ScrollText Component (`ScrollText.ts`)
**Core scrollable text UI element handling text panel creation and management**

**Properties:**
- `text`: String containing default text to be displayed
- `theme`: Number selecting predefined color theme for UI panel

**Methods:**
- `ScrollTextSetText(text?)`: Public method to update text content, sets currentText binding and recalculates scrollHeight binding

##### ScrollTextDemo Component (`ScrollTextDemo.ts`)  
**Controller component managing ScrollText state through in-world triggers**

**Properties:**
- `trigger1`: Entity linking to first in-world trigger
- `trigger2`: Entity linking to second in-world trigger  
- `triggerVisual1`: Entity linking to visual feedback object for first trigger
- `triggerVisual2`: Entity linking to visual feedback object for second trigger
- `cuiGizmo`: Entity linking to entity containing ScrollText UI component
- `text`: String holding text to display when second state is active

#### Station #16: Advanced Scroll View
**Complex scrollable list system with JSON data integration and multi-source aggregation**

##### cuiUtil Utility (`cuiUtil.ts`)
**Reusable framework providing connection between in-world events and state-change logic**

##### ScrollList Component (`ScrollList.ts`)
**Dynamic scrollable list UI component combining multiple data sets into cohesive scrollable view**

**Properties:**
- `theme`: Number selecting predefined color theme (blue, green, or yellow) for UI panel

**Methods:**
- `ScrollListAdd(id, data, player?)`: Public method adding new list items from JSON string
- `ScrollListDelete(id, player?)`: Public method removing list by ID

##### ScrollListDemo Component (`ScrollListDemo.ts`)
**Game logic controller linking in-world triggers to ScrollList component**

**Properties:**  
- `trigger1–trigger4`: Four entity properties linking to in-world triggers
- `triggerVisual1–triggerVisual4`: Four entity properties linking to visual entities with state-based color changes
- `cuiGizmo`: Entity linking to entity holding respective UI component

## How-To

### Implementing Basic Text Scroll

1. **ScrollText Component Setup:**
   ```typescript
   // ScrollText.ts - Core scrollable text component
   class ScrollText extends BaseCustomUI {
     static propsDefinition = {
       text: { type: "string", default: "Default scrollable text content..." },
       theme: { type: "number", default: 0 }
     };

     onReady() {
       this.updateTextContent(this.props.text);
     }
   }
   ```

2. **Dynamic Text Updates:**
   ```typescript
   // ScrollText.ts - Text update method
   ScrollTextSetText(text?: string) {
     const newText = text || this.props.text;
     this.currentText = newText;
     this.recalculateScrollHeight();
   }
   ```

3. **Controller Integration:**
   ```typescript
   // ScrollTextDemo.ts - Trigger-based control
   class ScrollTextDemo extends BaseComponent {
     static propsDefinition = {
       trigger1: { type: "entity" },
       trigger2: { type: "entity" },
       triggerVisual1: { type: "entity" },
       triggerVisual2: { type: "entity" },
       cuiGizmo: { type: "entity" },
       text: { type: "string", default: "Second state text..." }
     };

     onReady() {
       this.connectTriggerEvents();
     }
   }
   ```

### Implementing Advanced Scroll Lists

1. **ScrollList Component Architecture:**
   ```typescript
   // ScrollList.ts - Advanced scrollable list
   class ScrollList extends BaseCustomUI {
     static propsDefinition = {
       theme: { type: "number", default: 0 } // 0=blue, 1=green, 2=yellow
     };

     ScrollListAdd(id: string, data: string, player?: Player) {
       const parsedData = JSON.parse(data);
       this.addListItems(id, parsedData);
       this.refreshScrollView();
     }

     ScrollListDelete(id: string, player?: Player) {
       this.removeListById(id);
       this.refreshScrollView();
     }
   }
   ```

2. **Multi-Trigger Controller Setup:**
   ```typescript
   // ScrollListDemo.ts - Advanced controller
   class ScrollListDemo extends BaseComponent {
     static propsDefinition = {
       trigger1: { type: "entity" },
       trigger2: { type: "entity" },
       trigger3: { type: "entity" },
       trigger4: { type: "entity" },
       triggerVisual1: { type: "entity" },
       triggerVisual2: { type: "entity" },
       triggerVisual3: { type: "entity" },
       triggerVisual4: { type: "entity" },
       cuiGizmo: { type: "entity" }
     };
   }
   ```

3. **JSON Data Integration:**
   ```typescript
   // Example JSON data structure for ScrollList
   const listData = {
     id: "inventory-items",
     items: [
       {
         title: "Magic Sword",
         description: "A powerful blade imbued with ancient magic",
         icon: "sword-icon",
         quantity: 1
       },
       {
         title: "Health Potion",
         description: "Restores 50 HP when consumed",
         icon: "potion-icon", 
         quantity: 5
       }
     ]
   };
   
   // Add to scroll list
   this.props.cuiGizmo.ScrollListAdd("inventory", JSON.stringify(listData));
   ```

## Minimal Example

### Basic Text Scroll Implementation
```typescript
// ScrollText.ts - Minimal scrollable text component
export class ScrollText extends BaseCustomUI {
  static propsDefinition = {
    text: { type: "string", default: "Default text content..." },
    theme: { type: "number", default: 0 }
  };

  private currentText: string = "";

  onReady() {
    this.currentText = this.props.text;
    this.setupScrollBindings();
  }

  ScrollTextSetText(text?: string) {
    this.currentText = text || this.props.text;
    this.updateScrollHeight();
  }

  private setupScrollBindings() {
    // Set up UI bindings for scrollable text display
    this.setBinding("currentText", this.currentText);
    this.updateScrollHeight();
  }

  private updateScrollHeight() {
    const lineCount = this.currentText.split('\n').length;
    const scrollHeight = Math.max(lineCount * 20, 200); // 20px per line, min 200px
    this.setBinding("scrollHeight", scrollHeight);
  }
}

// ScrollTextDemo.ts - Trigger-based controller
export class ScrollTextDemo extends BaseComponent {
  static propsDefinition = {
    trigger1: { type: "entity" },
    trigger2: { type: "entity" },
    cuiGizmo: { type: "entity" },
    text: { type: "string", default: "Alternative text content..." }
  };

  onReady() {
    if (this.props.trigger1) {
      this.props.trigger1.connectCodeBlockEvent("onPlayerEnterTrigger", () => {
        this.showDefaultText();
      });
    }

    if (this.props.trigger2) {
      this.props.trigger2.connectCodeBlockEvent("onPlayerEnterTrigger", () => {
        this.showAlternativeText();
      });
    }
  }

  private showDefaultText() {
    this.props.cuiGizmo.ScrollTextSetText();
  }

  private showAlternativeText() {
    this.props.cuiGizmo.ScrollTextSetText(this.props.text);
  }
}
```

### Advanced Scroll List Implementation  
```typescript
// ScrollList.ts - JSON-powered scroll list
export class ScrollList extends BaseCustomUI {
  static propsDefinition = {
    theme: { type: "number", default: 0 } // 0=blue, 1=green, 2=yellow
  };

  private listData: Map<string, any> = new Map();

  onReady() {
    this.setupTheme();
    this.initializeScrollList();
  }

  ScrollListAdd(id: string, data: string, player?: Player) {
    try {
      const parsedData = JSON.parse(data);
      this.listData.set(id, parsedData);
      this.refreshList();
    } catch (error) {
      console.error("ScrollList: Invalid JSON data", error);
    }
  }

  ScrollListDelete(id: string, player?: Player) {
    this.listData.delete(id);
    this.refreshList();
  }

  private setupTheme() {
    const themes = ["blue", "green", "yellow"];
    const selectedTheme = themes[this.props.theme] || "blue";
    this.setBinding("theme", selectedTheme);
  }

  private refreshList() {
    const combinedData = Array.from(this.listData.values());
    this.setBinding("listContent", combinedData);
    this.updateScrollHeight();
  }
}
```

## Limits & Constraints

### Performance Considerations
- **Text Length Limits**: Very long text content may impact rendering performance on mobile devices
- **List Item Count**: Large numbers of scroll list items can affect frame rate and memory usage
- **JSON Parsing Overhead**: Complex JSON data structures may cause performance impacts during parsing
- **Scroll Calculation Complexity**: Dynamic scroll height calculation increases with content complexity

### Technical Limitations
- **Theme Restrictions**: Limited to predefined theme options (blue, green, yellow for ScrollList)
- **Text Formatting**: Basic text scrolling has limited formatting options compared to advanced lists
- **Data Structure Requirements**: ScrollList requires specific JSON data structure format
- **Memory Management**: Large scroll lists may require manual cleanup to prevent memory leaks

### Platform Constraints  
- **Mobile Scrolling**: Touch scrolling behavior may vary across different mobile devices
- **VR Interaction**: Scroll interaction in VR requires careful design for comfort and usability
- **Cross-Platform Consistency**: Scrolling performance may vary between web, mobile, and VR platforms
- **Screen Size Adaptation**: Content must adapt appropriately to different screen sizes and aspect ratios

## Gotchas/Debugging

### Common Implementation Issues

1. **ScrollHeight Calculation Problems:**
   ```typescript
   // Incorrect - may cause content cutoff
   this.setBinding("scrollHeight", this.currentText.length);
   
   // Correct - calculate based on line breaks and font size
   private calculateScrollHeight(): number {
     const lines = this.currentText.split('\n');
     return Math.max(lines.length * this.lineHeight, this.minHeight);
   }
   ```

2. **JSON Data Format Errors:**
   ```typescript
   // Debug JSON parsing issues
   ScrollListAdd(id: string, data: string, player?: Player) {
     try {
       const parsedData = JSON.parse(data);
       console.log("ScrollList data parsed successfully:", parsedData);
       this.listData.set(id, parsedData);
     } catch (error) {
       console.error("ScrollList JSON parsing failed:", error, "Data:", data);
     }
   }
   ```

3. **Trigger Entity Reference Issues:**
   ```typescript
   // Verify entity references exist
   onReady() {
     if (!this.props.cuiGizmo) {
       console.error("ScrollTextDemo: cuiGizmo entity reference missing!");
       return;
     }
     
     if (!this.props.trigger1) {
       console.warn("ScrollTextDemo: trigger1 entity reference missing");
     }
   }
   ```

### Scroll Performance Debugging

1. **Monitor Scroll Performance:**
   ```typescript
   // Add performance monitoring
   private refreshList() {
     const startTime = performance.now();
     const combinedData = Array.from(this.listData.values());
     const endTime = performance.now();
     
     if (endTime - startTime > 16) { // More than 1 frame at 60fps
       console.warn("ScrollList refresh took", endTime - startTime, "ms");
     }
     
     this.setBinding("listContent", combinedData);
   }
   ```

2. **Content Size Validation:**
   ```typescript
   // Validate content size before processing
   ScrollTextSetText(text?: string) {
     const newText = text || this.props.text;
     
     if (newText.length > 10000) { // Arbitrary limit
       console.warn("ScrollText: Large text content may impact performance");
     }
     
     this.currentText = newText;
     this.updateScrollHeight();
   }
   ```

### Theme and Visual Debugging

1. **Theme Validation:**
   ```typescript
   // Validate theme selection
   private setupTheme() {
     const themes = ["blue", "green", "yellow"];
     const themeIndex = Math.max(0, Math.min(this.props.theme, themes.length - 1));
     
     if (themeIndex !== this.props.theme) {
       console.warn("ScrollList: Theme index clamped to valid range:", themeIndex);
     }
     
     this.setBinding("theme", themes[themeIndex]);
   }
   ```

## See Also

- **Zone 0 - Setup**: Custom UI system fundamentals and configuration
- **Zone 4 - Advanced Lists**: Complex list implementations and data management patterns  
- **Zone 5 - Animation**: UI animation and dynamic content systems
- **JSON Data Handling**: Best practices for JSON data integration in Custom UI
- **Performance Optimization**: Guidelines for optimizing scrollable UI components
- **Mobile UI Guidelines**: Design considerations for mobile scrolling interfaces
- **VR Interface Design**: VR-specific scrolling interaction patterns

## Sources

- **Primary**: [Zone 6 - Scroll Views | Custom UI Tutorial World](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-6-scroll-views)
- **Tutorial Structure**: Custom UI Tutorial World multi-zone learning experience
- **Code Examples**: Live interactive examples with ScrollText and ScrollList demonstrations
- **Component Architecture**: Dual-component pattern with UI components and controller demonstrations