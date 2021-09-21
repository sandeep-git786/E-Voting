<%-- 
    Document   : adminremoveuser
    Created on : Jan 6, 2020, 2:35:29 PM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*,evoting.dto.UserInfo"%>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
        return;
    }
    String result=(String)request.getAttribute("result");
    StringBuffer displayBlock=new StringBuffer("");
    if(result.equals("userList"))
    {
        ArrayList<String> userId=(ArrayList)request.getAttribute("userId");
        for(String u:userId)
        {
            displayBlock.append("<option value="+u+">"+u+"</option>");
        }
        out.println(displayBlock);
    }
    else if(result.equals("details"))
    {
        UserInfo usr=(UserInfo)request.getAttribute("user");
        displayBlock.append("<table>"+
                "<tr><th>User Id:</th><td>"+usr.getUserid()+"</td></tr>"+
                "<tr><th>User Name:</th><td>"+usr.getUsername()+"</td></tr>"+
                "<tr><th>Address:</th><td>"+usr.getAddress()+"</td></tr>"+
                "<tr><th>city:</th><td>"+usr.getCity()+"</td></tr>"+
                "<tr><th>Email:</th><td>"+usr.getEmail()+"</td></tr>"+
                "<tr><th>Mobile no:</th><td>"+usr.getMobile()+"</td></tr>"+
                "</table>");
        out.println(displayBlock);
    }
%>
