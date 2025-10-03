---
title: "World Streaming"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/world-streaming"
last_updated: "2025-09-26T12:00:00Z"
tags: ["horizon_worlds", "world_streaming", "sublevels", "performance", "typescript"]
summary: "Large world management through sublevel streaming for improved load times and collaborative development."
---

# World Streaming

## What & Why

World streaming enables efficient management of large worlds by dividing them into smaller sublevels that load dynamically at runtime. This approach provides 2-3x faster load times compared to asset spawning through cached global illumination, supports collaborative development where teams work on separate sublevels, and reduces initial memory requirements by loading content on-demand.

## Key APIs / Concepts

- **Parent world** - Main world container that manages sublevel streaming
- **Sublevels** - Independent world components that can be loaded/unloaded dynamically  
- **SublevelEntity** - TypeScript API for controlling sublevel states at runtime
- **Sublevel states** - Unloaded, Loaded, Active progression for memory and visibility management
- **Global illumination caching** - Pre-computed lighting that accelerates sublevel loading
- **Deeplink sublevels** - Sublevels that reference published worlds for content
- **Exclude type** - Sublevel content ignored during parent world integration (for testing)

## How-To (Recipe)

1. **Create sublevel worlds**:
   - Build separate worlds with recognizable content for each sublevel
   - Add Sublevel entity set to "Exclude" type for test-only content
   - Publish sublevel worlds as non-public for integration

2. **Set up parent world**:  
   - Create main world with Custom model imports option
   - Add Sublevel entities using dropdown menu
   - Link sublevels by selecting worlds in thumbnail picker

3. **Configure sublevel properties**:
   - Set Sublevel Type to "Deeplink" for published world references
   - Position sublevels using transform handles in 3D space
   - Set Initial State: Unloaded, Loaded, or Active

4. **Implement runtime control**:
   - Enable `horizon/world_streaming` module in Scripts settings
   - Use SublevelEntity API for dynamic state management
   - Handle asynchronous state transitions with promises

## Minimal Example

```typescript
import { Component, PropTypes, Entity, CodeBlockEvents } from 'horizon/core';
import { SublevelEntity } from 'horizon/world_streaming';

class SublevelController extends Component {
  static propsDefinition = {
    sublevel: { type: PropTypes.Entity },
    state: { type: 'number', default: 0 }, // 0-4: Unloaded, Loaded, Active, Pause, Hide
  };

  start() {
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, async (player) => {
      const sublevel = this.props.sublevel?.as(SublevelEntity);
      if (!sublevel) {
        console.log("Invalid sublevel entity");
        return;
      }

      switch(this.props.state) {
        case 0: // Unload
          sublevel.unload().then(() => {
            console.log("Sublevel unloaded");
          });
          break;
        case 1: // Load
          sublevel.load().then(() => {
            console.log("Sublevel loaded");
          });
          break;
        case 2: // Activate
          sublevel.activate().then(() => {
            console.log("Sublevel activated");
          });
          break;
      }
    });
  }
}

Component.register(SublevelController);
```

## Comparison: World Streaming vs Asset Spawning

| Factor | World Streaming | Asset Spawning |
|--------|----------------|----------------|
| **Load Speed** | 2-3x faster | Standard |
| **Content Type** | Large static chunks | Small dynamic objects |
| **Location** | Fixed positions | Variable positions |
| **Lighting** | Pre-computed GI | Runtime computation |
| **Collaboration** | Independent sublevel teams | Shared asset management |
| **Memory** | Efficient sublevel-based | Per-object overhead |

**Use world streaming when:** Large static content, fixed locations, optimized load times needed  
**Use asset spawning when:** Small dynamic content, variable positions, flexible object management

## Limits & Constraints

- **No per-player streaming** - Sublevels load for all players simultaneously
- **Multiple sublevel performance** - Loading many sublevels concurrently impacts performance  
- **Manual streaming only** - No automatic streaming based on player movement
- **V2.0.0 API requirement** - SublevelEntity API not available in v1.0.0
- **Client independence** - All players receive same sublevel state changes

## Gotchas / Debugging

- **Enable world_streaming module** - Must enable `horizon/world_streaming` in Scripts settings before use
- **Sublevel entity references** - Use `as(SublevelEntity)` to cast Entity props to SublevelEntity type
- **State transition timing** - All sublevel operations are asynchronous, use promises for completion handling
- **Exclude type usage** - Set test content under "Exclude" sublevels to prevent inclusion in parent world
- **Performance management** - Avoid loading multiple large sublevels simultaneously
- **Collaboration workflow** - Publish sublevels as non-public worlds for team integration

## See Also

- [Introduction to Asset Spawning](./asset-spawning-introduction.md) - Alternative approach for dynamic object management
- [SublevelEntity API Reference](https://horizon.meta.com/resources/scripting-api/world_streaming.sublevelentity.md/?api_version=2.0.0) - Complete API documentation
- [Optimization Tips](./asset-spawning-optimization.md) - Performance strategies for both approaches
- [Scripting Considerations](./asset-spawning-scripting.md) - Architectural guidance

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/world-streaming (accessed 2025-09-26)