/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pack;

import java.io.IOException;
import java.util.Map;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "RestFulPeopleServlet", urlPatterns =
{
    "/RestFulPeopleServlet", "/RestFulPeopleServlet/*",
})
public class RestFulPeopleServlet extends HttpServlet
{

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        ServletContext sc = request.getServletContext();
        Map<Integer, Person> people = (Map<Integer, Person>) sc.getAttribute("people");
        String pathInfo = request.getPathInfo();
        Object result = null;
        if (pathInfo == null || pathInfo.equals("/"))
        {
            result = people.values();
        } else
        {
            int id = Integer.parseInt(pathInfo.substring(1));
            Person p = people.get(id);
            System.out.println(p);
            result = p;
        }
        Jsonb jsonb = JsonbBuilder.create();
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        jsonb.toJson(result, response.getWriter());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        ServletContext sc = request.getServletContext();
        Map<Integer, Person> people = (Map<Integer, Person>) sc.getAttribute("people");
        Jsonb jsonb = JsonbBuilder.create();
        Person p = jsonb.fromJson(request.getReader(), Person.class);
        p.setId(IdGenerator.getId());
        people.put(p.getId(), p);
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_CREATED);
        response.setHeader("Access-Control-Allow-Origin", "*");
        jsonb.toJson(p, response.getWriter());
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        ServletContext sc = request.getServletContext();
        Map<Integer, Person> people = (Map<Integer, Person>) sc.getAttribute("people");
        String pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/"))
        {
            response.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED);
            return;
        }
        int id = Integer.parseInt(pathInfo.substring(1));
        Person p = people.get(id);
        if (p == null)
        {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        people.remove(id);
        System.out.println(p);
        Jsonb jsonb = JsonbBuilder.create();
        response.setContentType("application/json");
        jsonb.toJson(p, response.getWriter());
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        ServletContext sc = request.getServletContext();
        Map<Integer, Person> people = (Map<Integer, Person>) sc.getAttribute("people");
        String pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/"))
        {
            response.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED);
            return;
        }
        int id = Integer.parseInt(pathInfo.substring(1));
        Person p = people.get(id);
        if (p == null)
        {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
// Modify
        Jsonb jsonb = JsonbBuilder.create();
        Person newP = jsonb.fromJson(request.getReader(), Person.class);
        newP.setId(id);
        people.put(id, newP);
        response.setContentType("application/json");
        jsonb.toJson(newP, response.getWriter());
        System.out.println("put " + newP);
    }
}
