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
public class City {
    public int id;
    public String slug;

    public City () {}

    public City (int id, String slug) {
        this.id = id;
        this.slug = slug;
    }
   
    public int getId () {
        return this.id;
    }
    
    public String getSlug () {
        return this.slug;
    }
    
    public void setId (int id) {
        this.id = id;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
}
