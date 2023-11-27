const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');

//Connexion à la base de donnée via la fonction connectDatabase()
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Le serveur est sur le port : ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Erreur: ${err.message}`);
    console.log("Arrêt du serveur en raison d'une erreur non gérée");
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Erreur: ${err.message}`);
    console.log("Arrêt du serveur en raison d'une erreur non gérée");
    server.close(()=>{
        process.exit(1);
    })
})



