
package pack;


public class IdGenerator
{

    private static int uniqueId = 0;

    public static int getId()
    {
        return uniqueId++;
    }

}
