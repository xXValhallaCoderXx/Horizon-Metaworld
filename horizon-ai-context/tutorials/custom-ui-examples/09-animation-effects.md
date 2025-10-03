---
title: "Station 9 - Animation Effects"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-9-animation-effects"
last_updated: "2025-09-25"
tags:
  [
    "horizon_worlds",
    "custom_ui",
    "animations",
    "animated_binding",
    "ui_effects",
  ]
tutorial: "custom-ui-examples"
summary: "Demonstrates basic animated effects for custom UIs using AnimatedBinding and Animation classes, including automatic looping animations and user-controlled start/stop functionality."
---

# Station 9 - Animation Effects

## What & Why

This station demonstrates how to apply animated effects to static content in custom UIs by dynamically changing properties like width and height. Two examples show: Station09a with an auto-looping horizontal scaling animation, and Station09b with user-controlled vertical scaling animation that can be started/stopped via button interaction.

## Key APIs / Concepts

- **AnimatedBinding**: Applies animated variables to individual UI properties with duration
- **Animation Class**: Defines animation behaviors (delays, sequences, repetition)
- **Animation Methods**: `timing()`, `delay()`, `sequence()`, `repeat()`
- **Easing Functions**: `Easing.inOut(Easing.ease)` for smooth transitions
- **Transform Properties**: `scaleX`, `scaleY` for scaling animations
- **Animation Control**: `stopAnimation()` method to halt animations
- **Promise/Async**: `setTimeout()` for delayed animation start
- **Lifecycle Methods**: `preStart()` method for pre-execution setup

## How-To (Recipe)

1. **Create AnimatedBinding**: Initialize with starting value (e.g., `new AnimatedBinding(0)`)
2. **Apply to Transform**: Use binding in style transform (e.g., `scaleX: varScaleX`)
3. **Set Transform Origin**: Define scaling anchor point with `transformOrigin: [0,0]`
4. **Define Animation Sequence**: Use `Animation.timing()` with duration and easing
5. **Add Delays**: Wrap timing calls with `Animation.delay()` for pacing
6. **Create Sequence**: Combine animations with `Animation.sequence()`
7. **Loop Animation**: Wrap sequence in `Animation.repeat()` for continuous play
8. **Delay Start**: Use Promise/setTimeout to wait for image loading
9. **Control Playback**: Use `stopAnimation()` and restart with new `set()` calls

## Minimal Example

### Basic Auto-Loop Animation

```typescript
import { AnimatedBinding, Animation, Easing } from "horizon/ui";

// Create animated binding for horizontal scaling
let varScaleX: AnimatedBinding = new AnimatedBinding(0);

// Apply to UI element transform
View({
    children: [loadImage2(ta, {height: 200, width: 200})],
    style: {
        transform: [{ scaleX: varScaleX }],
        transformOrigin: [0,0],
    },
})

// Define animation sequence in preStart()
preStart() {
    const timerPromise = new Promise<string>((resolve, reject) => {
        this.async.setTimeout(() => {
            varScaleX.set(Animation.repeat(
                Animation.sequence(
                    Animation.delay(250, Animation.timing(1, {
                        duration: 750,
                        easing: Easing.inOut(Easing.ease),
                    })),
                    Animation.delay(250, Animation.timing(0, {
                        duration: 750,
                        easing: Easing.inOut(Easing.ease),
                    }))
                )
            ))
        }, 500)
    })
}
```

### Start/Stop Animation Control

```typescript
let animationOn = 1;
const varScaleY = new AnimatedBinding(0);

function startAnimation(myScaleY: AnimatedBinding) {
  myScaleY.set(
    Animation.repeat(
      Animation.sequence(
        Animation.delay(
          250,
          Animation.timing(1, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        Animation.delay(
          250,
          Animation.timing(0, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          })
        )
      )
    )
  );
}

// Button onClick handler
onClick: () => {
  if (animationOn == 1) {
    varScaleY.stopAnimation();
    animationOn = 0;
    buttonText.set("Start");
  } else {
    startAnimation(varScaleY);
    animationOn = 1;
    buttonText.set("Stop");
  }
};
```

## Station Components

### Station09a - ScrollAsset

- **Animation Type**: Horizontal scaling (scaleX)
- **Behavior**: Auto-looping continuous animation
- **Timing**: 750ms expand + 750ms contract with 250ms delays
- **Start Method**: `preStart()` with 500ms image loading delay

### Station09b - StartStopAnimation

- **Animation Type**: Vertical scaling (scaleY)
- **Behavior**: User-controlled start/stop via button
- **Control Logic**: Toggle flag + button text update
- **External Function**: `startAnimation()` for reusability

## Animation Timing Structure

```typescript
Animation.repeat(
  // Infinite loop
  Animation.sequence(
    // Sequential animations
    Animation.delay(
      250, // 250ms wait
      Animation.timing(1, {
        // Scale to 100% over 750ms
        duration: 750,
        easing: Easing.inOut(Easing.ease),
      })
    ),
    Animation.delay(
      250, // 250ms wait
      Animation.timing(0, {
        // Scale to 0% over 750ms
        duration: 750,
        easing: Easing.inOut(Easing.ease),
      })
    )
  )
);
// Total cycle: 2000ms (250 + 750 + 250 + 750)
```

## Limits & Constraints

- **TypeScript Version**: Requires TypeScript 2.0.0 or later for Animation classes
- **Loading Dependency**: Images must load before animation starts (use Promise delays)
- **Scale Values**: AnimatedBinding values are multipliers of original size (0 = invisible, 1 = original, 2 = double)
- **Transform Origin**: Default scaling from center; use `transformOrigin: [0,0]` for top-left anchor
- **Performance**: Complex animations may impact performance on lower-end devices

## Gotchas / Debugging

- **Animation Start Failure**: If animation starts before image loads, it may fail—use Promise delays
- **Binding Scope**: AnimatedBinding variables must be accessible to both `initializeUI()` and animation methods
- **Stop/Restart**: Use `stopAnimation()` method, then call `set()` again to restart
- **Transform Conflicts**: Multiple transforms on same property may conflict
- **Easing Import**: Remember to import `Easing` from "horizon/ui"
- **Method Timing**: Use `preStart()` vs `start()` appropriately for initialization order

## Implementation Patterns

### Promise-Based Delayed Start

```typescript
const timerPromise = new Promise<string>((resolve, reject) => {
  this.async.setTimeout(() => {
    resolve("timeout 0.5 seconds");
    // Start animation here
  }, 500);
  reject("timeout 0.5 seconds failed");
});
```

### External Animation Functions

```typescript
// Define outside class for reusability
function startAnimation(myScale: AnimatedBinding) {
  myScale.set(/* animation definition */);
}

// Call from multiple contexts
class MyComponent {
  start() {
    startAnimation(varScale);
  }
  onButtonClick() {
    startAnimation(varScale);
  }
}
```

## See Also

- [TypeScript Script Lifecycle](/horizon-worlds/learn/documentation/typescript/typescript-script-lifecycle) - Promise usage patterns
- [Station 4 - Generic Yes/No Dialog](04-generic-yes-no-dialog.md) - Button interaction patterns
- [Custom UI Overview](../../custom-ui-overview.md) - Transform and styling fundamentals
- Animation API Reference - Complete animation class documentation

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/custom-ui-examples-tutorial/station-9-animation-effects (accessed 2025-09-25)
