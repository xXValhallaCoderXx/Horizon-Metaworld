import { Component, PropTypes, Player, TextGizmo, AudioGizmo, CodeBlockEvents, SpawnPointGizmo } from "horizon/core";
import { EventsService } from "./EventsService";

/**
 * TutorialManager - Manages tutorial messages and new player experience
 * Handles tutorial completion and progression to main area
 */
class TutorialManager extends Component<typeof TutorialManager> {
    static propsDefinition = {
        // Reference to PlayerManager entity (assign in editor)
        playerManager: { type: PropTypes.Entity },
        // Text gizmo for displaying messages (assign in editor)
        messageText: { type: PropTypes.Entity },
        // Audio gizmo for playing welcome sound (assign in editor)
        welcomeSound: { type: PropTypes.Entity },
        // Trigger zone entity for tutorial completion (assign in editor)
        completionTrigger: { type: PropTypes.Entity },
        // Main spawn point to teleport to after tutorial (assign in editor)
        mainSpawnPoint: { type: PropTypes.Entity },
    };

    override preStart() {
        // Listen for player join events from PlayerManager via EventsService
        const pmEntity = this.props.playerManager;
        if (pmEntity) {
            this.connectLocalEvent(pmEntity, EventsService.Events.PlayerJoined, this.onPlayerJoined.bind(this));
        }

        // Set up tutorial completion trigger
        const triggerEntity = this.props.completionTrigger;
        if (triggerEntity) {
            this.connectCodeBlockEvent(
                triggerEntity,
                CodeBlockEvents.OnPlayerEnterTrigger,
                this.onTutorialComplete.bind(this)
            );
        } else {
            console.warn("[TutorialManager] No completion trigger assigned");
        }
    }

    override start() {
        console.log("[TutorialManager] Initialized");
    }

    private onPlayerJoined(player: Player) {
        console.log(`[TutorialManager] Showing welcome message to ${player.name.get()}`);

        // Delay welcome message to avoid conflicts with spawn system
        this.async.setTimeout(() => {
            this.showWelcomeMessage(player);
        }, 200);
    }

    private showWelcomeMessage(player: Player) {
        // Display text message using Text Gizmo
        const textGizmo = this.props.messageText;
        if (textGizmo) {
            const textComponent = textGizmo.as(TextGizmo);
            if (textComponent) {
                textComponent.text.set("Hello World! Welcome to the experience!");
                textComponent.visible.set(true);
            }
        }

        // Play welcome sound for this player
        const audioGizmo = this.props.welcomeSound;
        if (audioGizmo) {
            const audio = audioGizmo.as(AudioGizmo);
            if (audio) {
                // Play sound only for the joining player (no fade)
                audio.play({ fade: 0, players: [player] });
                console.log(`[TutorialManager] Welcome sound played for ${player.name.get()}`);
            }
        }

        console.log(`[TutorialManager] Welcome message shown to ${player.name.get()}`);

        // Auto-dismiss after 3 seconds
        this.async.setTimeout(() => {
            if (textGizmo) {
                const textComponent = textGizmo.as(TextGizmo);
                if (textComponent) {
                    textComponent.visible.set(false);
                }
            }
            console.log(`[TutorialManager] Welcome message auto-dismissed for ${player.name.get()}`);
        }, 3000);
    }

    /**
     * Future: Show tutorial step to player
     */
    public showTutorialStep(player: Player, message: string, duration: number = 5000) {
        const textGizmo = this.props.messageText;
        if (textGizmo) {
            const textComponent = textGizmo.as(TextGizmo);
            if (textComponent) {
                textComponent.text.set(message);
                textComponent.visible.set(true);
            }
        }

        this.async.setTimeout(() => {
            if (textGizmo) {
                const textComponent = textGizmo.as(TextGizmo);
                if (textComponent) {
                    textComponent.visible.set(false);
                }
            }
            console.log(`[TutorialManager] Tutorial step dismissed for ${player.name.get()}`);
        }, duration);
    }

    /**
     * Called when player enters the tutorial completion trigger
     */
    private onTutorialComplete(player: Player) {
        console.log(`[TutorialManager] ${player.name.get()} completed tutorial!`);

        // Notify PlayerManager that tutorial is complete via EventsService
        const pmEntity = this.props.playerManager;
        if (pmEntity) {
            this.sendLocalEvent(pmEntity, EventsService.Events.TutorialCompleted, player);
        }

        // Show completion message
        this.showTutorialStep(player, "Tutorial Complete! Welcome to the main area!", 3000);

        // Teleport to main spawn point
        this.async.setTimeout(() => {
            this.teleportToMainArea(player);
        }, 1000);
    }

    /**
     * Teleport player to main area after tutorial completion
     */
    private teleportToMainArea(player: Player) {
        const mainSpawnEntity = this.props.mainSpawnPoint;
        if (mainSpawnEntity) {
            const spawnPoint = mainSpawnEntity.as(SpawnPointGizmo);
            if (spawnPoint) {
                spawnPoint.teleportPlayer(player);
                console.log(`[TutorialManager] Teleported ${player.name.get()} to main area`);
            } else {
                console.error("[TutorialManager] mainSpawnPoint is not a SpawnPointGizmo");
            }
        } else {
            console.warn("[TutorialManager] No main spawn point assigned");
        }
    }

}

Component.register(TutorialManager);
