<%-- 
    Document   : updateuser
    Created on : Jan 10, 2020, 4:24:56 PM
    Author     : sandeep
--%>

<%@page import="evoting.dto.UserDetails"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
        return;
    }
    String result=(String)request.getAttribute("result");
    StringBuffer displayBlock=new StringBuffer("");
    if(result.equals("userDetails"))
    {
        UserDetails usr=(UserDetails)request.getAttribute("user");
        displayBlock.append("<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>"
        +" <table>"
        +"<tr><th>User Id:</th><th><input type='text' id='uid' value="+userid+" disabled/></td></tr>"   
        +"<tr><th>password:</th><td><input type='password' id='pwd' value="+usr.getPassword()+" /></td></tr>"
        +"<tr><th>confirm password:</th><td><input type='password' id='cpwd' value="+usr.getPassword()+" /></td></tr>"       
        +" <tr><th>user name:</th><td><input type='text' id='uname' value="+usr.getUsername()+" /></td></tr>"
        +"<tr><th>address:</th><td><input type='text' id='adr' value="+usr.getAddress()+" /></td></tr>"
        +"<tr><th>city:</th><td><input type='text' id='city' value="+usr.getCity()+" /></td></tr>"
        +"<tr><th>email id:</th><td><input type='text' id='email' value="+usr.getEmail()+" /></td></tr>"
        +"<tr><th>mobile no:</th><td><input type='text' id='mob' value="+usr.getMobile()+" /></td></tr>"        
        +"<tr><th><input type='button'  value='Update user' onclick='updateprofile()' id='updateusr'/></th></tr>"
        +"<tr><th><input type='reset' value='clear'></th></tr></table></form>");
        out.println(displayBlock);
    }   
%>

