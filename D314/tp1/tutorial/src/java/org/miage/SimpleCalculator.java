/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.miage;

import java.util.ArrayList;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

/**
 *
 * @author ahmedqo
 */
@WebService(serviceName = "SimpleCalculator")
public class SimpleCalculator {

    /**
     * This is a sample web service operation
     */
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "additionner")
    public double additionner(@WebParam(name = "numberA") double numberA, @WebParam(name = "numberB") double numberB) {
        //TODO write your implementation code here:
        return numberA + numberB;
    }
    
    /**
     * Web service operation
     */
    @WebMethod(operationName = "decomposer")
    public List decomposer(@WebParam(name = "number") int number) {
        //TODO write your implementation code here:
        List list = new ArrayList();
        int i = 2;
        while (i <= number) {
            if (number % i == 0) {
                list.add(i);
                number = number / i;
            } else {
                i++;
            }
        }
        return list;
    }
    
    /**
     * Web service operation
     */
    @WebMethod(operationName = "premier")
    public boolean premier(@WebParam(name = "number") int number) {
        //TODO write your implementation code here:
        return decomposer(number).size() == 1;
    }
    
    
    public static void main (String [] args) {
        SimpleCalculator calc = new SimpleCalculator();
        System.out.println("premoer 8 ? " + calc.premier(8));
        System.out.println("premoer 5 ? " + calc.premier(5));
        System.out.println("decomposer 8 ? " + calc.decomposer(8));
        System.out.println("decomposer 362880 ? " + calc.decomposer(362880));
    }

}
