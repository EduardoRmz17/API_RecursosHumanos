window.onload=init;
var headers={};
var url="http://localhost:3500";
function init(){
    
    if(localStorage.getItem("token")){
        token=localStorage.getItem("token");
        headers ={
            headers:{
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
    }else{
        window.location.href="login.html";
    }
    
    document.querySelector('#miBoton').addEventListener('click', chooseBackDisplay);
    console.log("ENTRO AL INIT");
}

function loadEmployees(){
    
    axios.get(url + "/employees",headers)
    .then(function(res){
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmployees(employee){
    //console.log(employee);
    var body=document.querySelector("body");
    for(var i=0;i<employee.length;i++){
        body.innerHTML+=`<h3>${employee[i].nombre} </h3>`;
    }
}

function chooseBackDisplay(){
    console.log("ENTROOO");
        if (localStorage.getItem("rol") == "Administrador") {
            window.location.href = "admin.html";
            console.log(localStorage.getItem("rol"));
        } else {
            window.location.href = "user.html";
        }
        
}