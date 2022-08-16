let btnGuardarCambios = document.getElementById("btn-guardarMiPerfil2")
btnGuardarCambios.addEventListener('click', EditarDatosUser)

let inputtxtNombreP = document.getElementById("txtNombreP");

let inputtxtApellidosP = document.getElementById("txtApellidosP");
let inputtxtCedulaP = document.getElementById("txtCedulaP");
let inputtxtEmailP = document.getElementById("txtEmailP");
// let inputtxtPasswordP=document.getElementById('txtPassword');

let inputtxtDireccionP = document.getElementById("txtDireccionP");
const ValidarEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
let userSession;
let listaUsuarios;
window.addEventListener('load', async() =>{
    userSession=GetSesion();
    await GetlistaUsuarios();
    CargarDatosUser(userSession)
});

async function GetlistaUsuarios(){
    let result = await getUsuariosArray();
    if (result != {} && result.resultado == true) {
       listaUsuarios = result.ListaUsuariosBD;
    }
  }

function CargarDatosUser(userSession){
    for (let i = 0; i < listaUsuarios.length; i++) {
        
        if (listaUsuarios[i].Identificacion == userSession.Identificacion){
            console.log("_id: "+userSession._id);
            inputtxtNombreP.value= listaUsuarios[i].Nombre;
            inputtxtApellidosP.value = listaUsuarios[i].Apellido;
            inputtxtCedulaP.value = listaUsuarios[i].Identificacion;
            inputtxtEmailP.value=listaUsuarios[i].Email;
            // inputtxtPasswordP.value = listaUsuarios[i].Contrasenia;
            inputtxtDireccionP.value = listaUsuarios[i].Direccion;
        }
        
    }
}


function EditarDatosUser() {
    if (ValidarDatosUser()) {

        ActualizarDatos();




        ConfirmarDatosLogin();
        setTimeout(function() {
            window.location.pathname = "/public/MiPerfil.html";
        }, 2000);
    }
}

function ValidarDatosUser() {
    let sConttxtNombreP = inputtxtNombreP.value;
    let sConttxtApellidosP = inputtxtApellidosP.value;
    let sConttxtCedulaP = inputtxtCedulaP.value;
    let sConttxtEmailP = inputtxtEmailP.value;
    let sConttxtDireccionP = inputtxtDireccionP.value;

    if (sConttxtNombreP == null || sConttxtNombreP == undefined || sConttxtNombreP == "") {
        resaltarInputInvalido("txtNombreP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtApellidosP == null || sConttxtApellidosP == undefined || sConttxtApellidosP == "") {
        resaltarInputInvalido("txtApellidosP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtCedulaP == null || sConttxtCedulaP == undefined || sConttxtCedulaP == "") {
        resaltarInputInvalido("txtCedulaP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos();
        return false;
    }

    if (sConttxtEmailP == null || sConttxtEmailP == undefined || sConttxtEmailP == "") {
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos("El email es requerido!");
        return false;
    }else if(!sConttxtEmailP.match(ValidarEmail)){
        resaltarInputInvalido("txtEmailP");
        MostrarErrorContactenos("Formato de email invalido!");
        return false;
    }

    if (sConttxtDireccionP == null || sConttxtDireccionP == undefined || sConttxtDireccionP == "") {
        resaltarInputInvalido("txtDireccionP");
        MostrarErrorContactenos();
        return false;
    }

    return true;
}


function ActualizarDatos(){
    let sID= userSession._id;
    let sConttxtNombreP = inputtxtNombreP.value;
    let sConttxtApellidosP = inputtxtApellidosP.value;
    let sConttxtCedulaP = inputtxtCedulaP.value;
    let sConttxtEmailP = inputtxtEmailP.value;
    let sConttxtDireccionP = inputtxtDireccionP.value;
    let sFoto = "";
    EditarUsuario(sID,sConttxtNombreP,sConttxtApellidosP,sConttxtCedulaP,sConttxtEmailP,sConttxtDireccionP,sFoto);
}

function CambiarContrasenha(){
    
}







function MostrarErrorContactenos() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Dato Requerido!",
    });
}

function resaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 2px solid red; border-left: 10px solid var(--Rojo2);'

    setTimeout(function() {
        obj.style = orig;
    }, 5000);
}

function ConfirmarDatosLogin() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Datos Actualizados!",
        showConfirmButton: false,
        timer: 1500,
    });
}

////////////////////// cambiar Contrasenha //////////////////////////
const passwordModal = document.querySelector('.cModal-form');
const redirectModalPassword = document.querySelector(".redirect-modal-Password");
const closeModalPassword = document.getElementById('cancelPassword');
let overlay= document.querySelector('.overlay');

const hiddenModalPassword = function() {
    passwordModal.classList.add('hidden');
    overlay.classList.add('hidden');
    window.removeEventListener('scroll', disableScroll);
};

// start function show modal
function ShowModalPasswordFunct() {
    passwordModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    location.href = "#top-page";
    window.addEventListener('scroll', disableScroll);
}
closeModalPassword.addEventListener('click', function() {
    hiddenModalPassword();
});
redirectModalPassword.addEventListener('click', function() {
    ShowModalPasswordFunct();
});
function disableScroll() {
    window.scrollTo(0, 0);
}