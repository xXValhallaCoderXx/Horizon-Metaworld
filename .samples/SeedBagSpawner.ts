import { Component, PropTypes, Entity, Vec3, Asset, Player } from "horizon/core";
import { EventsService } from "./EventsService";
import { SeedBagModule } from "./SeedBagModule";

/**
 * SeedBagSpawner - Object pool spawner for seed bags
 * 
 * Features:
 * - Limited concurrent spawns (configurable max count)
 * - Random spawn positions around tutorial island
 * - Object pooling for performance
 * - Automatic respawn when bags are returned
 */
class SeedBagSpawner extends Component<typeof SeedBagSpawner> {
    static propsDefinition = {
        // The seed bag asset to spawn
        seedBagAsset: { type: PropTypes.Asset },

        // Individual spawn point entities (Entity Arrays not supported in v2.0.0)
        spawnPoint1: { type: PropTypes.Entity },
        spawnPoint2: { type: PropTypes.Entity },
        spawnPoint3: { type: PropTypes.Entity },
        spawnPoint4: { type: PropTypes.Entity },
        spawnPoint5: { type: PropTypes.Entity },
        spawnPoint6: { type: PropTypes.Entity },
        spawnPoint7: { type: PropTypes.Entity },
        spawnPoint8: { type: PropTypes.Entity },
        spawnPoint9: { type: PropTypes.Entity },
        spawnPoint10: { type: PropTypes.Entity },

        // Maximum number of seed bags that can exist at once
        maxSeedBags: { type: PropTypes.Number, default: 5 },

        // Delay before respawning a new bag when one is returned (in milliseconds)
        respawnDelay: { type: PropTypes.Number, default: 2000 },

        // Enable debug logging
        debugMode: { type: PropTypes.Boolean, default: false },
    };

    // Track all spawned seed bags (using entity id as key)
    private activeSeeds: Map<number, Entity> = new Map();

    // Track which spawn points are currently occupied
    private occupiedSpawnPoints: Set<number> = new Set();

    // Available spawn positions
    private spawnPositions: Vec3[] = [];

    override preStart() {
        // Listen for seed bag events
        this.connectLocalEvent(
            this.entity,
            EventsService.Events.SeedBagPickedUp,
            this.onSeedBagPickedUp.bind(this)
        );

        this.connectLocalEvent(
            this.entity,
            EventsService.Events.SeedBagDropped,
            this.onSeedBagDropped.bind(this)
        );

        this.connectLocalEvent(
            this.entity,
            EventsService.Events.SeedBagReturnToPool,
            this.onSeedBagReturnToPool.bind(this)
        );
    }

    override start() {
        console.log("[SeedBagSpawner] Initializing...");

        // Validate configuration
        if (!this.props.seedBagAsset) {
            console.error("[SeedBagSpawner] No seed bag asset assigned!");
            return;
        }

        // Collect spawn positions from spawn point entities
        this.collectSpawnPositions();

        if (this.spawnPositions.length === 0) {
            console.error("[SeedBagSpawner] No spawn points configured!");
            return;
        }

        // Delay initial spawn to ensure all systems are ready
        this.async.setTimeout(() => {
            this.spawnInitialSeedBags();
        }, 1000);
    }

    /**
     * Collect spawn positions from the spawn point entities
     * Note: Entity Arrays not supported in v2.0.0, must use individual props
     */
    private collectSpawnPositions() {
        // Build array from individual entity props
        const spawnPointProps = [
            this.props.spawnPoint1,
            this.props.spawnPoint2,
            this.props.spawnPoint3,
            this.props.spawnPoint4,
            this.props.spawnPoint5,
            this.props.spawnPoint6,
            this.props.spawnPoint7,
            this.props.spawnPoint8,
            this.props.spawnPoint9,
            this.props.spawnPoint10,
        ];

        // Extract positions from entities that are defined
        spawnPointProps.forEach((spawnEntity, index) => {
            if (spawnEntity) {
                const position = spawnEntity.position.get();
                this.spawnPositions.push(position);
                this.log(`Registered spawn point ${index + 1}: ${position.x}, ${position.y}, ${position.z}`);
            }
        });

        console.log(`[SeedBagSpawner] Registered ${this.spawnPositions.length} spawn points`);
    }

    /**
     * Spawn initial set of seed bags up to maxSeedBags
     */
    private spawnInitialSeedBags() {
        const maxBags = this.props.maxSeedBags || 5;
        const bagCount = Math.min(maxBags, this.spawnPositions.length);

        console.log(`[SeedBagSpawner] Spawning ${bagCount} initial seed bags (max: ${maxBags})`);

        for (let i = 0; i < bagCount; i++) {
            this.spawnSeedBag();
        }
    }

