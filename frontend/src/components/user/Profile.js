import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

export default function Profile() {

    //On récupére user 
    const { user } = useSelector(state => state.authState);

    return (
      <div className="container container-fluid justify-content-center mt-5 user-info">
        <div className='flex flex-col justify-center  sm:flex-row'>
          <div className="col-12 col-md-3">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-circle img-fluid"
                src={user.avatar ?? "./images/default_avatar.png"}
                alt=""
              />
            </figure>
            <Link
              to="/profile/update"
              id="edit_profile"
              className="btn btn-primary btn-block my-5"
            >
              Editer le profil
            </Link>
          </div>

          <div className="col-12 col-md-5">
            <h4 className="text-white">Nom</h4>
            <p className="text-white">{user.name}</p>

            <h4 className="text-white">Adresse mail</h4>
            <p className="text-white">{user.email}</p>

            <h4 className="text-white">Date d'inscription</h4>
            <p className="text-white">
              {String(user.createdAt).substring(0, 10)}
            </p>

            <Link to="/orders" className="btn btn-danger btn-block mt-5">
              Mes commandes
            </Link>

            <Link
              to="/profile/update/password"
              className="btn btn-primary btn-block mt-3"
            >
              Modifier mot de passe
            </Link>
          </div>
        </div>
      </div>
    );
}