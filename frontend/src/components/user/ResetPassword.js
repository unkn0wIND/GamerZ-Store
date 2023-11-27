import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../actions/userActions";
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from "react-toastify";

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => state.authState)

    const navigate = useNavigate()
    const { token } = useParams(); //Récupérer le token dans l'url /password/reset/:token

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        
        dispatch(resetPassword(formData, token))

    }

    useEffect(() => {
        if (isAuthenticated) {
             toast('Le mot de passe a bien été réinitialiser !', {
                type: "success",
                position: toast.POSITION.TOP_CENTER,
            })
            navigate('/')
            return;
        }

          if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearAuthError)} //Clear le state de l'erreur quand le message a été envoyer
            })
             return;
        }

    },[isAuthenticated, error, dispatch, navigate])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">Nouveau mot de passe</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Mot de passe</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        ENREGISTRER
                    </button>

                </form>
            </div>
        </div>
    )
}