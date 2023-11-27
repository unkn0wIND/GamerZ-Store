const mongoose = require('mongoose');


//Connexion à la base de donnée Mongo
const connectDatabase = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB connexion OK : ${con.connection.host} `)
    })
}

module.exports = connectDatabase;