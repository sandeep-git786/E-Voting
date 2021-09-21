
package evoting.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    private static Connection conn;
    static
    {
    try
    {
     Class.forName("oracle.jdbc.OracleDriver");
     System.out.println("Driver successfully loaded");
     conn=DriverManager.getConnection("jdbc:oracle:thin:@//DESKTOP-IFQCPLS:1521/xe","e_voting_db","evoting"); 
     System.out.println("connection done"+conn);
    }
    catch(Exception ex)
    {
        System.out.println("Connection not done!");  
    }
    }
    public static Connection getConnection()
    {
        System.out.println(conn+"in dbconnection");
        return conn;
    }
     public static void closeConnection()
    {
        try
        {
        conn.close();
        System.out.println("connection closed");
        }
        catch(Exception e)
        {
         e.printStackTrace();
        }
    }
}


