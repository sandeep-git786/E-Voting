<%-- 
    Document   : loginresponse
    Created on : Dec 21, 2019, 7:19:14 PM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
String usertype=(String)request.getAttribute("result");
String userid=(String)request.getAttribute("userid");
if(userid!=null&&usertype!=null)
{
    HttpSession sess=request.getSession();
    sess.setAttribute("userid",userid);
    if(usertype.equalsIgnoreCase("Admin"))
    {
     String url="AdminControllerServlet;jsessionid="+session.getId();
     out.println(url);
    }
    else
    {
     //String url="VotingControllerServlet;jsessionid="+session.getId();
     String url="voteroptions.jsp;jsessionid="+session.getId();
     out.println(url);  
    }
}
else{
    out.println("error");
}
%>
