<%-- 
    Document   : electionresult
    Created on : Dec 31, 2019, 1:43:25 PM
    Author     : sandeep
--%>
<%@page import="java.util.*"%>
<%@page import="evoting.dto.CandidateDetails"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
    <head>
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
        <link href="stylesheet/pageheader.css" rel="stylesheet">
        <link href="stylesheet/showcandidate.css" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>show result</title>
    </head>
    <body>
        <%
            String userid=(String)session.getAttribute("userid");
            System.out.println("show result");
            if(userid==null)
            { 
                session.invalidate();
                response.sendRedirect("accessdenied.html");
            }
            LinkedHashMap<CandidateDetails,Integer> result=( LinkedHashMap)request.getAttribute("result");
            int vote=(int)request.getAttribute("votecount");
            double votecount=(double)vote;
            Set s=result.entrySet();
            Iterator it=s.iterator();
            StringBuffer displayBlock=new StringBuffer("<br/><div class='candidateprofile'>The election result is:</div>");
            displayBlock.append("<br/><div class='candidateprofile'><table align='center' style='color:white; font-size:25px;'>"
                   +"<tr><th>Candidate Id</th><th>Candidate Name</th><th>Party</th><th>Symbol</th>"
                   +"<th>Voting Count</th><th>Voting %</th></tr>");
            Map.Entry<CandidateDetails,Integer> e=(Map.Entry)it.next();
            CandidateDetails c=e.getKey();
            displayBlock.append("<tr style='background-color:green'><td>"+c.getCandidateId()+"</td><td>"+c.getCandidateName()+"</td><td>"+c.getParty()+"</td><td>"
                    +"<img src='data:image/jpg;base64,"+c.getSymbol()+"'style='width:200px;height:200px;'/></td><td>"+e.getValue()
                    +"</td><td>"+(e.getValue()/votecount)*100+"</td></tr>");    
            while(it.hasNext())
            {
            Map.Entry<CandidateDetails,Integer> eall=(Map.Entry)it.next();
            CandidateDetails call=eall.getKey();
            displayBlock.append("<tr style='background-color:red'><td>"+call.getCandidateId()+"</td><td>"+call.getCandidateName()+"</td><td>"+call.getParty()+"</td><td>"
                    +"<img src='data:image/jpg;base64,"+call.getSymbol()+"'style='width:200px;height:200px;'/></td><td>"+eall.getValue()
                    +"</td><td>"+(eall.getValue()/votecount)*100+"</td></tr>");  
            }
            displayBlock.append("</table></div>");
            displayBlock.append("<div align='center'><h2 id='logout'><a href='LoginControllerServlet?logout=logout'>Logout</a></h2><div>");
            out.println(displayBlock);    
        %>
    </body>
</html>