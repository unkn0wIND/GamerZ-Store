import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { orderDetail as orderDetailAction } from '../../actions/orderActions'
import Loader from '../layouts/Loader'


export default function OrderDetail() {

    //On récupére les détail et la barre de chargement le temps de recevoir les réponse de l'api
    const { orderDetail, loading } = useSelector(state => state.orderState);

    //On récupere les info
    const {
        shippingInfo = {},
        user = {},
        orderStatus = "Traitement",
        orderItems = [],
        totalPrice = 0,
        paymentInfo={}
    } = orderDetail;

    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false
    const dispatch = useDispatch();
    const { id } = useParams(); // Valeur de l'id qu'on récupere /order/:id

    useEffect(() => {
        dispatch(orderDetailAction(id))
    },[id])


    return (
        <>
        { loading ? <Loader/> :
                <>
        <div className='container container-fluid text-white'>
            <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5 text-2xl">Numéro Commande : #{orderDetail._id}</h1>

                        <h4 className="mb-4">Information de livraison</h4>
                            <p><b>Nom:</b> {user.name}</p>
                            <p><b>Numéro de Tel:</b> {shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Adresse:</b> {shippingInfo.address}, {shippingInfo.postalCode} - {shippingInfo.city} ({shippingInfo.country})</p>
                            <p><b>Prix:</b> {totalPrice}€</p>

                        <hr className='border-white mt-3' />

                        <h4 className="my-4">Statut du paiement</h4>
                          <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'Payé' : 'Pas encore payé'}</b></p>


                        <h4 className="my-4">Statut de la commande</h4>
                            <p className={orderStatus && orderStatus.includes('Livré') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>


                        <h4 className="my-4">Produit(s) :</h4>

                        <hr className='border-white' />
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
                        <hr className='border-white' />
                    </div>
                        </div>
        </div>
        </>
        }
        </>
        
    )
}