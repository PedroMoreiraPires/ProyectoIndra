package com.indra.eventossostenibles;

/**
 * Represents a location for an event.
 * @param id Unique identifier for the location
 * @param type Type of location (e.g., Indoor, Outdoor)
 * @param location Name or description of the location
 * @param url URL for the location (e.g., map link)
 */
public record Location(long id, String type, String location, String url) {}
