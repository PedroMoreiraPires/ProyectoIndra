package com.indra.eventossostenibles;

import java.sql.Date;

public record Event(
        long id, String name, Date date, int duration, int capacity,
        String image, float precio, Location location, String category, String status) {}
