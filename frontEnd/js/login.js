window.onload = init;
function init() {

    document.querySelector('.btn-primary').addEventListener('click', login);
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

function login() {
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var mail = document.getElementById('input-id').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail, pass);

    axios({
        method: 'post',
        url: 'http://localhost:3500/employees/login',
        data: {
            emp_id: mail,
            emp_password: pass
        }
    }).then(function (res) {
        console.log(res.data);
        const message=res.data.message;
        const tokens=message.split(',');
        console.log(tokens[1]);
        if (res.data.code == 200) {
            alert("inicio exitoso");
            localStorage.setItem("token", tokens[0]);
            localStorage.setItem("rol", tokens[1]);
            window.location.href = (tokens[1] === "Administrador") ? "admin.html" : "user.html";

        } else {
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function (err) {
        console.log(err);
    })
}