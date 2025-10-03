# Tutorial Progression System Setup Guide

## System Overview

This system implements a two-spawn-point tutorial progression:

1. **New players** spawn at the **Tutorial Spawn Point**
2. After completing the tutorial (entering a trigger zone), they are:
   - Marked as "tutorial complete"
   - Teleported to the **Main Spawn Point**
3. **Returning players** (who already completed tutorial) spawn directly at the **Main Spawn Point**

## Setup Instructions

### 1. Create Spawn Points

In Horizon Worlds Desktop Editor:

1. **Tutorial Spawn Point**
   - Create a Spawn Point Gizmo in the tutorial area
   - Name it something like "Tutorial_Spawn"
2. **Main Spawn Point**
   - Create a Spawn Point Gizmo in the main play area
   - Name it something like "Main_Spawn"

### 2. Create Tutorial Completion Trigger

1. Create a new **Empty Object** or **Cube**
2. Add a **Trigger** component to it
3. Set the trigger size to cover the area where players complete the tutorial
4. Position it at the end of your tutorial path
5. Name it something like "Tutorial_Completion_Trigger"

### 3. Configure PlayerManager

1. Select the entity with the `PlayerManager` script
2. In the **Properties Panel**, assign:
   - **tutorialSpawnPoint** → Drag your Tutorial_Spawn entity here
   - **mainSpawnPoint** → Drag your Main_Spawn entity here

### 4. Configure TutorialManager

1. Select the entity with the `TutorialManager` script
2. In the **Properties Panel**, assign:
   - **playerManager** → Drag the PlayerManager entity here
   - **messageText** → Drag your Text Gizmo entity (for messages)
   - **welcomeSound** → Drag your Audio Gizmo (for welcome sound)
   - **completionTrigger** → Drag your Tutorial_Completion_Trigger entity here
   - **mainSpawnPoint** → Drag your Main_Spawn entity here

## How It Works

### Player Flow

```
Player Joins World
    ↓
Has Tutorial Complete?
    ↓ NO                        ↓ YES
Tutorial Spawn          Main Spawn
    ↓
Welcome Message
    ↓
Player walks through tutorial
    ↓
Enters Completion Trigger
    ↓
"Tutorial Complete!" message
    ↓
Teleport to Main Spawn
    ↓
Marked as "Complete"
    ↓
(Next time: spawns at Main)
```

### Event Communication

1. **PlayerManager** broadcasts `PlayerJoined` event when players enter
2. **TutorialManager** listens and shows welcome message to new players
3. **TutorialManager** broadcasts `TutorialCompleted` when player enters trigger
4. **PlayerManager** listens and marks player as completed

### State Management

- Tutorial completion state is stored **in memory** (resets when scripts reload)
- Players are tracked by their player ID
- State persists during the current session
- **Note**: State does NOT persist across world reloads (see Future Enhancements)

## Testing

1. **First Time Player Flow**:

   - Enter Preview mode
   - Should spawn at Tutorial Spawn Point
   - Should see "Hello World" welcome message
   - Walk to the completion trigger
   - Should see "Tutorial Complete!" message
   - Should teleport to Main Spawn Point

2. **Returning Player Flow**:

   - After completing tutorial once (without reloading scripts)
   - Exit and re-enter preview mode
   - Should spawn directly at Main Spawn Point

3. **Console Logs**:
   - Check the Console tab in Desktop Editor for debug messages:
     - `[PlayerManager] Reset <player> to tutorial spawn point`
     - `[PlayerManager] Reset <player> to main spawn point`
     - `[TutorialManager] <player> completed tutorial!`

## Customization Ideas

### Extend Tutorial Steps

Add multiple tutorial steps in `TutorialManager`:

```typescript
private showTutorialSteps(player: Player) {
    this.showTutorialStep(player, "Step 1: Look around!", 5000);
    this.async.setTimeout(() => {
        this.showTutorialStep(player, "Step 2: Try moving!", 5000);
    }, 5500);
}
```

### Add Multiple Completion Triggers

Set up a sequence of triggers:

```typescript
static propsDefinition = {
    completionTrigger1: { type: PropTypes.Entity },
    completionTrigger2: { type: PropTypes.Entity },
    completionTrigger3: { type: PropTypes.Entity },
};

// Track completion steps
private completedSteps = new Map<number, number>();
```

### Visual Feedback

Add particle effects or audio when completing tutorial:

```typescript
private onTutorialComplete(player: Player) {
    // Play celebration sound
    // Spawn confetti particles
    // Update UI
}
```

## Future Enhancements

### Persistent Storage

To save tutorial completion across sessions, use Horizon's PlayerStorage API:

```typescript
// Save completion
this.world.playerStorage.set(player, "tutorialComplete", "true");

// Check completion
const completed = this.world.playerStorage.get(player, "tutorialComplete");
```

### Tutorial Progress Tracking

Track individual tutorial step completion:

```typescript
private tutorialProgress = new Map<number, {
    step1: boolean,
    step2: boolean,
    step3: boolean
}>();
```

### Skip Tutorial Option

Add a button/trigger to skip tutorial for experienced players:

```typescript
private onSkipTutorial(player: Player) {
    this.markTutorialComplete(player);
    this.teleportToMainArea(player);
}
```

## Troubleshooting

### Players Always Spawn at Tutorial

- Check that `mainSpawnPoint` is assigned in PlayerManager properties
- Verify tutorial completion trigger is properly set up
- Check console for "Tutorial marked complete" message

### Completion Trigger Not Working

- Ensure trigger entity has a Trigger component
- Verify `completionTrigger` is assigned in TutorialManager properties
- Check trigger size covers the intended area

### Players Spawn at Wrong Location After World Reload

- This is expected - tutorial completion state resets on script reload
- Implement persistent storage (see Future Enhancements) to fix this

### Text Messages Not Showing

- Verify `messageText` is assigned to a Text Gizmo entity
- Check that Text Gizmo is visible in the world
- Ensure text color contrasts with background

## Script Files

- **PlayerManager.ts** - Handles player tracking, spawn logic, tutorial state
- **TutorialManager.ts** - Manages tutorial messages, completion, teleportation
- **Teleporter.ts** - Basic teleporter (for moving around main area)

## Notes

- Tutorial state is session-based (resets when scripts reload)
- Both spawn points must be SpawnPointGizmo entities
- Completion trigger needs a Trigger component
- Welcome message auto-dismisses after 3 seconds
- Tutorial completion message auto-dismisses after 3 seconds
- Player teleports 1 second after completion message appears
