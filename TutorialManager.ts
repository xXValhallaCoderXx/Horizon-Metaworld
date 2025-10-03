import * as hz from 'horizon/core';
import { EventsService } from './EventsService';

/**
 * TutorialManager - Handles the tutorial sequence and player guidance
 * 
 * Simple POC: When a player enters the completion trigger zone, they complete
 * the tutorial and are teleported to the main spawn point.
 */
export class TutorialManager extends hz.Component<typeof TutorialManager> {
    static propsDefinition = {
        // Reference to the PlayerManager entity
        playerManager: { type: hz.PropTypes.Entity },
        // Trigger zone for tutorial completion
        completionTrigger: { type: hz.PropTypes.Entity },
        // Main spawn point to teleport to after tutorial
        mainSpawnPoint: { type: hz.PropTypes.Entity },
    };

    preStart() {
        // Listen for player join events
        if (this.props.playerManager) {
            this.connectLocalEvent(
                this.props.playerManager,
                EventsService.Events.PlayerJoined,
                this.onPlayerJoined.bind(this)
            );
        }

        // Set up tutorial completion trigger
        if (this.props.completionTrigger) {
            this.connectCodeBlockEvent(
                this.props.completionTrigger,
                hz.CodeBlockEvents.OnPlayerEnterTrigger,
                this.onTutorialComplete.bind(this)
            );
        }
    }

    start() {
        console.log('[TutorialManager] Initialized');
    }

    private onPlayerJoined(player: hz.Player) {
        // Hook for future welcome logic (UI, audio, etc.)
    }

    /**
     * Called when player enters the tutorial completion trigger
     */
    private onTutorialComplete(player: hz.Player) {
        // Notify PlayerManager
        if (this.props.playerManager) {
            this.sendLocalEvent(this.props.playerManager, EventsService.Events.TutorialCompleted, player);
        }

        // Teleport to main spawn
        if (this.props.mainSpawnPoint) {
            const spawnPoint = this.props.mainSpawnPoint.as(hz.SpawnPointGizmo);
            if (spawnPoint) {
                spawnPoint.teleportPlayer(player);
            }
        }
    }
}

hz.Component.register(TutorialManager);
