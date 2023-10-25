window.onload = init;
function init() {
    console.log("SCRIPT DE ADMIN FUNCIONANDO");
    document.querySelector('#search-button').addEventListener('click', user);
}

function user(){
    console.log("EL >BOTON SIRVE");
    var id = document.getElementById('search').value;
    localStorage.setItem("idSearch",id);
    window.location.href="user.html";
}