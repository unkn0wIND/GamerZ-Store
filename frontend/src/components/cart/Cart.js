import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {increaseCartItemQty, decreaseCartItemQty, removeItemFromCart} from '../../slices/cartSlice'


// Panier
export default function Cart() {

    const { items } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Calculer le total : quantité x prix
    const totalP = items.reduce((acc, item) => (acc + item.quantity * item.price), 0);

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) {
            return;
        }
        dispatch(increaseCartItemQty(item.product))
    }

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) {
            return;
        }
        dispatch(decreaseCartItemQty(item.product))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <>
            {items.length === 0 ?
                <div className="container container-fluid h-100">
                    <h2 className="mt-5 text-center text-white text-2xl">Votre panier est vide ...</h2>
                     <img
                        src="/images/cart.png"
                        alt="Panier"
                        className="mx-auto"
                        width="500"
                        height="500"
                        style={{ objectFit: "cover", }} />
                </div>
                :
                <>
            <div id="cart-container" className="container container-fluid">
                <h2 className="mt-5 text-white">Nombre de produit(s) : <b>{items.length}</b></h2>
        
                <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map(item => (
                                <>
                                    <hr className='border-white mt-3' />
                        <div className="cart-item">
                            <div className="flex flex-col sm:flex-row">
                                <div className="col-4 col-lg-3">
                                    <img src={item.image} alt={item.name} height="90" width="115" />
                                </div>

                                <div className="col-5 col-lg-3">
                                   <Link to={`/product/${item.product}`} className='text-white'>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p id="card_item_price">{item.price}€</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div className="stockCounter flex gap-2">
                                        <span onClick={() => decreaseQty(item)} className="btn btn-danger minus">-</span>
                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                        <span onClick={() => increaseQty(item)} className="btn btn-primary plus">+</span>
                                        <i onClick={() => dispatch(removeItemFromCart(item.product))} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                    </div>        
                                            
                                </div>


                            </div>
                        </div>
                        </>
                        ))}
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4 className='text-white'>Votre Panier</h4>
                            <hr className='bg-white mt-3 mb-2' />
                            <p className='text-white'>Total:  <span className="order-summary-values">{items.reduce((acc, item) =>(acc + item.quantity), 0)} (articles)</span></p>
                            <p className='text-white'>Prix total: <span className="order-summary-values">{Number(totalP).toFixed(2)}€</span></p>
                            <hr />
                            <button onClick={checkoutHandler} id="checkout_btn" className="btn btn-primary btn-block">Passer commande (1/4)</button>
                        </div>
                    </div>
                        </div>
            </div>
                </>
            }
            
        </>
    )
}