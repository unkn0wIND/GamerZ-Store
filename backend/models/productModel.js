const mongoose = require('mongoose');


// Table Produit
const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Veuillez entrer le nom du produit"],
        trim: true,
        maxLength: [100, "Le nom du produit ne peut pas dépasser 100 caractères"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Veuillez saisir la description du produit"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Veuillez chosir une catégorie"],
        enum: {
            values:  [
        'Action',
        'Aventure',
        'Sport',
        'Combat',
        'FPS',
        'Course',
        'Horreur',
        'RPG',
        'MMORPG',
        
            ]
,
            message : "Veuillez chosir une catégorie"
        }
    },
    platform: {
        type: String,
        required: [true, "Veuillez saisir la plateforme"]
    },
    stock: {
        type: Number,
        required: [true, "Veuillez entrer le stock de produits"],
        maxLength: [20, 'Le stock de produits ne peut pas dépasser 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema