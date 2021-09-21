<%-- 
    Document   : failure
    Created on : Dec 24, 2019, 8:34:06 PM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        response.sendRedirect("accessdenied.html");
    }
    out.println("failure");
%>
