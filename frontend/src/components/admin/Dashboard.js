import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { getAdminProducts } from '../../actions/productActions'
import { getUsers } from '../../actions/userActions'
import {adminOrdersAction} from '../../actions/orderActions'
import { Link } from "react-router-dom";

export default function Dashboard() {

    //On récupére les produit par défault c'est vide
    const { products = [] } = useSelector(state => state.productsState);

    //Pour afficher dans le tableau de bord
    const { adminOrders = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);

    //Pour utiliser une action
    const dispatch = useDispatch();

    //Pour avoir le nombre de produit plus en stock
    let outOfStock = 0;

    // Si le nombre de produit est supérieur à 0
    if (products.length > 0) {
        products.forEach(product => {
            // Si il y a des produit qui ont 0 stock
            // On additione outOfStock de +1 pour chaque produit
            // De base il est à 0 et si il y a pas de stock pour un produit on ajoute +1
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
           }
        })
    }

    //Afficher l'argent total des commandes pour afficher tableau de bord
    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice
        })
    }

    useEffect(() => {
        dispatch(getAdminProducts) // On récupére les data des produits pour afficher plus bas 
        dispatch(getUsers);
        dispatch(adminOrdersAction);
    },[dispatch])

    return (
    <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

        <div className="col-12 col-md-10">
                <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                <div className="text-center card-font-size">Gain Total<br /> <b>{totalAmount}€</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>

                <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                <div className="text-center card-font-size">Produits<br /> <b>{ products.length }</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">Voir details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Commandes<br /> <b>{adminOrders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">Voir details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Utilisateurs<br /> <b>{users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Voir details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                <div className="text-center card-font-size">Plus en Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                </div>
            </div>
    </div>
    )
}