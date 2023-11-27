import axios from 'axios'
import {
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice'
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from '../slices/userSlice'


//Action : Inscription
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest()) // On utilise la request qu'on a crée

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        //On récupére les data envoyer quand on s'inscrit
        const { data } = await axios.post(`/api/register`, userData, config);

        //On attribut les data à registerSuccess
        dispatch(registerSuccess(data))

    } catch (error) {
        dispatch(registerFail(error.response.data.message)) // En cas d'erreur
    }

}

//Action : Connexion
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest()) // On utilise la request qu'on a crée

        //On récupére les data envoyer quand on se connecte
        const { data } = await axios.post(`/api/login`, { email, password });

        //On attribut les data à loginSuccess
        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFail(error.response.data.message)) // En cas d'erreur
    }

}

export const clearAuthError = (dispatch) => {
    dispatch(clearError())
}

//Action : Avoir les données de l'utilisateur connecter
export const loadUser = async (dispatch) => {

    try {
        dispatch(loadUserRequest()) // On utilise la request qu'on a crée

       
        //On récupere l'utilisateur pour le cookie
        const { data } = await axios.get(`/api/myprofile`);

        //On attribut les data à registerSuccess
        dispatch(loadUserSuccess(data))

    } catch (error) {
        dispatch(loadUserFail(error.response.data.message)) // En cas d'erreur
    }

}


//Action : Déconnexion
export const logout = async (dispatch) => {

    try {

       await axios.get(`/api/logout`);

        dispatch(logoutSuccess())

    } catch (error) {
        dispatch(logoutFail(error.response.data.message)) // En cas d'erreur
    }

}

//Action : Update le profil
export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest()) 

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        //On récupére les data envoyer quand on soumet le formulaire
        // Méthode put car on modifie
        const { data } = await axios.put(`/api/update`, userData, config);

        //On attribut les data à registerSuccess
        dispatch(updateProfileSuccess(data))

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message)) // En cas d'erreur
    }

}

//Action : Update le mot de passe
export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest()) 

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // Méthode put car on modifie
        await axios.put(`/api/password/change`, formData, config);

        
        dispatch(updatePasswordSuccess())

    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message)) // En cas d'erreur
    }

}


//Action : Mot de passe oublié
export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest()) 

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/password/forgot`, formData, config);

        
        dispatch(forgotPasswordSuccess(data))

    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message)) // En cas d'erreur
    }

}


//Action : Reset le mot de passe : token => un token générer dans le lien du reset
export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest()) 

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/password/reset/${token}`, formData, config);

        
        dispatch(resetPasswordSuccess(data))

    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message)) // En cas d'erreur
    }

}


// Action - Pour récupérer les utilisateurs en forme de liste [ADMIN]
export const getUsers = async (dispatch) => {

    try {
        dispatch(usersRequest()) // On utilise la request qu'on a crée
        const { data } = await axios.get(`/api/admin/users`);

        //On attribut les data à registerSuccess
        dispatch(usersSuccess(data))

    } catch (error) {
        dispatch(usersFail(error.response.data.message)) // En cas d'erreur
    }

}


// Action - Pour récupérer 1 seul utilisateur [ADMIN]
export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest()) // On utilise la request qu'on a crée
        const { data } = await axios.get(`/api/admin/user/${id}`);

        dispatch(userSuccess(data))

    } catch (error) {
        dispatch(userFail(error.response.data.message)) // En cas d'erreur
    }

}


// Action - Pour supprimer un utilisateur [ADMIN]
export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest()) // On utilise la request qu'on a crée (slice)
        await axios.delete(`/api/admin/user/${id}`);

        dispatch(deleteUserSuccess())

    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message)) // En cas d'erreur
    }

}


// Action - Pour update un utilisateur [ADMIN]
export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest()) 

        //Pour éviter de recevoir un content-type : multipart
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // Méthode put car on modifie
        await axios.put(`/api/admin/user/${id}`, formData, config);

        dispatch(updateUserSuccess())

    } catch (error) {
        dispatch(updateUserFail(error.response.data.message)) // En cas d'erreur
    }

}
