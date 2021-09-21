var adhar,password;
function connectUser(){
    userid=$("#username").val();
    password=$("#password").val();
    if(validate()===false){
        swal("Error!","please enter userid/password!","error");
        return;  
    }
    var data={userid:userid,
              password:password};
    $.post("LoginControllerServlet",data,processresponse);
}
function processresponse(responseText){
    responseText=responseText.trim();
    if(responseText==="error"){
        swal("Access Denied!","please enter valid userid/password","error");
               
    }
    else if(responseText.indexOf("jsessionid")!==-1){
        swal("success!","login accepted!","success");
        setTimeout(function(){
            window.location=responseText;
        },3000);
    }
    else{
        swal("Access denied!","some problem occured please try again!","error");  
    }
}
function validate(){
    if(userid===""||password==="")
        return false;
    return true;
}


 
        


