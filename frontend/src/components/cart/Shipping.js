import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from 'countries-list'
import { saveShippingInfo } from '../../slices/cartSlice'
import {useNavigate} from 'react-router-dom'
import CheckoutStep from './CheckoutStep'
import {toast} from 'react-toastify'

export const validateShipping = (shippingInfo, navigate) => {
    if (!shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode ) {
        toast.error('Veuillez remplir les informations', {
            position: toast.POSITION.TOP_CENTER
        })
        navigate('/shipping')
    }
}

export default function Shipping() {

    
    const {shippingInfo={}} = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address); //Adresse
    const [city, setCity] = useState(shippingInfo.city); // Ville
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo); // Numéro de tel
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode); //Code Postal
    const [country, setCountry] = useState(shippingInfo.country); //Pays
   

    const countryList = Object.values(countries); // On map en bas les pays

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country}))
        navigate('/order/confirm')
    }



    return (
        <>
            <CheckoutStep shipping={true}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <div className="form-group">
                            <label htmlFor="address_field" className='text-white'>Adresse</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field" className='text-white'>Ville</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlhtmlFor="phone_field" className='text-white'>Numéro de Tel.</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field" className='text-white'>Code Postal</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field" className='text-white'>Pays</label>
                            <select
                                id="country_field"
                                className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                                required
                        >{countryList.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>

                            ))}
                                
                            </select>
                    </div>
                    


                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Passer à la confirmation (2/4)
                            </button>
                    </form>
                </div>
            </div>
    </>
    )
}