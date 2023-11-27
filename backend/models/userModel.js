const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// Table Utilisateur
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Veuillez entrer le nom']
    },
    email:{
        type: String,
        required: [true, 'Veuillez entrer votre e-mail'],
        unique: true,
        validate: [validator.isEmail, 'Veuillez entrer une adresse e-mail valide']
    },
    password: {
        type: String,
        required: [true, 'Veuillez entrer un mot de passe'],
        maxlength: [12, 'Le mot de passe ne doit pas dépasser 12 charactère'],
        select: false
    },
    avatar: {
        type: String
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password  = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function(){
    // Génération du token
    const token = crypto.randomBytes(20).toString('hex');

    // Générez un hash et définir resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

   // Le temps d'expiration du token
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}
let model =  mongoose.model('User', userSchema);


module.exports = model;