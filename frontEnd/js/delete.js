window.onload = init;
function init() {
    console.log("initFUNCIONANDO");
    document.querySelector('#push').addEventListener('click', deleteEmp);
}

function deleteEmp(){
    console.log("Entro al delete");
    var id = document.getElementById('id_eliminar').value;
    axios({
        method: 'delete',
        url: 'http://localhost:3500/employees/'+id,
        data: {
        }
    }).then(function (res) {
        console.log(res.data);
        const message=res.data.message; 
        if (res.data.code == 200) {
            alert("ELIMINACION DE EMPLEADO EXITOSO");
            window.location.href =  "admin.html";
        } else {
            alert(message);
        }
    }).catch(function (err) {
        console.log(err);
    })
}
