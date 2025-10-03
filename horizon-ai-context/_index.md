# Horizon Worlds Context Library Index

## Core Concepts

### Development Environment

- [New User Experience and Onboarding Systems](./new-user-experience-overview.md) - NUX asset templates, tutorial slide systems, and player onboarding patterns
- [Racing Game Systems](./racing-game-systems.md) - Advanced racing game architecture with manager patterns and event coordination
- [Asset Spawning and Pooling Systems](./asset-spawning-pooling-systems.md) - Runtime asset management with object spawning, pooling, and SpawnController techniques
- [Asset Spawning Introduction](./asset-spawning-introduction.md) - Core concepts and APIs for spawning and despawning assets at runtime
- [Asset Spawning Events](./asset-spawning-events.md) - Event monitoring and handling for spawn/despawn operations
- [Asset Spawning Optimization](./asset-spawning-optimization.md) - Performance strategies including object limits and pooling patterns
- [World Streaming](./asset-spawning-world-streaming.md) - Large world management through sublevel streaming
- [Asset Spawning Scripting](./asset-spawning-scripting.md) - Architectural guidance and naming conflict resolution
- [Desktop Editor Overview](./desktop-editor-overview.md) - Primary development environment with Build/Preview modes
- [TypeScript Development Overview](./typescript-development-overview.md) - Component-based scripting framework
- [In-World Economy Systems Overview](./in-world-economy-systems.md) - Persistent economies using World Inventory APIs, shop systems, and tycoon mechanics
- [Sim Tycoon Games Overview](./sim-tycoon-games-overview.md) - Mobile-focused multiplayer tycoon game framework with tool management and progression systems

### System Architecture

- [Desktop Editor Overview](./desktop-editor-overview.md) - Primary development environment with Build/Preview modes
- [TypeScript Development Overview](./typescript-development-overview.md) - Component-based scripting framework
- [TypeScript API v2.0.0 Changes](./typescript-v2-changes.md) - Breaking changes and migration guide for current API version
- [TypeScript API v2.0.0 Upgrade Guide](./typescript-v2-upgrade-guide.md) - Step-by-step upgrade process for existing worlds
- [Events and Triggers System](./events-triggers-system.md) - Event-driven communication and Code Block Events
- [Local Events Overview](./local-events-overview.md) - TypeScript local events for synchronous component communication
- [World Update Events](./world-update-events.md) - Frame-based events for animations and physics with delta time
- [CodeBlock Events Overview](./codeblock-events-overview.md) - Cross-script communication and built-in world events
- [Events Best Practices](./events-best-practices.md) - Event management, subscription handling, and code organization
- [Objects and Components Overview](./objects-components-overview.md) - Entity-component architecture, properties, collision detection
- [Gizmos Overview](./gizmos-overview.md) - Built-in interactive components (Trigger Zones, Text Gizmos)
- [Custom UI Overview](./custom-ui-overview.md) - Custom 2D user interfaces with TypeScript scripting
- [Camera APIs Overview](./camera-apis-overview.md) - Camera positioning and control for web and mobile experiences
- [Web and Mobile Development Overview](./web-mobile-development-overview.md) - Cross-platform development for VR, web, and mobile platforms
- [Focused Interaction Overview](./focused-interaction-overview.md) - Touch-based interaction system for web and mobile players
- [Local Scripting and Entity Ownership](./local-scripting-ownership.md) - Performance optimization with local execution and ownership transfer
- [Physics and Grabbable Entities](./physics-grabbable-entities.md) - Interactive physics objects and cross-platform grabbing
- [Multiplayer Lobby Systems](./multiplayer-lobby-systems.md) - Drop-in/drop-out gameplay management with player state coordination

## Tutorials

### New User Experience Tutorial Series

Complete 7-module tutorial for creating effective player onboarding systems using NUX asset templates.

