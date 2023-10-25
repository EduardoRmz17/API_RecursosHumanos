window.onload = init;
function init() {
    console.log("SCRIPT DE ADD FUNCIONANDO");
    document.querySelector('#push').addEventListener('click', add);
}

function add() {
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var name = document.getElementById('nombre_agregar').value;
    var lName = document.getElementById('apellidos_agregar').value;
    var cel = document.getElementById('telefono_agregar').value;
    var mail = document.getElementById('mail_agregar').value;
    var address = document.getElementById('direccion_agregar').value;
    var rol = document.getElementById('rol_agregar').value;
    var password = document.getElementById('contrasena_agregar').value;



    axios({
        method: 'post',
        url: 'http://localhost:3500/employees',
        data: {
            emp_name: name,
            emp_Lname: lName,
            emp_cel: cel,
            emp_mail: mail,
            emp_address: address,
            emp_rol: rol,
            emp_password: password
        }
    }).then(function (res) {
        console.log(res.data);
        const message = res.data.message;
        if (res.data.code == 201) {
            alert("REGISTRO EXITOSO");
            window.location.href = "admin.html";
        } else {
            alert(message);
        }
    }).catch(function (err) {
        console.log(err);
    })
}