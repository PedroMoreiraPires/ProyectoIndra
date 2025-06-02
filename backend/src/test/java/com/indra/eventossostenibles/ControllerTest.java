package com.indra.eventossostenibles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.sql.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ControllerTest {

    private Controller controller;
    private User user;
    private Event event;
    private Inscription inscription;

    @BeforeEach
    void setUp() {
        controller = new Controller();
        user = new User(1L, "Alice", "alice@example.com", "USER", "1234567890", "Company", "www.example.com");
        event = new Event(10L, "Conference", Date.valueOf("2025-01-01"), 8, 100,
                "img.png", 49.99f,
                new Location(5L, "Indoor", "Hall A", ""),
                "Business", "Scheduled");
        inscription = new Inscription(100L, user.id(), event.id(), "PENDING");
    }

    @Test
    @DisplayName("addUser: prevents duplicates and null values")
    void testAddUserPreventsDuplicatesAndNull() {
        assertTrue(controller.addUser(user));
        assertFalse(controller.addUser(user));
        assertFalse(controller.addUser(null));
    }

    @Test
    @DisplayName("addEvent: prevents duplicates and null values")
    void testAddEventPreventsDuplicatesAndNull() {
        assertTrue(controller.addEvent(event));
        assertFalse(controller.addEvent(event));
        assertFalse(controller.addEvent(null));
    }

    @Test
    @DisplayName("addInscription: prevents duplicates, null, and requires user/event")
    void testAddInscriptionPreventsDuplicatesAndNullAndRequiresUserAndEvent() {
        // Not added yet, should fail
        assertFalse(controller.addInscription(inscription));
        controller.addUser(user);
        assertFalse(controller.addInscription(inscription));
        controller.addEvent(event);
        assertTrue(controller.addInscription(inscription));
        assertFalse(controller.addInscription(inscription));
        assertFalse(controller.addInscription(null));
    }

    @Test
    @DisplayName("updateUser: only updates existing users")
    void testUpdateUser() {
        assertFalse(controller.updateUser(user));
        controller.addUser(user);
        User updated = new User(user.id(), "Alicia", user.email(), user.role(), user.phone(), user.company(), user.website());
        assertTrue(controller.updateUser(updated));
        assertEquals("Alicia", controller.findUserById(user.id()).get().name());
        assertFalse(controller.updateUser(null));
        assertFalse(controller.updateUser(new User(999L, "X", "x@x.com", "U", "0", "C", "w")));
    }

    @Test
    @DisplayName("updateEvent: only updates existing events")
    void testUpdateEvent() {
        assertFalse(controller.updateEvent(event));
        controller.addEvent(event);
        Event updated = new Event(event.id(), "Conf2025", event.date(), event.duration(), event.capacity(), event.image(), event.precio(), event.location(), event.category(), event.status());
        assertTrue(controller.updateEvent(updated));
        assertEquals("Conf2025", controller.findEventById(event.id()).get().name());
        assertFalse(controller.updateEvent(null));
        assertFalse(controller.updateEvent(new Event(999L, "X", event.date(), 1, 1, "", 0f, event.location(), "", "")));
    }

    @Test
    @DisplayName("updateInscription: only updates existing inscriptions")
    void testUpdateInscription() {
        assertFalse(controller.updateInscription(inscription));
        controller.addUser(user);
        controller.addEvent(event);
        controller.addInscription(inscription);
        Inscription updated = new Inscription(inscription.id(), inscription.userId(), inscription.eventId(), "CONFIRMED");
        assertTrue(controller.updateInscription(updated));
        assertEquals("CONFIRMED", controller.getInscriptionsByUser(user.id()).get(0).status());
        assertFalse(controller.updateInscription(null));
        assertFalse(controller.updateInscription(new Inscription(999L, 1L, 1L, "X")));
    }

    @Test
    @DisplayName("removeUser/Event/Inscription: removes only existing entities")
    void testRemoveUserEventInscription() {
        controller.addUser(user);
        controller.addEvent(event);
        controller.addInscription(new Inscription(101L, user.id(), event.id(), "PENDING"));
        assertTrue(controller.removeUser(user));
        assertTrue(controller.removeEvent(event));
        assertTrue(controller.removeInscription(new Inscription(101L, user.id(), event.id(), "PENDING")));
        assertFalse(controller.removeUser(user));
        assertFalse(controller.removeEvent(event));
        assertFalse(controller.removeInscription(inscription));
    }

    @Test
    @DisplayName("getUsers/getEvents/getInscriptions: return immutable lists")
    void testGettersReturnImmutableLists() {
        controller.addUser(user);
        List<User> users = controller.getUsers();
        assertThrows(UnsupportedOperationException.class, () -> users.add(user));
        controller.addEvent(event);
        List<Event> events = controller.getEvents();
        assertThrows(UnsupportedOperationException.class, () -> events.add(event));
        controller.addUser(user);
        controller.addEvent(event);
        controller.addInscription(inscription);
        List<Inscription> inscriptions = controller.getInscriptions();
        assertThrows(UnsupportedOperationException.class, () -> inscriptions.add(inscription));
    }

    @Test
    @DisplayName("findUserById/findEventById: finds only existing entities")
    void testFindUserAndEventById() {
        controller.addUser(user);
        controller.addEvent(event);
        assertTrue(controller.findUserById(user.id()).isPresent());
        assertTrue(controller.findEventById(event.id()).isPresent());
        assertFalse(controller.findUserById(999L).isPresent());
        assertFalse(controller.findEventById(999L).isPresent());
    }

    @Test
    @DisplayName("getInscriptionsByUser/getInscriptionsByEvent: returns correct inscriptions")
    void testGetInscriptionsByUserAndEvent() {
        controller.addUser(user);
        controller.addEvent(event);
        controller.addInscription(inscription);
        Inscription other = new Inscription(101L, 2L, 20L, "CONFIRMED");
        controller.addUser(new User(2L, "Bob", "bob@example.com", "USER", "000", "C", "w"));
        controller.addEvent(new Event(20L, "Other", Date.valueOf("2025-02-01"), 2, 10, "img2.png", 10f, new Location(6L, "Outdoor", "Hall B", ""), "Leisure", "Scheduled"));
        controller.addInscription(other);
        assertEquals(1, controller.getInscriptionsByUser(user.id()).size());
        assertEquals(inscription, controller.getInscriptionsByUser(user.id()).get(0));
        assertEquals(1, controller.getInscriptionsByEvent(event.id()).size());
        assertEquals(inscription, controller.getInscriptionsByEvent(event.id()).get(0));
    }

    @Test
    @DisplayName("findUserByEmail: finds only existing users by email")
    void testFindUserByEmail() {
        controller.addUser(user);
        assertTrue(controller.findUserByEmail(user.email()).isPresent());
        assertFalse(controller.findUserByEmail("nope@no.com").isPresent());
    }

    @Test
    @DisplayName("findEventByName: finds only existing events by name")
    void testFindEventByName() {
        controller.addEvent(event);
        assertTrue(controller.findEventByName(event.name()).isPresent());
        assertFalse(controller.findEventByName("NoEvent").isPresent());
    }
}