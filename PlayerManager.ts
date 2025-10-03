import * as hz from 'horizon/core';
import { EventsService } from './EventsService';

/**
 * PlayerManager - Handles player spawning and tutorial system setup
 * 
 * This component manages the initial spawn location for players when they
 * enter the world. Players who haven't completed the tutorial spawn at the
 * tutorial spawn point. Players who have completed it spawn at the main spawn.
 */
export class PlayerManager extends hz.Component<typeof PlayerManager> {
  static propsDefinition = {
    // Spawn point for players who haven't completed tutorial
    tutorialSpawnPoint: { type: hz.PropTypes.Entity },
    // Main spawn point for players who completed tutorial
    mainSpawnPoint: { type: hz.PropTypes.Entity },
  };

  // Track which players have completed the tutorial (resets on script reload)
  private tutorialCompletedPlayers: Set<number> = new Set();
  // Track active players
  private activePlayers: Map<number, hz.Player> = new Map();

  preStart() {
    // Subscribe to player join/leave events
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      this.onPlayerJoin.bind(this)
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      this.onPlayerLeave.bind(this)
    );

    // Listen for tutorial completion events from EventsService
    this.connectLocalEvent(
      this.entity,
      EventsService.Events.TutorialCompleted,
      this.markTutorialComplete.bind(this)
    );
  }

  start() {
    console.log('[PlayerManager] Initialized');
  }

  private onPlayerJoin(player: hz.Player) {
    this.activePlayers.set(player.id, player);

    // Delay spawn reset to avoid conflicts with Horizon's default spawn system
    this.async.setTimeout(() => {
      this.resetPlayerToSpawn(player);
    }, 100);

    // Notify TutorialManager
    this.sendPlayerJoinedEvent(player);
  }

  private resetPlayerToSpawn(player: hz.Player) {
    const hasCompletedTutorial = this.tutorialCompletedPlayers.has(player.id);
    const targetSpawn = hasCompletedTutorial ? this.props.mainSpawnPoint : this.props.tutorialSpawnPoint;

    if (!targetSpawn) return;

    const spawnPoint = targetSpawn.as(hz.SpawnPointGizmo);
    if (spawnPoint) {
      spawnPoint.teleportPlayer(player);
    }
  }

  /**
   * Mark player as having completed the tutorial
   */
  private markTutorialComplete(player: hz.Player) {
    this.tutorialCompletedPlayers.add(player.id);
  }

  private onPlayerLeave(player: hz.Player) {
    this.activePlayers.delete(player.id);
  }

  private sendPlayerJoinedEvent(player: hz.Player) {
    this.async.setTimeout(() => {
      this.sendLocalEvent(this.entity, EventsService.Events.PlayerJoined, player);
    }, 500);
  }
}

hz.Component.register(PlayerManager);