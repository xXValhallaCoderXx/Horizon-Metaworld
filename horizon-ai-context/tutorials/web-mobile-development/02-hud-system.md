---
title: "Module 2 - The HUD System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-2-the-hud-system"
last_updated: "2025-09-25T00:00:00Z"
tags: ["horizon_worlds", "web_mobile", "tutorial", "hud", "ui", "events"]
tutorial: "web-mobile-development"
summary: "Build a cross-platform HUD system for displaying hints to players, with different behavior for VR (popups) versus web/mobile (screen-attached entities)."
---

# Module 2 - The HUD System

## What & Why

HUD (Heads-Up Display) systems provide guidance and tips to help players solve challenges. This module builds a cross-platform HUD that displays hints differently based on device type: VR players get popups while web/mobile players get screen-attached entities with custom positioning.

## Key APIs / Concepts

- `AttachableEntity` - Entities that can be attached to players
- `Avatar Attachable` property - Makes entities attachable to players
- `Attach to 2D Camera` - Enables screen-space positioning for web/mobile
- `2D Screen properties` - X/Y screen coordinates ([-1,-1] to [1,1])
- `player.deviceType.get()` - Detect VR vs web/mobile players
- `setVisibilityForPlayers()` - Control which players can see entities
- `this.world.ui.showPopupForPlayer()` - VR-specific popup system
- `hz.LocalEvent` / `hz.NetworkEvent` - Event-driven communication

## How-To (Recipe)

1. **Configure HUD Entity Properties**
   - Set `Avatar Attachable` to `Anchor`
   - Set `Attachable By` to `Everyone`
   - Set `Anchor To` to `Torso`
   - Enable `Attach to 2D Camera` for web/mobile compatibility

2. **Set Up 2D Screen Positioning**
   - Use X/Y coordinates in screen space ([-1,-1] bottom left, [1,1] top right)
   - Keep UI in center and left side to avoid platform UI overlap
   - Test on all platforms for visibility

3. **Create HUD Entity Script (`sysHintHUDEntity`)**
   - Import events: `import {sysEvents} from 'sysEvents'`
   - Hide entity by default: `setVisibilityForPlayers([], hz.PlayerVisibilityMode.VisibleTo)`
   - Register with manager: `sendLocalBroadcastEvent(sysEvents.OnRegisterHintHUDEntity, {...})`
   - Provide text update method: `UpdateHintHUDText(text: string)`

4. **Create HUD Manager Script (`sysHintHUDManager`)**
   - Listen for registration events in `preStart()`
   - Handle display events: different behavior for VR vs web/mobile
   - Manage HUD attachment/detachment and visibility
   - Implement timeout system for auto-hiding

5. **Create One HUD per Player**
   - Place one HUD entity for each possible player in world
   - Use player index to assign correct HUD to each player

## Minimal Example

### HUD Entity Script
```typescript
import * as hz from 'horizon/core';
import {sysEvents} from 'sysEvents';

export class sysHintHUDEntity extends hz.Component {
    static propsDefinition = {
        Text: {type: hz.PropTypes.Entity},
    };

    start() {
        // Hide entity by default
        this.entity.setVisibilityForPlayers([], hz.PlayerVisibilityMode.VisibleTo);
        
        // Register with manager
        this.sendLocalBroadcastEvent(sysEvents.OnRegisterHintHUDEntity, {
            HUDEntity: this.entity,
            HUDComponent: this,
        });
    }

    public UpdateHintHUDText(text: string) {
        this.props.Text?.as(hz.TextGizmo)?.text.set(text);
    }
}
```

### Display HUD Event
```typescript
this.sendNetworkBroadcastEvent(sysEvents.OnDisplayHintHUD, {
    players: [player],
    text: "This is an example hint",
    duration: 5,
});
```

## System Architecture

| Component | Responsibility |
|-----------|----------------|
| **HUD Entity** | Individual HUD objects attached to players |
| **HUD Manager** | Coordinates HUD display, manages visibility and timing |
| **Events System** | Communication between components |
| **Puzzle Manager** | Triggers hint displays based on gameplay |

### Event Flow
1. **Registration**: HUD entities register with manager on startup
2. **Display Request**: Other systems broadcast `OnDisplayHintHUD` event
3. **Device Detection**: Manager checks player device type
4. **Display**: VR gets popup, web/mobile gets attached HUD entity
5. **Timeout**: HUD automatically hides after specified duration

## 2D Screen Coordinate System

- **[0, 0]** - Center of screen
- **[-1, -1]** - Bottom left corner
- **[1, 1]** - Top right corner
- **Z coordinate** - Distance from camera

## Limits & Constraints

- One HUD entity required per possible player in world
- HUD positioning limited to available screen space
- Platform UI elements may obstruct certain screen areas
- Event timing: Manager must start listening before entities send registration events
- VR players get popups instead of screen-attached HUDs

## Gotchas / Debugging

- **Event Sequence**: Manager's `preStart()` must set up listeners before entities' `start()` sends events
- **Screen Safe Areas**: Test on all platforms - keep UI in center/left to avoid platform button overlap
- **Entity Visibility**: Default visibility must be set to empty array, manager controls per-player visibility
- **Player Index**: Use `player.index.get()` to assign correct HUD entity to each player
- **Device Detection**: Check `player.deviceType.get() === hz.PlayerDeviceType.VR` for platform-specific behavior

## See Also

- [2D UI for Web and Mobile](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/2d-ui-for-web-and-mobile) - 2D UI implementation details
- [Safe Placement of UI Controls](https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/designing-worlds-for-mobile-and-web/safe-placement-of-ui-controls/) - UI positioning best practices
- [Events System](../events-triggers-system.md) - Event-driven communication patterns
- [Local Events](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/local-events) - Local event documentation

## Sources

- [Developing for Web and Mobile Players Tutorial - Module 2 The HUD System](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-2-the-hud-system) (Accessed: 2025-09-25)
- [LocalEvent API](https://horizon.meta.com/resources/scripting-api/core.localevent.md/?api_version=2.0.0)
- [NetworkEvent API](https://horizon.meta.com/resources/scripting-api/core.networkevent.md/?api_version=2.0.0)
- [Player.DeviceType API](https://horizon.meta.com/resources/scripting-api/core.player.devicetype.md/?api_version=2.0.0)