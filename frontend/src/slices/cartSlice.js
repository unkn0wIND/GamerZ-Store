import { createSlice } from "@reduxjs/toolkit";

// Pour la cart
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [], // On récupére ces données dans le localStorage
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('cartItems')) : {}
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state, // On garde les même paramètre que plus haut en spread
                loading: true 
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload 
            const isItemExist = state.items.find(i => i.product === item.product)

            if (isItemExist) {
                state = {
                ...state,
                loading: false,
                }    
            } else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items))
            }
            return state
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems))
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo')
            return {
                items: [], // On vide le panier
                loading: false,
                shippingInfo: {} // On vide les informations
            }
        }
    }
});

const { actions, reducer } = cartSlice; // On extrait, destructuring

export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
} = actions // On récupère et exporte les actions

export default reducer; // Pour l'ajouter dans store.js