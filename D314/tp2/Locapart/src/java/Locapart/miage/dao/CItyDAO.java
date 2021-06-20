/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.dao;

import Locapart.miage.database;
import Locapart.miage.model.City;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ahmedqo
 */
public class CItyDAO {
    private final database cnx = new database();
    
    public CItyDAO() {}
    
    public List<City> getCities () {
        String query = "SELECT * FROM ville";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                String slug = res.getString("libelle");
                result.add(new City(id, slug));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
    
    public List<City> searchCities (int start, int end) {
        String query = "SELECT id, libelle FROM ville EXCEPT\n" +
                    "SELECT ville.id, ville.libelle FROM ville\n" +
                    "LEFT JOIN appartement ON ville.id = appartement.idVille\n" +
                    "LEFT JOIN reservation ON appartement.id = reservation.idAppartement\n" +
                    "WHERE reservation.fin BETWEEN ? AND ?";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, start);
            req.setInt(2, end);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                String slug = res.getString("libelle");
                result.add(new City(id, slug));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
}
