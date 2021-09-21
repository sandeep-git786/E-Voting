function seecandidate()
{
    swal("voter!","Redirecting to Voter page","success");
    setTimeout(function(){window.location="SeeCandidateControllerServlet";},3000);   
}
function castvote()
{
    swal("Admin!","Redirecting to Voting page","success");
    setTimeout(function(){window.location="VotingControllerServlet";},3000); 
}
function seevote()
{
   $("#result").html("");
   $.post("SeeVoteControllerServlet",function(responseText){
   $("#result").append(responseText);   
   }); 
}
function showupdateprofileform()
{
    $("#result").html("");
    var newdiv=document.createElement("div");
    newdiv.setAttribute("id","voterform");
    newdiv.setAttribute("float","left");
    newdiv.setAttribute("padding-left","12px");
    newdiv.setAttribute("border","solid 2px,red");
    newdiv.innerHTML="<h3>Update Profile</h3>";
    newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
    $("#result").append(newdiv);
    $.post("UpdateUserControllerServlet",function(responseText){
     clearText();   
    $("#addresp").append(responseText);
    //$("#addresp").append("<input type='button'  value='confirm' onclick='updateprofile()' id='uppf'/>");
    });
 }
function updateprofile()
{            
    uid=$("#uid").val();
    pwd=$("#pwd").val();
    cpwd=$("#cpwd").val();
    uname=$("#uname").val();
    adr=$("#adr").val();
    city=$("#city").val();
    email=$("#email").val();
    mob=$("#mob").val(); 
    if(validateUser()){
        if(pwd!==cpwd){
          swal("Error!","password does not match!","error");
          return;  
        }
        else{
            if(checkEmail(email)===false)
              return;
            var data ={uid:uid,
                       pwd:pwd,
                       uname:uname,
                       adr:adr,
                       city:city,
                       email:email,
                       mob:mob};
            $.post("UpdateUserControllerServlet2",data,function(responseText){
                responseText=responseText.trim();
                if(responseText==="success")
                   swal("success!","update successful","success");        
                else
                   swal("Error!","profile cannot be updated","error"); 
           });
        }
    }
}
function validateUser(){
    if(uname===""||pwd===""||adr===""||cpwd===""||city===""||uid===""||email===""||mob==="")
    { 
    swal("Error!","please fill all the details!","error");    
    return false;
    }
    return true;
}
function checkEmail(){
   var atposition=email.indexOf("@");
   var dotposition=email.lastIndexOf(".");
   if(atposition<1||dotposition<atposition+2||dotposition+2>=email.length){
      swal("Error!","please enter valid Email!","error");  
      return false;
   }
   return true;
}
function clearText()
{
    $("#addresp").html("");

}