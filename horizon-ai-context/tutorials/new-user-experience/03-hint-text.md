---
title: "Module 3 - Hint Text"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-3-hint-text"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "hint_text", "notifications", "ui_events", "trigger_zones", "nux"]
summary: "Hint text notification system using HintText.ts and HintTextTrigger.ts scripts to display adaptive UI notifications with dynamic font sizing and multiple layouts for player guidance."
tutorial: "new-user-experience"
---

# Module 3 - Hint Text

## What & Why

Hint text can be used to display notification messages to players in your game world. You can use hint text to provide reminders or nudge players toward goals and objectives with different notification layouts based on message length and whether a title is included. The hint text system is designed to be flexible and scalable for different player counts, supports multiple notification layouts and dynamic font sizing, and works on both mobile and desktop platforms.

In the NUX world, hint text displays notifications to players when they enter trigger areas.

## Key APIs / Concepts

- **HintText.ts**: Handles UI for displaying notifications with dynamic font sizing and multiple layouts
- **HintTextTrigger.ts**: Displays notification text when players enter a trigger area
- **UIEvents.notification**: Network events for communication between trigger and display components
- **Dynamic Font Sizing**: Automatic font adjustment based on message length (<50, 50-100, >100 characters)
- **Multiple UI Layouts**: Different layouts for optimal readability across scenarios
- **Countdown Timer**: Time-sensitive message display with countdown functionality
- **Player Assignment**: Component assignment to specific players via playerIndex property
- **Cross-platform Support**: Mobile and desktop UI layout adjustments

## How-To (Recipe)

1. **Create Hint Text Trigger Zone**: Navigate to Build > Gizmos, select Trigger Zone and position it
2. **Configure Trigger Script**: Attach `HintTextTrigger.ts`, set customTitle, customMessage, amountTime
3. **Create Hint Text UI Handler**: Create empty object with Custom UI gizmo
4. **Setup UI Script**: Attach `HintText.ts`, configure playerIndex (0,1,2) and font size properties
5. **Configure Advanced Features**: Set up countdown support, background colors, multiple player support
6. **Test Notification System**: Walk into triggers, verify layouts, timing, and multiplayer functionality

## Minimal Example

```typescript
// HintTextTrigger.ts properties configuration:
customTitle: "Welcome"                    // Title (optional)
customMessage: "Welcome to the world!"   // Main message content
amountTime: 5                            // Display duration in seconds

// HintText.ts properties configuration:
playerIndex: 0                           // Player assignment (0, 1, 2)
smallTitleFontSize: 28                   // Font for messages <50 chars
smallMessageFontSize: 16
normalTitleFontSize: 28                  // Font for messages 50-100 chars
normalMessageFontSize: 14
bigTitleFontSize: 28                     // Font for messages >100 chars
bigMessageFontSize: 12

// Manual notification event (from other scripts):
this.sendNetworkBroadcastEvent(UIEvents.notification, {
  player: [playerArray],
  title: 'Your Title',
  message: 'Your Message',
  time: 5,
  bgColor: '#0288d1',
});
```

## Limits & Constraints

- **Player Limit**: Supports up to 3 players by default (expandable by duplicating components)
- **Trigger Zone Dependency**: Requires Trigger Zone gizmo for automatic activation
- **Custom UI Required**: Must use Custom UI gizmo for display component
- **Network Event Based**: Uses `UIEvents.notification` broadcast events for communication
- **Font Size Thresholds**: Automatic sizing based on character count (50, 100 character breakpoints)

## Gotchas / Debugging

- **Player Index Assignment**: Must set different `playerIndex` values (0,1,2) for each player component
- **Trigger Zone Positioning**: Position trigger zones where you want notifications to appear
- **Message Length Impact**: Font sizes automatically adjust - test with different message lengths
- **Network Event Format**: Manual events must include required parameters (player, title, message, time)
- **Countdown Format**: Use "Countdown: X" message format to activate countdown timer
- **Device Detection**: System auto-adjusts for mobile vs desktop - test on both platforms

## See Also

- [Module 2 - Tutorial Manager](./02-tutorial-manager.md) - Tutorial slide system integration
- [Module 4 - Quest and Dialogue](./04-quest-and-dialogue.md) - Interactive quest systems
- [Custom UI Gizmo Guide](../../gizmos/custom-ui-gizmo.md) - Custom UI setup and configuration
- [Trigger Zone Gizmo Guide](../../gizmos/trigger-zone-gizmo.md) - Trigger zone configuration
- [Network Events Best Practices](../../typescript/events/network-events.md) - Event system patterns

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-3-hint-text (accessed 2025-09-26)