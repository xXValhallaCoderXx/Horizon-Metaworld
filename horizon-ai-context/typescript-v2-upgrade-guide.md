---
title: "TypeScript API v2.0.0 Upgrade Guide"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/typescript/upgrade-world-to-typescript-api-v200"
last_updated: "2025-09-26T00:00:00Z"
tags:
  ["horizon_worlds", "typescript", "migration", "upgrade", "version_control"]
summary: "Step-by-step practical guide for upgrading existing worlds from previous TypeScript API versions to v2.0.0."
---

## What & Why

Upgrading to TypeScript API v2.0.0 is essential for existing worlds as previous versions no longer receive updates or new features. The upgrade process involves systematic changes to imports, component syntax, and event handling. Creating a clone before upgrade provides safe rollback options.

## Key APIs / Concepts

- **World Cloning**: Create versioned backup before upgrade
- **API Module Selection**: Enable v2.0.0 modules in Script Settings
- **Import Path Updates**: Systematic find/replace for module paths
- **Component Refactoring**: Remove external Props types, update class generics
- **Property Handling**: Capture properties to variables before function calls
- **Event Method Renaming**: Update all event-related method names

## How-To (Recipe)

1. **Prepare for Upgrade**

   - Create world clone with "v2.0.0" suffix for safety
   - Document current API modules enabled in Script Settings
   - Plan to fix scripts one file at a time for easier testing

2. **Switch API Version**

   - Open cloned world in desktop editor
   - Navigate to Scripts panel → Settings icon
   - Note enabled prior version modules (disable later)
   - Select "2.0.0" from API version dropdown
   - Enable required v2.0.0 API modules
   - Click Apply to update world settings

3. **Fix Import Statements**

   - Find/replace: `@early_access_api/` → `horizon/`
   - Find/replace: `horizon/v1` → `horizon/core`
   - Verify all import paths use new module structure

4. **Update Component Declarations**

   - Delete external Props type declarations
   - Change `<Props>` to `<typeof MyClassName>`
   - Remove type annotations from propsDefinition
   - Keep property definitions intact

5. **Fix Property References**

   - Capture properties to variables before function calls
   - Add null checks for Entity/Asset properties
   - Replace direct property passing patterns

6. **Rename Event Methods**

   - Update all event method names per API changes
   - Replace HorizonEvent with LocalEvent/NetworkEvent
   - Test event handling thoroughly

## Minimal Example

**Step-by-step Component Upgrade:**

**Original v1 Code:**

```typescript
import * as hz from "@early_access_api/v1";

type UIComponentGetCandyProps = { triggerZone: hz.Entity };

class UIComponentGetCandy extends UIComponent {
  static propsDefinition: hz.PropsDefinition = {
    triggerZone: { type: hz.PropTypes.Entity },
  };

  start(): void {
    this.connectEntityEvent(this.props.triggerZone, someEvent, this.handler);
  }
}
```

**Upgraded v2.0.0 Code:**

```typescript
import * as hz from "horizon/core";

class UIComponentGetCandy extends UIComponent<typeof UIComponentGetCandy> {
  static propsDefinition = {
    triggerZone: { type: hz.PropTypes.Entity },
  };

  start(): void {
    const triggerZone: hz.Entity | undefined = this.props.triggerZone;
    if (triggerZone != null) {
      this.connectLocalEvent(triggerZone, someEvent, this.handler);
    }
  }
}
```

## Limits & Constraints

- **Manual Process**: No automated migration tools; requires careful manual updates
- **File-by-File**: Recommended to upgrade one script at a time for testing
- **Module Conflicts**: Previous API modules must be disabled to avoid execution issues
- **Testing Required**: Each upgraded script should be individually tested
- **Property Restrictions**: v2.0.0 doesn't allow direct property passing to functions

## Gotchas / Debugging

- Disable old API modules after noting them to prevent conflicts
- Comment out original lines before making changes for easy rollback
- Test simple, isolated scripts first before complex components
- Properties must be captured to variables before function calls
- Write debug messages to verify proper execution during testing
- Some validation errors may be world-specific and require custom solutions

## See Also

- [TypeScript API v2.0.0 Changes](./typescript-v2-changes.md)
- [TypeScript Development Overview](./typescript-development-overview.md)
- [Version Control Strategies](./typescript-version-control-strategies.md)
- [Desktop Editor Overview](./desktop-editor-overview.md)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/typescript/upgrade-world-to-typescript-api-v200 (accessed 2025-09-26)
