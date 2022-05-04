const {response,request}=require('express')
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/usuario.js')

const usuariosGet=(req=request, res=response)=> {
    const {q,nombre="no name",apikey,page=1,limit}=req.query;
    res.json({
        
        msg: 'get API-controlador',
        q,
        nombre,
        apikey,
        page,
        limit
  });
}
const usuariosPost=async(req, res=response)=> {
   
    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario( {nombre,correo,password,rol} )

    //verificar si correo existe
    const existeEmail=await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(404).json({
            msg: 'Correo ya registrado'
        });
    }

    //encriptar

    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync( password, salt );

    //guardar en BD
    await usuario.save()
    res.json({
        
        msg: 'post API-controlador',
        usuario
  });
}
const usuariosPut=async(req, res=response)=> {

    const { id }=req.params;
    const { password, google,correo, ...resto }=req.body;
//TODO validar contra bd
if( password ){
    //Encriptar contraseña
    const salt=bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync( password, salt );

}
const usuario=await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        
        msg: 'put API-controlador',
        id
  });
}
const usuariosDel=(req, res=response)=> {
    res.json({
        
        msg: 'delete API-controlador'
  });
}
const usuariosPatch=(req, res=response)=> {
    res.json({
        
        msg: 'patch API-controlador'
  });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDel,
    usuariosPatch,
}