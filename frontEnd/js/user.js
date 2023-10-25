window.onload = init;
function init() {
    console.log("initFUNCIONANDO");
    document.querySelector('#backButton').addEventListener('click', chooseBackDisplay);
    loadEmployee();
}
function loadEmployee(){
    console.log("Entro al display");
    var id = localStorage.getItem("idSearch");
    axios({
        method: 'get',
        url: 'http://localhost:3500/employees/'+id 
        
    }).then(function (res) {
        if (res.data.code == 1) {
            displayEmpId(res.data.message);
        } else if(res.data.code==404){
            alert("NO ENCONTRADO");
        }
    }).catch(function (err) {
        console.log(err);
        alert("no ENCONTRADO");
    })
}
function displayEmpId(employee){
    console.log(employee[0].nombre);
    var tdElement=document.getElementById("td_name");
    tdElement.textContent=employee[0].nombre;
    var tdElement=document.getElementById("td_Lname");
    tdElement.textContent=employee[0].apellidos;
    var tdElement=document.getElementById("td_cel");
    tdElement.textContent=employee[0].telefono;
    var tdElement=document.getElementById("td_mail");
    tdElement.textContent=employee[0].correo;
    var tdElement=document.getElementById("td_address");
    tdElement.textContent=employee[0].direccion;
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



