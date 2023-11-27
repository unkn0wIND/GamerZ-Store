import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../slices/productSlice'


// Action qui récupére 1  seul produit via l'API avec axios
export const getProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest()) // loading passe de false à true
        const { data } = await axios.get(`/api/product/${id}`) // Récupérer via l'id du produit
        dispatch(productSuccess(data))
    } catch (error) {
        //Handle Erreur
        dispatch(productFail(error.response.data.message))
    }
    
}

// Action qui récupére tous les produits via l'API avec axios
export const getProducts = (keyword, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest()) // loading passe de false à true

        let link = `/api/products?page=${currentPage}`

        if (keyword) {
            link += `&keyword=${keyword}` //Concat le keyword avec le currentPage
        }


        const { data } = await axios.get(link)
        dispatch(productsSuccess(data))
        
    } catch (error) {
        //Handle Erreur
        dispatch(productsFail(error.response.data.message))
    }
    
}


//Action pour crée un avis (review)
export const createReview = reviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest()) // loading passe de false à true
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/review`, reviewData, config)
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //Handle Erreur
        dispatch(createReviewFail(error.response.data.message))
    }
    
}


//Action pour avoir les produits pour le dashboard - ADMIN
export const getAdminProducts = async (dispatch) => {

    try {
        dispatch(adminProductsRequest())

        const { data } = await axios.get(`/api/admin/products`)
        dispatch(adminProductsSuccess(data))
        
    } catch (error) {
        //Handle Erreur
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}

// Action pour crée un nouveau produit - ADMIN
export const createNewProduct = productData =>  async (dispatch) => {

    try {
        dispatch(newProductRequest())

        const { data } = await axios.post(`/api/admin/product/new`, productData)
        dispatch(newProductSuccess(data))
        
    } catch (error) {
        //Handle Erreur
        dispatch(newProductFail(error.response.data.message))
    }
    
}


// Action pour supprimer un produit - ADMIN
export const deleteProduct = id =>  async (dispatch) => {

    try {
        dispatch(deleteProductRequest())

        await axios.delete(`/api/admin/product/${id}`)
        dispatch(deleteProductSuccess())
        
    } catch (error) {
        //Handle Erreur
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}

// Action pour update un produit - ADMIN 
export const updateProduct = (id,productData) =>  async (dispatch) => {

    try {
        dispatch(updateProductRequest())

        const { data } = await axios.put(`/api/admin/product/${id}`, productData)
        dispatch(updateProductSuccess(data))
        
    } catch (error) {
        //Handle Erreur
        dispatch(updateProductFail(error.response.data.message))
    }
    
}


// Action qui récupére tous les avis (reviews) [ADMIN]
export const getReviews = id => async (dispatch) => {

    try {
        dispatch(reviewsRequest()) // loading passe de false à true

        //Review pour un produit en particulier
        const { data } = await axios.get(`/api/admin/reviews`, {params: {id}})
        dispatch(reviewsSuccess(data))
        
    } catch (error) {
        //Handle Erreur
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

// Action pour supprimer un avis [ADMIN]
export const deleteReview = (productId,id) => async (dispatch) => {

    try {
        dispatch(deleteReviewRequest()) // loading passe de false à true

        //Review pour un produit en particulier
        await axios.delete(`/api/admin/review`, {params: {productId, id}})
        dispatch(deleteReviewSuccess())
        
    } catch (error) {
        //Handle Erreur
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}