const express = require('express');
const multer = require('multer');
const path = require('path')

// Utilisation de multer pour les uploads
const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })


const { 
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
 } = require('../controllers/authController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

// Les routes utilisateurs
router.route('/register').post(upload.single('avatar'), registerUser); // Route pour l'inscription
router.route('/login').post(loginUser); // Route pour la connexion
router.route('/logout').get(logoutUser); // Route pour la déconnexion
router.route('/password/forgot').post(forgotPassword); // Route pour mot de passe oublié
router.route('/password/reset/:token').post(resetPassword); // Route de réinitilisation du mot de passe
router.route('/password/change').put(isAuthenticatedUser, changePassword); // Route pour le changement de mot de passe
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile); // Route pour le profil utilisateur
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'), updateProfile); // Route pour l'update

// Routes Administrateur
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers); // Avoir les utilisateurs
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser) // Avoir un utilisateur en particulier
                                .put(isAuthenticatedUser,authorizeRoles('admin'), updateUser) // Update un utilisateur en particulier
                                .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser); // Supprimer un utilisateur en particulier


module.exports = router;