1. [Module 1 - Introduction](./tutorials/new-user-experience/01-introduction.md)
2. [Module 2 - Tutorial Manager](./tutorials/new-user-experience/02-tutorial-manager.md)
3. [Module 3 - Hint Text](./tutorials/new-user-experience/03-hint-text.md)
4. **Additional modules in progress** - Quest and Dialogue, Grab Me and Quest Complete, 3D Waypoint Arrows, Controller Images

### Build Your First Game Tutorial Series

Complete 8-module tutorial for creating a platformer-style co-op gem collection game.

1. [Module 1 - Build your first game](./tutorials/build-your-first-game/01-build-your-first-game.md)
2. [Module 2 - Intro to Scripting](./tutorials/build-your-first-game/02-intro-to-scripting.md)
3. [Module 3 - Build Game Manager](./tutorials/build-your-first-game/03-build-game-manager.md)
4. [Module 4 - Broadcast Events](./tutorials/build-your-first-game/04-broadcast-events.md)
5. [Module 5 - Build Game Setup](./tutorials/build-your-first-game/05-build-game-setup.md)
6. [Module 6 - Game Start and Collection](./tutorials/build-your-first-game/06-game-start-and-collection.md)
7. [Module 7 - Collecting Gems and Keeping Score](./tutorials/build-your-first-game/07-collecting-gems-and-keeping-score.md)
8. [Module 8 - Adding Polish](./tutorials/build-your-first-game/08-adding-polish.md)

### Simple Shooting Mechanics Tutorial Series

Complete 5-module tutorial covering projectile and raycast-based weapon systems.

1. [Module 1 - Setup](./tutorials/simple-shooting-mechanics/01-setup.md) - Tutorial world setup and weapon types overview
2. [Module 2 - Projectile](./tutorials/simple-shooting-mechanics/02-projectile.md) - Projectile Launcher gizmo and collision handling
3. [Module 3 - Simple Gun](./tutorials/simple-shooting-mechanics/03-simple-gun.md) - Grabbable gun mechanics with ammo management
4. [Module 4 - Laser Gun](./tutorials/simple-shooting-mechanics/04-laser-gun.md) - Raycast-based laser gun with beam visualization
5. [Module 5 - Summary](./tutorials/simple-shooting-mechanics/05-summary.md) - Tutorial completion and extension ideas

### Batting Cage Tutorial Series

Single comprehensive tutorial covering physics, collision detection, and cross-platform deployment.

1. [Batting Cage Tutorial - Adding and Manipulating Objects](./tutorials/batting-cage/01-batting-cage-tutorial.md)

### Camera API Examples Tutorial Series

Comprehensive tutorial series covering camera positioning and control for web and mobile experiences.

1. [Module 1 - Setup](./tutorials/camera-api-examples/01-setup.md) - Prerequisites and environment setup
2. **Additional modules in progress** - PlayerCamera Overview, PlayerCameraManager, Pan Camera, Fixed Camera, Spectator Mode, Cutscenes, and other systems

### Custom UI Examples Tutorial Series

Complete 11-station tutorial covering custom 2D interface development with TypeScript.

