import * as hz from 'horizon/core';

/**
 * EventsService - Centralized event registry for all LocalEvents
 * 
 * Provides type-safe event access and prevents event name conflicts
 */
export class EventsService {
    /**
     * All LocalEvents used throughout the world
     */
    public static readonly Events = {
        /** Fired when a player joins the world */
        PlayerJoined: new hz.LocalEvent<hz.Player>("PlayerJoined"),

        /** Fired when a player completes the tutorial */
        TutorialCompleted: new hz.LocalEvent<hz.Player>("TutorialCompleted"),
    };
}
