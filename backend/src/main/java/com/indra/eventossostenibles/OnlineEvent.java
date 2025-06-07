package com.indra.eventossostenibles;

import java.sql.Date;

public class OnlineEvent extends Event {
    private String url;

    public OnlineEvent(long id, String name, Date date, int duration, int capacity, String image, float precio, String category, String status, String url) {
        super(id, name, date, duration, capacity, image, precio, category, status);
        this.url = url;
    }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
