"use strict";
let userSessionRR;

window.addEventListener("load", () => {
  userSessionRR = GetSesion();
  GetListaReservas();
});

async function GetListaReservas() {
  let result = await getReservasArray();
  if (result != {} && result.resultado == true) {
    ImprimirListaReservas(result.ListaReservasBD);
  }
}

function ImprimirListaReservas(listaReservas) {
  let tThead = document.getElementById("tTheadReservas");
  let tbody = document.getElementById("tBodyReservas");

  tbody.innerHTML = "";
  tThead.innerHTML = "";

  // thead
  let thRow = tThead.insertRow();

  let celNumCita = thRow.insertCell();
  celNumCita.innerHTML = "Num. Reserva";

  // let celPropietario = thRow.insertCell();
  // celPropietario.innerHTML = 'Propietario';

  let celMascota = thRow.insertCell();
  celMascota.innerHTML = "Mascota";

  let celFechaEnt = thRow.insertCell();
  celFechaEnt.innerHTML = "Fecha entrada";

  let celFechaSal = thRow.insertCell();
  celFechaSal.innerHTML = "Fecha salida";

  let celEstado = thRow.insertCell();
  celEstado.innerHTML = "Estado";

  let celAcciones = thRow.insertCell();
  celAcciones.innerHTML = "Acciones";



  for (let i = 0; i < listaReservas.length; i++) {
    let reserva = listaReservas[i];

    // let propietario = buscaUsuarioID(reserva.IdentificacionUsurio) ;

    let fila = tbody.insertRow();

    let celdaNumReserva = fila.insertCell();
    celdaNumReserva.innerHTML = reserva.NumeroReservacion;

    // let celdaPropietario = fila.insertCell();
    // celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

    let celdaMascota = fila.insertCell();
    celdaMascota.innerHTML = reserva.NombreMascota;

    let celdafechaEnt = fila.insertCell();
    celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

    let celdaFechaSalida = fila.insertCell();
    celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

    let celdaEstado = fila.insertCell();
    celdaEstado.innerHTML = reserva.Estado;
    celdaEstado.classList.add("Estado");

    let celdaBoton = fila.insertCell();

    let EstadoCitaif = document.querySelectorAll(".Estado");

  
    let BotonV = document.createElement("a");
    BotonV.setAttribute(
      "href",
      "/public/VerReservacionDatos.html?_id=" +
        reserva._id +
        "&rol=" +
        userSessionRR.Rol
    );
    let iconoV = document.createElement("i");
      iconoV.classList.add("fa-solid");
      iconoV.classList.add("fa-eye");
      iconoV.classList.add("btnV");
      BotonV.appendChild(iconoV);
      celdaBoton.appendChild(BotonV);
  }
  let EstadoCita = document.querySelectorAll(".Estado");
  VerEstado(EstadoCita);
}

function VerEstado(EstadoCita) {
  for (let i = 0; i < EstadoCita.length; i++) {
    let sEstadoCita = EstadoCita[i].innerHTML;

    if (sEstadoCita == "AGENDADA") {
      EstadoCita[i].classList.add("AGENDADA");
    }
    if (sEstadoCita == "CANCELADA") {
      EstadoCita[i].classList.add("CANCELADA");
    }
    if (sEstadoCita == "FINALIZADA") {
      EstadoCita[i].classList.add("FINALIZADA");
    }
  }
}
