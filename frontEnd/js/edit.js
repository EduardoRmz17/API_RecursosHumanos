window.onload = init;
var headers = {};
var url;
var data;
function init() {
    console.log("SCRIPT DE EDIT FUNCIONANDO");
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }

        }
        document.querySelector('#push').addEventListener('click', edit);
    } else {
        window.location.href = "index.html";
    }
}

function edit() {
    var id = document.getElementById('id_editar').value;
    var name = document.getElementById('nombre_editar').value;
    var lName = document.getElementById('apellidos_editar').value;
    var cel = document.getElementById('telefono_editar').value;
    var mail = document.getElementById('mail_editar').value;
    var address = document.getElementById('direccion_editar').value;
    var rol = document.getElementById('rol_editar').value;
    var password = document.getElementById('contrasena_editar').value;

    data = {
        emp_name: name,
        emp_Lname: lName,
        emp_cel: cel,
        emp_mail: mail,
        emp_address: address,
        emp_rol: rol,
        emp_password: password
    }
    var url = 'http://localhost:3500/employees/' + id;
    console.log(url);

    axios.put(url, data, { headers }).then(function (res) {
        console.log(res.data);
        const message = res.data.message;
        if (res.data.code == 200) {
            alert("CAMBIO EXITOSO");
            window.location.href = "admin.html";
        } else {
            alert(message);
        }
    }).catch(function (err) {
        console.log(err);
    })
}