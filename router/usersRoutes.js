const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

//Multer
const uploadFile = require('../middlewares/users/multerUsers');

//Validaciones
const validacionesUsers = require('../middlewares/users/validacionesUsers');
const verSession = require('../middlewares/users/verSession');

//Rutas
router.get("/login", verSession, usersController.login);
router.post('/login',validacionesUsers.login, usersController.processLogin);

router.get("/register", verSession, usersController.register);
router.post('/register', [uploadFile.single('fotoPerfil'), validacionesUsers.register], usersController.processRegister);

router.get('/userEdit/:id', usersController.userEdit);
router.post('/userEdit/:id', uploadFile.single('fotoPerfil'), usersController.processUserEdit);

router.get('/profile/editPassword/:id', usersController.editPassword);
router.post('/profile/editPassword/:id', validacionesUsers.editPassword, usersController.processEditPassword);

router.delete('/profile/delete/:id', usersController.userDelete);

router.get('/logout', usersController.logout);



module.exports = router;