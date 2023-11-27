import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { getUser, updateUser } from '../../actions/userActions' // single user + update user action
import { toast } from "react-toastify";
import { clearError, clearUserUpdated } from "../../slices/userSlice";

export default function UpdateUser() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    //Pour récupérer l'id de l'utilisateur /user/id
    // id:userId = on renomme id en userId
    const { id: userId } = useParams();


    const { loading, isUserUpdated , error, user} = useSelector(state => state.userState)
    const { user: authUser } = useSelector(state => state.authState) // Pour disabled le role si on est admin
    
    const dispatch = useDispatch();

   

    //SubmitHandler au soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
       
        dispatch(updateUser(userId,formData))
    
    }


    useEffect(() => {

        if (isUserUpdated) {
            toast('Utilisateur modifié avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearUserUpdated()) // clearUserUpdated alert
            })
            return;
        }

           if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        
        dispatch(getUser(userId)) // SINGLEUSER(idPARAMS)

    }, [isUserUpdated, error, dispatch])

    
    //Récupérer les data déjà présent de l'utilisateur qu'on veut modifier dans le formulaire
    useEffect(() => {

        // Si on a l'id de l'utilisateur
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }   

    },[user])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4 text-white" >Mettre à jour - Utilisateur</h1>

                            <div className="form-group">
                            <label htmlFor="name_field" className="text-white">Nom</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field"  className="text-white">Adresse Mail</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                />
                            </div>



                            <div className="form-group">
                                <label htmlFor="category_field"  className="text-white">Role</label>
                                <select disabled={user._id === authUser._id } value={role} onChange={e => setRole(e.target.value) }  className="form-control" id="category_field">
                                    <option value="admin">Administrateur</option>
                                    <option value="user">Utilisateur</option>
                                </select>
                            </div>
                            

                            <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="btn btn-block py-3"
                            >
                            ENREGISTRER
                            </button>

                        </form>
                    </div>
                </>
            </div>
        </div>
        
    )
}