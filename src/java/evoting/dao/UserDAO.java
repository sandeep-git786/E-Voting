
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDto;
import evoting.dto.UserDTO;
import evoting.dto.UserDetails;
import evoting.dto.UserInfo;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 *
 */
public class UserDAO {
    private static PreparedStatement ps,ps5,ps4,ps3,ps2;
     private static Statement st,st2,st3;
    static
    {
        try{
            ps=DBConnection.getConnection().prepareStatement("select * from user_details where adhar_no=? and password=?");
            ps5=DBConnection.getConnection().prepareStatement("select candidate_id,username,party,symbol from "
                    + "candidate,user_details where candidate.user_id=user_details.adhar_no and candidate.city=(select"
                    + " city from user_details where adhar_no=?)");
            ps4=DBConnection.getConnection().prepareStatement("select adhar_no,username,address,city,email,mobile_no from user_details where adhar_no=?");
            st=DBConnection.getConnection().createStatement();
            st2=DBConnection.getConnection().createStatement();
            st3=DBConnection.getConnection().createStatement();
            ps3=DBConnection.getConnection().prepareStatement("update user_details set password=?,username=?,address=?,city=?,email=?,mobile_no=? where adhar_no=?");
            ps2=DBConnection.getConnection().prepareStatement("select * from user_details where adhar_no=?");
        }
        catch(SQLException ex){
            System.out.println("Error in DB"+ex);
        }
    }
    
    public static String validateUser(UserDTO user)throws SQLException
    {
        ps.setString(1,user.getUserid());
        ps.setString(2,user.getPassword());
        ResultSet rs= ps.executeQuery();
        if(rs.next()){
           return rs.getString(8);
        }
        else
            return null;
    }
    public static ArrayList<CandidateDto> viewCandidate(String userId)throws SQLException
    {  
       ArrayList<CandidateDto> candidate=new ArrayList<>();
       ps5.setString(1, userId);
       ResultSet rs=ps5.executeQuery();
       Blob blob;
       byte[] imagesBytes;
       String base64Image;
       while(rs.next())
       {
           blob=rs.getBlob(4);
           imagesBytes=blob.getBytes(1L,(int)blob.length());
           base64Image=Base64.getEncoder().encodeToString(imagesBytes);
           candidate.add(new CandidateDto(rs.getString(1),rs.getString(2),rs.getString(3),base64Image));
       }
       return candidate;
    }
    public static ArrayList<UserInfo> showUsers() throws SQLException
    {
     ArrayList<UserInfo> users=new ArrayList<>();
     ResultSet rs=st.executeQuery("select adhar_no,username,address,city,email,mobile_no from user_details");
     while(rs.next())
     {
      users.add(new UserInfo(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getLong(6)));
     }
     return users;
    }
    public static ArrayList<String> getUserId()throws SQLException
      {
        ResultSet rs=st2.executeQuery("select adhar_no from user_details where user_type!='ADMIN'");
        ArrayList<String> id=new ArrayList<>();
        while(rs.next())  
        {
           id.add(rs.getString(1)); 
        }
        return id;
      }
    public static UserInfo getDetailsById(String uid) throws SQLException
    {
     ps4.setString(1, uid);
     UserInfo user=null;
     ResultSet rs=ps4.executeQuery();
     if(rs.next())
     {
      user=new UserInfo(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getLong(6));
     }
     return user;
    }
    public static boolean removeUser(String uid) throws SQLException
    {
         DBConnection.getConnection().setAutoCommit(false);
         st3.addBatch("delete from candidate where user_id='"+uid+"'");
         st3.addBatch("delete from voting where user_id='"+uid+"'");
         st3.addBatch("delete from user_details where adhar_no='"+uid+"'");
         DBConnection.getConnection().commit();
         return (st3.executeBatch().length>0);
    }
    public static UserDetails getUserById(String uid)throws SQLException
    {
      ps2.setString(1, uid);
   
      ResultSet rs=ps2.executeQuery();
      if(rs.next())
        return new UserDetails(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getLong(7));   
      return null;
    }        
    public static boolean updateUser(UserDetails user)throws SQLException
    {
     ps3.setString(1,user.getPassword());
     ps3.setString(2,user.getUsername());
     ps3.setString(3,user.getAddress());
     ps3.setString(4,user.getCity());
     ps3.setString(5,user.getEmail());
     ps3.setLong(6,user.getMobile());
     ps3.setString(7,user.getUserid());
     return ps3.executeUpdate()!=0;
    }
}
