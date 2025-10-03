# Player Manager & Tutorial Manager Setup Guide

This guide will help you set up the PlayerManager and TutorialManager scripts in your Horizon Worlds project.

## Overview

You now have two essential management scripts:

1. **PlayerManager** - Tracks all players entering/leaving your world
2. **TutorialManager** - Displays welcome messages and tutorial content to players

## Files Created

- `PlayerManager.ts` - Player tracking and management system
- `TutorialManager.ts` - Tutorial and message display system

## Setup Instructions

### Step 1: Set Up PlayerManager

1. **Open Horizon Worlds Desktop Editor**
2. **Create an Empty Object** for the PlayerManager:

   - Go to **Build** > **Objects** > **Empty Object**
   - Name it "PlayerManager"
   - Position it anywhere (it doesn't need to be visible)

3. **Attach the PlayerManager Script**:
   - Select the PlayerManager object
   - In the **Properties Panel**, click **Add Script**
   - Select **PlayerManager.ts** from your scripts list
   - The script has no properties to configure - it's ready to go!

### Step 2: Set Up TutorialManager

1. **Create an Empty Object** for the TutorialManager:

   - Go to **Build** > **Objects** > **Empty Object**
   - Name it "TutorialManager"

2. **Create a Text Gizmo** for displaying messages:

   - Go to **Build** > **Gizmos** > **Text**
   - Name it "WelcomeText"
   - Position it where players will see it (e.g., at the spawn point)
   - **Important:** In the Text Gizmo properties, set **Visible** to **false** (unchecked)
   - Customize the text style, size, and color as desired

3. **Create an Audio Gizmo** for the welcome sound:

   - Go to **Build** > **Gizmos** > **Audio**
   - Name it "WelcomeSound"
   - Position it near the spawn point (or attach to TutorialManager object)
   - In the Audio Gizmo properties:
     - Click **Add Asset** and select your sound file
     - Set **Play on Start** to **false** (unchecked) - we'll trigger it from the script
     - Adjust **Volume**, **Pitch**, and **Spatial Audio** settings as desired

4. **Attach the TutorialManager Script**:

   - Select the TutorialManager object
   - In the **Properties Panel**, click **Add Script**
   - Select **TutorialManager.ts** from your scripts list

5. **Configure TutorialManager Properties**:
   - **playerManager**: Drag the PlayerManager entity into this field
   - **messageText**: Drag the WelcomeText gizmo into this field
   - **welcomeSound**: Drag the WelcomeSound audio gizmo into this field

### Step 3: Test Your Setup

1. **Enter Preview Mode** in the Desktop Editor
2. **Watch the Console Tab** for log messages:
   ```
   [PlayerManager] Initialized
   [TutorialManager] Initialized
   [PlayerManager] Player joined: YourName (ID: 123456789)
   [PlayerManager] Total players: 1
   [TutorialManager] Showing welcome message to YourName
   [TutorialManager] Welcome sound played for YourName
   [TutorialManager] Welcome message shown to YourName
   ```
3. **You should see** "Hello World! Welcome to the experience!" appear as text in the world
4. **You should hear** your welcome sound play
5. **After 3 seconds**, the message will automatically disappear

## How It Works

### Event Flow

1. When a player enters the world, **PlayerManager** detects it via `CodeBlockEvents.OnPlayerEnterWorld`
2. PlayerManager logs the player info and adds them to its tracking map
3. PlayerManager sends a **LocalEvent** called "PlayerJoined" to notify other systems
4. **TutorialManager** listens for this event from the PlayerManager entity
5. When received, TutorialManager:
   - Shows the welcome message using the Text Gizmo
   - Plays the welcome sound for that specific player only
6. After 3 seconds, the message is hidden automatically

### Architecture Benefits

- **Separation of Concerns**: PlayerManager handles tracking, TutorialManager handles UI
- **Event-Driven**: Systems communicate via LocalEvents (loosely coupled)
- **Scalable**: Easy to add more systems that react to player join events
- **Reusable**: PlayerManager can be used by any other system that needs player tracking

## Next Steps

### Expand the TutorialManager

The TutorialManager includes a `showTutorialStep()` method for future use:

```typescript
// Example: Show a custom message to a player
tutorialManager.showTutorialStep(player, "Press A to jump!", 5000);
```

You can enhance this by:

- Creating multiple tutorial steps triggered by different events
- Adding tutorial progress tracking with player data
- Creating interactive tutorial quests
- Implementing skip/replay functionality

### Use PlayerManager Data

Other scripts can access PlayerManager's public methods:

```typescript
// Get the PlayerManager component from your entity prop
const pmComponent = this.props.playerManager?.as(PlayerManager);

if (pmComponent) {
  // Get all active players
  const players = pmComponent.getActivePlayers();

  // Get total player count
  const count = pmComponent.getPlayerCount();

  // Get specific player by ID
  const player = pmComponent.getPlayerById(playerId);
}
```

### Custom UI Alternative

If you want more advanced UI (buttons, panels, images), you can replace the Text Gizmo with a **Custom UI Gizmo** and use the Horizon UI framework. See `horizon-ai-context/custom-ui-overview.md` for details.

## Troubleshooting

### Message doesn't appear

- Check that the WelcomeText gizmo is assigned in TutorialManager properties
- Verify the text is positioned where your player spawns
- Check the Console tab for error messages

### Sound doesn't play

- Ensure the welcomeSound audio gizmo is assigned in TutorialManager properties
- Verify an audio asset is added to the Audio Gizmo
- Check that "Play on Start" is **disabled** in the Audio Gizmo properties
- Increase the volume if the sound is too quiet
- Check if Spatial Audio is enabled - position the audio gizmo closer if needed

### PlayerJoined event not firing

- Ensure playerManager entity is assigned in TutorialManager properties
- Verify both scripts are attached to their respective entities
- Check that both Empty Objects exist in the world hierarchy

### Multiple messages show at once

- This is normal in multiplayer - each player sees their own message
- To show player-specific messages, you'll need to implement per-player Custom UI (see Custom UI documentation)

## Files Reference

- **PlayerManager.ts** - Main player tracking system
- **TutorialManager.ts** - Tutorial and message display
- **horizon-ai-context/local-events-overview.md** - LocalEvent documentation
- **horizon-ai-context/typescript-development-overview.md** - Component architecture guide
- **horizon-ai-context/tutorials/new-user-experience/** - Advanced tutorial system examples

---

**Pro Tip**: Use the Console tab (in Desktop Editor) extensively during development. All `console.log()` statements will appear there, making it easy to debug your scripts.
