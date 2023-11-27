const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

// Obtenir des produits - /api/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
    const resPerPage = 4; // Nombre de produit à afficher par page
    
    //Fonction pour la requête de recherche/filtre
    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter()
    }
    
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Product.countDocuments({});

    let productsCount = totalProductsCount;

    
    if(filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }
    
    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success : true,
        count: productsCount,
        resPerPage,
        products
    })
})

// [ADMIN]: Crée un nouveau produit - /api/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

// [ADMIN]: Obtenir un produit en particulier - /api/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id).populate('reviews.user','name email');

    if(!product) {
        return next(new ErrorHandler('Produit non trouvé', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})

// [ADMIN]: Mettre à jour un produit en particulier - /api/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    // Pour upload les images
    let images = []

    // Si les images ne sont pas effacées, nous conservons les images existantes
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }


    req.body.images = images;
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Produit non trouvé"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

// [ADMIN]: Supprimer un produit en particulier - /api/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Produit non trouvé"
        });
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Produit supprimé"
    })

})

// Crée un avis - /api/review
exports.createReview = catchAsyncError(async (req, res, next) =>{
    const  { productId, rating, comment } = req.body;

    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
   // trouver un avis d'utilisateur si il existe
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        // Mise à jour de l'avis
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }

        })

    }else{
        // Crée un avis
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    // Retrouver la moyenne des avis produits
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })


})

// Obtenir les avis d'un produit en particulier - /api/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//  Supprimer un avis - /api/review
exports.deleteReview = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.productId);
    
    // filtrer les avis qui correspondent à l'identifiant de suppression de l'avis
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    // Nombre d'avis 
    const numOfReviews = reviews.length;

    // trouver la moyenne avec les avis filtrés
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});

// [ADMIN]: Obtenir les produits  - /api/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});