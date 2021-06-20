/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.model;

/**
 *
 * @author ahmedqo
 */
public class Booking {
    public int id;
    public int start;
    public int end;
    public int apartmentId;
    public String apartmentTitle;
    
    public Booking () {}
    
    public Booking (int id, int start, int end, int apartmentId, String apartmentTitle) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.apartmentId = apartmentId;
        this.apartmentTitle = apartmentTitle;
    }
    
    public int getId () {
        return this.id;
    }
    
    public int getStart () {
        return this.start;
    }
    
    public int getEnd () {
        return this.end;
    }
    
    public int getApartmentId () {
        return this.apartmentId;
    }
    
    public String getApartmentTitle () {
        return this.apartmentTitle;
    }
    
    public void setId (int id) {
        this.id = id;
    }
    
    public void setStart (int start) {
        this.start = start;
    }
    
    public void setEnd (int end) {
        this.end = end;
    }
    
    public void setApartmentId (int apartmentId) {
        this.apartmentId = apartmentId;
    }
    
    public void setApartmentTitle (String apartmentTitle) {
        this.apartmentTitle = apartmentTitle;
    }
}
