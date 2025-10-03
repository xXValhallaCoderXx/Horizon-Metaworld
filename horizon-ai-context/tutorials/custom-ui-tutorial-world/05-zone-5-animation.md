---
title: Zone 5 - Animation | Custom UI Tutorial World
description: Comprehensive technical documentation of Zone 5 Animation systems from the Custom UI Tutorial World, covering hourglass spinners, timer-based spinners, and sliding banner animations with network events and trigger components
author: Horizon Worlds Context Curator
zone: 5
stations: 3
components: [Spinner, TimeSpinner, SlidingBanner]
source_url: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-5-animation
---

# Zone 5 - Animation | Custom UI Tutorial World

## What & Why

**Zone 5 - Animation** demonstrates sophisticated animated Custom UI elements that provide dynamic visual feedback and enhance user experience in Horizon Worlds. This zone showcases three distinct animation systems:

1. **Hourglass Spinner** - Simple rotational image animation controlled via network events
2. **Spinner With Timer** - Combined animation and timing system for gameplay mechanics
3. **Sliding Banner** - Horizontal scrolling text for announcements and messaging

These animation components are essential for creating engaging, responsive interfaces that communicate system state, provide feedback during timed operations, and display dynamic content to players.

## Key APIs/Concepts

### Core Animation Principles
- **Network-Controlled Animation** - All animations are triggered and controlled via network events for multiplayer synchronization
- **Property-Driven Configuration** - Animation parameters (speed, duration, appearance) configurable through component properties
- **Trigger Component Architecture** - Helper components enable spatial interaction through player trigger volumes
- **Display State Management** - Independent visibility control separate from animation state
- **Performance Optimization** - Efficient animation systems designed for real-time multiplayer environments

### Primary Scripts & Components

#### Station #12: Hourglass Spinner (`Spinner.ts`)
**Simple rotational image animation with network event control**

**Properties:**
- `image`: Image asset to be rotated 360 degrees
- `RPM`: Rotation speed in revolutions per minute (1 rotation per second default)

**Network Events:**
- `StartSpinner`: Triggers rotation with entity ID and RPM parameters
- `StopSpinner`: Stops animation with entity ID
- `SetDisplay`: Controls visibility independent of animation state

**Demo Components:**
- `StartTrigger`: Sends StartSpinner event on player entry
- `StopTrigger`: Sends StopSpinner event on player entry
- `ShowTrigger`: Sends SetDisplay with isVisible: true
- `HideTrigger`: Sends SetDisplay with isVisible: false

#### Station #13: Spinner With Timer (`TimeSpinner.ts`)
**Combined timer and spinner for gameplay mechanics like cooldowns and progress indication**

**Properties:**
- `texture`: Image asset to be rotated 360 degrees
- `timeLimit`: Timer/countdown duration in seconds
- `RPM`: Rotation speed in revolutions per minute

**Network Events:**
- `StartTimer`: Initiates timer mode with entity ID and timeLimit
- `StartCountdown`: Initiates countdown mode with entity ID and timeLimit
- `StopSpinner`: Stops both animation and timing
- `SetDisplay`: Controls visibility independent of state
- `TimeStopped`: Event sent when timer is manually stopped
- `TimeFinished`: Event sent when timer/countdown reaches timeLimit

**Demo Components:**
- `StartTimerTrigger`: Initiates timer mode on player entry
- `StartCountdownTrigger`: Initiates countdown mode on player entry
- `StopTrigger`: Stops both timer and animation

#### Station #14: Sliding Banner (`SlidingBanner.ts`)
**Horizontal scrolling text animation for announcements and messaging**

**Properties:**
- `message`: String content to display
- `fontSize`: Character size (45 minimum recommended for mobile readability)
- `textColor`: RGB color values [0.0-1.0 range]
- `backgroundColor`: RGB color values [0.0-1.0 range]
- `opacity`: Transparency level [0=clear, 1=opaque]
- `duration`: Time in seconds to scroll from right to left completely
- `padding`: Additional width in pixels added to calculated message width
- `alwaysVisible`: Whether background remains visible after animation completion

