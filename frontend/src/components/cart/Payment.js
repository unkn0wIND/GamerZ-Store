import { useStripe, useElements } from '@stripe/react-stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import {validateShipping} from '../cart/Shipping'
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice'
import { createOrder } from '../../actions/orderActions'
import { clearError as clearOrderError } from '../../slices/orderSlice';
import axios from 'axios'

export default function Payement() {

    const stripe = useStripe();
    const elements = useElements(); //Hook pour récupérer le numéro de carte etc..
    const dispatch = useDispatch();
    const navigate = useNavigate(); //Redirection une fois le paiement terminer

    //Les informations de la commande stocker (sessionStorage)
    // On converti en JSON OBJECT
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                line1 : shippingInfo.address,
            },
            phone: shippingInfo.phoneNo
        }

    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
        if (orderError) {
              toast(orderError, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearOrderError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }
        
    }, [dispatch])
    
    //Une fois que le boutton payer est cliquer
    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true; // Le boutton devient disabled
        try {
            const { data } = await axios.post('/api/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
           })
            
            if (result.error) {
                toast((await result).error.message, {
                    type: 'error',
                    position: toast.POSITION.TOP_CENTER
                })
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if ((await result).paymentIntent.status === 'succeeded') {
                    toast('Paiement avec succès', {
                        type: 'success',
                        position: toast.POSITION.TOP_CENTER
                    })
                    order.paymentInfo = {
                        id: (await result).paymentIntent.id,
                        status: (await result).paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))

                    navigate('/order/success')
                } else {
                    toast('Merci de réessayer !', {
                    type: 'warning',
                    position: toast.POSITION.TOP_CENTER
                })
                }
            }
            
        } catch (error) {
            
        }
    }


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <div className="form-group">
                    <label htmlFor="card_num_field" className='text-white'>Numéro de Carte</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                            className="form-control"
                        
                        value=""
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field" className='text-white'>Date d'expiration</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field" className='text-white'>CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        value=""
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    Payer (4/4) - {`${orderInfo.totalPrice}€`}
                    </button>
        
                </form>
                </div>
        </div>
    )
}