import  { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { createReview, getProduct } from '../../actions/productActions'
import {addCartItem} from '../../actions/cartActions'
import Loader from '../layouts/Loader'
import { Carousel } from 'react-bootstrap'
import MetaData from '../layouts/MetaData'
import { Modal } from 'react-bootstrap'
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice'
import { toast } from 'react-toastify';
import ProductReview from './ProductReview';

export default function ProductDetail() {

    const { product = {}, loading, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);

    const dispatch = useDispatch();
    //Pour récupérer l'id de l'url avec useParamss
    const { id } = useParams();

    //Pour la quantité du produit
    const [quantity, setQuantity] = useState(1);

    //Incrémenter la quantité
    const increaseQty = () => {

        //On récupere le nombre
        const count = document.querySelector('.count')

        // Si le stock est égal à 0
        // Ou La valeur du count dépasse le nombre de stock
        // On retourne juste, on ne pourra pas incrémenter
        if (product.stock === 0 || count.valueAsNumber >= product.stock) {
            return;
        }

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);

    }

    //Décrémenter la quantité
    const decreaseQty = () => {

        //On récupere le nombre
        const count = document.querySelector('.count')

       //Si la valeur du count est égal à 1 on ne pourra plus décrémenter
        if (count.valueAsNumber === 1) {
            return;
        }

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);

    }

    //Pour la modal qui s'ouvre (ajouter un avis)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rating, setRating] = useState(1); // Avis étoile
    const [comment, setComment] = useState('')// Commentaire

    //Handler pour ajouter l'avis
    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);

        dispatch(createReview(formData))
    }

    //Pour afficher le produit via son ID
    useEffect(() => {

        if (isReviewSubmitted) {
            handleClose()
             toast('Votre avis a bien été ajouter !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            })
            
        }

        
        if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        
        // Si on a pas de produit ou si l'avis a été ajouter on récupere le produit
        if (!product._id || isReviewSubmitted) {
             dispatch(getProduct(id))            
        }

        // Quand on sort de la page d'un produit
        return () => {
            dispatch(clearProduct())
        }

    },[dispatch, id, isReviewSubmitted, error])

    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={product.name} />
            <div className="flex flex-col mx-auto justify-center items-center sm:flex-row">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image._id}>
                        <img
                          className="d-block w-100 rounded"
                          src={image.image}
                          alt={product.name}
                          height="500"
                          width="500"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3 className="text-white text-2xl">#{product.name}</h3>
                <p id="product_id" className="text-white">
                  Référence : #{product._id}
                </p>

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>

                <span id="no_of_reviews">({product.numOfReviews} notes)</span>

                <hr className="bg-white m-3" />

                <p id="product_price" className="text-white mb-3">
                  Prix : {product.price} €
                </p>

                <div className="stockCounter flex gap-1">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>

                {/* Condition, si le stock est à 0 on passe le boutton en disabled(true) */}
                <button
                  type="button"
                  id="cart_btn"
                  onClick={() => {
                    dispatch(addCartItem(product._id, quantity));
                    toast("Produit ajouter !", {
                      type: "success",
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }}
                  disabled={product.stock === 0 ? true : false}
                  className="btn btn-primary mt-3"
                >
                  Ajouter au panier
                </button>

                <hr className="bg-white mt-3" />

                <h4 className="text-white mt-3">#Description : </h4>
                <br />
                <p className="text-white mb-3">{product.description}</p>
                <hr className="bg-white mb-3" />

                {/* Condition, si le stock est supérieur à 0 on passe le text en Green sinon en Red (pour la couleur)*/}
                {/* Condition, si le stock est supérieur à 0 affiche 'En Stock' sinon 'Plus en stock' */}
                <p className="text-white">
                  #Disponibilité :{" "}
                  <span
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                    id="stock_status"
                  >
                    {product.stock > 0 ? "En stock" : "Plus en stock"}
                  </span>
                </p>

                <p id="product_seller mb-3" className="text-white">
                  #Plateforme : <strong>{product.platform}</strong>
                </p>
                <hr className="bg-white mt-3" />
                {/* Ajouter un avis que si on a un user connecter */}
                {user ? (
                  <button
                    onClick={handleShow}
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                  >
                    Ajouter un avis
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5">
                    Connectez-vous pour ajouter un avis
                  </div>
                )}

                <div className="row mt-2 mb-2">
                  <div className="rating w-50">
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Ajouter un avis</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ul className="stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <li
                              value={star}
                              onClick={() => setRating(star)}
                              className={`star ${
                                star <= rating ? "orange" : ""
                              }`}
                              onMouseOver={(e) =>
                                e.target.classList.add("yellow")
                              }
                              onMouseOut={(e) =>
                                e.target.classList.remove("yellow")
                              }
                            >
                              <i className="fa fa-star"></i>
                            </li>
                          ))}
                        </ul>

                        <textarea
                          onChange={(e) => setComment(e.target.value)}
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>

                        <button
                          disabled={loading}
                          aria-label="Fermer"
                          onClick={reviewHandler}
                          className="
                                                btn
                                                my-3
                                                float-right
                                                review-btn
                                                px-4
                                                text-white
                                                "
                        >
                          Ajouter
                        </button>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        <div className="w-4/5 mx-auto">
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
        </div>
      </Fragment>
    );
}