<%-- 
    Document   : voteroption
    Created on : Jan 6, 2020, 7:45:12 PM
    Author     : sandeep
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jsscript/voteroption.js"></script>
        <script src="jsscript/vote.js"></script>
        <script src="jsscript/jquery.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
        <link href="stylesheet/pageheader.css" rel="stylesheet">
        <link href="stylesheet/admin.css" rel="stylesheet">
         <link href="stylesheet/result.css" rel="stylesheet">
        <title>Voter Options</title>
    </head>
    <body>
        <%
            String userid=(String)session.getAttribute("userid");
            if(userid==null)
            {
                response.sendRedirect("accessdenied.html");
                return;
            }
            StringBuffer displayBlock=new StringBuffer("<div class='sticky'><div class='candidate'>VOTE FOR CHANGE</div><br>"+
        "<div class='subcandidate'>Voter Options Page</div><br><br>"+
                    "<div class='logout'><a href='login.html'>logout</a></div></div>");
            displayBlock.append("<div class='container'>");
            displayBlock.append("<div id='dv1' onclick='seecandidate()'><img src='images/seecandidate.png' height='255px' width='250px'><br><h3>See Candidate</h3></div>");
            displayBlock.append("<div id='dv2' onclick='castvote()'><img src='images/castvote.jpg' height='250px' width='250px'><br><h3>Cast Vote</h3></div>");
            displayBlock.append("<div id='dv3' onclick='seevote()'><img src='images/seevote.jpg' height='250px' width='250px'><br><h3>See Vote</h3></div>");
            displayBlock.append("<div id='dv4' onclick='showupdateprofileform()'><img src='images/updateprofile.jpg' height='250px' width='250px'><br><h3>Update Profile</h3></div>");
            displayBlock.append("</div>");
            displayBlock.append("<br><br><div align='center' id='result'></div>");
            out.println(displayBlock);
        %>
    </body>
</html>
