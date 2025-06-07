package com.indra.eventossostenibles;

import java.sql.Date;

public class PresencialEvent extends Event {
    private Location location;

    public PresencialEvent(long id, String name, Date date, int duration, int capacity, String image, float precio, String category, String status, Location location) {
        super(id, name, date, duration, capacity, image, precio, category, status);
        this.location = location;
    }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
