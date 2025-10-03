import { Component, PropTypes, Player, CodeBlockEvents, SpawnPointGizmo } from "horizon/core";
import { EventsService } from "./EventsService";

/**
 * PlayerManager - Tracks and manages all players in the world
 * Handles player join/leave events and maintains active player list
 */
class PlayerManager extends Component<typeof PlayerManager> {
    static propsDefinition = {
        // Spawn point for players who haven't completed tutorial
        tutorialSpawnPoint: { type: PropTypes.Entity },
        // Main spawn point for players who completed tutorial
        mainSpawnPoint: { type: PropTypes.Entity },
    };

    private activePlayers: Map<number, Player> = new Map();

    // Track which players have completed the tutorial (resets on script reload)
    private tutorialCompletedPlayers: Set<number> = new Set();

    override preStart() {
        // Subscribe to player join/leave events
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterWorld,
            this.onPlayerJoin.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerExitWorld,
            this.onPlayerLeave.bind(this)
        );

        // Listen for tutorial completion events from EventsService
        this.connectLocalEvent(
            this.entity,
            EventsService.Events.TutorialCompleted,
            this.markTutorialComplete.bind(this)
        );
    }

    override start() {
        console.log("[PlayerManager] Initialized");
    }

    private onPlayerJoin(player: Player) {
        const playerId = player.id;
        this.activePlayers.set(playerId, player);

        console.log(`[PlayerManager] Player joined: ${player.name.get()} (ID: ${playerId})`);
        console.log(`[PlayerManager] Total players: ${this.activePlayers.size}`);

        // Delay spawn reset to avoid conflicts with Horizon's default spawn system
        this.async.setTimeout(() => {
            this.resetPlayerToSpawn(player);
        }, 100);

        // Send event to notify other systems
        this.sendPlayerJoinedEvent(player);
    }

    private resetPlayerToSpawn(player: Player) {
        const playerId = player.id;
        const hasCompletedTutorial = this.tutorialCompletedPlayers.has(playerId);

        // Determine which spawn point to use
        let targetSpawnEntity;
        let spawnType;

        if (hasCompletedTutorial) {
            targetSpawnEntity = this.props.mainSpawnPoint;
            spawnType = "main spawn";
        } else {
            targetSpawnEntity = this.props.tutorialSpawnPoint;
            spawnType = "tutorial spawn";
        }

        // Teleport player to appropriate spawn point
        if (targetSpawnEntity) {
            const spawnPoint = targetSpawnEntity.as(SpawnPointGizmo);
            if (spawnPoint) {
                spawnPoint.teleportPlayer(player);
                console.log(`[PlayerManager] Reset ${player.name.get()} to ${spawnType} point`);
            } else {
                console.warn(`[PlayerManager] ${spawnType}Point prop is not a SpawnPointGizmo`);
            }
        } else {
            console.warn(`[PlayerManager] No ${spawnType} point configured`);
        }
    }

    /**
     * Mark player as having completed the tutorial
     * Called by TutorialManager when player finishes tutorial
     */
    public markTutorialComplete(player: Player) {
        const playerId = player.id;
        this.tutorialCompletedPlayers.add(playerId);
        console.log(`[PlayerManager] Tutorial marked complete for ${player.name.get()}`);
    }

    /**
     * Check if player has completed tutorial
     */
    public hasTutorialCompleted(player: Player): boolean {
        return this.tutorialCompletedPlayers.has(player.id);
    }

    private onPlayerLeave(player: Player) {
        const playerId = player.id;
        this.activePlayers.delete(playerId);

        console.log(`[PlayerManager] Player left: ${player.name.get()} (ID: ${playerId})`);
        console.log(`[PlayerManager] Total players: ${this.activePlayers.size}`);
    }

    private sendPlayerJoinedEvent(player: Player) {
        // Delay event to ensure all systems are ready
        this.async.setTimeout(() => {
            this.sendLocalEvent(this.entity, EventsService.Events.PlayerJoined, player);
        }, 500);
    }

    /**
     * Get all currently active players
     */
    public getActivePlayers(): Player[] {
        return Array.from(this.activePlayers.values());
    }

    /**
     * Get player by ID
     */
    public getPlayerById(playerId: number): Player | undefined {
        return this.activePlayers.get(playerId);
    }

    /**
     * Get total number of active players
     */
    public getPlayerCount(): number {
        return this.activePlayers.size;
    }
}

Component.register(PlayerManager);
export { PlayerManager };
