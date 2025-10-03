---
title: "Checking for Asset Spawn Events"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/checking-for-asset-spawn-events"
last_updated: "2025-09-26T12:00:00Z"
tags: ["horizon_worlds", "asset_spawning", "codeblock_events", "typescript"]
summary: "Event monitoring and handling for asset spawning, despawning, and failure states using built-in CodeBlock events."
---

# Checking for Asset Spawn Events

## What & Why

Asset spawning operations are asynchronous and may succeed, fail, or require post-spawn handling. Horizon Worlds provides built-in CodeBlock events to monitor asset lifecycle states, enabling developers to implement proper error handling, state management, and responsive gameplay mechanics around spawning operations.

## Key APIs / Concepts

- **CodeBlockEvents.OnAssetSpawned** - Fires when asset successfully spawns with entity reference
- **CodeBlockEvents.OnAssetDespawned** - Triggers when asset is removed from world with entity reference  
- **CodeBlockEvents.OnAssetSpawnFailed** - Activates when spawning operation fails with asset reference
- **Event listeners** - `connectCodeBlockEvent()` method for registering event handlers
- **Entity reference** - Spawned/despawned entity object passed to event callbacks
- **Asset reference** - Original asset object passed to all event callbacks

## How-To (Recipe)

1. **Set up event listeners in start() method**:
   - Use `connectCodeBlockEvent()` to register spawn/despawn/failure handlers
   - Configure appropriate callback functions for each event type

2. **Handle successful spawning**:
   - Access spawned entity for immediate actions or reference storage
   - Perform post-spawn initialization or state updates

3. **Handle despawning**:
   - Clean up references or perform cleanup actions
   - Update game state to reflect asset removal

4. **Handle spawn failures**:
   - Implement error logging and user feedback
   - Provide fallback behaviors or retry logic

## Minimal Example

```typescript
// Register event listeners in component start() method
start() {
  // Asset successfully spawned
  this.connectCodeBlockEvent(
    this.entity,
    CodeBlockEvents.OnAssetSpawned,
    (entity: Entity, asset: Asset) => {
      // Perform actions on spawned entity
      console.log(`Asset spawned: ${asset.name}`);
      // Store entity reference, trigger effects, etc.
    }
  );

  // Asset despawned/removed
  this.connectCodeBlockEvent(
    this.entity,
    CodeBlockEvents.OnAssetDespawned,
    (entity: Entity, asset: Asset) => {
      // Clean up references or state
      console.log(`Asset despawned: ${asset.name}`);
    }
  );

  // Asset spawn failed
  this.connectCodeBlockEvent(
    this.entity,
    CodeBlockEvents.OnAssetSpawnFailed,
    (asset: Asset) => {
      // Handle failure case
      console.error(`Failed to spawn asset: ${asset.name}`);
    }
  );
}
```

## Limits & Constraints

- **Event timing** - Events fire asynchronously after spawn/despawn operations complete
- **Entity validity** - Entity references in despawn events may have limited validity
- **Error context** - OnAssetSpawnFailed provides asset reference but not failure reason details
- **Performance** - Event handlers should be lightweight to avoid frame rate impact

## Gotchas / Debugging

- **Store entity references** - Capture entity references from OnAssetSpawned for later use
- **Cleanup on despawn** - Use OnAssetDespawned to remove entity references and avoid memory leaks
- **Failure handling** - Always implement OnAssetSpawnFailed to gracefully handle spawn errors
- **Event order** - Events may not fire in predictable order with rapid spawn/despawn operations
- **Entity lifecycle** - Don't assume entity validity beyond the event callback scope

## See Also

- [Introduction to Asset Spawning](./asset-spawning-introduction.md) - Core spawning concepts and SpawnController API
- [Built-In CodeBlock Events](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/events/codeblock-events#built-in-codeblock-event) - Complete event system documentation  
- [CodeBlockEvents API Reference](https://developers.meta.com/horizon-worlds/reference/2.0.0/core_codeblockevents) - Full API specification
- [Optimization Tips](./asset-spawning-optimization.md) - Performance improvement strategies

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/checking-for-asset-spawn-events (accessed 2025-09-26)