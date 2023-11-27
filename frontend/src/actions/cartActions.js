import axios from "axios";
import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"

//Prend en attribut, l'id du produit et la quantité
export const addCartItem = (id, quantity) => async (dispatch) =>  {


    try {

        dispatch(addCartItemRequest())
        //URL API
        const { data } = await axios.get(`/api/product/${id}`)

        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))

    } catch (error) {
        
    }

}