import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, clearAuthError } from "../../actions/userActions";
import {toast} from 'react-toastify'
import { clearUpdateProfile } from '../../slices/authSlice';

export default function UpdateProfile() {

    const { error, user, isUpdated } = useSelector(state => state.authState)
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');
    
    //Appel de useDispatch pour utiliser les actions redux
    const dispatch = useDispatch();

    //Pour l'avatar
    const onChangeAvatar = (e) => {
        e.preventDefault();

        const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
    }

    //Soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar)

        //Envoyer le formData à notre updateProfileAction
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        //Après l'update (isUpDated dans le reducer)
        if (isUpdated) {
            toast('Le profil a bien été mis à jour !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
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

    },[user, isUpdated, error, dispatch])



    return (
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5 text-white">Mettre à jour</h1>

                        <div className="form-group">
                            <label htmlFor="email_field" className='text-white'>Nom</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field" className='text-white'>Adresse mail</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                            value={email}
                            onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload' className='text-white'>Mon Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                    id='customFile'
                                    onChange={onChangeAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choisir un Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Enregistrer</button>
                    </form>
                </div>
            </div>
    )
}