/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.miage;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.xml.bind.annotation.XmlSeeAlso;

/**
 *
 * @author ahmedqo
 */
@WebService(serviceName = "TestSQLite")
@XmlSeeAlso(Recette.class)
public class TestSQLite {

    static {
        try {
            Class.forName("org.sqlite.jdbc");
        } catch (ClassNotFoundException ex) {
            System.out.println("Impossible de charger le driver SQLite.");
        }
    }
    /**
     * This is a sample web service operation
     */
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }
}
