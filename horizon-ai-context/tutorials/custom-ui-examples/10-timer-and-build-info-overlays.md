---
title: "Station 10 - Timer and Build Info Overlays"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-10-timer-and-build-info-overlays"
last_updated: "2025-09-25"
tags:
  ["horizon_worlds", "custom_ui", "screen_overlay", "hud", "timer", "popups"]
tutorial: "custom-ui-examples"
summary: "Demonstrates non-interactive screen overlays (HUDs) with two examples: a simple build info display and a countdown timer game with win/lose conditions using native popup messages."
---

# Station 10 - Timer and Build Info Overlays

## What & Why

This station introduces **non-interactive screen overlays** that function as Head-Up Displays (HUDs) positioned in front of the player. Two examples demonstrate overlay capabilities: a simple build info display and a countdown timer game where players must find and trigger a button before time expires, with sound effects and native popup feedback for win/lose states.

## Key APIs / Concepts

- **Screen Overlay Mode**: Custom UI display type for non-interactive HUDs
- **Absolute Positioning**: Required positioning style with `position: "absolute"`
- **Screen Coordinates**: `left`, `right`, `top`, `bottom` properties for pixel-based positioning
- **Native Popups**: `world.ui.showPopupForEveryone()` for system UI messages
- **Timer Functions**: `setInterval()` and `clearInterval()` for countdown timers
- **Network Events**: Cross-script communication for timer control
- **Audio Integration**: `AudioGizmo.play()` for sound effects
- **Display Control**: `display: "none"/"flex"` for show/hide functionality

## How-To (Recipe)

1. **Set Custom UI to Screen Overlay**: Change Display Mode property from default to "Screen Overlay"
2. **Configure Absolute Positioning**: Set `position: "absolute"` in top-level View style
3. **Position on Screen**: Use `left`, `bottom`, etc. for pixel distance from screen edges
4. **Remove Panel Dimensions**: `panelHeight` and `panelWidth` properties don't apply to overlays
5. **Create Script Properties**: Define configurable values in `propsDefinition`
6. **Set Up Bindings**: Use `Binding<string>` for dynamic UI content updates
7. **Handle Player Events**: Connect to `OnPlayerEnterWorld` for initialization
8. **Implement Timer Logic**: Use interval functions with tick actions and end callbacks
9. **Add Audio Feedback**: Reference sound entities for timer ticks and game events
10. **Display Native Messages**: Use `showPopupForEveryone()` for win/lose notifications

## Minimal Example

### Basic Build Info Overlay

```typescript
import { UIComponent, View, Text, Binding } from "horizon/ui";

class BuildInfoOverlay extends UIComponent {
  static propsDefinition = {
    buildMessage: { type: hz.PropTypes.String },
    buildNumber: { type: hz.PropTypes.String },
    enabled: { type: hz.PropTypes.Boolean, default: true },
  };

  strBuildMessage = new Binding<string>("Build:");
  strBuildNumber = new Binding<string>("1.0.0");
  strDisplay = new Binding<string>("flex");

  initializeUI() {
    // Set values from properties
    if (!this.props.enabled) {
      this.strDisplay.set("none");
    }
    if (this.props.buildMessage) {
      this.strBuildMessage.set(this.props.buildMessage);
    }
    if (this.props.buildNumber) {
      this.strBuildNumber.set(this.props.buildNumber);
    }

    return View({
      children: [
        Text({ text: this.strBuildMessage }),
        Text({ text: this.strBuildNumber }),
      ],
      style: {
        position: "absolute", // Required for screen overlay
        display: this.strDisplay,
        flexDirection: "row",
        left: 4, // 4px from left edge
        bottom: 4, // 4px from bottom edge
      },
    });
  }
}
```

### Timer Overlay with Game Logic

```typescript
class TimerOverlay extends UIComponent {
  static propsDefinition = {
    StartTimerSecs: { type: hz.PropTypes.String, default: 20 },
    soundTick: { type: hz.PropTypes.Entity },
    soundGameOver: { type: hz.PropTypes.Entity },
  };

  strPlayerName = new Binding<string>("");
  intTimeRemainingSecs = new Binding<string>("0");
  countdownTimerID: number = 0;

  initializeUI() {
    return View({
      children: [
        Text({ text: this.strPlayerName }),
        Text({
          text: this.intTimeRemainingSecs,
          style: { color: "red", fontSize: 36 },
        }),
      ],
      style: {
        position: "absolute",
        left: 36,
        bottom: 36,
        backgroundColor: new hz.Color(0.26, 0.53, 0.96),
      },
    });
  }

  start() {
    // Start timer when player enters world
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) => {
        this.strPlayerName.set(player.name.get());
        this.startCountdown(Number(this.props.StartTimerSecs));
      }
    );
  }

  private startCountdown(seconds: number) {
    this.countdownTimerID = this.async.setInterval(() => {
      if (seconds > 0) {
        this.intTimeRemainingSecs.set(seconds.toString());
        this.props.soundTick?.as(hz.AudioGizmo)?.play();
        seconds--;
      } else {
        this.gameOver();
        this.async.clearInterval(this.countdownTimerID);
      }
    }, 1000);
  }
}
```

