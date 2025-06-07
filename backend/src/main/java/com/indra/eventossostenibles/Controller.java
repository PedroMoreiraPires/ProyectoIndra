package com.indra.eventossostenibles;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Controller class manages users, events, and inscriptions in memory.
 * Provides CRUD operations and search utilities for each entity.
 */
public class Controller {
    // List of all users
    private List<User> users;
    // List of all events
    private List<Event> events;
    // List of all inscriptions (registrations)
    private List<Inscription> inscriptions;

    /**
     * Default constructor initializes empty lists for users, events, and inscriptions.
     */
    public Controller() {
        this.users = new ArrayList<>();
        this.events = new ArrayList<>();
        this.inscriptions = new ArrayList<>();
    }

    /**
     * Adds a user if not null and not already present.
     * @param user User to add
     * @return true if added, false otherwise
     */
    public boolean addUser(User user) {
        if (user == null) return false;
        if (users.contains(user)) return false;
        return users.add(user);
    }

    /**
     * Adds an event if not null and not already present.
     * @param event Event to add
     * @return true if added, false otherwise
     */
    public boolean addEvent(Event event) {
        if (event == null) return false;
        if (events.contains(event)) return false;
        return events.add(event);
    }

    /**
     * Adds an inscription if not null, not already present, and user/event exist.
     * @param inscription Inscription to add
     * @return true if added, false otherwise
     */
    public boolean addInscription(Inscription inscription) {
        if (inscription == null) return false;
        if (inscriptions.contains(inscription)) return false;
        // Check that user and event exist for inscription
        boolean userExists = users.stream().anyMatch(u -> u.id() == inscription.userId());
        boolean eventExists = events.stream().anyMatch(e -> e.getId() == inscription.eventId());
        if (!userExists || !eventExists) return false;
        return inscriptions.add(inscription);
    }

    /**
     * Updates an existing user by id.
     * @param user User with updated data
     * @return true if updated, false otherwise
     */
    public boolean updateUser(User user) {
        if (user == null) return false;
        int id = -1;
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).id() == user.id()) {
                id = i;
                break;
            }
        }
        if (id != -1) {
            users.set(id, user);
            return true;
        }
        return false;
    }

    /**
     * Updates an existing event by id.
     * @param event Event with updated data
     * @return true if updated, false otherwise
     */
    public boolean updateEvent(Event event) {
        if (event == null) return false;
        int id = -1;
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).getId() == event.getId()) {
                id = i;
                break;
            }
        }
        if (id != -1) {
            events.set(id, event);
            return true;
        }
        return false;
    }

    /**
     * Updates an existing inscription by id.
     * @param inscription Inscription with updated data
     * @return true if updated, false otherwise
     */
    public boolean updateInscription(Inscription inscription) {
        if (inscription == null) return false;
        int id = -1;
        for (int i = 0; i < inscriptions.size(); i++) {
            if (inscriptions.get(i).id() == inscription.id()) {
                id = i;
                break;
            }
        }
        if (id != -1) {
            inscriptions.set(id, inscription);
            return true;
        }
        return false;
    }

    /**
     * Returns an unmodifiable list of users.
     */
    public List<User> getUsers() {
        return Collections.unmodifiableList(users);
    }

    /**
     * Returns an unmodifiable list of events.
     */
    public List<Event> getEvents() {
        return Collections.unmodifiableList(events);
    }

    /**
     * Returns an unmodifiable list of inscriptions.
     */
    public List<Inscription> getInscriptions() {
        return Collections.unmodifiableList(inscriptions);
    }

    /**
     * Removes a user from the list.
     * @param user User to remove
     * @return true if removed, false otherwise
     */
    public boolean removeUser(User user) {
        return users.remove(user);
    }

    /**
     * Removes an event from the list.
     * @param event Event to remove
     * @return true if removed, false otherwise
     */
    public boolean removeEvent(Event event) {
        return events.remove(event);
    }

    /**
     * Removes an inscription from the list.
     * @param inscription Inscription to remove
     * @return true if removed, false otherwise
     */
    public boolean removeInscription(Inscription inscription) {
        return inscriptions.remove(inscription);
    }

    /**
     * Finds a user by their unique id.
     * @param id User id
     * @return Optional containing user if found
     */
    public Optional<User> findUserById(long id) {
        return users.stream().filter(u -> u.id() == id).findFirst();
    }

    /**
     * Finds an event by its unique id.
     * @param id Event id
     * @return Optional containing event if found
     */
    public Optional<Event> findEventById(long id) {
        return events.stream().filter(e -> e.getId() == id).findFirst();
    }

    /**
     * Gets all inscriptions for a specific user.
     * @param userId User id
     * @return List of inscriptions for the user
     */
    public List<Inscription> getInscriptionsByUser(long userId) {
        return inscriptions.stream()
                .filter(i -> i.userId() == userId)
                .collect(Collectors.toList());
    }

    /**
     * Gets all inscriptions for a specific event.
     * @param eventId Event id
     * @return List of inscriptions for the event
     */
    public List<Inscription> getInscriptionsByEvent(long eventId) {
        return inscriptions.stream()
                .filter(i -> i.eventId() == eventId)
                .collect(Collectors.toList());
    }

    /**
     * Finds a user by their email (case-insensitive).
     * @param email User email
     * @return Optional containing user if found
     */
    public Optional<User> findUserByEmail(String email) {
        return users.stream().filter(u -> u.email().equalsIgnoreCase(email)).findFirst();
    }

    /**
     * Finds an event by its name (case-insensitive).
     * @param name Event name
     * @return Optional containing event if found
     */
    public Optional<Event> findEventByName(String name) {
        return events.stream().filter(e -> e.getName().equalsIgnoreCase(name)).findFirst();
    }
}
