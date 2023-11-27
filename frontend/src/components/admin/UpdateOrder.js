import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrders } from '../../actions/orderActions'
import { toast } from "react-toastify";
import { clearError, clearOrderUpdated } from "../../slices/orderSlice";

export default function UpdateOrder() {
    

    const { loading, isOrderUpdated , error, orderDetail} = useSelector(state => state.orderState)
    const {user={}, orderItems=[], shippingInfo={}, totalPrice=0, paymentInfo={}} = orderDetail
    const isPaid = paymentInfo.status === 'succeeded' ? true : false;
    const [orderStatus, setOrderStatus] = useState('Traitement');
    const { id:orderId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();



    //SubmitHandler au soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();

        const orderData = {};

        orderData.orderStatus = orderStatus;
    
        dispatch(updateOrders(orderId,orderData))
    
    }



    useEffect(() => {

        if (isOrderUpdated) {
            toast('Commande modifiée avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })

            return;
        }

           if (error) {
            toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        
        dispatch(orderDetailAction(orderId))

    }, [isOrderUpdated, error, dispatch, navigate, orderId])

    
    //Récupérer les data de la commande 
    useEffect(() => {

        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }   

    },[orderDetail])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="row d-flex justify-content-around text-white">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Numéro Commande #{orderDetail._id}</h1>

                        <h4 className="mb-4">Information de livraison</h4>
                            <p><b>Nom:</b> {user.name}</p>
                            <p><b>Numéro de Tel:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Adresse:</b> {shippingInfo.address}, {shippingInfo.postalCode} - {shippingInfo.city} ({shippingInfo.country})</p>
                            <p><b>Prix:</b> {totalPrice}€</p>

                        <hr />

                        <h4 className="my-4">Statut du paiement</h4>
                          <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'Payé' : 'Pas encore payé'}</b></p>


                        <h4 className="my-4">Statut de la commande</h4>
                            <p className={orderStatus && orderStatus.includes('Livré') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>


                        <h4 className="my-4">Produit(s) :</h4>

                        <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`} className='text-white'>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>{item.price}€</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Quantité(s)</p>
                                        </div>
                                    </div>
                                ))}
                                    
                        </div>
                        <hr />
                        </div>
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Status de la commande</h4>
                            <div className="form-group">
                                <select name="status" value={orderStatus} onChange={e => setOrderStatus(e.target.value)} className="form-control">
                                    <option value="Traitement">Traitement</option>
                                    <option value="Expédié">Expédié</option>
                                    <option value="Livré">Livré</option>
                                </select>
                                <button disabled={loading} onClick={submitHandler} className="btn btn-primary btn-block mt-3">Mettre à jour</button>
                            </div>
                        </div>                  
                    </div>
                </>
            </div>
        </div>
        
    )
}