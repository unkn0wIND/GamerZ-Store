import { createSlice } from "@reduxjs/toolkit";

// Authentification
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true, // Eviter le chargement à l'initial
        isAuthenticated: false // Initial c'est false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                loading: true, // Activer un chargement quand on se connecte
                isAuthenticated: false
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false, // La connexion a été établi
                isAuthenticated: true, // On passe à true car on est loggé
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                loading: false, 
                isAuthenticated: false,
                error: action.payload // En cas d'erreur
            }
        },
        clearError(state, action) {
            return {
               ...state,
                error: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true, // Activer un chargement
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false, // La connexion a été établi
                isAuthenticated: true, // On passe à true car on est loggé
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                loading: false, 
                isAuthenticated: false,
                error: action.payload // En cas d'erreur
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false, 
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false, // La connexion a été établi
                isAuthenticated: true, // On passe à true car on est loggé
                user: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                loading: false, 
                isAuthenticated: false,
            }
        },
        logoutSuccess(state, action) { //Deconnexion
            return {
                loading: false, 
                isAuthenticated: false, 
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload // En cas d'erreur
            }
        },
        updateProfileRequest(state, action) {
            return {
                ...state, //On spread les state initial
                loading: true, // Activer un chargement
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false, // La connexion a été établi
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false,
            }
        },
         updatePasswordRequest(state, action) {
            return {
                ...state, //On spread les state initial
                loading: true, // Activer un chargement
                isUpdated: false,
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false, // La connexion a été établi
                isUpdated: true
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
        forgotPasswordRequest(state, action) {
            return {
                ...state, //On spread les state initial
                loading: true, // Activer un chargement
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false, // La connexion a été établi
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },
         resetPasswordRequest(state, action) {
            return {
                ...state, //On spread les state initial
                loading: true, // Activer un chargement
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false, // La connexion a été établi
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false, 
                error: action.payload // En cas d'erreur
            }
        },

    }
});

const { actions, reducer } = authSlice; // On extrait, destructuring

export const {
    loginRequest,
    loginSuccess,
    loginFail,
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
    resetPasswordFail,
    clearUpdateProfile
} = actions // On récupère et exporte les étapes

export default reducer; // On exporte le reducer pour l'ajouter dans store.js