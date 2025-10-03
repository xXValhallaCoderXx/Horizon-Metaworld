---
title: "Web and Mobile Development Overview"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-1-setup"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "web_mobile",
    "cross_platform",
    "camera",
    "focused_interaction",
    "hud",
  ]
summary: "Cross-platform development concepts for creating optimal experiences on VR, web desktop, and mobile platforms in Meta Horizon Worlds."
---

# Web and Mobile Development Overview

## What & Why

Meta Horizon Worlds supports VR, web desktop, and mobile platforms. Cross-platform development ensures optimal experiences for all players regardless of device. Key considerations include UI placement, camera control, input methods, and device-specific interaction patterns.

## Key Concepts

### Platform Detection

- `player.deviceType.get() === hz.PlayerDeviceType.VR` - Detect VR players
- Web/mobile players use 2D screens vs VR 3D space
- Different UI patterns: VR popups vs screen-attached entities

### Camera Management

- **VR**: Natural head tracking, room-scale movement
- **Web/Mobile**: Camera API required for optimal viewing angles
- First-person vs third-person considerations per platform
- Fixed camera positioning for focused interactions

### Input Systems

- **VR**: Hand tracking, controller input
- **Web**: Mouse and keyboard
- **Mobile**: Touch input, focused interaction API
- Cross-platform grabbable objects

### UI Systems

- **2D Screen Space**: [-1,-1] to [1,1] coordinate system for web/mobile
- **Avatar Attachable**: Screen-attached UI elements
- **Safe Areas**: Avoid platform UI overlap (center and left side recommended)
- **HUD Systems**: Device-specific display methods

## Core APIs for Cross-Platform

### Camera API (`horizon/camera`)

```typescript
import LocalCamera from "horizon/camera";

// Must be enabled in Script Settings → API
// Requires local execution mode
// Script must be owned by target player

LocalCamera.setCameraModeThirdPerson();
LocalCamera.setCameraModeFirstPerson();
LocalCamera.setCameraModeFixed({ position, rotation });
```

### Focused Interaction API

```typescript
// Enter touch-focused mode (web/mobile only)
player.enterFocusedInteractionMode();

// Process touch inputs
hz.PlayerControls.onFocusedInteractionInputStarted;
hz.PlayerControls.onFocusedInteractionInputMoved;
hz.PlayerControls.onFocusedInteractionInputEnded;
```

### 2D UI Properties

```typescript
// Entity properties for web/mobile UI
Avatar Attachable: Anchor
Attachable By: Everyone
Anchor To: Torso
Attach to 2D Camera: Enabled

// 2D Screen coordinates (screen space)
X/Y: [-1,-1] bottom left to [1,1] top right
Z: Distance from camera
```

## System Architecture Patterns

### Manager-per-Player Pattern

```typescript
// Common pattern for cross-platform systems
class SystemManager extends hz.Component {
  start() {
    this.owningPlayer = this.entity.owner.get();
    this.ownedByServer = this.owningPlayer === this.world.getServerPlayer();
    if (this.ownedByServer) return; // Local execution only

    this.setupPlayerSpecificBehavior();
  }
}
```

### Event-Driven Cross-Platform Communication

```typescript
// Platform-agnostic event system
this.connectNetworkEvent(player, sysEvents.OnSystemAction, (data) => {
  if (player.deviceType.get() === hz.PlayerDeviceType.VR) {
    // VR-specific behavior
    this.world.ui.showPopupForPlayer(player, data.message, data.duration);
  } else {
    // Web/mobile behavior
    this.attachScreenEntity(player, data);
  }
});
```

### Puzzle Manager Pattern

```typescript
// Room-specific puzzle management with timed hints
class sysPuzzleManager extends hz.Component {
    private activePlayersList = new Array<hz.Player>();
    private isActive = false;
    private timeoutID = -1;
    private intervalID = -1;

    // Track players in room and start hint timer
    this.connectCodeBlockEvent(
        this.entity,
        hz.CodeBlockEvents.OnPlayerEnterTrigger,
        (player: hz.Player) => {
            if (!this.activePlayersList.includes(player)) {
                this.activePlayersList.push(player);
            }
            if (!this.isActive) this.startPuzzleTimer();
        }
    );
}
```

### Player Manager Integration

```typescript
// Assign platform-specific managers to players
private registerPlayer(player: hz.Player) {
    const playerIndex = player.index.get();

    // Camera Manager (one per player)
    this.cameraManagers[playerIndex].owner.set(player);

    // Focused Interaction Manager (one per player)
    this.focusedInteractionManagers[playerIndex].owner.set(player);

    // HUD Manager (shared, device-specific behavior)
    this.hudManager.registerPlayer(player);
}
```

## Development Workflow

### 1. Cross-Platform Testing Setup

- **VR**: Quest devices in VR mode
- **Web**: Desktop browser testing
- **Mobile**: Mobile browser testing
- Test UI placement and interaction patterns on all platforms

### 2. Progressive Enhancement

- Start with VR-first design
- Add web/mobile optimizations
- Test device-specific features
- Validate safe UI placement

### 3. Device-Specific Features

- **VR**: Room-scale movement, hand tracking, spatial UI
- **Web/Mobile**: Camera API, focused interaction, 2D UI systems
- **Shared**: Core gameplay mechanics, multiplayer systems

## Best Practices

### UI Design

- Keep UI in center and left screen areas (safe zones)
- Test on all target platforms during development
- Use device detection for optimal UI patterns
- Provide fallbacks for unsupported features

### Performance

- Local execution for platform-specific APIs
- One manager per player for local systems
- Efficient event-driven communication
- Minimize cross-platform differences in core gameplay

### Camera Control

- Initialize consistent camera state on world entry
- Use smooth transitions between camera modes
- Provide device-appropriate camera controls
- Fixed cameras for focused interactions

### Input Handling

- Abstract input patterns where possible
- Device-specific input processing
- Graceful fallbacks for unsupported input methods
- Multi-touch preparation for future support

## From Tutorials

- **[Web and Mobile Development Tutorial](./tutorials/web-mobile-development/01-setup.md)** - Complete 12-module tutorial covering HUD systems, camera management, focused interactions, and puzzle mechanics
- **[Camera API Examples Tutorial](./tutorials/camera-api-examples/01-setup.md)** - Camera positioning and control examples
- **[Custom UI Examples Tutorial](./tutorials/custom-ui-examples/00-setup.md)** - 2D UI development with screen-space positioning
- **[Sim Tycoon Tutorial](./tutorials/sim-tycoon/00-setup.md)** - Mobile-optimized tycoon game with performance optimization, audio compression, and battery conservation techniques

## Limits & Constraints

- **Local Execution Required**: Camera API and Focused Interaction API must run locally
- **API Module Dependencies**: Must enable specific APIs in Script Settings
- **Platform UI Overlap**: Web/mobile platform controls may obstruct custom UI
- **Multi-Touch**: Currently single-touch support, multi-touch planned
- **VR Compatibility**: Some web/mobile features not applicable to VR

## See Also

- [Camera APIs Overview](./camera-apis-overview.md) - Camera system concepts
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Local execution patterns
- [Custom UI Overview](./custom-ui-overview.md) - UI development concepts
- [Events and Triggers System](./events-triggers-system.md) - Event-driven communication

## Sources

- [Developing for Web and Mobile Players Tutorial](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/developing-for-web-and-mobile-players-tutorial/module-1-setup) (Accessed: 2025-09-25)
