<%-- 
    Document   : showexception
    Created on : Dec 20, 2019, 11:11:58 AM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Show Exception page</title>
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
        <link href="stylesheet/pageheader.css" rel="stylesheet">
        </head>
    <body>
        <br>
        <div class="candidate">VOTE FOR CHANGE</div>
        <br>
        <div class=subcandidate">Please Try later</div>
        <%
            Exception ex=(Exception)request.getAttribute("exception");
            System.out.println(ex);
            out.println(ex);
        %>
    </body>
</html>
