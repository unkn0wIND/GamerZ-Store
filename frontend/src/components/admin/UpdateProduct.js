import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from '../../actions/productActions'
import { toast } from "react-toastify";
import { clearError, clearProductUpdated } from "../../slices/productSlice";

export default function UpdateProduct() {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [platform, setPlatform] = useState('');
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false)
    const [imagesPreview, setImagesPreview] = useState([]);
    const { id: productId } = useParams(); // ID du produit

    const { loading, isProductUpdated , error, product} = useSelector(state => state.productState)

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
        formData.append('imagesCleared', imagesCleared)
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(productId,formData))
    
    }

    //Clear Images Handler
    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }



    useEffect(() => {

        if (isProductUpdated) {
            toast('Produit modifié avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([]);
            return;
        }

           if (error) {
            toast('Merci de bien vouloir compléter les champs', {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        
        dispatch(getProduct(productId)) // useParams

    }, [isProductUpdated, error, dispatch, navigate, productId])

    
    //Récupérer les data du produit qu'on veut modifier dans le formulaire
    useEffect(() => {

        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
            setPlatform(product.platform);
            setCategory(product.category);

            let images = [];
            product.images.forEach(image => {
                images.push(image.image)
            });

            setImagesPreview(images);


        }   

    },[product])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Mettre à jour</h1>

                            <div className="form-group">
                            <label htmlFor="name_field">Nom</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Prix</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                   onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                  ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Catégories</label>
                                <select value={category} onChange={e => setCategory(e.target.value) }  className="form-control" id="category_field">
                                    <option value="">Selectionner</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}       
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Vendeur</label>
                                <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                onChange={(e) => setPlatform(e.target.value)}
                                value={platform}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Images</label>
                                
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
                                
                                {imagesPreview.length > 0 && <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span>}
                                
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
                            ENREGISTRER
                            </button>

                        </form>
                    </div>
                </>
            </div>
        </div>
        
    )
}