## Station Components

### Build Info Overlay (Simple)

- **Purpose**: Display configurable build information on screen
- **Properties**: `enabled`, `buildMessage`, `buildNumber` (from Properties panel)
- **Features**: Show/hide toggle, property-to-binding mapping
- **Position**: Lower-left corner (4px margins)

### Timer Overlay (Complex Game Logic)

- **Purpose**: Countdown timer game with win/lose conditions
- **Components**: Timer display, player name, trigger zone button
- **Game Flow**: Start on world entry → countdown with audio ticks → win (button pressed) or lose (time expires)
- **Feedback**: Native popups for game results + sound effects

## Screen Overlay Configuration

### Required Style Properties

```typescript
style: {
    position: "absolute",        // CRITICAL: Required for screen overlay
    left: 36,                   // Distance from left edge in pixels
    bottom: 36,                 // Distance from bottom edge in pixels
    // top: 20,                 // Alternative: distance from top
    // right: 20,               // Alternative: distance from right
}
```

### Safe Screen Positioning

- **Recommended**: Lower-left corner (safest across platforms)
- **Mobile Considerations**: Avoid areas with action buttons or controls
- **Platform Differences**: Mobile has on-screen controls, VR/desktop do not

### Display Mode Differences

| Property           | Spatial Custom UI     | Screen Overlay     |
| ------------------ | --------------------- | ------------------ |
| `panelHeight`      | Used                  | Ignored            |
| `panelWidth`       | Used                  | Ignored            |
| `position`         | Not required          | Must be "absolute" |
| Physical placement | World coordinates     | Screen coordinates |
| Interaction        | Via proximity/trigger | Non-interactive    |

## Timer Implementation Pattern

### Interval-Based Timer Function

```typescript
function fctnTimedIntervalAction(
  timerMS: number,
  component: hz.Component,
  onTickAction: (timerMS: number) => void,
  onEndAction: () => void
): number {
  let timerID = component.async.setInterval(() => {
    if (timerMS > 0) {
      onTickAction(timerMS);
      timerMS -= 1000;
    } else {
      onEndAction();
      component.async.clearInterval(timerID);
    }
  }, 1000);
  return timerID;
}
```

### Network Event Communication

```typescript
// Define events for cross-script communication
export const TimerEnd = new hz.NetworkEvent<{ timeMS: number }>("TimerEnd");

// Send event (from trigger zone script)
this.sendNetworkBroadcastEvent(TimerEnd, { timeMS: -1 });

// Listen for event (in timer script)
this.connectNetworkBroadcastEvent(TimerEnd, (data: { timeMS: number }) => {
  this.async.clearInterval(this.countdownTimerID);
  if (data.timeMS == -1) {
    this.fctnGameWin();
  }
});
```

## Native Popup Integration

### Popup Configuration

```typescript
myPopupOptions: hz.PopupOptions = {
  position: new hz.Vec3(0, -0.5, 0),
  fontSize: 18,
  fontColor: new hz.Color(0, 0, 0),
  backgroundColor: new hz.Color(0.26, 0.53, 0.96), // Light blue
  playSound: false,
  showTimer: false,
};

// Display popup
this.world.ui.showPopupForEveryone("You win!", 3, this.myPopupOptions);
```

## Limits & Constraints

- **Non-Interactive**: Screen overlays cannot receive direct user input
- **No Panel Dimensions**: `panelHeight`/`panelWidth` properties ignored
- **Platform UI Conflicts**: Mobile action buttons may interfere with overlay positioning
- **Absolute Positioning Required**: Must use `position: "absolute"` in top-level View
- **Safe Areas**: Consider platform-specific safe zones for optimal UX

## Gotchas / Debugging

- **Missing position: "absolute"**: Overlay won't display correctly without this style property
- **Panel Dimension Confusion**: Remove unused `panelHeight`/`panelWidth` from screen overlay scripts
- **Mobile Collision**: Test overlay placement on mobile to avoid control button conflicts
- **Timer Cleanup**: Always `clearInterval()` to prevent memory leaks
- **Sound Entity References**: Verify sound entities exist and are properly referenced in Properties
- **Display Toggle**: Use `display: "none"/"flex"` for show/hide, not visibility changes

## Audio Integration Pattern

```typescript
static propsDefinition = {
    soundTick: {type: hz.PropTypes.Entity},
    soundGameWin: {type: hz.PropTypes.Entity},
};

// Play sound with null checking
let tickSound = this.props.soundTick?.as(hz.AudioGizmo);
if (tickSound) {
    tickSound.play();
} else {
    console.warn("No selected sound for soundTick property.");
}
```

## See Also

- [Safe Placement of UI Controls](/horizon-worlds/learn/documentation/create-for-web-and-mobile/designing-worlds-for-mobile-and-web/safe-placement-of-ui-controls/) - Platform-specific positioning guidelines
- [Station 7 - Persistent Variables](07-persistent-variables.md) - Network event patterns
- [Custom UI Overview](../../custom-ui-overview.md) - Core custom UI concepts
- Native UI API Reference - Popup styling options

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-10-timer-and-build-info-overlays (accessed 2025-09-25)
