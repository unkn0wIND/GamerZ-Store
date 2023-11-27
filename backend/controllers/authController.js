const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')

// Inscription Utilisateur - /api/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password } = req.body

    let avatar;
    
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }

    // On crée avec la fonction create dans la table User
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res)

})

// Connexion Utilisateur - /api/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Veuillez entrer un e-mail & mot de passe', 400))
    }

    // On trouve l'utilisateur dans la base de donnée
    const user = await User.findOne({email}).select('+password');

    // Si l'utilisateur n'éxiste pas
    if(!user) {
        return next(new ErrorHandler('E-mail ou mot de passe invalide', 401))
    }
    
    // Si le mot de passe n'est pas valide
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Mot de passe invalide', 401))
    }

    
    sendToken(user, 201, res)
    
})

// Déconnexion Utilisateur - /api/logout
exports.logoutUser = (req, res, next) => {
        res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .status(200)
        .json({
            success: true,
            message: "Déconnexion"
        })

}

// Mot de passe oublié - /api/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
    const user =  await User.findOne({email: req.body.email});

    //Si l'utilisateur n'est pas trouvé
    if(!user) {
        return next(new ErrorHandler('Utilisateur non trouvé', 404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})
    
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    // Création de l'url pour changer le mot de passe
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    // Message d'email
    const message = `L'URL de réinitialisation de votre mot de passe est la suivante \n\n 
    ${resetUrl} \n\n Si vous n'avez pas demandé cet e-mail, ignorez-le.`;

    try{
        sendEmail({
            email: user.email,
            subject: "GamerZ-Store - Récupération de mot de passe",
            message
        })

        res.status(200).json({
            success: true,
            message: `E-mail envoyer à ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

// Réinitilisation du mot de passe via un token - /api/password/reset/:token
exports.resetPassword = catchAsyncError( async (req, res, next) => {
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        return next(new ErrorHandler('Le jeton de réinitialisation du mot de passe est invalide ou a expiré'));
    }

    if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Les mot de passe ne correspondent pas'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)

})

// Obtenir le profil utilisateur - /api/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user.id)
   res.status(200).json({
        success:true,
        user
   })
})


// Changement de mot de passe  - /api/password/change
exports.changePassword  = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //Vérifie l'ancien mot de passe
    if(!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Votre ancien mot de passe est incorrect', 401));
    }

    //Assigne le nouveau mot de passe
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
    })
})
 

// Mettre à jour le profil utilisateur - /api/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData,avatar }
    }

    //On cherche l'utilisateur et on l'update
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })

})


// [ADMIN]: Obtenir tous les utilisateurs - /api/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    
   const users = await User.find();
   res.status(200).json({
        success: true,
        users
   })
})

// [ADMIN]: Obtenir un utilisateur en particulier (avec son id) - /api/admin/user/:id
exports.getUser = catchAsyncError(async (req, res, next) => {

    //Récupere l'id via l'url
    const user = await User.findById(req.params.id);

    //Si on a pas d'utilisateur
    if(!user) {
        return next(new ErrorHandler(`Utilisateur introuvable avec cet ID ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
   })
});

// [ADMIN]: Mettre à jour l'utilisateur en particulier - /api/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {

    //On récupere les nouvelle donnée taper
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //On trouve et update l'utilisateur
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

// [ADMIN]: Supprimer un utilisateur en particulier - /api/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`Utilisateur introuvable avec cet ID ${req.params.id}`))
    }
    await user.remove();
    res.status(200).json({
        success: true,
    })
})
