---
title: "Station 8 - JSON as Datasource for Custom UIs"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-8-json-as-datasource-for-custom-uis"
last_updated: "2025-09-25"
tags:
  ["horizon_worlds", "custom_ui", "json_data", "text_assets", "data_driven_ui"]
tutorial: "custom-ui-examples"
summary: "Demonstrates using JSON data from Text assets to populate multiple custom UIs with content, enabling data-driven UI patterns where non-engineers can manage content while engineers maintain UI definitions."
---

# Station 8 - JSON as Datasource for Custom UIs

## What & Why

This station shows how to populate custom UIs with content stored in JSON files uploaded as Text assets. Three identical custom UI kiosks display different content based on JSON data, enabling content management separation from code. This pattern allows non-engineers to update UI content while engineers maintain the UI structure.

## Key APIs / Concepts

- **Text Assets**: Upload JSON files to Asset Library as Text type
- **Async/Await**: Non-blocking data fetching with `async start()` and `await`
- **Data Fetching**: `asset.fetchAsData()` retrieves text asset content as data
- **JSON Parsing**: `output.asJSON()` converts fetched data to JavaScript objects
- **Type Definitions**: `export type` for defining JSON schema structure
- **Data Arrays**: Exported arrays for sharing data between scripts
- **Image Sources**: `ImageSource.fromTextureAsset()` for asset-based images
- **Property Bindings**: Script properties accessible in Properties panel

## How-To (Recipe)

1. **Create JSON Data**: Format content as JSON array with consistent structure
2. **Upload as Text Asset**: Add JSON file to Asset Library as Text type
3. **Create Data Loader Script**: Attach to ScriptCube with Text Asset property reference
4. **Define Type Schema**: Export TypeScript types matching JSON structure
5. **Fetch Data Async**: Use `async start()` with `await asset.fetchAsData()`
6. **Parse and Store**: Convert to JSON, iterate rows, store in exported array
7. **Create Display Script**: Import data arrays, reference specific JSON rows by ID
8. **Bind to UI**: Use trigger zones to populate UI with row-specific data

## Minimal Example

### JSON Data Structure

```json
[
  {
    "CUIId": "1",
    "enabled": true,
    "titleText": "Welcome!",
    "subTitleText": "We're glad you're here.",
    "bodyText": "Welcome to our game!\n\nTo get started, move your controllers...",
    "logoAssetId": "3640063222903226"
  }
]
```

### Data Loader Script

```typescript
export type CUIRowData = {
    CUIId: string;
    enabled: Boolean;
    titleText: string;
    subTitleText: string;
    bodyText: string;
    logoAssetId: string;
};

export var AssetReferenceRows: CUIRowData[] = [];

async start() {
    let ta: any = this.props.textAsset;
    await ta.fetchAsData().then((output: hz.AssetContentData) => {
        var JsonObj = output.asJSON();
        if (JsonObj) {
            for(const key of Object.keys(JsonObj)) {
                var rowRaw = (JsonObj as any)[key];
                if (rowRaw.enabled.valueOf() == true) {
                    AssetReferenceRows.push(rowRaw);
                }
            }
        }
    });
}
```

### Display Script

```typescript
import { CUIRowData, AssetReferenceRows, AssetReferencesCount } from 'Station08-LoadCustomUIData';

refresh(thisPlayer: hz.Player[], myJSONRowId: string): void {
    for (let r = 0; r < AssetReferencesCount; r++) {
        let thisRow: CUIRowData = AssetReferenceRows[r];
        if (thisRow.CUIId.valueOf() == myJSONRowId && thisRow.enabled == true) {
            this.bndTitleText.set(thisRow.titleText.valueOf());
            this.bndSubTitleText.set(thisRow.subTitleText.valueOf());

            // Convert asset ID to image source
            let lid: bigint = BigInt(+thisRow.logoAssetId);
            let myLogo = new hz.Asset(lid);
            let myLogoSource: ImageSource = ImageSource.fromTextureAsset(myLogo);
            this.bndLogoSource.set(myLogoSource);
            break;
        }
    }
}
```

## Architecture Components

### Data Loading Pattern

- **ScriptCube**: Arbitrary entity to attach data loader script
- **Text Asset Property**: Reference to uploaded JSON file in Properties panel
- **Async Loading**: Non-blocking fetch during `start()` phase
- **Export Variables**: Shared arrays accessible by display scripts

### Display UI Pattern

- **Custom UI Gizmo**: Each kiosk has identical UI structure
- **Trigger Zone**: Surrounds each UI to trigger content population
- **Script Properties**: `jsonRowId` and `triggerZone` configured per UI instance
- **Row Matching**: Find JSON row by ID and populate UI bindings

### Execution Flow

1. **initializeUI()**: Creates empty UI structures for all kiosks
2. **start()** (Data Loader): Fetches and parses JSON data into arrays
3. **start()** (Display): Sets up trigger zone event listeners
4. **Player Enters Trigger**: Calls `refresh()` to populate UI with row data

## Limits & Constraints

- **Text Assets Feature**: May not be available to all users (check Asset Library > Add New > Text)
- **Asset ID Format**: Logo asset IDs must be valid texture asset identifiers
- **JSON Structure**: Must match exported TypeScript type definitions exactly
- **Row Uniqueness**: CUIId values should be unique across JSON records
- **Load Timing**: Data loading completes asynchronously; UI population may be visible to players

## Gotchas / Debugging

- **Timing Issues**: UI may populate visibly as player approaches (use world-wide trigger if annoying)
- **Failed Population**: Known issue where custom UI may not populate properly
- **Null Validation**: Always check for `null`/`undefined` JSON objects before processing
- **Asset ID Conversion**: Use `BigInt(+assetId)` for proper asset ID handling in current API
- **Enable Filtering**: Respect `enabled` field to prevent disabled rows from displaying
- **Missing Rows**: Console errors logged when `jsonRowId` not found in data

## Implementation Notes

### JSON Schema Best Practices

```typescript
// Include schema as comments for reference
/* JSON record schema:
{
  "CUIId": "3",
  "enabled": true, 
  "titleText": "Winning the Game",
  "subTitleText": "Winning the Game",
  "bodyText": "To win the game...",
  "logoAssetId": "3640063222903226"
}
*/
```

### Data Filtering Pattern

```typescript
export var booFilterData: Boolean = true; // Respect enabled field

if (
  booFilterData == false ||
  (booFilterData == true && rowRaw.enabled.valueOf() == true)
) {
  AssetReferenceRows.push(rowRaw);
  AssetReferencesCount = AssetReferencesCount + 1;
}
```

### Multi-Line Text Handling

- Use `\n\n` in JSON strings for line breaks in custom UI display
- Text will render with proper line spacing in custom UI components

## See Also

- [Station 7 - Persistent Variables](07-persistent-variables.md) - Trigger zone patterns
- [Station 2 - Image from Asset](02-image-from-asset.md) - Asset-based image loading
- [Custom UI Overview](../../custom-ui-overview.md) - Core custom UI concepts
- [Text Assets Documentation] - Asset Library management (if available)

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-8-json-as-datasource-for-custom-uis (accessed 2025-09-25)
