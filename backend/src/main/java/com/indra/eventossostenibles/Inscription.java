package com.indra.eventossostenibles;

/**
 * Represents an inscription (registration) for an event by a user.
 * 
 * @param id      Unique identifier for the inscription
 * @param userId  ID of the user who registered
 * @param eventId ID of the event
 * @param status  Status of the inscription (e.g., PENDING, CONFIRMED)
 */
public record Inscription(long id, long userId, long eventId, String status) {}
