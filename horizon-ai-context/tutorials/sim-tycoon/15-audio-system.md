---
title: "Audio System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-15-audio-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "audio", "mobile_optimization", "accessibility"]
summary: "Audio feedback system providing sound effects for mining, UI interactions, achievements, and ambient audio with mobile performance optimization and accessibility support."
tutorial: "sim-tycoon"
---

# Audio System

## What & Why

The audio system provides sound effects and feedback throughout the game to enhance player experience and provide clear audio cues for various actions and events in Horizon Worlds sim tycoon games. It coordinates all audio playback while maintaining optimal mobile performance and accessibility support for hearing-impaired players.

## Key APIs / Concepts

- **AudioSystem.ts**: Core script managing all audio playback and settings
- **AudioGizmo**: Component for attaching audio to entities
- **miningAudio**: Audio clips for different mining actions and resource types
- **toolSounds**: Sound effects for tool usage, durability warnings, and upgrades
- **uiSounds**: Interface audio for buttons, confirmations, and notifications
- **conversionAudio**: Sound effects for resource conversion and transactions
- **achievementAudio**: Celebration sounds for achievements and progression
- **AVAudioSession**: iOS audio session management
- **AudioManager**: Android system audio integration

## How-To (Recipe)

1. **Set up audio system**
   - Create AudioSystem.ts script to manage all audio playback
   - Configure audio categories (mining, tools, UI, ambient, achievement)
   - Implement audio pooling and distance culling for performance

2. **Configure mining audio**
   - Add chopping sounds for wood mining
   - Set up pickaxe impact sounds for stone mining
   - Create magical chiming for crystal mining
   - Include tool durability warning sounds

3. **Set up UI audio feedback**
   - Add touch confirmation sounds for buttons
   - Create positive sounds for successful purchases
   - Include error sounds for insufficient funds
   - Add subtle navigation sounds for UI transitions

4. **Implement achievement audio**
   - Create special sounds for first tool purchase
   - Add escalating sounds for tier achievements
   - Include graduation sound for FTUE completion
   - Add collaborative celebration for global nodes

5. **Optimize for mobile**
   - Use compressed audio formats (OGG, MP3)
   - Implement smart loading and unloading of audio assets
   - Add platform-specific optimizations (iOS/Android)
   - Include accessibility alternatives for hearing-impaired players

## Minimal Example

```typescript
// Audio System integration example
class AudioSystem {
  // Play mining audio based on tool and resource
  playMiningAudio(toolType: string, resourceType: string) {
    const audioKey = `${toolType}_${resourceType}`;
    const audio = this.getPooledAudio(audioKey);
    if (audio) {
      audio.play();
    }
  }
  
  // UI feedback with audio confirmation
  playButtonSound(buttonType: string) {
    switch(buttonType) {
      case "purchase_success":
        this.playSound("purchase_positive");
        break;
      case "purchase_fail":
        this.playSound("error_insufficient_funds");
        break;
      default:
        this.playSound("button_click");
    }
  }
  
  // Achievement celebration audio
  playAchievementAudio(achievementTier: number) {
    const audioClip = `achievement_tier_${achievementTier}`;
    this.playSound(audioClip);
  }
}
```

## Limits & Constraints

- **Compressed Audio**: Efficient audio formats required for mobile bandwidth
- **Memory Management**: Smart loading and unloading of audio assets necessary
- **Battery Optimization**: Reduced audio processing to preserve battery life
- **Quality Scaling**: Adaptive audio quality based on device capabilities
- **Audio Pooling**: Reuse audio sources for frequent sounds to optimize performance
- **Distance Culling**: Disable distant audio sources to save processing power
- **Platform Limits**: iOS and Android have different audio system requirements

## Gotchas / Debugging

- **Performance First**: Always prioritize smooth gameplay over audio complexity
- **Platform Testing**: Test audio behavior across different mobile devices
- **Accessibility**: Consider players with hearing impairments - provide visual alternatives
- **Volume Balance**: Ensure no single sound overwhelms the audio mix
- **Audio Ducking**: Reduce background audio during important sounds
- **Fallback Systems**: Implement graceful degradation when audio systems fail
- **Cross-Platform Consistency**: Maintain consistent audio experience across devices
- **Memory Cleanup**: Proper disposal of unused audio resources prevents memory leaks

## See Also

- [Particle VFX System](14-particle-vfx-system.md) - Visual feedback coordination
- [Achievement System](16-achievement-quest-system.md) - Audio celebration triggers
- [Mobile Development](../web-mobile-development/README.md) - Mobile optimization strategies
- [UI System](10-hud-system.md) - Interface audio integration

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-15-audio-system (accessed 2025-09-26)