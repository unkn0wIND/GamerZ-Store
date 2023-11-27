import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword as forgotPasswordAction, clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    //message on le retrouve dans notre reducer forgotPasswordSuccess()
    const { error, message} = useSelector(state => state.authState) 

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('email', email)
        dispatch(forgotPasswordAction(formData))
    }

    useEffect(() => {
        if (message) {
            toast(message, {
                type: "success",
                position: toast.POSITION.TOP_CENTER,
            })
            setEmail(""); // On reset le champ email
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

    },[message, error, dispatch])


    return (
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Mot de passe oublié</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Votre adresse mail</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Envoyer le mail de récupération
                    </button>

                    </form>
                </div>
            </div>
    )
}