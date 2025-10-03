---
title: "Module 6 - Fixed Camera and Cutscenes"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-6-fixed-camera-and-cutscenes"
last_updated: "2025-09-25T00:00:00Z"
tags:
  [
    "horizon_worlds",
    "camera",
    "scripting",
    "cutscenes",
    "animation",
    "tutorial",
  ]
summary: "Creating cutscenes using camera dolly movements, timed sequences, and environmental animations with NPCs."
tutorial: "camera-api-examples"
---

# Module 6 - Fixed Camera and Cutscenes

## What & Why

Cutscenes inject cinematic experiences into worlds using camera transitions, dolly movements, and synchronized environmental animations. This module demonstrates creating a complete cutscene sequence with camera positioning, smooth transitions between reference objects, NPC animations, and environmental interactions to tell visual stories.

## Key APIs / Concepts

- **DoorButton.ts**: Trigger script that initiates cutscene sequences
- **DoorCutScene.ts**: Main cutscene orchestration with camera and animation sequencing
- **Camera Dolly**: Smooth camera movement between two reference objects
- **Reference Objects**: `cameraStart` and `cameraEnd` entities define camera path
- **Timed Sequences**: `moveDuration` controls cutscene timing
- **Environmental Animation**: Door opening/closing and NPC emotes synchronized with camera
- **Cutscene Reset**: Camera returns to player perspective after completion

## How-To (Recipe)

1. **Set Up Reference Objects**

   - Create `cameraStart` entity positioned for initial cutscene view
   - Create `cameraEnd` entity positioned for final cutscene view
   - Position and rotate objects to frame desired scene angles

2. **Configure Trigger Button**

   - Attach `DoorButton.ts` script to trigger zone
   - Set `doorCutscene` prop to reference cutscene management entity
   - Script disables trigger during cutscene and re-enables when complete

3. **Implement Cutscene Sequencing**

   - Use `DoorCutScene.ts` for main cutscene orchestration
   - Define `playCameraAnimation()` for camera dolly movement
   - Define `playEnvironmentAnimation()` for synchronized NPC/object animations

4. **Add Cutscene Safety**
   - Enable camera reset button during cutscene for player escape
   - Implement `quitCameraAnimationForPlayer()` for emergency exit
   - Return camera to previous player perspective when complete

## Minimal Example

```typescript
// DoorButton.ts - Cutscene trigger
start() {
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player: hz.Player) => {
        if (this.props.doorCutscene !== undefined && this.props.doorCutscene !== null) {
            // Start cutscene and disable button
            this.sendLocalEvent(this.props.doorCutscene, CutsceneEvents.OnStartCutscene, {
                player,
                doorButton: this.entity
            });
            this.entity.as(hz.TriggerGizmo).enabled.set(false);
        } else {
            console.warn("DoorButton pressed, but no doorCutscene was set in the props.");
        }
    });

    // Re-enable button when cutscene completes
    this.connectNetworkEvent(this.entity, CutsceneEvents.OnCutsceneComplete, () => {
        this.entity.as(hz.TriggerGizmo).enabled.set(true);
    });
}

// DoorCutScene.ts - Main cutscene orchestration
static propsDefinition = {
    door: {type: hz.PropTypes.Entity},
    cameraStart: {type: hz.PropTypes.Entity},
    cameraEnd: {type: hz.PropTypes.Entity},
    moveDuration: {type: hz.PropTypes.Number, default: 5},
    robot: {type: hz.PropTypes.Entity},
};

start() {
    this.connectLocalEvent(this.entity, CutsceneEvents.OnStartCutscene, ({player, doorButton}) => {
        this.doorButton = doorButton;

        // Play camera animations (dolly movement)
        this.playCameraAnimation(player);

        // Play environmental animations (door, NPC)
        this.playEnvironmentalAnimation();

        // Handle emergency camera reset
        this.connectNetworkEvent(player, PlayerCameraEvents.OnCameraResetPressed, () => {
            this.quitCameraAnimationForPlayer(player);
        });
    });
}

// Camera dolly animation between reference objects
playCameraAnimation(player: hz.Player) {
    // Quick transition to start position
    this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraFixedPositionWithEntity, {
        entity: this.props.cameraStart,
        duration: DoorCutScene.MoveToStartDuration,
        easing: DoorCutScene.MoveToStartEasing,
    });

    // Smooth dolly to end position after brief delay
    setTimeout(() => {
        this.sendNetworkEvent(player, PlayerCameraEvents.SetCameraFixedPositionWithEntity, {
            entity: this.props.cameraEnd,
            duration: this.props.moveDuration,
            easing: DoorCutScene.DollyEasing,
        });
    }, DoorCutScene.MoveToStartDuration * 1000);
}
```

