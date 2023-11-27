import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData'
import CheckoutStep from './CheckoutStep';
import { validateShipping } from './Shipping'
export default function ConfirmOrder() {

    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);

    const navigate = useNavigate();

    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 10; //Prix de la livraison si l'achat ne dépasse pas 200euros(25e) sinon 0e
    let taxPrice = Number(0.05 * itemsPrice); //Prix de la tax
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);

    //Pour le composant paiement
    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data)) //On save les data dans le sessionStorage
        navigate('/payment')
    }

    
    useEffect(() => {
        validateShipping(shippingInfo, navigate)
    },[shippingInfo, navigate])

    return (
        <>
            <MetaData title={'Confirmation de la commande'} />
            <CheckoutStep shipping={true} confirmOrder={true} />
        <div className="container container-fluid sm:flex justify-content-between">
            
            <div className="col-12 col-lg-8 mt-5 order-confirm">
                  
                    <h4 className="mb-3 mt-8 text-white text-3xl">Information de livraison</h4>
                    <p className='text-white'><b>Nom :</b> {user.name}</p>
                    <p className='text-white'><b>Téléphone : </b>{ shippingInfo.phoneNo}</p>
                <p className="mb-4 text-white"><b>Adresse :</b> {shippingInfo.address}, {shippingInfo.postalCode} - {shippingInfo.city} ({shippingInfo.country}) </p>
                
                <hr className='border-white' />
                <h4 className="mt-4 mb-3 text-white">Produit(s)</h4>
                {cartItems.map(item => (
                        <>
                <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-6">
                                    <Link className='text-white' to={`/product/${item.product}`}>{item.name}</Link>
                        </div>

                        <hr />
                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p className='text-white'>{item.quantity} x {item.price} = <b>{item.quantity * item.price}€</b></p>
                        </div>

                    </div>
                </div>
                        </>
                ))}
                <hr className='border-white mt-3' />
            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4 className='text-white mb-3'>Votre Panier</h4>
                        <hr className='border-white mb-3' />
                        <p className='text-white'>Total : <span className="order-summary-values">{Number(itemsPrice).toFixed(2)}€</span></p>
                        <p className='text-white'>Frais Livraison : <span className="order-summary-values">{shippingPrice}€</span></p>
                        <p className='text-white'>Tax : <span className="order-summary-values">{taxPrice}€</span></p>

                        <hr className='border-white mt-3 mb-3' />

                        <p className='text-white'>Prix total: <span className="order-summary-values">{totalPrice}€</span></p>

                        <button onClick={processPayment} id="checkout_btn" className="btn btn-primary btn-block">Passer au paiement (3/4)</button>
                    </div>
                </div>
			
			
            </div>
        </>
    )
}