**Network Events:**
- `StartBanner`: Triggers scrolling animation with banner ID, message, and duration
- `StopBanner`: Stops animation and hides banner with banner ID
- `SetDisplay`: Controls visibility independent of animation state

**Demo Components:**
- `StartTrigger`: Initiates banner animation on player entry
- `StopTrigger`: Stops banner animation on player entry

## How-To

### Implementing Basic Spinner Animation

1. **Component Setup:**
   ```typescript
   // Spinner.ts implementation pattern
   class Spinner extends BaseCustomUI {
     static propsDefinition = {
       image: { type: "asset" },
       RPM: { type: "number", default: 60 }
     };
   }
   ```

2. **Network Event Handling:**
   ```typescript
   // Handle StartSpinner network event
   this.connectNetworkBroadcast("StartSpinner", (data) => {
     if (data.entityId === this.entity.id) {
       this.startRotation(data.RPM || this.props.RPM);
     }
   });
   ```

3. **Trigger Integration:**
   ```typescript
   // StartTrigger component pattern
   this.connectCodeBlockEvent("onPlayerEnterTrigger", () => {
     this.sendNetworkBroadcast("StartSpinner", {
       entityId: this.props.spinner_CUI.id,
       RPM: this.props.overrideRPM || 0
     });
   });
   ```

### Implementing Timer-Based Animation

1. **Dual-Mode Architecture:**
   ```typescript
   // TimeSpinner.ts supports both timer and countdown modes
   class TimeSpinner extends BaseCustomUI {
     static propsDefinition = {
       texture: { type: "asset" },
       timeLimit: { type: "number", default: 10 },
       RPM: { type: "number", default: 60 }
     };
   }
   ```

2. **Timer Completion Handling:**
   ```typescript
   // Send completion events
   this.connectNetworkBroadcast("TimeFinished", (data) => {
     // Handle timer completion logic
   });
   ```

### Implementing Sliding Banner System

1. **Text Animation Configuration:**
   ```typescript
   // SlidingBanner.ts with comprehensive property support
   class SlidingBanner extends BaseCustomUI {
     static propsDefinition = {
       message: { type: "string", default: "Default Message" },
       fontSize: { type: "number", default: 45 },
       textColor: { type: "color", default: [1, 1, 1] },
       backgroundColor: { type: "color", default: [0, 0, 0] },
       opacity: { type: "number", default: 1 },
       duration: { type: "number", default: 5 },
       padding: { type: "number", default: 0 },
       alwaysVisible: { type: "boolean", default: false }
     };
   }
   ```

2. **Dynamic Message Override:**
   ```typescript
   // StartTrigger with message customization
   this.sendNetworkBroadcast("StartBanner", {
     bannerId: this.props.banner_CUI.id,
     message: this.props.customMessage || "",
     duration: this.props.customDuration || 0
   });
   ```

## Minimal Example

### Basic Spinner Implementation
```typescript
// Spinner.ts - Core animation component
export class Spinner extends BaseCustomUI {
  static propsDefinition = {
    image: { type: "asset" },
    RPM: { type: "number", default: 60 }
  };

  onReady() {
    // Network event listeners
    this.connectNetworkBroadcast("StartSpinner", (data) => {
      if (data.entityId === this.entity.id) {
        this.startRotation(data.RPM || this.props.RPM);
      }
    });

    this.connectNetworkBroadcast("StopSpinner", (data) => {
      if (data.entityId === this.entity.id) {
        this.stopRotation();
      }
    });

    this.connectNetworkBroadcast("SetDisplay", (data) => {
      if (data.entityId === this.entity.id) {
        this.setVisible(data.isVisible);
      }
    });
  }

  startRotation(rpm: number) {
    // Animation implementation
  }

  stopRotation() {
    // Stop animation
  }
}

// StartTrigger.ts - Spatial activation component
export class StartTrigger extends BaseComponent {
  static propsDefinition = {
    spinner_CUI: { type: "entity" },
    overrideRPM: { type: "number", default: 0 }
  };

  onReady() {
    this.connectCodeBlockEvent("onPlayerEnterTrigger", () => {
      this.sendNetworkBroadcast("StartSpinner", {
        entityId: this.props.spinner_CUI.id,
        RPM: this.props.overrideRPM || 0
      });
    });
  }
}
```

