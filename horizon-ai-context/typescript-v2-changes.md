---
title: "TypeScript API v2.0.0 Changes"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/api-references-and-examples/horizon-typescript-v2-changes"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "typescript", "api", "migration", "version_control"]
summary: "Breaking changes and migration guide for TypeScript API v2.0.0 covering module imports, component syntax, and event system updates."
---

## What & Why

TypeScript API v2.0.0 is the current standard for all new Horizon Worlds, featuring simplified component syntax, updated module names, and improved type safety. Previous API versions are no longer updated, making migration essential for accessing new features and bug fixes. The changes reduce boilerplate code and provide clearer nullability handling.

## Key APIs / Concepts

- **Module Names**: Changed from `@early_access_api` to `horizon`, `v1` to `core`
- **Component<typeof ClassName>**: New generic type syntax eliminating separate Props interfaces
- **prestart()**: New Component lifecycle method for early initialization
- **Entity | undefined**: Nullable types for Entity and Asset properties
- **LocalEvent / NetworkEvent**: Replaces deprecated HorizonEvent class
- **sendNetworkEvent**: Renamed from sendNetworkEntityEvent
- **connectLocalEvent**: Renamed from connectEntityEvent
- **bigint**: New type for internal class IDs enabling network serialization

## How-To (Recipe)

1. **Update Import Statements**

   - Replace `@early_access_api` with `horizon` prefix
   - Change `v1` module name to `core`
   - Update all API module imports consistently

2. **Modernize Component Syntax**

   - Remove separate Props type declarations outside classes
   - Use `Component<typeof ClassName>` generic syntax
   - Simplify propsDefinition without type annotations
   - Add prestart() method for early setup if needed

3. **Handle Nullable Properties**

   - Check Entity/Asset properties for null before use
   - Replace Entity.exists() patterns with null checks
   - Use proper TypeScript null handling patterns

4. **Update Event System Calls**

   - Rename all event methods to new v2 names
   - Replace HorizonEvent with LocalEvent or NetworkEvent
   - Update event parameter handling patterns

## Minimal Example

**Old v1 Syntax:**

```typescript
type TestProps = { num: number; entity: hz.Entity };

class TestClass extends Component<TestProps> {
  static propsDefinition: hz.PropsDefinition = {
    num: { type: "number" },
    entity: { type: hz.PropTypes.Entity },
  };

  start(): void {
    const n: number | undefined = this.props.num;
    this.connectEntityEvent(this.entity, myEvent, this.handler);
  }
}
```

**New v2.0.0 Syntax:**

```typescript
import * as hz from "horizon/core";

class TestClass extends Component<typeof TestClass> {
  static propsDefinition = {
    num: { type: "number" },
    entity: { type: hz.PropTypes.Entity },
  };

  start(): void {
    const n: number = this.props.num;
    const entity: hz.Entity | undefined = this.props.entity;
    if (entity != null) {
      this.connectLocalEvent(entity, myEvent, this.handler);
    }
  }
}
```

## Limits & Constraints

- **Breaking Changes**: All v1 worlds require manual migration; no automated tooling
- **Module Compatibility**: Previous API versions disabled when upgrading to v2.0.0
- **Property Access**: Direct property passing to functions requires intermediate variable capture
- **Type Safety**: Stricter null checking may reveal previously hidden bugs
- **Raycast Changes**: Must check targetType before accessing hit.target

## Gotchas / Debugging

- Properties can't be passed directly to functions; capture to variables first
- HorizonEvent completely removed; use LocalEvent or NetworkEvent explicitly
- Entity.as() now returns nullable types; check for null before use
- PhysicalEntity.applyForceAtPosition uses impulse instead of force mode
- SpawnTargetState enum export removed from public API
- Class IDs changed to bigint type for network serialization

## See Also

- [TypeScript API v2.0.0 Upgrade Guide](./typescript-v2-upgrade-guide.md)
- [TypeScript Development Overview](./typescript-development-overview.md)
- [Events and Triggers System](./events-triggers-system.md)
- [Local Scripting Ownership](./local-scripting-ownership.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/api-references-and-examples/horizon-typescript-v2-changes (accessed 2025-09-26)
