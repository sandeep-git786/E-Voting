<%-- 
    Document   : updatecandidate
    Created on : Jan 8, 2020, 5:57:09 PM
    Author     : sandeep
--%>
<%@page import="evoting.dto.CandidateDetails"%>
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
    if(result.equals("candidateList"))
    {
        ArrayList<String> candidateId=(ArrayList)request.getAttribute("candidateId");
        for(String cid:candidateId)
        {
            displayBlock.append("<option value="+cid+">"+cid+"</option>");
        }
        out.println(displayBlock);
    }
    else if(result.equals("candidateDetails"))
    {
        CandidateDetails can=(CandidateDetails)request.getAttribute("candidate");
        displayBlock.append("<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>"
        +" <table>"
        +"<tr><th>user id:</th><td><input type='text' id='uid' value="+can.getUserId()+" disabled /></td></tr>"
        +" <tr><th>candidate name:</th><td><input type='text' id='cname' value="+can.getCandidateName()+" disabled/></td></tr>"
        +"<tr><th>city:</th><td><select id='city' selected="+can.getCity()+">");
        ArrayList<String> city=(ArrayList)request.getAttribute("city");
        for(String c:city)
        {  
           displayBlock.append("<option value="+c+">"+c+"</option>");
        }
        displayBlock.append("</select></td></tr>"
        +"<tr><th>party:</th><td><input type='text' id='party' value="+can.getParty()+" /></td></tr>"
        +"<tr><td colspan='2'><input type='file' name='files' value='select image'/></td></tr>"
        +"<tr><th><input type='button'  value='Update Candidate' onclick='updatecandidate()' id='updatecnd'/></th></tr>"
        +"<tr><th><input type='reset' value='clear' onclick='cleartext()'></th></tr></table></form>"
        + "<img src='data:image/jpg;base64,"+can.getSymbol()+"'style='width:150px;height:150px;'/></td></tr>");
        out.println(displayBlock);
    }   
%>


