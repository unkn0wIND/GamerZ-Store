const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

//Middleware pour l'authentification
exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
   const { token  }  = req.cookies;
   
   if( !token ){
        return next(new ErrorHandler("Connectez-vous d'abord pour gérer cette ressource", 401))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})

exports.authorizeRoles = (...roles) => {
   return  (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} n'est pas autorisé`, 401))
        }
        next()
    }
}   