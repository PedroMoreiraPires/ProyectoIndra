package com.indra.eventossostenibles;

import java.sql.Date;

/**
 * Abstract class representing an event in the system.
 */
public abstract class Event {
    private long id;
    private String name;
    private Date date;
    private int duration;
    private int capacity;
    private String image;
    private float precio;
    private String category;
    private String status;

    public Event(long id, String name, Date date, int duration, int capacity, String image, float precio, String category, String status) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.duration = duration;
        this.capacity = capacity;
        this.image = image;
        this.precio = precio;
        this.category = category;
        this.status = status;
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public Date getDate() { return date; }
    public int getDuration() { return duration; }
    public int getCapacity() { return capacity; }
    public String getImage() { return image; }
    public float getPrecio() { return precio; }
    public String getCategory() { return category; }
    public String getStatus() { return status; }

    public void setId(long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDate(Date date) { this.date = date; }
    public void setDuration(int duration) { this.duration = duration; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public void setImage(String image) { this.image = image; }
    public void setPrecio(float precio) { this.precio = precio; }
    public void setCategory(String category) { this.category = category; }
    public void setStatus(String status) { this.status = status; }
}
