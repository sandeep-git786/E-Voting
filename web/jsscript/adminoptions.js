function redirectadministratorpage()
{
    swal("Admin!","Redirecting to Admin page","success");
    setTimeout(function(){window.location="adminactions.jsp";},3000);
}
function redirectvotingpage()
{
    swal("Admin!","Redirecting to Voting page","success");
    setTimeout(function(){window.location="VotingControllerServlet";},3000); 
    /*$.post("VotingControllerServlet",function(responseText){
    $("body").html("");
    $("body").html(responseText);
    });*/
}
function manageuser()
{
   swal("Admin!","Redirecting to user management","success");
   setTimeout(function(){window.location="manageuser.jsp";},3000);  
}
function managecandidate()
{
   swal("Admin!","Redirecting to candidate management","success");
   setTimeout(function(){window.location="managecandidate.jsp";},3000); 
}
/*function electionresult()
{
   swal("Admin!","Redirecting to election result","success");
   setTimeout(function(){window.location="electionresult.jsp";},3000); 
}*/
function showaddcandidateform()
{
    removecandidateform();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Add new Candidate</h3>";
    newdiv.innerHTML= newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table>\n\
<tr><th>candidate id:</th><td><input type='text' id='cid'/></td></tr>\n\
<tr><th>user id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'/></td></tr>\n\
<tr><th>candidate name:</th><td><input type='text' id='cname'/></td></tr>\n\
<tr><th>city:</th><td><select id='city'></select></td></tr>\n\
<tr><th>party:</th><td><input type='text' id='party'/></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='select image'/></td></tr>\n\
<tr><th><input type='button'  value='Add Candidate' onclick='addcandidate()' id='addcnd'/></th></tr>\n\
<tr><th><input type='reset' value='clear' onclick='cleartext()'></th></tr></table></form>";
  newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
  var addcand=$("#result");
  addcand.append(newdiv);
  data={id:"getid"};
  $.post("AddCandidateControllerServlet",data,function(responseText){
   $("#cid").val(responseText);
   $("#cid").prop("disabled",true);
  });
}
function getdetails(e)
{
    if(e.keyCode===13)
    {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText){
           
            responseText=responseText.trim();
            var i=responseText.lastIndexOf(",");
            $("#city").empty();
            $("#city").append(responseText.substring(0,i));
            var uname=responseText.substring(i+1,responseText.length);
            if(uname==="wrong")
            {
                swal("wrong adhar!","Adhar no not found in DB","error");
                $("#uid").val("");
            }
            else
            {
                $("#cname").val(uname);
                $("#cname").prop("disabled",true);
            }
        });
    }
}
function clearText()
{
    $("#addresp").html("");

}
function addcandidate()
{
    var form= $("#fileUploadForm")[0];
    var data =new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
        type:"POST",
        enctype:"multipart/form-data",
        url:"AddNewCandidateControllerServlet",
        data:data,
        processData:false,
        contentType:false,
        cache:false,
        timeout: 600000,
        success:function(data){
            str=data+".......";
            swal("Admin",str,"success");
            setTimeout(function(){
                showaddcandidateform();  
            },3000);
        },
        error:function(e){
            swal("Admin",e,"error");
        }
    });
}
 function removecandidateform()
 {
     var contdiv=document.getElementById("result");
     var formdiv=document.getElementById("candidateform");
     if(formdiv!==null)
     {
         $("#candidateform").fadeOut("3500");
         contdiv.removeChild(formdiv);
     }
 }
 function showcandidate()
 {
    removecandidateform();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Show Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white;font-weight:bold'>Candidate Id:</div><div><select id='cid'></select></div>>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addprd=$("#result");
    addprd.append(newdiv);
    data={data:"cid"};
    $.post("ShowCandidateControllerServlet",data,function(responseText){
     $("#cid").append(responseText);   
    });
    $("#cid").on('change',function(){
     var cid=$(this).children("option:selected").val();
     data={data:cid};
     $.post("ShowCandidateControllerServlet",data,function(responseText){
        clearText();
        $("#addresp").append(responseText);
     });
    });
 }
 
