package com.indra.eventossostenibles;

/**
 * Represents a user in the system.
 * @param id Unique identifier for the user
 * @param name Name of the user
 * @param email Email address
 * @param role User's role (e.g., USER, ADMIN)
 * @param phone Contact phone number
 * @param company Company name
 * @param website User's website
 */
public record User(long id, String name, String email, String role, String phone, String company, String website) {}
