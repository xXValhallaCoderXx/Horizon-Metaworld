---
title: "Asset Spawning Scripting Considerations"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/scripting-considerations"
last_updated: "2025-09-26T12:00:00Z"
tags: ["horizon_worlds", "asset_spawning", "typescript", "script_conflicts", "file_backed_scripts"]
summary: "Scripting architectural guidance for asset spawning focusing on naming conflicts and import resolution."
---

# Asset Spawning Scripting Considerations

## What & Why

Asset spawning introduces script namespace management challenges when spawned content contains TypeScript scripts. Multiple scripts with identical names can create conflicts that result in unexpected behavior, particularly when imports reference the wrong script version. Understanding conflict resolution helps developers architect spawning systems that behave predictably.

## Key APIs / Concepts

- **Script naming conflicts** - Multiple scripts with identical names loaded simultaneously
- **Import resolution** - First-loaded script version takes precedence for imports
- **File-backed scripts** - Scripts with specific execution rules that affect conflict handling
- **Console warnings** - Logged messages when naming conflicts are detected
- **Script execution order** - Determines which version of conflicted scripts runs
- **Asset script isolation** - Namespace considerations for spawned asset scripts

## How-To (Recipe)

1. **Avoid naming conflicts**:
   - Use unique script names across world and spawnable assets
   - Implement naming conventions for different content types
   - Prefix asset scripts with identifiers to ensure uniqueness

2. **Handle unavoidable conflicts**:
   - Understand that first-loaded script version wins for imports
   - Monitor scripting console for conflict warnings
   - Test import resolution behavior in development

3. **Architect for predictable behavior**:
   - Design script dependencies to minimize cross-asset imports
   - Keep utility scripts in world rather than individual assets
   - Use clear naming patterns that reflect script purpose and source

## Minimal Example

```typescript
// PROBLEMATIC: Two assets with same script name
// Asset A contains: "Utils.ts"
export class UtilsA {
  static process() { return "Asset A version"; }
}

// Asset B contains: "Utils.ts" 
export class UtilsB {
  static process() { return "Asset B version"; }
}

// Component.ts in Asset B imports utils
import { UtilsA } from './Utils'; // Actually imports Asset A's version!

// BETTER: Use unique names
// Asset A: "AssetAUtils.ts", Asset B: "AssetBUtils.ts"
```

## Conflict Resolution Behavior

| Scenario | Resolution | Console Output |
|----------|------------|----------------|
| World + Asset same script name | Both execute* | Warning logged |
| Asset A + Asset B same script name | Both execute* | Warning logged |
| Import from conflicted script | First loaded version | Warning logged |
| File-backed scripts conflict | See file-backed documentation | Warning logged |

*In non-file-backed script worlds

## Limits & Constraints

- **Import precedence** - First-loaded script always wins for import resolution
- **Console warnings only** - Conflicts don't prevent execution, only warn
- **File-backed script rules** - Different execution behavior in file-backed script worlds
- **No runtime conflict resolution** - Cannot dynamically choose which version to import

## Gotchas / Debugging

- **First-loaded wins** - Import resolution depends on loading order, not logical preference
- **Silent failures** - Scripts may import wrong versions without obvious errors
- **Console monitoring** - Check scripting console for conflict warnings during development  
- **Testing asset combinations** - Test different spawn orders to verify consistent behavior
- **Naming conventions critical** - Establish team conventions to prevent conflicts before they occur
- **Asset interdependencies** - Avoid imports between spawned assets to reduce complexity

## See Also

- [Introduction to Asset Spawning](./asset-spawning-introduction.md) - Core spawning concepts and SpawnController API
- [File-Backed Scripts Documentation](https://developers.meta.com/horizon-worlds/learn/documentation/typescript/filebacked-scripts) - Execution specifics for file-backed script worlds
- [TypeScript Development Overview](./typescript-development-overview.md) - Component-based scripting framework
- [World Streaming](./asset-spawning-world-streaming.md) - Alternative large content loading approach

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/scripting-considerations (accessed 2025-09-26)