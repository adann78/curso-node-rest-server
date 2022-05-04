const{Router}=require('express');
const {check}=require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDel, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos.js');


const router=Router()

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
router.post('/', [
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password tiene que ser mayor a 6 letras').isLength({ min:6 }),

check('correo','Correo no valido').isEmail(),

check('rol').custom(esRoleValido),


validarCampos

], usuariosPost);
router.delete('/',usuariosDel);
router.patch('/', usuariosPatch);







module.exports=router;