    /**
     * Spawn a single seed bag at a random available spawn point
     */
    private spawnSeedBag(): boolean {
        // Check if we've reached the limit
        if (this.activeSeeds.size >= (this.props.maxSeedBags || 5)) {
            this.log("Cannot spawn - max seed bags reached");
            return false;
        }

        // Get random available spawn point
        const spawnIndex = this.getRandomAvailableSpawnPoint();
        if (spawnIndex === -1) {
            console.warn("[SeedBagSpawner] No available spawn points!");
            return false;
        }

        const spawnPosition = this.spawnPositions[spawnIndex];
        const seedAsset = this.props.seedBagAsset;

        if (!seedAsset) {
            console.error("[SeedBagSpawner] Seed bag asset is not set!");
            return false;
        }

        // Mark spawn point as occupied immediately
        this.occupiedSpawnPoints.add(spawnIndex);

        // Spawn the seed bag (async Promise-based API)
        this.world.spawnAsset(seedAsset, spawnPosition).then(
            (spawnedEntities: Entity[]) => {
                if (spawnedEntities && spawnedEntities.length > 0) {
                    this.onSeedBagSpawned(spawnedEntities[0], spawnIndex);
                } else {
                    console.error("[SeedBagSpawner] Spawn returned no entities");
                    this.occupiedSpawnPoints.delete(spawnIndex);
                }
            },
            (error: any) => {
                console.error(`[SeedBagSpawner] Failed to spawn seed bag: ${error}`);
                this.occupiedSpawnPoints.delete(spawnIndex);
            }
        );
        return true;
    }

    /**
     * Called when a seed bag successfully spawns
     */
    private onSeedBagSpawned(seedEntity: Entity, spawnIndex: number) {
        // Track the spawned entity using entity id (id is a bigint property, not a getter)
        const entityId = Number(seedEntity.id);
        this.activeSeeds.set(entityId, seedEntity);

        // NOTE: Motion, Interaction, and Collidable properties MUST be configured
        // on the asset itself in the Desktop Editor. They cannot be set at runtime.
        // Make sure your seed bag asset has:
        //   - Motion: Interactive
        //   - Interaction: Grabbable
        //   - Collidable: Enabled
        //   - SeedBagModule script attached

        // Find the SeedBagModule component and set spawner reference
        // Note: We need to get the script component dynamically
        // In Horizon v2.0.0, we can access component via entity reference
        this.async.setTimeout(() => {
            // The seed bag should have SeedBagModule script attached
            // We'll use LocalEvent to initialize it
            this.sendLocalEvent(
                seedEntity,
                EventsService.Events.SeedBagInitialized,
                this.entity
            );
        }, 100);

        this.log(`Spawned seed bag at position ${spawnIndex}. Total active: ${this.activeSeeds.size}`);
    }

    /**
     * Get a random spawn point that isn't currently occupied
     */
    private getRandomAvailableSpawnPoint(): number {
        const availableIndices: number[] = [];

        for (let i = 0; i < this.spawnPositions.length; i++) {
            if (!this.occupiedSpawnPoints.has(i)) {
                availableIndices.push(i);
            }
        }

        if (availableIndices.length === 0) {
            return -1;
        }

        // Return random available index
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        return availableIndices[randomIndex];
    }

    /**
     * Event handler - seed bag picked up
     */
    private onSeedBagPickedUp(payload: { player: Player; seedBag: Entity }) {
        const { player, seedBag } = payload;
        this.log(`Seed bag picked up by ${player.name.get()}`);
    }

    /**
     * Event handler - seed bag dropped
     */
    private onSeedBagDropped(payload: { player: Player; seedBag: Entity }) {
        const { player, seedBag } = payload;
        this.log(`Seed bag dropped by ${player.name.get()}`);
    }

    /**
     * Event handler - seed bag needs to return to pool (fell, collision, etc)
     */
    private onSeedBagReturnToPool(seedEntity: Entity) {
        const entityId = Number(seedEntity.id);

        if (!this.activeSeeds.has(entityId)) {
            this.log("Seed bag not found in active pool");
            return;
        }

        this.log("Returning seed bag to pool");

        // Remove from tracking
        this.activeSeeds.delete(entityId);

        // Free up spawn point (find which one it was using)
        const seedPosition = seedEntity.position.get();
        for (let i = 0; i < this.spawnPositions.length; i++) {
            const spawnPos = this.spawnPositions[i];
            // Calculate distance manually
            const dx = seedPosition.x - spawnPos.x;
            const dy = seedPosition.y - spawnPos.y;
            const dz = seedPosition.z - spawnPos.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (distance < 5.0) { // Within 5 meters of spawn point
                this.occupiedSpawnPoints.delete(i);
                break;
            }
        }

        // Delete the entity
        this.world.deleteAsset(seedEntity);

        // Respawn after delay
        this.async.setTimeout(() => {
            this.spawnSeedBag();
        }, this.props.respawnDelay || 2000);
    }

    /**
     * Debug logging helper
     */
    private log(message: string) {
        if (this.props.debugMode) {
            console.log(`[SeedBagSpawner] ${message}`);
        }
    }

    /**
     * Public method to manually trigger respawn (for testing)
     */
    public forceRespawnAll() {
        console.log("[SeedBagSpawner] Force respawning all seed bags...");

        // Delete all active seeds
        this.activeSeeds.forEach(seedEntity => {
            this.world.deleteAsset(seedEntity);
        });

        // Clear tracking
        this.activeSeeds.clear();
        this.occupiedSpawnPoints.clear();

        // Respawn after short delay
        this.async.setTimeout(() => {
            this.spawnInitialSeedBags();
        }, 500);
    }
}

Component.register(SeedBagSpawner);
export { SeedBagSpawner };
