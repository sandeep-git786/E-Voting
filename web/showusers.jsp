<%-- 
    Document   : showusers
    Created on : Jan 6, 2020, 11:44:26 AM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.UserInfo,java.util.*"%>
<html>
    <head>
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
        <link href="stylesheet/pageheader.css" rel="stylesheet">
        <link href="stylesheet/showcandidate.css" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>show users</title>
    </head>
    <body>
        <%
            String userid=(String)session.getAttribute("userid");
            System.out.println("show users");
            if(userid==null)
            { 
                session.invalidate();
                response.sendRedirect("accessdenied.html");
            }
            ArrayList<UserInfo> users=( ArrayList)request.getAttribute("users");
            StringBuffer displayBlock=new StringBuffer("<br/><div class='candidateprofile'>User List:</div>");
            displayBlock.append("<br/><div class='candidateprofile'><table border='1px' align='center' style='color:white; font-size:25px;'>"
                   +"<tr><th>User Id</th><th>User Name</th><th>Address</th><th>City</th>"
                   +"<th>Email</th><th>Mobile No</th></tr>");   
            for(UserInfo usr:users)
            {
            displayBlock.append("<tr><td>"+usr.getUserid()+"</td><td>"+usr.getUsername()+"</td><td>"+usr.getAddress()+"</td><td>"
                    +usr.getCity()+"</td><td>"+usr.getEmail()+"</td><td>"+usr.getMobile()+"</td></tr>");  
            }
            displayBlock.append("</table></div>");
            displayBlock.append("<div align='center'><h2 id='logout'><a href='LoginControllerServlet?logout=logout'>Logout</a></h2><div>");
            out.println(displayBlock);    
        %>
    </body>
</html>