1. [Station 0 - Setup](./tutorials/custom-ui-examples/00-setup.md) - Prerequisites and auto-start configuration
2. [Station 1 - Text and Fonts](./tutorials/custom-ui-examples/01-text-and-fonts.md) - Text display, font families, and dynamic content
3. [Station 2 - Image from Asset](./tutorials/custom-ui-examples/02-image-from-asset.md) - Loading images from texture assets
4. [Station 3 - Scrollable UI](./tutorials/custom-ui-examples/03-scrollable-ui.md) - ScrollView for content larger than viewport
5. [Station 4 - Generic Yes/No Dialog](./tutorials/custom-ui-examples/04-generic-yes-no-dialog.md) - Reusable dialog patterns with Pressable components
6. [Station 5 - Light the Sphere Dialog](./tutorials/custom-ui-examples/05-light-the-sphere-dialog.md) - World interaction via MeshEntity and PropTypes.Entity
7. [Station 6a - Column View](./tutorials/custom-ui-examples/06a-column-view.md) - FlexDirection column layouts and View constructors
8. [Station 6b - Combo View](./tutorials/custom-ui-examples/06b-combo-view.md) - Complex nested layouts with mixed row/column flexDirection
9. [Station 7 - Persistent Variables](./tutorials/custom-ui-examples/07-persistent-variables.md) - Data persistence across world sessions using variable groups
10. [Station 8 - JSON as Datasource](./tutorials/custom-ui-examples/08-json-as-datasource.md) - Data-driven UIs with JSON from Text assets
11. [Station 9 - Animation Effects](./tutorials/custom-ui-examples/09-animation-effects.md) - AnimatedBinding and Animation classes for UI effects
12. [Station 10 - Timer and Build Info Overlays](./tutorials/custom-ui-examples/10-timer-and-build-info-overlays.md) - Non-interactive screen overlays (HUDs) with absolute positioning

### Custom UI Tutorial World Series

Complete 9-zone comprehensive tutorial covering advanced Custom UI development from fundamentals to production-level e-commerce systems. [Overview](./custom-ui-tutorial-world-overview.md)

1. [Zone 0 - Setup](./tutorials/custom-ui-tutorial-world/00-zone-0-setup.md) - Custom UI fundamentals, gizmo configuration, and development environment
2. [Zone 1 - Option Lists](./tutorials/custom-ui-tutorial-world/01-zone-1-option-lists.md) - Toggle lists, radio buttons, and selection interfaces
3. [Zone 2 - Basics](./tutorials/custom-ui-tutorial-world/02-zone-2-basics.md) - Interactive buttons, timers, dialogs, and reusable components
4. [Zone 3 - Bars](./tutorials/custom-ui-tutorial-world/03-zone-3-bars.md) - Progress indicators, loading bars, and health visualization
5. [Zone 4 - Advanced Lists](./tutorials/custom-ui-tutorial-world/04-zone-4-advanced-lists.md) - Inventory systems, paginated lists, and dynamic player lists
6. [Zone 5 - Animation](./tutorials/custom-ui-tutorial-world/05-zone-5-animation.md) - Rotating spinners, timer animations, and scrolling banners
7. [Zone 6 - Scroll Views](./tutorials/custom-ui-tutorial-world/06-zone-6-scroll-views.md) - Scrollable text and complex list systems with JSON data
8. [Zone 7 - HUD](./tutorials/custom-ui-tutorial-world/07-zone-7-hud.md) - Head-up displays, screen overlays, and persistent player interfaces
9. [Zone 8 - Store](./tutorials/custom-ui-tutorial-world/08-zone-8-store.md) - Complete e-commerce system with modular architecture

### Web and Mobile Development Tutorial Series

Complete tutorial for creating cross-platform puzzle games optimized for VR, web, and mobile platforms.

1. [Module 1 - Setup](./tutorials/web-mobile-development/01-setup.md) - Prerequisites, world access, and cross-platform testing setup
2. [Module 2 - HUD System](./tutorials/web-mobile-development/02-hud-system.md) - Cross-platform HUD with device-specific behavior (VR popups vs screen-attached entities)
3. [Module 4 - Camera Manager](./tutorials/web-mobile-development/04-camera-manager.md) - Camera API integration with local execution and event-driven control
4. [Module 7A - Focused Interaction Manager](./tutorials/web-mobile-development/07a-focused-interaction-manager.md) - Touch-based interaction system for web and mobile players

### Multiplayer Lobby Tutorial Series

Complete 6-module tutorial covering multiplayer lobby systems for drop-in/drop-out gameplay.

