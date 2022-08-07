'use strict';

const express = require('express');
const router = express.Router();
const Cita = require('../models/CitaModel');



router.post('/RegistrarCita', (req, res) => {
    let body = req.body;
    let nuevaUsuario = new Usuario({
        NumeroCita: body.NumeroCita,
        IdentificacionUsuario:body.IdentificacionUsuario,
        NombreMascota: body.NombreMascota,
        FechaHora: body.FechaHora,
        Calificacion:body.Calificacion,
        Estado: body.Estado,
        IdentificacionVeterinario: body.IdentificacionVeterinario,
        ObservacionesVeterinario: body.ObservacionesVeterinario,
        ObservacionesCita: body.ObservacionesCita
    });

    nuevaCita.save((err, citaDB) => {
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
                citaDB
            });
        }
    });
});

router.get('/ListarCitas', (req, res) => {
    Cita.find((err, ListaCitasBD) => {
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
                ListaCitasBD
            });
        }
    });
});

router.get('/BuscarCita', (req, res) => {
    let params = req.query;
    Cita.findOne({ NumeroCita: params.NumeroCita }, (err, citaDB) => {
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
                citaDB
            });
        }
    });
});
router.get('/BuscarCitaPorId', (req, res) => {
    let params = req.query;
    Cita.findOne({_id: params._id}, (err, CitaDB) => {
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
                CitaDB
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

router.put('/ModificarCita', function (req, res) {
    let body = req.body;
    Cita.updateOne({ NumeroCita: body.NumeroCita }, {
        $set: req.body 
        // $set: {
        //     Nombre: body.Nombre,
        //     Edad: body.Edad
        // }
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
router.put('/CancelarCita', function(req, res){
    let body = req.body;
    Cita.updateOne({ NumeroCita: body.NumeroCita }, {
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