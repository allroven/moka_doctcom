'use strict'

var listaReservas;

window.addEventListener('load', () =>{
    cargaJsonReservas();
    cargaJson();   
     
     setTimeout(() => {ImprimirListaReservas();}, 1000);
});


function ImprimirListaReservas(){

    let tThead = document.getElementById('tTheadReservas');
    let tbody = document.getElementById('tBodyReservas');

    let listaReservas = getReservasArray();

    tbody.innerHTML = '';
    tThead.innerHTML = '';

    // thead
    let thRow = tThead.insertRow();

    let celNumCita = thRow.insertCell();
    celNumCita.innerHTML = 'Num. Reserva';

    let celPropietario = thRow.insertCell();
    celPropietario.innerHTML = 'Propietario';

    let celMascota = thRow.insertCell();
    celMascota.innerHTML = 'Mascota';

    let celFecha = thRow.insertCell();
    celFecha.innerHTML = 'Fecha';

    let celEstado = thRow.insertCell();
    celEstado.innerHTML = 'Estado';

    let celAcciones = thRow.insertCell();
    celAcciones.innerHTML = 'Acciones';
    

    for (let i = 0; i < listaReservas.length; i++) {

        
        let  reserva = listaReservas[i];
        let propietario = buscaUsuarioID(reserva.IdentificacionUsurio) ;

        let fila = tbody.insertRow();

        let celdaNumReserva = fila.insertCell();
        celdaNumReserva.innerHTML = reserva.NumeroReservacion;

        let celdaPropietario = fila.insertCell();
        celdaPropietario.innerHTML = propietario.Nombre + ' ' + propietario.Apellido1 + ' ' + propietario.Apellido2;

        let celdaMascota = fila.insertCell();
        celdaMascota.innerHTML = reserva.NombreMascota;

        let celdafechaEnt = fila.insertCell();
        celdafechaEnt.innerHTML = reserva.FechaHoraIngreso;

        let celdaFechaSalida= fila.insertCell();
        celdaFechaSalida.innerHTML = reserva.FechaHoraSalida;

        let celdaEstado = fila.insertCell();
        celdaEstado.innerHTML = reserva.Estado;
        celdaEstado.classList.add('Estado');

        let celdaBoton = fila.insertCell();
        
        let EstadoCitaif = document.querySelectorAll('.Estado');
        
        if (EstadoCitaif[i].innerHTML == 'AGENDADA' ) {
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','/public/VerCitaDatos.html')
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        

        let Boton = document.createElement('a');
        Boton.setAttribute('href','/public/CompletarCita.html')
        let icono =document.createElement('i');
        icono.classList.add("fa-solid")
        icono.classList.add("fa-pen-to-square")
        icono.classList.add("btnEd")
        Boton.appendChild(icono);
        celdaBoton.appendChild(Boton);

        let BotonC = document.createElement('a');
        BotonC.setAttribute('onclick','ShowModalCancelFunct()');
        let iconoC =document.createElement('i');
        iconoC.classList.add("fa-solid")
        iconoC.classList.add("fa-circle-xmark")
        iconoC.classList.add("btnCa")
        BotonC.appendChild(iconoC);
        celdaBoton.appendChild(BotonC);
        }else{
        let BotonV = document.createElement('a');
        BotonV.setAttribute('href','#')
        let iconoV =document.createElement('i');
        iconoV.classList.add("fa-solid")
        iconoV.classList.add("fa-eye")
        iconoV.classList.add("btnV")
        BotonV.appendChild(iconoV);
        celdaBoton.appendChild(BotonV);
        }

        
     }
    let EstadoCita = document.querySelectorAll('.Estado');
        console.log(EstadoCita.length);
        VerEstado(EstadoCita);
  }


function VerEstado(EstadoCita){
    
    for (let i = 0; i < EstadoCita.length; i++) {
    let sEstadoCita = EstadoCita[i].innerHTML;    
    console.log(sEstadoCita)
    if (sEstadoCita == 'AGENDADA'){
        EstadoCita[i].classList.add("AGENDADA")
        
    }
    if (sEstadoCita == 'CANCELADA'){
        EstadoCita[i].classList.add("CANCELADA")
       
    }
    if (sEstadoCita == 'FINALIZADA'){
        EstadoCita[i].classList.add("FINALIZADA")
        
    }   
    }
}