### Timer Spinner with Completion Events
```typescript
// TimeSpinner.ts with timer integration
export class TimeSpinner extends BaseCustomUI {
  static propsDefinition = {
    texture: { type: "asset" },
    timeLimit: { type: "number", default: 10 },
    RPM: { type: "number", default: 60 }
  };

  onReady() {
    this.connectNetworkBroadcast("StartTimer", (data) => {
      if (data.entityId === this.entity.id) {
        this.startTimer(data.timeLimit || this.props.timeLimit);
      }
    });
  }

  startTimer(timeLimit: number) {
    // Start both animation and timer
    this.timer = setTimeout(() => {
      this.sendNetworkBroadcast("TimeFinished", {
        entityId: this.entity.id
      });
    }, timeLimit * 1000);
  }
}
```

## Limits & Constraints

### Performance Considerations
- **Animation Frequency**: Limit concurrent animated elements to maintain frame rate
- **Network Event Volume**: Batch network events when possible to reduce network overhead
- **Mobile Optimization**: Use minimum font size of 45 for banner text readability on mobile devices
- **Memory Management**: Properly dispose of animation timers and event listeners

### Technical Limitations
- **Color Range**: RGB color values must be in 0.0-1.0 range, not 0-255
- **Duration Precision**: Animation durations may vary slightly across different devices
- **Text Overflow**: Sliding banner message length should be tested across different screen sizes
- **Network Synchronization**: Animation timing may vary in high-latency network conditions

### Platform Constraints
- **Mobile Performance**: Complex animations may impact performance on lower-end mobile devices
- **VR Considerations**: Rapid animations may cause discomfort in VR; test rotation speeds carefully
- **Cross-Platform Consistency**: Animation timing may vary between VR, mobile, and web platforms

## Gotchas/Debugging

### Common Implementation Issues

1. **Missing Entity Linking**: Ensure trigger components have properly linked CUI entities
   ```typescript
   // Verify entity reference exists
   if (!this.props.spinner_CUI) {
     console.error("spinner_CUI entity not linked!");
     return;
   }
   ```

2. **Network Event ID Mismatch**: Verify entity IDs match between senders and receivers
   ```typescript
   // Debug network event data
   console.log("StartSpinner received:", data);
   console.log("My entity ID:", this.entity.id);
   ```

3. **Animation State Conflicts**: Handle overlapping start/stop commands gracefully
   ```typescript
   // Clear existing animation before starting new one
   if (this.currentAnimation) {
     this.stopRotation();
   }
   this.startRotation(rpm);
   ```

### Trigger Component Debugging

1. **Trigger Volume Issues**: Verify trigger volumes are properly sized and positioned
2. **Multiple Triggers**: Handle rapid trigger entries/exits appropriately
3. **Player Detection**: Ensure `onPlayerEnterTrigger` events are properly configured

### Banner-Specific Issues

1. **Text Rendering**: Very long messages may exceed expected rendering bounds
2. **Color Configuration**: RGB values outside 0.0-1.0 range cause rendering issues
3. **Duration Calculation**: Account for message length when setting scroll duration

### Performance Debugging

1. **Monitor Frame Rate**: Watch for drops when multiple animations are active
2. **Network Traffic**: Monitor network event frequency during testing
3. **Memory Usage**: Check for memory leaks in timer-based components

## See Also

- **Zone 0 - Setup**: Custom UI system fundamentals and configuration
- **Zone 2 - Basics**: Basic UI component patterns and timer systems
- **Zone 3 - Bars**: Progress indication and visual feedback systems
- **Zone 4 - Advanced Lists**: Complex component architectures and data handling
- **Custom UI API Documentation**: Complete Custom UI system reference
- **Network Events Guide**: Best practices for network event handling
- **Performance Optimization**: Guidelines for efficient UI animation systems

## Sources

- **Primary**: [Zone 5 - Animation | Custom UI Tutorial World](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-5-animation)
- **Tutorial Structure**: Custom UI Tutorial World multi-zone learning experience
- **Code Examples**: Live interactive examples in tutorial world environment
- **Component Demonstrations**: Working implementations with trigger activation systems