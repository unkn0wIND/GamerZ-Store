module.exports = (err, req, res, next) =>{
    err.statusCode  = err.statusCode || 500;


    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        })
    }

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);
       

        if(err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message)
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'CastError'){
            message = `Ressource introuvable: ${err.path}` ;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.code == 11000) {
            let message = `Erreur ${Object.keys(err.keyValue)} dupliquer`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'JSONWebTokenError') {
            let message = `Le jeton Web JSON n’est pas valide. Essayer à nouveau`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'TokenExpiredError') {
            let message = `Le jeton Web JSON a expiré. Essayer à nouveau`;
            error = new Error(message)
            err.statusCode = 400
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}