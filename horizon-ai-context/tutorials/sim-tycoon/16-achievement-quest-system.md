---
title: "Achievement and Quest System"
source_urls:
  - "https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-16-achievement-quest-system"
last_updated: "2025-09-26T00:00:00Z"
tags: ["horizon_worlds", "tutorial", "achievements", "quests", "player_progression"]
summary: "Progress tracking system providing achievements, quests, and rewards for player milestones and structured progression in sim tycoon games."
tutorial: "sim-tycoon"
---

# Achievement and Quest System

## What & Why

The achievement and quest system tracks player progress and provides goals and rewards for specific milestones in Horizon Worlds sim tycoon games. It enhances player engagement through structured progression, accomplishment recognition, and meaningful rewards that guide players through the game experience.

## Key APIs / Concepts

- **QuestManager.ts**: Core script managing achievements, quests, and progress tracking
- **achievements**: List of available achievements and their unlock conditions
- **questChains**: Sequential quest progression paths  
- **rewardTemplates**: Templates for different types of rewards
- **progressTrackers**: Current progress toward incomplete achievements
- **unlockedAchievements**: List of achievements the player has earned
- **Event-Based Updates**: Only update progress when relevant events occur
- **Batch Processing**: Process multiple achievement checks together

## How-To (Recipe)

1. **Set up quest system**
   - Create QuestManager.ts to handle achievement and quest tracking
   - Define achievement categories (tool, mining, economic, social)
   - Configure progress tracking for relevant game events

2. **Create achievement categories**
   - Add tool progression achievements (first steps, tool collector)
   - Set up mining achievements (novice miner, efficiency expert)
   - Include economic achievements (first sale, wealthy trader)
   - Add social achievements (teamwork, community leader)

3. **Implement quest chains**
   - Design tutorial quests for new player guidance
   - Create daily challenges for ongoing engagement
   - Add long-term progression goals spanning multiple sessions
   - Include branching paths for different player types

4. **Configure rewards system**
   - Set up currency rewards for achievement completion
   - Add tool rewards and special upgrades
   - Include cosmetic rewards and visual effects
   - Create player titles and badges for major achievements

5. **Integrate with game systems**
   - Connect with save system for persistent progress
   - Link to HUD for real-time feedback and notifications
   - Coordinate with audio/VFX systems for celebration effects
   - Ensure performance optimization with efficient tracking

## Minimal Example

```typescript
// Quest Manager achievement tracking
class QuestManager {
  // Track mining progress for achievements
  onResourceMined(resourceType: string, amount: number) {
    this.updateProgress("novice_miner", amount);
    this.updateProgress("master_miner", amount);
    
    if (this.checkTierRequirement("efficiency_expert")) {
      this.updateProgress("efficiency_expert", amount);
    }
  }
  
  // Check and unlock achievements
  updateProgress(achievementId: string, amount: number) {
    const achievement = this.achievements[achievementId];
    if (!achievement.unlocked) {
      achievement.progress += amount;
      if (achievement.progress >= achievement.requirement) {
        this.unlockAchievement(achievementId);
      }
    }
  }
  
  // Achievement unlock with rewards and effects
  unlockAchievement(achievementId: string) {
    const achievement = this.achievements[achievementId];
    achievement.unlocked = true;
    
    this.distributeReward(achievement.reward);
    this.playUnlockEffects(achievementId);
    this.showNotification(achievement);
  }
}
```

## Limits & Constraints

- **Event-Based Updates**: Only update progress when relevant events occur for efficiency
- **Memory Optimization**: Lazy loading and progress compression required
- **Batch Processing**: Group achievement checks and saves to reduce I/O operations
- **Selective Monitoring**: Only track achievements that are still achievable
- **Cached Progress**: Maintain progress cache for frequently checked achievements
- **Performance Impact**: Must minimize impact on core gameplay performance
- **Persistent Storage**: Achievement progress must be saved between sessions

## Gotchas / Debugging

- **Robust Tracking**: Ensure achievement progress is accurately recorded under all conditions
- **Error Handling**: Gracefully handle edge cases and data corruption scenarios
- **Progress Validation**: Verify achievement unlock conditions are met correctly
- **Reward Distribution**: Ensure rewards are properly delivered and don't duplicate
- **Performance Monitoring**: Track system performance impact during gameplay
- **Save Integrity**: Prevent achievement progress loss during save/load operations
- **Timing Issues**: Handle rapid-fire events that might trigger multiple progress updates
- **Multiplayer Sync**: Ensure achievement progress works correctly in multiplayer sessions

## See Also

- [Save Game System](09-savegame-system.md) - Persistent progress storage
- [HUD System](10-hud-system.md) - Achievement notifications and progress display
- [Audio System](15-audio-system.md) - Achievement unlock sound effects
- [Particle VFX System](14-particle-vfx-system.md) - Achievement celebration effects

## Sources

- https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/sim-tycoon-tutorial/module-16-achievement-quest-system (accessed 2025-09-26)