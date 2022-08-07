'use strict';

const express = require('express');
const router = express.Router();
const Reservacion = require('../models/ReservacionModel');



router.post('/RegistrarReservacion', (req, res) => {
    let body = req.body;
    let nuevaReservacion = new Reservacion({
        NumeroReservacion: body.NumeroReservacion,
        IdentificacionUsuario:body.IdentificacionUsuario,
        NombreMascota: body.NombreMascota,
        FechaHoraIngreso: body.FechaHoraIngreso,
        FechaHoraSalida: body.FechaHoraSalida,
        Calificacion:body.Calificacion,
        Estado: body.Estado,
        ObservacionesReservacion: body.ObservacionesReservacion
    });

    nuevaReservacion.save((err, reservacionDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                reservacionDB
            });
        }
    });
});

router.get('/ListarReservaciones', (req, res) => {
    Reservacion.find((err, ListaReservasBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaReservasBD
            });
        }
    });
});

router.get('/BuscarReservacion', (req, res) => {
    let params = req.query;
    Reservacion.findOne({ NumeroReservacion: params.NumeroReservacion }, (err, reservacionDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                reservacionDB
            });
        }
    });
});
router.get('/BuscarReservacionPorId', (req, res) => {
    let params = req.query;
    Reservacion.findOne({_id: params._id}, (err, ReservacionDB) => {
        if (err) {            
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ReservacionDB
            });
        }
    });
});

// router.delete('/EliminarUsuario', function (req, res) {
//     let body = req.body;
//     Usuario.remove({Identificacion: body.Identificacion}, (err, result) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: 'No se pudo eliminar los datos: ',
//                 err
//             });
//         } else {
//             res.json({
//                 resultado: true,
//                 msj: 'Los datos se eliminarion de manera correcta',
//                 result
//             });
//         }
//     });
// });

router.put('/ModificarReservacion', function (req, res) {
    let body = req.body;
    Reservacion.updateOne({ NumeroReservacion: body.NumeroReservacion }, {
        $set: req.body 
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se pudieron actualizar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de manera correcta',
                info
            });
        }
    }
    );
});
router.put('/CancelarReserva', function(req, res){
    let body = req.body;
    Reservacion.updateOne({ NumeroReservacion: body.NumeroReservacion }, {
        $set: {
            Estado: 'Cancelado'
        }
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se pudieron actualizar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Usuario inactivada de manera correcta',
                info
            });
        }
    });

});

module.exports = router;
