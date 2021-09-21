var username,password,cpassword,city,address,adhar,email,mobile;
function addUser(){
    username=$("#username").val();
    password=$("#password").val();
    cpassword=$("#cpassword").val();
    city=$("#city").val();
    address=$("#address").val();
    adhar=$("#adhar").val();
    email=$("#email").val();
    mobile=$("#mobile").val();
    if(validateUser()){
        if(password!==cpassword){
          swal("Error!","password does not match!","error");
          return;  
        }
        else{
            if(checkEmail(email)===false)
              return;
            var data={username:username,
                  password:password,
                  city:city,
                  address:address,
                  userid:adhar,
                  email:email,
                  mobile:mobile};
            $.post("RegistrationControllerServlet",data,processresponse);
           
        }
    }
}
function processresponse(responseText){
    responseText=responseText.trim();
    if(responseText==="success"){
        swal("success!","Registration successful!you can now Login..","success");
        setTimeout(redirectUser,3000);        
    }
    else if(responseText==="uap"){
        swal("Error!","sorry!the userid "+adhar+" is already present!","error"); 
    }
    else{
        swal("Error!","Registration failed!Try again!","error");  
    }
}
function redirectUser(){
    window.location="login.html";
}
function validateUser(){
    if(username===""||password===""||address===""||cpassword===""||city===""||adhar===""||email===""||mobile==="")
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
 
        