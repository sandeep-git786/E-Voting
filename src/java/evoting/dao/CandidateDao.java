
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.AddCandidateDto;
import evoting.dto.CandidateDetails;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Encoder;

/**
 *
 * @author sandeep
 */
public class CandidateDao {
    private static Statement st,st2,st3,st4;
    private static PreparedStatement ps,ps2,ps3,ps4;
    static
    {
        try
        {
            st=DBConnection.getConnection().createStatement();
            st2=DBConnection.getConnection().createStatement();
            ps=DBConnection.getConnection().prepareStatement("select username from user_details where adhar_no=?");
            ps2=DBConnection.getConnection().prepareStatement("insert into candidate values(?,?,?,?,?)");
            st3=DBConnection.getConnection().createStatement();
            st4=DBConnection.getConnection().createStatement();
            ps3=DBConnection.getConnection().prepareStatement("select * from candidate where candidate_id=?");
            ps4=DBConnection.getConnection().prepareStatement("update candidate set city=?,party=?,symbol=? where candidate_id=?");
        }
        catch(SQLException ex)
        {
            ex.printStackTrace();
        }
        
    }
    public static String getNewCandidateId()throws SQLException
    {
        //ResultSet rs=st.executeQuery("select count(*) from candidate");
         ResultSet rs=st.executeQuery("select max(candidate_id) from candidate");
        if(rs.next())
        {
         //return "C"+(100+rs.getInt(1)+1);
          int  id=Integer.parseInt(rs.getString(1).substring(1));
          return "C"+(id+1);
        }
        else
         return "C101";
       
    }
     public static String getUserNameById(String uid)throws SQLException
     {
         ps.setString(1,uid);
         ResultSet rs=ps.executeQuery();
         if(rs.next())
         {
             return rs.getString(1);
         }
         return null;
     }
      public static ArrayList<String> getCity()throws SQLException
      {
        ResultSet rs=st2.executeQuery("select distinct city from user_details");
        ArrayList<String> city=new ArrayList<>();
        while(rs.next())  
        {
           city.add(rs.getString(1)); 
        }
        return city;
      }
      public static boolean addCandidate(AddCandidateDto candidate)throws Exception
      {
       ps2.setString(1,candidate.getCandidateId());
       ps2.setString(2,candidate.getParty());
       ps2.setString(3,candidate.getUserId());
       InputStream in=candidate.getSymbol();
       ps2.setBinaryStream(4,in,in.available());
       ps2.setString(5,candidate.getCity());
       return ps2.executeUpdate()!=0;
      }
      public static ArrayList<String> getCandidateId()throws SQLException
      {
        ResultSet rs=st3.executeQuery("select candidate_id from candidate");
        ArrayList<String> id=new ArrayList<>();
        while(rs.next())  
        {
           id.add(rs.getString(1)); 
        }
        return id;
      }
      public static CandidateDetails getDetailsById(String cid)throws SQLException
      {
         ps3.setString(1,cid);
         ResultSet rs=ps3.executeQuery();
         CandidateDetails candidate=new CandidateDetails();
         Blob blob;
         byte[] imagesBytes;
         String base64Image;
         if(rs.next())
         {
             blob=rs.getBlob(4);
             imagesBytes=blob.getBytes(1L,(int)blob.length());
             Encoder ec=Base64.getEncoder();
             base64Image=ec.encodeToString(imagesBytes);
             candidate.setSymbol(base64Image);
             candidate.setCandidateId(cid);
             candidate.setParty(rs.getString(2));
             candidate.setUserId(rs.getString(3));
             candidate.setCity(rs.getString(5));
         }
         return candidate; 
      }
      public static boolean removeCandidate(String cid)throws Exception
      { 
         DBConnection.getConnection().setAutoCommit(false);
         st4.addBatch("delete from voting where candidate_id='"+cid+"'");
         st4.addBatch("delete from candidate where candidate_id='"+cid+"'");
         DBConnection.getConnection().commit();
         return (st4.executeBatch().length>0);
      }
      public static boolean updateCandidate(AddCandidateDto candidate)throws Exception
      {
       ps4.setString(1,candidate.getCity());
       ps4.setString(4,candidate.getCandidateId());
       ps4.setString(2,candidate.getParty());
       InputStream in=candidate.getSymbol();
       if (in==null)
       ps4.setBinaryStream(3,in,in.available());
       return ps4.executeUpdate()!=0 ;  
      }
}