## Cutscene Sequence Breakdown

1. **Trigger Activation**

   - Player interacts with magic green button
   - `DoorButton.ts` emits `OnStartCutscene` event
   - Button disabled to prevent re-triggering

2. **Camera Dolly Movement**

   - Camera quickly moves to `cameraStart` reference object
   - Smooth transition to `cameraEnd` over `moveDuration` seconds
   - Creates cinematic dolly effect

3. **Environmental Animation**

   - Door opens during camera movement
   - NPC robot steps forward and emotes (thumbs up)
   - Door closes quickly after NPC action

4. **Cutscene Completion**
   - Camera returns to player's previous perspective
   - Button re-enabled for replay
   - Player control restored

## Camera Animation Properties

| Property              | Type        | Default   | Description                                  |
| --------------------- | ----------- | --------- | -------------------------------------------- |
| `cameraStart`         | `hz.Entity` | -         | Reference object for initial camera position |
| `cameraEnd`           | `hz.Entity` | -         | Reference object for final camera position   |
| `moveDuration`        | `number`    | `5`       | Time in seconds for camera dolly movement    |
| `MoveToStartDuration` | `number`    | `0.4`     | Quick transition time to start position      |
| `MoveToStartEasing`   | `Easing`    | `Linear`  | Easing for initial positioning               |
| `DollyEasing`         | `Easing`    | `EaseOut` | Easing for smooth dolly movement             |

## Environmental Animation Elements

- **Door Animation**: Opens during camera movement, closes after NPC action
- **NPC Robot**: Steps forward and performs thumbs up emote
- **Timing Coordination**: All animations synchronized with camera dolly duration
- **Object References**: `door` and `robot` entities defined in script properties

## Camera Dolly Techniques

- **Quick Setup**: Fast transition to start position (`0.4` seconds, Linear easing)
- **Smooth Movement**: Slower dolly to end position (configurable duration, EaseOut)
- **Pan Effects**: Set same rotation on start/end objects for panning motion
- **Multiple Sequences**: Chain together multiple camera movements with timeouts

## Cutscene Event System

```typescript
export const CutsceneEvents = {
  OnStartCutscene: new hz.LocalEvent<{
    player: hz.Player;
    doorButton: hz.Entity;
  }>("OnStartCutscene"),
  OnCutsceneComplete: new hz.NetworkEvent<{}>("OnCutsceneComplete"),
};
```

## Limits & Constraints

- **Timeout-Based Sequencing**: Each action wrapped in timed delays for coordination
- **Reference Object Dependency**: Camera movement requires positioned start/end entities
- **Player Control**: Locomotion disabled during cutscene for immersion
- **Reset Button Required**: Must provide escape mechanism for fixed camera modes
- **Single Player Focus**: Cutscene typically affects individual player experience

## Gotchas / Debugging

- **Reference Object Positioning**: Ensure start/end entities are properly placed and rotated
- **Timing Coordination**: Mismatched timeouts can cause animation/camera sync issues
- **NPC Emote Parameters**: Use `setAnimationParameterTrigger()` with valid emote names
- **Button Re-enablement**: Must emit `OnCutsceneComplete` to restore interactivity
- **Memory Cleanup**: Clear event listeners and timeouts when cutscene exits
- **Player Escape**: Always handle `OnCameraResetPressed` for emergency exits

## Advanced Cutscene Techniques

- **Multiple Camera Positions**: Chain additional reference objects for complex paths
- **Synchronized Sound**: Coordinate audio with camera movements and animations
- **Multiple NPCs**: Orchestrate several characters with timed emotes
- **Environmental Effects**: Integrate particle systems or lighting changes
- **Branching Sequences**: Use conditional logic for different cutscene variations

## See Also

- [Module 5 - Fixed Camera and Spectator Mode](05-fixed-camera-spectator-mode.md) - Fixed camera positioning basics
- [Module 2 - PlayerCamera Overview](02-playercamera-overview.md) - Camera events and reset button implementation
- [NPC Scripts Documentation](../npcs/npc-scripts.md) - Available emotes and NPC animation
- [Events and Triggers System](../events-triggers-system.md) - Local and network event patterns
- [Animation and Movement](../animation-movement-overview.md) - Environmental animation techniques

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/camera-api-examples-tutorial/module-6-fixed-camera-and-cutscenes (accessed 2025-09-25)
