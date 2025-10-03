import { LocalEvent, Player, Entity } from "horizon/core";

/**
 * EventsService - Centralized event registry for all LocalEvents in the world
 * 
 * This service provides:
 * 1. Single source of truth for all event names
 * 2. Type-safe event access
 * 3. Easy discoverability of all available events
 * 4. Prevention of event name conflicts
 * 
 * Usage:
 * - Import EventsService in your component
 * - Access events via EventsService.Events.eventName
 * - Use with sendLocalEvent() and connectLocalEvent()
 */
export class EventsService {
    /**
     * All LocalEvents used throughout the world
     * Add new events here as your project grows
     */
    public static readonly Events = {
        // ===== PLAYER EVENTS =====

        /**
         * Fired when a player joins the world
         * Payload: Player
         */
        PlayerJoined: new LocalEvent<Player>("PlayerJoined"),

        /**
         * Fired when a player leaves the world
         * Payload: Player
         */
        PlayerLeft: new LocalEvent<Player>("PlayerLeft"),

        // ===== TUTORIAL EVENTS =====

        /**
         * Fired when a player completes the tutorial
         * Payload: Player
         */
        TutorialCompleted: new LocalEvent<Player>("TutorialCompleted"),

        /**
         * Fired when a player starts a tutorial step
         * Payload: { player: Player, stepNumber: number }
         */
        TutorialStepStarted: new LocalEvent<{ player: Player; stepNumber: number }>("TutorialStepStarted"),

        // ===== SEED BAG EVENTS =====

        /**
         * Fired when a seed bag is spawned and initialized
         * Payload: Entity (spawner entity reference)
         */
        SeedBagInitialized: new LocalEvent<Entity>("SeedBagInitialized"),

        /**
         * Fired when a player picks up a seed bag
         * Payload: { player: Player, seedBag: Entity }
         */
        SeedBagPickedUp: new LocalEvent<{ player: Player; seedBag: Entity }>("SeedBagPickedUp"),

        /**
         * Fired when a player drops a seed bag
         * Payload: { player: Player, seedBag: Entity }
         */
        SeedBagDropped: new LocalEvent<{ player: Player; seedBag: Entity }>("SeedBagDropped"),

        /**
         * Fired when a seed bag needs to return to pool (collision, timeout, etc)
         * Payload: Entity (the seed bag entity)
         */
        SeedBagReturnToPool: new LocalEvent<Entity>("SeedBagReturnToPool"),

        // ===== GAME EVENTS =====
        // Add your game-specific events here as you build

        /**
         * Example: Fired when game starts
         * Payload: void
         */
        // GameStarted: new LocalEvent<void>("GameStarted"),

        /**
         * Example: Fired when game ends
         * Payload: { winner: Player, score: number }
         */
        // GameEnded: new LocalEvent<{ winner: Player; score: number }>("GameEnded"),
    };

    /**
     * Get a list of all registered event names (for debugging)
     */
    public static getEventNames(): string[] {
        return Object.keys(EventsService.Events);
    }

    /**
     * Log all available events to console (useful for debugging)
     */
    public static logAllEvents(): void {
        console.log("[EventsService] Available events:");
        EventsService.getEventNames().forEach(name => {
            console.log(`  - ${name}`);
        });
    }
}

// Type-safe event categories for better organization
export namespace GameEvents {
    // Add game-specific event groups here
    // Example:
    // export const Combat = {
    //     PlayerDamaged: new LocalEvent<{ player: Player; damage: number }>("Combat_PlayerDamaged"),
    //     EnemyDefeated: new LocalEvent<{ enemy: Entity; killer: Player }>("Combat_EnemyDefeated"),
    // };
}

/**
 * Event payload types for complex events
 * Define these to ensure type safety when sending/receiving events
 */
export namespace EventPayloads {
    export type TutorialStep = {
        player: Player;
        stepNumber: number;
    };

    export type GameResult = {
        winner: Player;
        score: number;
    };

    // Add more payload types as needed
}
