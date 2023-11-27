import { createSlice } from "@reduxjs/toolkit";

// Pour les commandes
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {}, // On initie un objet vide
        userOrders: [], // On initie un tableau vide
        adminOrders: [],
        isOrderDeleted: false, // Commande supprimer de base à false
        isOrderUpdated: false, // Commande mis à jour de base à false
        loading: false
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state, // on récupere les même données que plus haut (tableau et objet vide)
                loading: true // on passe le loading à  true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                orderDetail: action.payload.order // on passe à orderDetail ce qu'on récupere dans le payload
            }
        },
        createOrderFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload 
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userOrdersRequest(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state, // on récupere les même données
                loading: true,
              
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                orderDetail: action.payload.order
              
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload
              
            }
        },
        adminOrderRequest(state, action) {
            return {
                ...state, // on récupere les même données
                loading: true,
            }
        },
        adminOrderSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrderFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload
            }
        },
        deleteOrderRequest(state, action) {
            return {
                ...state, // on récupere les même données
                loading: true,
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                isOrderDeleted: true // Pour afficher une alerte une fois supprimer
            }
        },
        deleteOrderFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload
            }
        },
        updateOrderRequest(state, action) {
            return {
                ...state, // on récupere les même données
                loading: true,
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                isOrderUpdated: true // Pour afficher une alerte une fois supprimer
            }
        },
        updateOrderFail(state, action) {
            return {
                ...state, // on récupere les même données
                loading: false,
                error: action.payload
            }
        },
        clearOrderDeleted(state, action) { // Une fois supprimer on clear
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        clearOrderUpdated(state, action) { // Une fois éditer on clear
            return {
                ...state,
                isOrderUpdated: false
            }
        },
    }
});

const { actions, reducer } = orderSlice; // On extrait, destructuring

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearError,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrderRequest,
    adminOrderSuccess,
    adminOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    clearOrderDeleted,
    clearOrderUpdated
} = actions // On récupère et exporte les actions

export default reducer; // Pour l'ajouter dans store.js