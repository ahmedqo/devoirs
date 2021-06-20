/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.dao;

import Locapart.miage.database;
import Locapart.miage.model.Apartment;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ahmedqo
 */
public class ApartmentDAO {
    private final database cnx = new database();
    
    public ApartmentDAO() {}
    
    public List<Apartment> getApartments () {
        String query = "SELECT * FROM appartement";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                String title = res.getString("titre");
                String description = res.getString("description");
                result.add(new Apartment(id, title, description));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
    
    public List<Apartment> searchApartments (int start, int end, int city) {
        String query = "SELECT id, titre, description FROM appartement\n" +
                        "WHERE idVille = ? EXCEPT\n" +
                        "SELECT appartement.id, appartement.titre, appartement.description FROM appartement\n" +
                        "LEFT JOIN ville ON appartement.idVille = ville.id\n" +
                        "LEFT JOIN reservation on appartement.id = reservation.idAppartement\n" +
                        "WHERE reservation.fin BETWEEN ? AND ?";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, city);
            req.setInt(2, start);
            req.setInt(3, end);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                String title = res.getString("titre");
                String description = res.getString("description");
                result.add(new Apartment(id, title, description));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
    
    public List<Apartment> getApartmentsByDate (int start, int end) {
        String query = "SELECT id, titre, description FROM appartement EXCEPT\n" +
                        "SELECT appartement.id, appartement.titre, appartement.description FROM appartement\n" +
                        "LEFT JOIN ville ON appartement.idVille = ville.id\n" +
                        "LEFT JOIN reservation on appartement.id = reservation.idAppartement\n" +
                        "WHERE reservation.fin BETWEEN ? AND ?";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, start);
            req.setInt(2, end);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                String title = res.getString("titre");
                String description = res.getString("description");
                result.add(new Apartment(id, title, description));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
    
    public Apartment getDescription(int id) {
        String query = "SELECT titre, description FROM appartement WHERE id = ?";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, id);
            ResultSet res = req.executeQuery();
            Apartment result = null;
            if (res.next()) {
                String title = res.getString("titre");
                String description = res.getString("description");
                result = new Apartment(id, title, description);
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
}
   