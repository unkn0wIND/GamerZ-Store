import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import Loader from '../layouts/Loader'

//Pour protéger les page seul les personne connecter, si il est admin ou pas aussi
export default function ProtectedRoute({ children, isAdmin }) {
    

    const { isAuthenticated, loading, user } = useSelector(state => state.authState);

    //Si on est pas connecter on est rediriger vers la page de connexion
    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" />
    }

    //Si il est connecter
    //On retourne children
    if (isAuthenticated) {
        //Si vous n'est pas admin et qu'on essaye d'accéder à une route isAdmin alors on est redirigé
        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to='/'/>
        }
        return children;
    }

    if (loading) {
        return <Loader/>
    }

    //Dans app.js on met en élément parent ce composant puis comme children les composant lier au profil
    // <ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute> pour une route admin

}