import { createSlice } from "@reduxjs/toolkit";


//Changer les states pour chaque action

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false, // Eviter le chargement à l'initial
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        productsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        productsFail(state, action) {
            return {
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        adminProductsRequest(state, action) {
            return {
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        adminProductsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,  
            }
        },
        adminProductsFail(state, action) {
            return {
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = productsSlice; // On extrait, destructuring

export const {
    productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    clearError
} = actions // On récupère et exporte les étapes

export default reducer; // Pour l'ajouter dans store.js