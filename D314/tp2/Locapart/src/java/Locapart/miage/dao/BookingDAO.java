/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.dao;

import Locapart.miage.database;
import Locapart.miage.model.Booking;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ahmedqo
 */
public class BookingDAO {
    
     private final database cnx = new database();
     
     public BookingDAO() {}
     
     public List<Booking> getBookings () {
        String query = "SELECT reservation.id, reservation.debut, reservation.fin, reservation.idAppartement, appartement.titre \n" +
                        "FROM reservation\n" +
                        "LEFT JOIN appartement ON appartement.id = reservation.idAppartement";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            ResultSet res = req.executeQuery();
            List result = new ArrayList();
            while (res.next()) {
                int id = res.getInt("id");
                int start = res.getInt("debut");
                int end = res.getInt("fin");
                int apartment = res.getInt("idAppartement");
                String title = res.getString("titre");
                result.add(new Booking(id, start, end, apartment, title));
            }
            cnx.disconnect();
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
     
     public int createBooking (Booking r){
        String query = "INSERT INTO reservation(debut,fin,idAppartement) VALUES(?,?,?)";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, r.start);
            req.setInt(2, r.end);
            req.setInt(3, r.apartmentId);
            int res = req.executeUpdate();
            cnx.disconnect();
            return res;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return 0;
        }
     }
     
     public int deleteBooking (int id) {
        String query = "DELETE FROM reservation WHERE id = ?";
        try {
            PreparedStatement req = cnx.connect().prepareStatement(query);
            req.setInt(1, id);
            int res = req.executeUpdate();
            cnx.disconnect();
            return res;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return 0;
        }
    }
}
