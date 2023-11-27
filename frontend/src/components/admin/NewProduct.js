import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { createNewProduct } from '../../actions/productActions'
import { toast } from "react-toastify";
import { clearError, clearProductCreated } from "../../slices/productSlice";


export  default function NewProduct () {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [platform, setPlatform] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductCreated, error} = useSelector(state => state.productState)

    const categories = [
        'Action',
        'Aventure',
        'Sport',
        'Combat',
        'FPS',
        'Course',
        'Horreur',
        'RPG',
        'MMORPG',
        
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Fonction pour image Preview 
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files); // Passer d'un objet en tableau

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file);


        })
    }

    //SubmitHandler au soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description)
        formData.append('stock', stock);
        formData.append('platform', platform);
        formData.append('category', category);
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(createNewProduct(formData))

    }

    useEffect(() => {

        if (isProductCreated) {
            toast('Produit crée avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products');
            return;
        }

           if (error) {
            toast('Merci de compléter les champs', {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        

    },[isProductCreated, error, dispatch, navigate])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4 text-white">Nouveau produit</h1>

                            <div className="form-group">
                            <label htmlFor="name_field" className="text-white">Nom du jeu</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field" className="text-white">Prix</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field" className="text-white">Description</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                   onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                  ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field" className="text-white">Catégories</label>
                                <select onChange={e => setCategory(e.target.value) }  className="form-control" id="category_field">
                                    <option value="">Selectionner</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field" className="text-white">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}       
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field" className="text-white">Plateforme</label>
                                <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                onChange={(e) => setPlatform(e.target.value)}
                                value={platform}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label className="text-white">Images</label>
                                
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                           onChange={onImagesChange}

                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>
                                            ...
                                        </label>
                                    </div>
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 mr-2"
                                        key={image}
                                        src={image}
                                        alt={`Prévisualisation`}
                                        width="55"
                                        height="52"
                                    />
                                    ))}
                            </div>

                
                            <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="btn btn-block py-3"
                            >
                            Crée le produit
                            </button>

                        </form>
                    </div>
                </>
            </div>
        </div>
        
    )
}