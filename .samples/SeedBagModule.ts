import { Component, PropTypes, Player, CodeBlockEvents, PhysicalEntity, Vec3, Entity } from "horizon/core";
import { EventsService } from "./EventsService";

/**
 * SeedBagModule - Individual seed bag component
 * 
 * Handles:
 * - Grabbable interaction
 * - Avatar locomotion animation when holding
 * - Physics reset when dropped
 * - Ownership transfer for local scripting performance
 */
class SeedBagModule extends Component<typeof SeedBagModule> {
    static propsDefinition = {
        // Optional: Spawner entity reference (leave empty - auto-set at runtime by spawner)
        spawnerEntity: { type: PropTypes.Entity },
    };

    // Track who is currently holding this seed bag
    private currentHolder: Player | null = null;
    private isBeingHeld: boolean = false;
    private originalPosition: Vec3 = Vec3.zero;
    
    // Internal spawner reference (set via event, not props)
    private spawnerEntityRef: Entity | undefined = undefined;

    override preStart() {
        // Store original position for reset
        this.originalPosition = this.entity.position.get();

        // Listen for initialization event from spawner
        this.connectLocalEvent(
            this.entity,
            EventsService.Events.SeedBagInitialized,
            this.onInitialized.bind(this)
        );

        // Set up grab event handlers
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabStart,
            this.onGrabStart.bind(this)
        );

        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnGrabEnd,
            this.onGrabEnd.bind(this)
        );

        // Handle physics collisions for ground reset
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnEntityCollision,
            this.onCollision.bind(this)
        );
    }

    /**
     * Called by spawner to initialize the seed bag with spawner reference
     */
    private onInitialized(spawnerEntity: Entity) {
        // The spawner sends itself as the payload - store reference
        console.log("[SeedBagModule] Initialized by spawner");
        this.spawnerEntityRef = spawnerEntity;
    }

    override start() {
        console.log("[SeedBagModule] Seed bag initialized");
    }

    /**
     * Called when player grabs the seed bag
     */
    private onGrabStart(isRightHand: boolean, player: Player) {
        this.currentHolder = player;
        this.isBeingHeld = true;

        // Transfer ownership to player for local scripting (reduces latency)
        this.entity.owner.set(player);

        console.log(`[SeedBagModule] ${player.name.get()} grabbed seed bag with ${isRightHand ? "right" : "left"} hand`);
        
        // DEBUG: Check if any locomotion animation is already active
        // This helps diagnose if leftover animations are causing slow motion
        try {
            // Ensure any previous locomotion animation is stopped
            player.stopAvatarAnimationLocomotion();
            console.log("[SeedBagModule] Cleared any existing locomotion animations");
        } catch (error) {
            console.log(`[SeedBagModule] No locomotion animation to clear: ${error}`);
        }

        // No animation override applied - player should move normally
        console.log("[SeedBagModule] Player should move at normal speed");

        // Send event to notify other systems
        const spawner = this.spawnerEntityRef || this.props.spawnerEntity;
        if (spawner) {
            this.sendLocalEvent(
                spawner,
                EventsService.Events.SeedBagPickedUp,
                { player, seedBag: this.entity }
            );
        }
    }

    /**
     * Called when player releases the seed bag
     */
    private onGrabEnd(player: Player) {
        console.log(`[SeedBagModule] ${player.name.get()} released seed bag`);

        this.isBeingHeld = false;

        // Ensure all locomotion animations are cleared
        if (this.currentHolder) {
            try {
                this.currentHolder.stopAvatarAnimationLocomotion();
                console.log("[SeedBagModule] Stopped locomotion animation on release");
            } catch (error) {
                console.log(`[SeedBagModule] No animation to stop: ${error}`);
            }
        }

        this.currentHolder = null;

        // Reset ownership to server
        this.entity.owner.set(this.world.getServerPlayer());

        // Send event to notify other systems
        const spawner = this.spawnerEntityRef || this.props.spawnerEntity;
        if (spawner) {
            this.sendLocalEvent(
                spawner,
                EventsService.Events.SeedBagDropped,
                { player, seedBag: this.entity }
            );
        }
    }

    /**
     * Handle collisions - reset if bag falls to ground/floor
     */
    private onCollision(
        collidedWith: any,
        collisionAt: Vec3,
        normal: Vec3,
        relativeVelocity: Vec3,
        localColliderName: string,
        otherColliderName: string
    ) {
        // Only reset if not being held and spawner is set
        const spawner = this.spawnerEntityRef || this.props.spawnerEntity;
        if (!this.isBeingHeld && spawner) {
            console.log("[SeedBagModule] Seed bag collided with ground, notifying spawner");
            
            // Notify spawner to return to pool
            this.sendLocalEvent(
                spawner,
                EventsService.Events.SeedBagReturnToPool,
                this.entity
            );
        }
    }

    /**
     * Public method for spawner to reset seed bag state
     */
    public resetState() {
        this.isBeingHeld = false;
        this.currentHolder = null;
        
        // Zero velocity to stop any physics momentum
        const physicsEntity = this.entity.as(PhysicalEntity);
        if (physicsEntity) {
            physicsEntity.zeroVelocity();
        }
    }

    /**
     * Check if seed bag is currently being held
     */
    public isHeld(): boolean {
        return this.isBeingHeld;
    }
}

Component.register(SeedBagModule);
export { SeedBagModule };
