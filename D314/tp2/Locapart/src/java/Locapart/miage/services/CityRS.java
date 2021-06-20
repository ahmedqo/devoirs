/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.services;

import Locapart.miage.dao.CItyDAO;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
/**
 * REST Web Service
 *
 * @author ahmedqo
 */
@Path("cities")
public class CityRS {

    private final CItyDAO ville = new CItyDAO();
    
    public CityRS() {}
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCties () {
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(ville.getCities())
            .build();
    }
    
    @GET
    @Path("search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchCities (@QueryParam("start") int start, @QueryParam("end") int end) {
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(ville.searchCities(start, end))
            .build();
    }
}
