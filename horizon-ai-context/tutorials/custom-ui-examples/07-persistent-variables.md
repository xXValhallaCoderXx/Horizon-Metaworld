---
title: "Station 7 - Persistent Variables"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-7-persistent-variables"
last_updated: "2025-09-25"
tags:
  [
    "horizon_worlds",
    "custom_ui",
    "persistent_variables",
    "data_storage",
    "trigger_zones",
  ]
tutorial: "custom-ui-examples"
summary: "Demonstrates how to create and use persistent variables with custom UIs, including variable groups, trigger zones, and data persistence across world sessions."
---

# Station 7 - Persistent Variables

## What & Why

Persistent variables store per-player data that survives across world sessions and visits. This station demonstrates two custom UIs sharing data through a persistent variable: a read-only display UI (`Station07a-SeeCandy`) and an interactive UI with +/- buttons (`Station07b-GetCandy`). The candy count persists between visits and updates dynamically between the two UIs.

## Key APIs / Concepts

- **Persistent Variables**: Per-player storage objects (Number or Object type)
- **Variable Groups**: Containers for organizing persistent variables
- **Trigger Zone Gizmo**: Activates variable reading/writing on player proximity
- **Core APIs**: `world.persistentStorage.getPlayerVariable()`, `world.persistentStorage.setPlayerVariable()`
- **Event Listeners**: `hz.CodeBlockEvents.OnPlayerEnterTrigger`, `hz.CodeBlockEvents.OnPlayerExitTrigger`
- **UI Bindings**: Variables bound to UI elements with `new Binding<string>(defaultValue)`
- **Network Events**: `sendNetworkBroadcastEvent()` for cross-UI communication

## How-To (Recipe)

1. **Create Variable Group**: Systems menu > Variable Groups > Create group named `vgStation07`
2. **Create Persistent Variable**: Add Number type variable named `intCandy` to group
3. **Reference in Code**: Use format `"vgStation07:intCandy"` or concatenated constants
4. **Set up Trigger Zone**: Place Trigger Zone gizmo around CustomUI objects
5. **Connect Events**: Listen for `OnPlayerEnterTrigger` to read variables, `OnPlayerExitTrigger` to save
6. **Bind to UI**: Use `Binding<string>` variables for UI display values
7. **Handle Updates**: Use `set()` method to update bound variables and refresh UI

## Minimal Example

```typescript
// Constants for variable references
export const VarGroupName = "vgStation07";
export const PVARName = "intCandy";

class UIComponentSeeCandy extends UIComponent<typeof UIComponentSeeCandy> {
  static propsDefinition = {
    triggerZone: { type: hz.PropTypes.Entity },
  };

  strPlayerCandyPVar = (VarGroupName + ":" + PVARName) as string;
  strPlayerCandyTotal = new Binding<string>("0");

  start() {
    // Read persistent variable when player enters trigger
    this.connectCodeBlockEvent(
      this.props.triggerZone,
      hz.CodeBlockEvents.OnPlayerEnterTrigger,
      (enteredBy: hz.Player) => {
        let candyCount = this.world.persistentStorage.getPlayerVariable(
          enteredBy,
          this.strPlayerCandyPVar
        );
        if (!candyCount) candyCount = 0;
        this.strPlayerCandyTotal.set(candyCount.toString());
      }
    );
  }
}
```

## Station Components

### Station07a-SeeCandy (Read-Only Display)

- **UI**: Shows current candy total with color-coded message
- **Trigger**: Reads persistent variable on player approach
- **Features**: Dynamic message based on candy count value

### Station07b-GetCandy (Interactive UI)

- **UI**: +/- buttons to modify candy count
- **Local Variable**: `intLocalCandyCount` holds working value during interaction
- **Save on Exit**: Writes to persistent variable when player leaves trigger zone
- **Cross-UI Update**: Broadcasts `CandyUpdated` event to update Station07a immediately

## Limits & Constraints

- **Variable Types**: Number or Object (JSON) only
- **Scope**: Per-player data storage (not shared between players)
- **Naming**: Variable group and variable names must match code references exactly
- **World Restart**: Required after creating new persistent variables
- **Save Delay**: Persistent variable saves have latency; use network events for immediate UI updates

## Gotchas / Debugging

- **Trigger Zone Sizing**: Must be larger than CustomUI activation radius (E icon range in desktop, raycast range in VR)
- **Null Checks**: Always validate persistent variable values (`undefined` or `null` for new players)
- **String Conversion**: UI Bindings require String values; use `toString()` for Number variables
- **Execution Order**: `initializeUI()` runs before `start()`, so set default values in Bindings
- **Variable Groups**: Best practice to use groups even for single variables (enables world portability)

## Implementation Notes

### TypeScript References

```typescript
// Export constants for reuse
export const VarGroupName = "vgStation07";
export const PVARName = "intCandy";

// Import in other scripts
import { CandyUpdated, VarGroupName, PVARName } from "Station07a-SeeCandy";
```

### Trigger Zone Pattern

- Place Trigger Zone gizmo around CustomUI object
- Reference as Entity property in script: `triggerZone: { type: hz.PropTypes.Entity }`
- Size to encompass all activation approaches (consider walls/obstacles)

### Cross-UI Communication

```typescript
// Send update event immediately (avoid persistent storage delay)
this.sendNetworkBroadcastEvent(CandyUpdated, {
  player: enteredBy,
  intCandy: intLocalCandyCount,
});
```

## See Also

- [Using Variable Groups](/horizon-worlds/learn/documentation/desktop-editor/quests-leaderboards-and-variable-groups/variable-groups/using-variable-groups) - Variable group management
- [Station 4 - Generic Yes/No Dialog](04-generic-yes-no-dialog.md) - Pressable button patterns
- [Station 5 - Light the Sphere Dialog](05-light-the-sphere-dialog.md) - Entity interactions
- [Custom UI Overview](../../custom-ui-overview.md) - Core custom UI concepts

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-7-persistent-variables (accessed 2025-09-25)
