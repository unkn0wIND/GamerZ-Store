const express = require('express'); // Appel d'express
const app = express(); // Init App avec express()
const errorMiddleware = require('./middlewares/error'); // Appel du middleware d'erreur
const cookieParser = require('cookie-parser') // Appel de Cookie-Parser
const path = require('path') // Appel de path
const dotenv = require('dotenv'); // Appel de dotEnv
dotenv.config({path:path.join(__dirname,"config/config.env")}); // On définie la config dans config.env


app.use(express.json()); // Init express
app.use(cookieParser()); // Init cookieParser
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) ) // Pour uploads d'images

const products = require('./routes/product') // Chemin de la route pour les produits
const auth = require('./routes/auth') // Chemin de la route pour l'authentification
const order = require('./routes/order') // Chemin de la route pour les commandes
const payment = require('./routes/payment') // Chemin de la route pour le système de paiement

// Routes
app.use('/api/',products);
app.use('/api/',auth);
app.use('/api/',order);
app.use('/api/',payment);

//En mode de production
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware) // Appel du middleware erreur

module.exports = app;