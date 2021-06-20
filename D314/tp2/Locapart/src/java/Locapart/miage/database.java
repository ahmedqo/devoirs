/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ahmedqo
 */
public class database {
    private Connection cnx;
    public database() {
        try {
            Class.forName("org.sqlite.JDBC");
            String path = this.getClass().getResource("/NetBeans.db").getPath();
            cnx = DriverManager.getConnection("jdbc:sqlite:" + path);            
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public Connection connect() {
        return cnx;
    }
    public void disconnect() {
        try {
            cnx.close();
        } catch (SQLException ex) {
            Logger.getLogger(database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
