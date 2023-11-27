import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/userSlice'

const reducer = combineReducers({
    productsState: productsReducer, // Plusieurs produits
    productState: productReducer, // 1 seul produit
    authState: authReducer, // Authentification
    cartState: cartReducer, // Pour le panier
    orderState: orderReducer, // Pour les commandes
    userState: userReducer, // Pour les utilisateurs [ADMIN PANEL]
})

const store = configureStore({
    reducer: reducer, //key : value
    middleware: [thunk]
})

export default store;
