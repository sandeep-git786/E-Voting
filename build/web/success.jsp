<%-- 
    Document   : success
    Created on : Dec 24, 2019, 8:31:57 PM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
    }
    out.println("success");
%>