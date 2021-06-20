/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.miage;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ahmedqo
 */
@XmlRootElement(name = "Recette")
public class Recette implements Serializable {
    
    private String titre = "indefini";
    private String description = "indefini";
    
    public Recette () {}
    
    public Recette (String titre, String description) {
        this.titre = titre;
        this.description = description;
    }
    
    @XmlElement(name = "XMLTitre", required = true, nillable = true)
    public String getTitre () {
        return titre;
    }
    
    @XmlElement(name = "XMLDesc", required = true, nillable = true)
    public String getDescription () {
        return description;
    }    
    
    @WebMethod(operationName = "rechercheParIngredient")
    public List rechercheParIngredient(@WebParam(name = "ingredient") String ingredient) {
        String path = this.getClass().getResource("/NetBeans.db").getPath();
        String query = "SELECT Titre, Description, Nom FROM Recettes" +
                "INNER JOIN RecetteIngredient ON RecetteIngredient.idRecette = Recettes.idRecette" +
                "INNER JOIN Ingredient ON Ingredient.idIngredien = Ingredien.idIngredient" +
                "WHERE Nom LIKE '%" + ingredient + "%'";
        try {
            Connection cnx = DriverManager.getConnection("jdbc:sqlite:" + path);
            Statement stm = cnx.createStatement();
            ResultSet exec = stm.executeQuery(query);
            List result = new ArrayList();
            while (exec.next()) {
                String titre = exec.getString("Titre");
                String description = exec.getString("Description");
                String nom = exec.getString("Nom");
                result.add(new Recette(titre, description));
                System.out.println(titre + " " + description + " " + nom );
            }
            return result;
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
            return null;
        }
    }
}
