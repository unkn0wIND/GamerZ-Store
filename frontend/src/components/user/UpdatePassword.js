import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updatePassword as updatePasswordAction, clearAuthError } from "../../actions/userActions";
import {toast} from 'react-toastify'

export default function UpdatePassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState);

    //Fonction au soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);

        //On envoi à l'action en argument le formData
        dispatch(updatePasswordAction(formData))

    }

    useEffect(() => {

        //Après l'update si c'est true
        if (isUpdated) {
            toast('Le mot de passe a bien été mis à jour !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER
            })
            setOldPassword('');
            setPassword('');
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearAuthError)} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }

    },[isUpdated, error, dispatch])

    return (
        	<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5 text-white">Mot de passe</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field" className='text-white'>Ancien mot de passe</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field" className='text-white'>Nouveau mot de passe</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Enregistrer</button>
                    </form>
                </div>
            </div>
    )
}