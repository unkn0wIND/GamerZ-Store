import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Image } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import { AiFillAliwangwang } from "react-icons/ai";

// Header du site (cart, recherche, connexion)
const Header = () => {

  //On récupére les deux state de redux avec useSelector
  const { isAuthenticated, user } = useSelector(state => state.authState);
  
  //On récupére cartItems pour l'afficher plus bas dans le nombre de produit
  const { items: cartItems } = useSelector(state => state.cartState);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  }

  return (
    <nav className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:items-center">
      <div className="">
        <div className="flex justify-center">
          <Link to='/'>
            <h1 class="font-extrabold text-transparent text-2xl sm:text-2xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        GamerZ-Store
            </h1>
          </Link>

        </div>
      </div>

      <div className="w-full items-center sm:max-w-5xl">
        <Search/>
      </div>

      <div className="flex justify-center gap-5 items-center">

        {isAuthenticated ? 
          (
            <Dropdown className='d-inline'>
              <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                <div className="flex items-center justify-center">
                <figure className='avatar avatar-nav'>
                  <Image width="50px" className='rounded-full' src={user.avatar??'./images/default_avatar.png'} />
                </figure>
                <span>{user.name}</span>
                </div>

              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Si le role est admin alors il y a un onglet ADMINISTRATION */}
                {user.role === 'admin' && <Dropdown.Item onClick={() => { navigate('/admin') }} className='text-dark'>Administration</Dropdown.Item>}
                <Dropdown.Item onClick={() => { navigate('/profile') }} className='text-dark'>Mon Profil</Dropdown.Item>
                <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Mes commandes</Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className='text-danger'>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          
          : <Link to='/login' className="" id="login_btn">Connexion</Link>
        }


        <Link to='/cart'><span id="cart" className="items-center justify-center gap-5">Panier</span></Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  )
}

export default Header