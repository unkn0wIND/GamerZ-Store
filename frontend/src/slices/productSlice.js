import { createSlice } from "@reduxjs/toolkit";

// Pour 1 seul produit
const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false, // Eviter le chargement à l'initial
        product: {},
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isReviewDeleted: false,
        reviews: []
    },
    reducers: {
        productRequest(state, action) {
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearProduct(state, action) {
            return {
                ...state,
                product: {}
            }
        },
        newProductRequest(state, action) {
            return {
                ...state,
                loading: true 
            }
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false, 
                isProductCreated: false,
                error: action.payload // En cas d'erreur
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
        deleteProductRequest(state, action) {
            return {
                ...state,
                loading: true 
            }
        },
        deleteProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },
        updateProductRequest(state, action) {
            return {
                ...state,
                loading: true 
            }
        },
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true // Succes alert
            }
        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        reviewsRequest(state, action) {
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        deleteReviewRequest(state, action) {
            return {
                ...state,
                loading: true 
            }
        },
        deleteReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        }
    }
});

const { actions, reducer } = productSlice; // On extrait, destructuring

export const {
    productRequest,
    productSuccess,
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    clearProductCreated,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearProductDeleted,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    clearProductUpdated,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearReviewDeleted
} = actions // On récupère et exporte les étapes

export default reducer; // Pour l'ajouter dans store.js