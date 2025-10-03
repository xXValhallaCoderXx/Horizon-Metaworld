---
title: "Module 2 - Tutorial Manager"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-2-tutorial-manager"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial_manager", "info_slide", "tutorial_controller", "tutorial_slide", "nux"]
summary: "Tutorial slide system using TutorialController and TutorialSlide scripts to create interactive slideshow presentations with Horizon's InfoSlide API for structured player onboarding."
tutorial: "new-user-experience"
---

# Module 2 - Tutorial Manager

## What & Why

The Tutorial Slide System enables creators to guide players through step-by-step instructions using interactive slideshow presentations. It leverages Horizon's **InfoSlide API** to display polished, modal-style tutorials with images, text, and structured navigation. This system provides a professional presentation format for teaching game mechanics, world features, or user interface elements through organized, sequential instruction slides.

Use this system to provide structured onboarding for new players, teach complex game mechanics through step-by-step guidance, or create contextual help that appears when players unlock new features or areas.

## Key APIs / Concepts

- **TutorialController.ts**: Manages tutorial slides and handles trigger-based tutorial activation
- **TutorialSlide.ts**: Represents individual tutorial slides with configurable content and ordering  
- **UIHighlight.ts**: Provides UI highlighting for tutorial elements (used with other systems)
- **TutorialManager.ts**: Coordinates overall tutorial flow and player progression
- **InfoSlide API**: Horizon's native slideshow presentation system
- **Trigger Integration**: Connects tutorial activation to player interactions (typically trigger zones)
- **OnPlayerEnterTrigger**: Event that automatically activates tutorials when players enter zones
- **player.showInfoSlides()**: Method to display slideshow to specific player
- **Runtime Content Modification**: Dynamic slide content changes through public methods

## How-To (Recipe)

1. **Create Tutorial Controller Entity**: Create empty object, attach `TutorialController.ts` script
2. **Configure Trigger Zone**: Create Trigger Zone gizmo, assign to TutorialController's trigger property
3. **Setup Slide Container Structure**: Create child objects under TutorialController for individual slides
4. **Create Individual Slide Entities**: For each slide, create empty child object under TutorialController
5. **Attach TutorialSlide Scripts**: Add `TutorialSlide.ts` script to each child slide object
6. **Configure Slide Content Properties**: Set order, title, message, imageURL, attachImageToHeader
7. **Test Tutorial System**: Walk into trigger zones, verify slide order and content display
8. **Implement Advanced Features**: Add dynamic content modification and visual configuration

## Minimal Example

```typescript
// TutorialSlide configuration example
// In entity inspector, set these properties:
order: 1                              // Sequence number for slide order
title: "Welcome Tutorial"             // Slide title
message: "Learn basic controls"       // Main instructional content  
imageURL: "1234567890123456"         // Asset ID string (optional)
attachImageToHeader: false           // Image placement toggle

// Dynamic content modification
tutorialSlide.changeTitle('New Title');
tutorialSlide.changeMessage('Updated message content');
tutorialSlide.changeImageUri('1234567890123456'); // Asset ID string
tutorialSlide.changeAttachImageToHeader(true);

// Manual triggering from other scripts
tutorialController.playTutorial(player);
tutorialController.getTutorialSlides(); // Retrieve loaded slides
tutorialController.loadSlides(); // Reload and re-sort slides
```

## Limits & Constraints

- **InfoSlide API Dependency**: Uses Horizon's built-in slideshow presentation system
- **Trigger Zone Required**: Tutorial activation requires configured trigger zone gizmo
- **Asset ID Format**: Images must use valid asset ID strings for imageUri property
- **Hierarchical Structure**: TutorialSlide components must be child entities of TutorialController
- **Order-Based Sorting**: Slides automatically sorted by order property (ascending)

## Gotchas / Debugging

- **Trigger Assignment**: Must assign trigger zone to TutorialController's trigger property in Properties panel
- **Child Entity Structure**: TutorialController searches child entities for TutorialSlide components
- **Order Property Critical**: Slides sort by order property - ensure sequential numbering (1,2,3...)
- **Image Placement**: Toggle `attachImageToHeader` controls whether image appears in header vs body
- **Multi-player Support**: System works for multiple players simultaneously entering triggers
- **Automatic Cleanup**: Slideshow closes when player completes or exits presentation

## See Also

- [Module 1 - Introduction](./01-introduction.md) - NUX overview and asset template concepts
- [Module 3 - Hint Text](./03-hint-text.md) - Player guidance and reminder systems
- [Module 4 - Quest and Dialogue](./04-quest-and-dialogue.md) - Interactive quest and dialogue systems
- [InfoSlide API Documentation](../../scripting/info-slide-api.md) - Horizon's native slideshow system
- [Trigger Zone Gizmo Guide](../../gizmos/trigger-zone-gizmo.md) - Trigger zone configuration

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/new-user-experience-tutorial/module-2-tutorial-manager (accessed 2025-09-26)