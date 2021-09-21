function addvote()
{
    var id=$("input[type=radio][name=flat]:checked").attr('id');
    data={candidateid:id};  

    $.post("AddVoteControllerServlet",data,processresponse);
}
function processresponse(responseText){
    $("body").html("");
    $("body").html(responseText);
    
}
/*function processresponse(responseText)
{
    responseText=responseText.trim();
    if(responseText==="success")
        window.location="votingresponse.jsp";
    else
        window.location="accessdenied.html";
}*/
function electionresult()
{
    var data={data:"result"};
    $.post("ElectionResultControllerServlet",data,function(responseText){
       //swal("success",responseText.trim(),"success");
       $("#result").html("");
       $("#result").html(responseText);
    });
}