1. [Module 1 - Setup](./tutorials/multiplayer-lobby/01-setup.md) - Tutorial setup and desktop editor familiarization
2. [Module 2 - Provided Scripts](./tutorials/multiplayer-lobby/02-provided-scripts.md) - Component architecture overview and script responsibilities
3. [Module 3 - Handling players entering and exiting](./tutorials/multiplayer-lobby/03-handling-players-entering-and-exiting.md) - Player tracking and state management implementation
4. [Module 4 - Starting the Game](./tutorials/multiplayer-lobby/04-starting-the-game.md) - Game start countdown and state transition coordination
5. [Module 5 - Entering the Match](./tutorials/multiplayer-lobby/05-entering-the-match.md) - Player teleportation from lobby to match area
6. [Module 6 - Completing the Match and Returning Players](./tutorials/multiplayer-lobby/06-completing-the-match-and-returning-players.md) - Match completion and lobby return cycle

### Spawning and Pooling in TypeScript Tutorial Series

Complete 5-module tutorial covering asset spawning and pooling techniques for optimal performance.

1. [Module 1 - Setup](./tutorials/spawning-pooling/01-setup.md) - Tutorial prerequisites and approach comparison
2. [Module 2 - Implement Object Spawning](./tutorials/spawning-pooling/02-implement-object-spawning.md) - Basic runtime asset instantiation with performance costs
3. [Module 3 - Implement Object Pooling](./tutorials/spawning-pooling/03-implement-object-pooling.md) - Pre-instantiated asset pools with off-screen management
4. [Module 4 - Spawn Controller](./tutorials/spawning-pooling/04-spawn-controller.md) - TypeScript v2.0.0 recommended approach with memory containers
5. [Module 5 - Summary](./tutorials/spawning-pooling/05-summary.md) - Performance comparison and production recommendations

### Scripted Avatar NPC Tutorial Series

Complete 6-module tutorial covering humanoid NPCs with TypeScript behaviors, quest integration, and voice-over systems.

1. [Module 1 - Setup](./tutorials/scripted-avatar-npc/01-setup.md) - Tutorial overview, NPC characters, and feature breakdown
2. [Module 2 - Overview of Scripted Avatar NPCs](./tutorials/scripted-avatar-npc/02-overview.md) - Visual design, TypeScript features, and core NPC behaviors
3. [Module 3 - NPC Manager](./tutorials/scripted-avatar-npc/03-npc-manager.md) - State machine implementation, pathfinding, and behavior classes
4. [Module 4 - Adding Voice-Over](./tutorials/scripted-avatar-npc/04-adding-voice-over.md) - Audio integration for NPC interactions and character personality
5. [Module 5 - Quest Manager](./tutorials/scripted-avatar-npc/05-quest-manager.md) - Quest system with progress tracking and NPC integration
6. [Module 6 - Summary](./tutorials/scripted-avatar-npc/06-summary.md) - Implementation patterns, extension opportunities, and production considerations

### Rooftop Racers Sample World Tutorial Series

Complete 7-module advanced racing game tutorial demonstrating production-level TypeScript architecture with manager systems.

1. [Module 1 - Setup](./tutorials/rooftop-racers/01-setup.md) - Tutorial overview and advanced manager architecture introduction
2. [Module 2 - Game Manager Systems](./tutorials/rooftop-racers/02-game-manager-systems.md) - Core management systems for state, matchmaking, racing, and audio
3. [Module 3 - Player Movement Systems](./tutorials/rooftop-racers/03-player-movement-systems.md) - Advanced player movement with double-jump and boost jump mechanics
4. [Module 4 - Player HUD Systems](./tutorials/rooftop-racers/04-player-hud-systems.md) - Object pooling for HUD management with race position and timing display
5. [Module 5 - Player Out of Bounds Management](./tutorials/rooftop-racers/05-out-of-bounds-management.md) - Dual OOB detection system with perimeter triggers and Y-axis checking
6. [Module 6 - Helper and Base Classes](./tutorials/rooftop-racers/06-helper-base-classes.md) - Utility classes and event management framework
7. [Module 7 - Summary](./tutorials/rooftop-racers/07-summary.md) - Tutorial completion with asset templates and world expansion guidance

