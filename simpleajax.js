/*$(function(){
    $("#load").click(sendajax);
})

function sendajax(){
    console.log("sending ajax");
     $.get("students.txt",handleResponse);
    console.log("request sent");
}
function handleResponse(response){
console.log(response);
console.log("response is recived");
}*/
$(function(){
   
    loadrecpie();
   // $("res").on("click",".btn-danger",handledelete);
    $("#recipes").on("click", ".btn-danger", handleDelete);
    $("#recipes").on("click", ".btn-success", handleupdate);
    $("#addrec").click(addrecipe);
    $("#updatesave").click(function(){
        var id = $("#updateId").val();
        var title = $("#updatetitle").val();
        var body = $("#updatebody").val();
        $.ajax({
          url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
          data: { title, body },
          method: "PUT",
          success: function(response) {
            console.log(response);
            loadrecpie();
            $("#updatemodal").modal("hide");
          }
        });
      });
    });
function handleupdate(){
     
      var btn=$(this);
      var parentDiv=btn.closest(".resipe");
      let id=parentDiv.attr("data-id");
      $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){
          $("#updateId").val(response._id);
          $("#updatetitle").val(response.title);
          $("#updatebody").val(response.body);
          $("#updatemodal").modal();
      })
}
function handleDelete(){
    var btn=$(this);
    var parentDiv=btn.closest(".resipe");
    let id=parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
       method: "DELETE",
       success:function(){
           loadrecpie();
       }
    });
}
function addrecipe(){
    var title=$("#title").val();
    var body=$("#body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data:{title,body},
        success:function(response){
            console.log(response);
            $("#title").val("");
            $("#body").val("");
            $("#addmodelId").modal("hide");
           loadrecpie();
        }
});
}
function loadrecpie(){
   $.ajax({
       url:"https://usman-recipes.herokuapp.com/api/recipes",
       method: "GET",
       error:function(){
        var res=$("#recipes");
        res.append("Error occured")
       },
       success:function(response){
         console.log(response);
        var res=$("#recipes");
        res.empty();
        for( var i=0;i<response.length;i++){
            var recip=response[i];
            //var a="resipe";
            //res.append("<div class="resipe"><h2>"+(i+1)+" "+recip.title+"</h2><p>"+recip.body+"</p></div>");
            res.append(`<div class="resipe" data-id="${recip._id}" style="border-bottom: 2px red;"><h2>${recip.title}</h2><p>${recip.body}</p>
            <button id="edit" class="btn btn-info btn-success float-right mr-3">Edit</button><button id="dBtn" class="btn btn-info btn-danger ml-3">Drlete</button></div>`);

        }
        
       }
   });
}