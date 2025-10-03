# Zone 2 - Basics

> **Engineering Focus**: Basic Custom UI components including buttons, timers, dialog systems, and reusable UI libraries in Meta Horizon Worlds

## What & Why

Zone 2 covers fundamental Custom UI components that form the building blocks of more complex interfaces. This zone demonstrates four essential UI patterns: basic interactive buttons with event communication, timer components for countdown and stopwatch functionality, multi-page dialog systems for character interaction, and reusable button libraries with customizable styling.

### Core Components Covered
- **Basic Button System**: Event-driven button component with customizable properties
- **Timer Components**: Countdown and stopwatch functionality with trigger integration
- **Dialog Prompt System**: Multi-page content display with JSON data binding
- **Button API Library**: Reusable button utilities with color variations

## Key APIs/Concepts

### Station #4: Basic Button Architecture

The basic button system demonstrates a two-script architecture pattern:

- **BasicButton**: Generic UI component for reusable button functionality
- **BasicButtonDemo**: Game logic controller demonstrating event handling

#### Core Event Flow
```
User Interaction → BasicButton.onRelease() → sendMessageEvent → BasicButtonDemo → Text Update
```

#### Key Properties
- `targetEntity`: Entity receiving the sendMessageEvent
- `ID`: Unique identifier included in event payload  
- `title`: Text displayed above the button
- `buttonText`: Text displayed on the button
- `pressSound`/`releaseSound`: Audio gizmo entities for feedback
- `theme`: Predefined color theme selector

#### Network Events
- `sendMessageEvent`: Custom CodeBlock event carrying Player entity and button ID

#### Methods
- `onPress()`: Callback for press sound playback
- `onRelease()`: Callback for release sound and event transmission
- `BasicButtonSetTitle()`, `BasicButtonSetButtonText()`, `BasicButtonSetTarget()`: Runtime modification methods

### Station #5: Timer System

The timer system provides both countdown and stopwatch functionality:

#### Timer Variations
- **Countdown Timer**: Decrements from predefined duration (cooldowns, round timers)
- **Stopwatch**: Increments from zero until stopped (races, time trials)

#### Component Structure
- **Timer**: Reusable UI element handling display logic
- **TimerDemo**: Non-UI orchestration script managing timer behavior

#### TimerDemo Properties
- `trigger1-4`: Four trigger entities for activating timer functions
- `cuiGizmo`: Entity reference to Timer UI component
- `duration`: Default timer duration

#### Timer Methods
- `TimerStartCountDown(duration?)`: Start countdown from specified duration
- `TimerStart(duration?)`: Start counting up, optional stop duration
- `TimerReset()`: Stop timer and reset display to 00:00
- `TimerSetDuration(duration?)`: Set default duration

### Station #6: Dialog Prompt System

Multi-page dialog system for character communication:

#### Script Architecture
- **DialogPrompt.ts**: UI rendering component for dynamic multi-page content
- **DialoguePromptDemo.ts**: Controller providing JSON data to UI component

#### Data Interfaces
```typescript
interface ItemData {
  type: string; // Rendering type specification
  // Additional properties for content rendering
}

interface PageData {
  page_number: number;
  items: ItemData[];
}
```

#### Properties
- **DialogPrompt**: `theme` for visual theme selection
- **DialoguePromptDemo**: 
  - `cuiGizmo`: Reference to DialogPrompt UI component
  - `jSONdata`: JSON string containing dialog content

### API Example #2: Button Library System

Demonstrates reusable UI component architecture:

#### Component Structure
- **cuiButton**: Library of helper functions for button creation
- **ButtonTest**: UIComponent controller managing button display and behavior

#### Design Pattern
The cuiButton library provides abstraction layer hiding low-level UI implementation details, while ButtonTest acts as demo controller managing:
- Button display logic
- Label management
- Click behavior handling
- Color variation demonstration

## How-To

### Implementing Basic Button Component

1. **Create BasicButton Script**:
   - Extend UIComponent class
   - Define properties for targetEntity, ID, title, buttonText, sounds, theme
   - Implement onPress() and onRelease() callbacks
   - Use cuiButton library for rendering

2. **Create Event Listener**:
   - Create BasicButtonDemo component
   - Connect to sendMessageEvent on target entity
   - Implement event handling logic
   - Update linked text gizmo or other components

3. **Configure Properties**:
   - Set targetEntity to receiving component
   - Assign unique ID for event identification
   - Configure text properties and audio feedback
   - Select appropriate theme

### Building Timer System

1. **Setup Timer Component**:
   - Create Timer UIComponent with theme property
   - Implement display logic for time formatting
   - Create public methods for timer control

2. **Create Timer Controller**:
   - Create TimerDemo component with trigger entities
   - Link cuiGizmo to Timer UI component
   - Set default duration
   - Implement trigger event handlers

3. **Configure Triggers**:
   - Place trigger entities in world
   - Connect trigger1-4 properties to respective entities
   - Test countdown and stopwatch functionality

### Implementing Dialog System

