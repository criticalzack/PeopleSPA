package pack;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Person
{

    private int id;
    private String name;
    private int age;

    public Person()
    {
        this("", 0);
    }

    public Person(String name, int age)
    {
        this.name = name;
        this.age = age;
        id = -1;
    }

    @Override
    public String toString()
    {
        return String.format("( %d %s %d)", id, name, age);
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public int getAge()
    {
        return age;
    }

    public void setAge(int age)
    {
        this.age = age;
    }
}
