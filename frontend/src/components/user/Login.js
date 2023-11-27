import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {clearAuthError, login} from '../../actions/userActions'
import MetaData from '../layouts/MetaData'
import { Link } from 'react-router-dom'


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Pour la redirection
  const location = useLocation();
    
    // On récupere loading pour disable le boutton de connexion 
    // Pour éviter de cliquer sur connexion chaque seconde
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';
  
    //Quand on submit le form on récupere l'event
    const submitHandler = (e) => {
        e.preventDefault();

        //On importe login de userActions
        dispatch(login(email, password))
    }

    //Pour afficher un message en cas  d'erreur ou  rediriger si la connexion réussie
    useEffect(() => {

        //Rediriger vers la homePage si on est loggé
        if (isAuthenticated) {
            navigate(redirect)
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearAuthError)} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
    },[error, dispatch, isAuthenticated, navigate, redirect])


    return (
    <Fragment>
         <MetaData title={`Page de connexion`}/>
         <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg pb-5 rounded">
            <h1 className="mb-3 text-white">Connexion</h1>
            <div className="form-group">
              <label htmlFor="email_field" className='text-white'>Adresse mail</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field" className='text-white'>Mot de passe</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4 text-white">Mot de passe oublié?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              Connexion
            </button>

            <Link to='/register' className="float-right mt-3 text-white">Pas encore inscrit?</Link>
          </form>
		  </div>
                </div>
    </div>
    </Fragment>
    )
}