### Economy World Tutorial Series

Complete 5-module tutorial covering in-world economies, World Inventory APIs, and tycoon-style gameplay mechanics.

1. [Module 1 - Introduction](./tutorials/economy-world/01-introduction.md) - In-world economy concepts, World Inventory APIs, and tycoon game design principles
2. [Module 2 - Setup](./tutorials/economy-world/02-setup.md) - MHCP requirements, creating consumable in-world items, and item thumbnail generation
3. [Module 3 - Configuring Gameplay Entities](./tutorials/economy-world/03-configuring-gameplay.md) - SimpleLootItem and Oven script configuration for complete tycoon gameplay loop
4. [Module 4 - Adding The Shop](./tutorials/economy-world/04-adding-the-shop.md) - World Shop gizmo integration for pie-to-gem transactions and utility power-ups
5. [Module 5 - Finishing Up](./tutorials/economy-world/05-finishing-up.md) - Debug tools configuration, testing workflows, and tutorial completion

### Sim Tycoon Tutorial Series

Comprehensive 18-module tutorial series for building mobile-only multiplayer tycoon games with foundational systems, components, and project setup.

1. [Module 0 - Setup](./tutorials/sim-tycoon/00-setup.md) - Template world access and variable group configuration
2. [Module 1 - SimPlayer](./tutorials/sim-tycoon/01-simplayer.md) - Custom player wrapper with tool management and resource tracking
3. **Additional modules in progress** - Resource Nodes, Tools/ToolGroups, Player Equipment, Economy Systems, Game Management, User Interface, and Advanced Features

## Quick Reference

### Key APIs

- `hz.Component<T>` - Base class for all scripts
- `hz.LocalEvent<T>` - Custom events for component communication
- `connectCodeBlockEvent()` - Subscribe to world events
- `sendLocalBroadcastEvent()` - Publish events to all listeners
- `sendLocalEvent()` - Send events to specific entities
- `hz.CodeBlockEvents.OnPlayerEnterWorld` - Player join event
- `hz.CodeBlockEvents.OnPlayerEnterTrigger` - Trigger zone entry event
- `hz.CodeBlockEvents.OnPlayerCollision` - Player collision event
- `PlayerCamera` - Core camera object for controlling player camera behavior
- `PlayerCameraManager` - Management system for coordinating camera state and transitions
- `console.log()` - Debug output to desktop editor
- `entity.position.get()` / `entity.position.set()` - Position manipulation
- `entity.as(hz.PhysicalEntity)?.zeroVelocity()` - Reset entity velocity
- `entity.owner.set(player)` - Transfer entity ownership
- `this.world.getServerPlayer()` - Get server player reference
- `this.world.ui.showPopupForPlayer(player, message, duration)` - Display player-specific messages
- `override receiveOwnership()` / `override transferOwnership()` - Ownership transfer handling

### Common Patterns

- Empty Objects for non-visual script attachment
- Map<number, hz.Player> for player tracking
- Map<bigint, hz.Entity> for entity tracking and duplicate prevention
- Exported enums for shared state definitions
- Finite state machines with switch statements
- Reference objects (Empty objects) for flexible entity positioning
- Entity properties and component arrays for managing multiple objects
- Broadcast events for decoupled component communication
- Entity casting for gizmo-specific API access
- Local scripting for performance optimization and reduced latency
- Entity ownership transfer for multiplayer consistency
- Camera positioning for web and mobile platform optimization
- Platform detection for responsive camera behavior
- Gameplay tags for collision filtering and event targeting
- Physics object configuration with custom gravity and collision handling
- Cross-platform grabbable entity setup for VR, desktop, and mobile

### Development Workflow

1. Create script in Scripts panel
2. Open in external editor (VS Code)
3. Attach to Empty Object entity
4. Test in Preview mode with console debugging

---

_Last updated: 2025-09-26_
