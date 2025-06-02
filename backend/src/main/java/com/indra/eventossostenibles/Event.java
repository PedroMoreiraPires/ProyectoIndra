package com.indra.eventossostenibles;

import java.sql.Date;

/**
 * Represents an event in the system.
 * @param id Unique identifier for the event
 * @param name Name of the event
 * @param date Date of the event
 * @param duration Duration in hours
 * @param capacity Maximum number of participants
 * @param image Image URL or path
 * @param precio Price of the event
 * @param location Location object
 * @param category Event category
 * @param status Current status (e.g., Scheduled, Cancelled)
 */
public record Event(
        long id, String name, Date date, int duration, int capacity,
        String image, float precio, Location location, String category, String status) {}
