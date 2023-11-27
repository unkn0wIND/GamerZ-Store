import { createSlice } from "@reduxjs/toolkit";


//Changer les states pour chaque action

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false, // Eviter le chargement à l'initial
        user: {}, // Champs d'un utilisateur unique
        users: [], // Liste de plusieurs utilisateurs, en forme de tableau pour forEach et afficher en front
        isUserUpdated: false, // Pour l'alerte une fois update
        isUserDeleted: false

    },
    reducers: {
        usersRequest(state, action) { // Pour la liste des utilisateurs
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        userRequest(state, action) { // Pour un utilisateur en particulier
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        deleteUserRequest(state, action) { // Pour supprimer 1 utilisateur
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true // On passe à true car l'utilisateur est supprimé
            }
        },
        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        updateUserRequest(state, action) { // Pour modifier 1 utilisateur
            return {
                ...state,
                loading: true // Activer un chargement quand on récupére les produits
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true // On passe à true car l'utilisateur est modifié
            }
        },
        updateUserFail(state, action) {
            return {
                ...state,
                loading: false, // En cas d'erreur
                error: action.payload
            }
        },
        clearUserDeleted(state, action) { // Pour reset l'alerte une fois l'utilisateur supprimé
            return {
                ...state,
                isUserDeleted: false,
            }
        },
        clearUserUpdated(state, action) { // Pour reset l'alerte une fois l'utilisateur modifié
            return {
                ...state,
                isUserUpdated: false,
            }
        },
        clearError(state, action) { // Pour reset les erreurs
            return {
                ...state,
                error: null
            }
        }


    }
});

const { actions, reducer } = userSlice; // On extrait, destructuring

export const {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    clearUserDeleted,
    clearUserUpdated,
    clearError
} = actions // On récupère et exporte les étapes

export default reducer; // Pour l'ajouter dans store.js