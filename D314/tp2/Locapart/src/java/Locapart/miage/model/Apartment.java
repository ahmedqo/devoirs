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
public class Apartment {
    public int id;
    public String title;
    public String description;
    
    public Apartment () {}
    
    public Apartment (int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    
    public int getId () {
        return this.id;
    }
    
    public String getTitle () {
        return this.title;
    }
    
    public String getDescription () {
        return this.description;
    }
    
    public void setId (int id) {
        this.id = id;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}
