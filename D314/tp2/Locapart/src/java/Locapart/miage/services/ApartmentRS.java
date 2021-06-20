/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.services;

import Locapart.miage.dao.ApartmentDAO;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author ahmedqo
 */
@Path("apartments")
public class ApartmentRS {
    
    private final ApartmentDAO apprt = new ApartmentDAO();
    
    public ApartmentRS() {}
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getApartments (){
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(apprt.getApartments())
            .build();
    }
    
    @GET
    @Path("search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchApartments (@QueryParam("start") int start, @QueryParam("end") int end, @QueryParam("city") int city) {
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(apprt.searchApartments(start, end, city))
            .build();
    }
    
    @GET
    @Path("filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getApartmentsByDate (@QueryParam("start") int start, @QueryParam("end") int end) {
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(apprt.getApartmentsByDate(start, end))
            .build();
    }
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDescription (@PathParam("id") int id) {
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(apprt.getDescription(id))
            .build();
    }

}
