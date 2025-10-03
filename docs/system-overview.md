# System Overview

## Architecture

```
PlayerManager ←→ EventsService ←→ TutorialManager
      ↓                                   ↓
SpawnTutorial                       CompletionTrigger
SpawnMain                                ↓
                                    SpawnMain
```

## Components

### PlayerManager
Spawns players at different locations based on tutorial completion status.

**Properties:**
- `tutorialSpawnPoint`: Where new players spawn
- `mainSpawnPoint`: Where completed players spawn

**Key Behavior:**
- Tracks tutorial completion per player ID in a Set
- Listens for `TutorialCompleted` event to mark players as complete
- Sends `PlayerJoined` event to notify other systems

### TutorialManager
Detects tutorial completion and teleports players to main area.

**Properties:**
- `playerManager`: Reference to PlayerManager entity
- `completionTrigger`: Trigger zone for tutorial completion
- `mainSpawnPoint`: Where to teleport after completion

**Key Behavior:**
- Listens for `PlayerJoined` event (hook for future features)
- Fires `TutorialCompleted` event when player enters trigger
- Teleports player to main spawn

### EventsService
Centralized event registry for type-safe component communication.

**Events:**
- `PlayerJoined`: Fired when player joins world
- `TutorialCompleted`: Fired when player completes tutorial

## Data Flow

### First-Time Player
```
Join → PlayerManager → Spawn at tutorial → Enter trigger → 
TutorialManager → Fire event → PlayerManager marks complete → 
Teleport to main
```

### Returning Player
```
Join → PlayerManager → Check completion status → 
Spawn at main (skip tutorial)
```

## Points of Interest

- **Tutorial completion is NOT persistent** - Resets on script reload
- **100ms spawn delay** - Prevents conflicts with Horizon's default spawn system
- **500ms event delay** - Ensures all systems are ready before firing PlayerJoined
- **Event-driven architecture** - Prevents circular dependencies between components
- **Uses `.as(SpawnPointGizmo)`** - Horizon's official API for safe type conversion

## Configuration Requirements

1. Create 2 Spawn Point Gizmos: `SpawnTutorial`, `SpawnMain`
2. Create 1 Trigger Zone: `CompletionTrigger`
3. Create 2 Code Block entities with scripts assigned
4. Wire up properties in Horizon editor

## File Structure

```
/scripts
├── EventsService.ts       (12 lines)
├── PlayerManager.ts       (50 lines)
└── TutorialManager.ts     (35 lines)
```

Total: ~100 lines of code
