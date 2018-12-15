
package pack;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class PeopleSPAWebListener implements
        ServletContextListener
{

    @Override
    public void contextInitialized(ServletContextEvent sce)
    {
        Map<Integer, Person> people = new HashMap<>();
        Person p1 = new Person("Jim", 12);
        p1.setId(IdGenerator.getId());
        people.put(p1.getId(), p1);
        Person p2 = new Person("Arnold", 4);
        p2.setId(IdGenerator.getId());
        people.put(p2.getId(), p2);
        ServletContext sc = sce.getServletContext();
        sc.setAttribute("people", people);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce)
    {
    }
}
