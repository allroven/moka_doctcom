'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/UsuarioModel');
const mailer = require('../templates/RegistroTemplate');
const mailerPass = require('../templates/PasswordTemplate');

router.post('/RegistrarUsuario', (req, res) => {
    let body = req.body;
    let nuevaUsuario = new Usuario({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Identificacion: body.Identificacion,
        Email: body.Email,
        Telefono: body.Telefono,
        Contrasenia: body.Contrasenia,
        Direccion: body.Direccion,
        CalificacionPromedio: body.CalificacionPromedio,
        Foto: body.Foto,
        Activo: body.Activo,
        Rol: body.Rol,
        Fecha:body.Fecha
    });

    nuevaUsuario.save((err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario!',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                usuarioDB
            });

            let nombreCompleto = usuarioDB.Nombre + ' ' + usuarioDB.Apellido;
            let correo = usuarioDB.Email;
            mailer.EnviarMail(nombreCompleto,correo);
        }
    });
});

router.get('/ListarUsuario', (req, res) => {
    Usuario.find((err, ListaUsuariosBD) => {
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
                ListaUsuariosBD
            });
        }
    });
});

router.get('/BuscarUsuarioByRol', (req, res) => {
    let params = req.query;
    Usuario.find({"Rol":params.Rol},(err, ListaUsuariosBD) => {
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
                ListaUsuariosBD
            });
        }
    }).sort({$natural:-1});
});


router.get('/BuscarUsuario', (req, res) => {
    let params = req.query;
    Usuario.findOne({ Identificacion: params.Identificacion }, (err, usuarioDB) => {
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
                usuarioDB
            });
        }
    });
});



router.get('/AutenticarUsuario', (req, res) => {
    let params = req.query;
    Usuario.findOne({
        Email: params.Email,
        Contrasenia: params.Contrasenia //revisar
    }, (err, UsuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {
            if (UsuarioDB == null) {
                res.json({
                    resultado: false,
                    msj: 'Usuario y/o contraseña incorrectos ',
                    UsuarioDB
                });
            } else if (Number(UsuarioDB.Estado) == 0) {
                //inactivo                
                res.json({
                    resultado: false,
                    msj: 'Usuario inactivo, por favor comuniquese con el administrador ',
                    UsuarioDB
                });
            } else {
                res.json({
                    resultado: true,
                    msj: 'Los datos se obtuvieron de manera correcta: ',
                    UsuarioDB
                });
            }
        }
    });
});
router.delete('/EliminarUsuario', function (req, res) {
    let body = req.body;
    Usuario.remove({Identificacion: body.Identificacion}, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se eliminarion de manera correcta',
                result
            });
        }
    });
});
router.put('/ModificarUsuario', function (req, res) {
    let body = req.body;
    Usuario.updateOne({ _id: body._id}, {
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
router.put('/DesactivarUsuario', function(req, res){
    let body = req.body;
    Usuario.updateOne({ Identificacion: body.Identificacion }, {
        $set: {
            Activo: 0
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


router.put('/RecuperarContrasenha', function(req, res){
    let body = req.body;
    Usuario.updateOne({ Email: body.Email }, {
        $set: {
            Contrasenia: 'Df1234'
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
                msj: 'Contraseña actualizada de manera correcta',
                info 
            });
            mailerPass.EnviarMail(body.Email);
        }
    });

});

router.post('/RegistrarTarjeta', (req, res) =>{
    let body = req.body;
    Usuario.updateOne({_id: body._id},{
        $push:{
            Tarjetas:{
                NombreTarjetahabiente: body.NombreTarjetahabiente,
                NumeroTarjeta: body.NumeroTarjeta,
                MesVencimiento: body.MesVencimiento,
                AnioVencimiento: body.AnioVencimiento,
                CVV: body.CVV,
                Activo :body.Activo,
                Principal: body.Principal
            }
        }
    }, function (err, info){
        if(err){
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se realizo el registro de la tarjeta',
                err
            });
        }else{
            res.json({
                resultado: true,
                msj:'Las tarjetas se actualizaron de manera correcta',
                info
            });
        }
    });
});

router.post('/EliminarTarjetaPersona', (req, res) => {
    let body = req.body;
    Usuario.updateOne({_id: body._idUsuario},{
        $pull:{
            Tarjetas: {_id: body._idTarjeta}
        }
    }, (err, info) =>{
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la tarjeta',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'La tarjeta se elimino de manera correcta',
                info
            });
        }
    });
});



module.exports = router;
