/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Locapart.miage.services;

import Locapart.miage.dao.BookingDAO;
import Locapart.miage.model.Booking;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author ahmedqo
 */
@Path("bookings")
public class BookingRS {

    private final BookingDAO res = new BookingDAO();
    
    public BookingRS() {}
    
    @GET
    public Response getBookings(){
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "GET")
            .header("Access-Control-Max-Age", "1209600")
            .entity(res.getBookings())
            .build();
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.MULTIPART_FORM_DATA})
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBooking (Booking r){
        System.out.println(r);
        return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "POST")
            .header("Access-Control-Max-Age", "1209600")
            .entity(res.createBooking(r))
            .build();
    }
    
    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteBooking (@PathParam("id") int id){
         return Response
            .status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept")
            .header("Access-Control-Allow-Methods", "DELETE")
            .header("Access-Control-Max-Age", "1209600")
            .entity(res.deleteBooking(id))
            .build();
        
    }
}