function showupdatecandidateform()
{
    removecandidateform();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Update Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white;font-weight:bold'>Candidate Id:</div><div><select id='cid'></select></div>>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    $("#result").append(newdiv);
    data={data:"cid"};
    $.post("UpdateCandidateControllerServlet",data,function(responseText){
    $("#cid").append(responseText);   
    });
    $("#cid").on('change',function(){
    var cid=$(this).children("option:selected").val();
    data={data:cid};
    $.post("UpdateCandidateControllerServlet",data,function(responseText){
    clearText();
    $("#addresp").append(responseText);
    $("#addresp").append("<input type='button'  value='confirm' onclick='updatecandidate()' id='updcnd'/>");
    });
});
}
function updatecandidate()
{
 var form= $("#fileUploadForm")[0];
    var data =new FormData(form);
    var cid=$("#cid").val();
    var party=$("#party").val();
    var city=$("#city").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("party",party);
    data.append("city",city);
    data.append("uid",uid);
    $.ajax({
        type:"POST",
        enctype:"multipart/form-data",
        url:"UpdateCandidateControllerServlet2",
        data:data,
        processData:false,
        contentType:false,
        cache:false,
        timeout: 600000,
        success:function(data){
            str=data+".......";
            swal("Admin",str,"success");
            setTimeout(function(){
                showupdatecandidateform();  
            },3000);
        },
        error:function(e){
            swal("Admin",e,"error");
        }
    });    
}
function deletecandidate()
{
    removecandidateform();
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","candidateform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Remove Candidate</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white;font-weight:bold'>Candidate Id:</div><div><select id='cid'></select></div>>"; 
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addprd=$("#result");
    addprd.append(newdiv);
    data={data:"cid"};
    $.post("ShowCandidateControllerServlet",data,function(responseText){
     $("#cid").append(responseText);   
    });
    $("#cid").on('change',function(){
     cid=$(this).children("option:selected").val();
     data={data:cid};
     $.post("ShowCandidateControllerServlet",data,function(responseText){
        clearText();
        
        $("#addresp").append(responseText);
        $("#addresp").append("<input type='button'  value='confirm' onclick='delcandidate()' id='delcnd'/>");
        //newdiv.innerHTML=newdiv.innerHTML+"<input type='button'  value='confirm' onclick='delcandidate()' id='delcnd'/>";        
    });
   });
   
}
function delcandidate()
{
 data={data:cid};
 $.post("RemoveCandidateControllerServlet",data,function(responseText){
 responseText=responseText.trim();
  if(responseText==="success")
    swal("candidate removed!","candidate with cid : "+cid+" removed successfully!","success");
  else if(responseText==="fail")
      swal("action failed!","candidate cannot be removed !","error");
  deletecandidate();
 }); 
 
}
function showuser()
{   
    $("#result").html("");
    $.post("ShowUserControllerServlet",function(responseText){
        alert(responseText);
    $("#result").append(responseText);
    });
}
function removeuser()
{
    $("#result").html("");
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","user");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Remove User</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white;font-weight:bold'>User Id:</div><div><select id='uid'></select></div>>"; 
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addprd=$("#result");
    addprd.append(newdiv);
    data={data:"uid"};
    $.post("RemoveUserControllerServlet",data,function(responseText){
     $("#uid").append(responseText);   
    }); 
    $("#uid").on('change',function(){
    uid=$(this).children("option:selected").val();
    data={data:uid};
    $.post("RemoveUserControllerServlet",data,function(responseText){
    clearText();
    $("#addresp").append(responseText);
    $("#addresp").append("<input type='button'  value='confirm' onclick='deluser()' id='delcnd'/>");
    //newdiv.innerHTML=newdiv.innerHTML+"<input type='button'  value='confirm' onclick='deluser()' id='delcnd'/>";        
    });
 });
}
function deluser()
{
   info={info:uid}; 
   $.post("RemoveUserControllerServlet",info,function(responseText){
   responseText=responseText.trim();
   if(responseText==="success")
      swal("user removed!","user with uid : "+uid+" removed successfully!","success");
   else if(responseText==="fail")
      swal("action failed!","user cannot be removed !","error");
   removeuser();
 }); 
}