1. **Define Data Structure**:
   - Create JSON with PageData format
   - Define ItemData objects with type specifications
   - Structure multi-page content hierarchy

2. **Setup Dialog Components**:
   - Create DialogPrompt UIComponent
   - Create DialoguePromptDemo controller
   - Connect cuiGizmo reference
   - Configure jSONdata property

3. **Implement Navigation**:
   - Add navigation button handling
   - Implement page switching logic
   - Handle dynamic content rendering

### Creating Button Library

1. **Build Helper Library**:
   - Create cuiButton script with utility functions
   - Implement button creation methods
   - Abstract UI implementation details

2. **Create Demo Controller**:
   - Create ButtonTest UIComponent
   - Implement button display logic
   - Add color variation handling
   - Connect click event handlers

## Minimal Example

### Basic Button Implementation
```typescript
// BasicButton component
class BasicButton extends UIComponent {
  @Property targetEntity: Entity;
  @Property ID: string;
  @Property title: string;
  @Property buttonText: string;
  @Property pressSound: Entity;
  @Property releaseSound: Entity;
  @Property theme: number;

  onPress(): void {
    // Play press sound for interacting player
    if (this.pressSound) {
      // Audio playback logic
    }
  }

  onRelease(): void {
    // Play release sound
    if (this.releaseSound) {
      // Audio playback logic
    }
    
    // Send custom CodeBlock event
    this.sendMessageEvent.broadcast(this.targetEntity, {
      player: this.getInteractingPlayer(),
      id: this.ID
    });
  }
}
```

### Timer Usage Pattern
```typescript
// Timer control methods
timer.TimerStartCountDown(30); // 30-second countdown
timer.TimerStart();            // Start stopwatch
timer.TimerReset();            // Reset to 00:00
```

### Dialog JSON Structure
```json
{
  "pages": [
    {
      "page_number": 1,
      "items": [
        {
          "type": "text",
          "content": "Welcome to the dialog system!"
        }
      ]
    }
  ]
}
```

## Limits & Constraints

### Performance Considerations
- **Event Frequency**: Limit sendMessageEvent frequency to avoid network overhead
- **Timer Precision**: Timer updates tied to frame rate, not guaranteed precise timing
- **JSON Parsing**: Large dialog JSON may impact performance on parse
- **UI Component Count**: Multiple button instances share theme resources

### Technical Limitations
- **Network Events**: sendMessageEvent payload size limitations
- **Audio Feedback**: pressSound/releaseSound require audio gizmo entities
- **Theme System**: Limited to predefined color themes
- **Timer Range**: Duration values have practical upper/lower bounds

### Integration Constraints
- **Entity References**: targetEntity, cuiGizmo must be valid entity references
- **Trigger Setup**: TimerDemo requires properly configured trigger entities
- **JSON Format**: DialogPrompt expects strict JSON schema compliance
- **Component Dependencies**: BasicButton depends on cuiButton library availability

## Gotchas/Debugging

### Common Issues

1. **Event Not Firing**:
   - Verify targetEntity is correctly assigned and valid
   - Check sendMessageEvent is properly configured in receiving component
   - Ensure BasicButtonDemo is attached to target entity

2. **Timer Not Starting**:
   - Verify cuiGizmo reference points to entity with Timer component
   - Check trigger entities are properly linked to trigger1-4 properties
   - Ensure TimerDemo component is properly initialized

3. **Dialog Not Displaying**:
   - Validate JSON structure matches expected schema
   - Check cuiGizmo reference to DialogPrompt component
   - Verify jSONdata property contains valid JSON string

4. **Button Styling Issues**:
   - Confirm theme number corresponds to valid predefined theme
   - Check cuiButton library is available and properly implemented
   - Verify UIComponent inheritance and property configuration

### Debug Strategies
- Use console logging in onPress/onRelease callbacks
- Validate entity references in component start methods
- Test JSON parsing separately before dialog integration
- Verify trigger zone collision detection for timer controls

### Performance Debug
- Monitor sendMessageEvent frequency in high-interaction scenarios
- Profile timer update frequency against frame rate
- Check memory usage with large dialog JSON datasets
- Optimize button library function calls for repeated usage

## See Also

- [Zone 0 - Setup](00-zone-0-setup.md): Custom UI prerequisites and configuration
- [Zone 1 - Option Lists](01-zone-1-option-lists.md): Toggle lists and radio button systems  
- [Zone 3 - Bars](03-zone-3-bars.md): Progress bars and visual indicators
- [Custom UI Overview](../../custom-ui-overview.md): High-level Custom UI architecture
- [Events System](../../events-triggers-system.md): Event handling patterns and best practices

## Sources

- **Primary**: Meta Horizon Worlds Custom UI Tutorial World - Zone 2
- **URL**: https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-tutorial-world/zone-2-basics
- **Components Documented**: BasicButton, BasicButtonDemo, Timer, TimerDemo, DialogPrompt, DialoguePromptDemo, cuiButton, ButtonTest
- **Stations Covered**: Station #4 (Basic Button), Station #5 (Timer), Station #6 (Dialog Prompt), API Example #2 (Buttons)