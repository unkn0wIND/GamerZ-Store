import {adminOrderFail, adminOrderRequest, adminOrderSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess} from '../slices/orderSlice'
import axios from 'axios'

// Crée une commande
export const createOrder = order => async (dispatch) => {
    
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post(`/api/order/new`, order) // On récupere et stock les réponses dans data
        dispatch(createOrderSuccess(data)) // On envoi à la fonction comme parametre les données récupérer pour qu'il crée l'order

    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

//Commande d'un utilisateur
export const userOrders = async (dispatch) => {
    
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`/api/myorders`) // On récupere et stock les réponses dans data
        dispatch(userOrdersSuccess(data)) // On envoi à la fonction comme parametre les données récupérer pour qu'il crée l'order

    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}


// Avoir les détail de la commande via son id
export const orderDetail = id =>  async (dispatch) => {
    
    try {
        dispatch(orderDetailRequest())
        const { data } = await axios.get(`/api/order/${id}`) // On récupere et stock les réponses dans data
        dispatch(orderDetailSuccess(data)) // On envoi à la fonction comme parametre les données récupérer pour qu'il crée l'order

    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

// Action - Pour que l'admin gère les commandes [ADMIN]
export const adminOrdersAction = async (dispatch) => {
    
    try {
        dispatch(adminOrderRequest()) // Reducer (slice)
        const { data } = await axios.get(`/api/admin/orders`) // On récupere et stock les réponses dans data
        dispatch(adminOrderSuccess(data)) // On envoi à la fonction comme parametre les données récupérer pour qu'il crée l'order

    } catch (error) {
        dispatch(adminOrderFail(error.response.data.message))
    }
}

// Action - Pour que l'admin update une commande [ADMIN]
export const updateOrders = (id, orderData) => async (dispatch) => {
    
    try {
        dispatch(updateOrderRequest()) // Reducer (slice)
        const { data } = await axios.put(`/api/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))

    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}

// Action - Pour que l'admin supprime une commande [ADMIN]
export const deleteOrders = id => async (dispatch) => {
    
    try {
        dispatch(deleteOrderRequest()) // Reducer (slice)
        await axios.delete(`/api/admin/order/${id}`)
        dispatch(deleteOrderSuccess())

    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}