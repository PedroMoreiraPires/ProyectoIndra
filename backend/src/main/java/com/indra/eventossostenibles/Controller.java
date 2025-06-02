package com.indra.eventossostenibles;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Controller {
    private List<User> users;
    private List<Event> events;
    private List<Inscription> inscriptions;

    /**
     * Default constructor without notifications.
     */
    public Controller() {
        this.users = new ArrayList<>();
        this.events = new ArrayList<>();
        this.inscriptions = new ArrayList<>();
    }

    public boolean addUser(User user) {
        if (user == null) return false;
        if (users.contains(user)) return false;
        return users.add(user);
    }

    public boolean addEvent(Event event) {
        if (event == null) return false;
        if (events.contains(event)) return false;
        return events.add(event);
    }

    public boolean addInscription(Inscription inscription) {
        if (inscription == null) return false;
        if (inscriptions.contains(inscription)) return false;
        // Check that user and event exist for inscription
        boolean userExists = users.stream().anyMatch(u -> u.id() == inscription.userId());
        boolean eventExists = events.stream().anyMatch(e -> e.id() == inscription.eventId());
        if (!userExists || !eventExists) return false;
        return inscriptions.add(inscription);
    }

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

    public boolean updateEvent(Event event) {
        if (event == null) return false;
        int id = -1;
        for (int i = 0; i < events.size(); i++) {
            if (events.get(i).id() == event.id()) {
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

    public List<User> getUsers() {
        return Collections.unmodifiableList(users);
    }

    public List<Event> getEvents() {
        return Collections.unmodifiableList(events);
    }

    public List<Inscription> getInscriptions() {
        return Collections.unmodifiableList(inscriptions);
    }

    public boolean removeUser(User user) {
        return users.remove(user);
    }

    public boolean removeEvent(Event event) {
        return events.remove(event);
    }

    public boolean removeInscription(Inscription inscription) {
        return inscriptions.remove(inscription);
    }

    /** Find a user by id. */
    public Optional<User> findUserById(long id) {
        return users.stream().filter(u -> u.id() == id).findFirst();
    }

    /** Find an event by id. */
    public Optional<Event> findEventById(long id) {
        return events.stream().filter(e -> e.id() == id).findFirst();
    }

    /** Inscriptions for a specific user. */
    public List<Inscription> getInscriptionsByUser(long userId) {
        return inscriptions.stream()
                .filter(i -> i.userId() == userId)
                .collect(Collectors.toList());
    }

    /** Inscriptions for a specific event. */
    public List<Inscription> getInscriptionsByEvent(long eventId) {
        return inscriptions.stream()
                .filter(i -> i.eventId() == eventId)
                .collect(Collectors.toList());
    }

    public Optional<User> findUserByEmail(String email) {
        return users.stream().filter(u -> u.email().equalsIgnoreCase(email)).findFirst();
    }

    public Optional<Event> findEventByName(String name) {
        return events.stream().filter(e -> e.name().equalsIgnoreCase(name)).findFirst();
    }
}
