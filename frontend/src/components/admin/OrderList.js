import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { deleteOrders, adminOrdersAction } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Sidebar from "./Sidebar";
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";


export default function OrderList() {
    
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);

    const dispatch = useDispatch();

    // Data pour la table
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "#ID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Nombre de produit(s)",
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: "Prix",
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: 'asc'
                },

            ],
            rows: []
        }

        // Pour afficher les produits dans les rows
        // Pour chaque produit on push dans les rows
        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                price: `${order.totalPrice}€`,
                status: <p style={{ color: order.orderStatus.includes('Traitement') ? 'red' : 'green' }}>{order.orderStatus}</p>,
                actions: (
                    <>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id )} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            })
        })

        return data;
    }

    //Handler pour supprimer
    const deleteHandler = (e, id) => {
        e.target.disabled = true; // Qu'on puisse pas cliquer plusieurs fois sur le boutton
        dispatch(deleteOrders(id)) // On utilise l'action en passant comme paramètre l'id du produit
    } 

    useEffect(() => {
        if (error) {
              toast(error, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }

        //Pour supprimer : Alerte une fois un produit supprimer
         if (isOrderDeleted) {
            toast('Commande supprimé avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        //On récupére les commandes
        dispatch(adminOrdersAction)

    },[dispatch, error, isOrderDeleted])

    return (
    <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

        <div className="col-12 col-md-10">
                <>
                    {loading ? <Loader/> : 
                        
                        <MDBDataTable
                            data={setOrders()}
                            searchLabel='Rechercher'
                            paginationLabel={['Précédent', 'Suivant']}
                            bordered
                            striped
                            theadTextWhite={true} // Mettre les titre en blanc
                            noBottomColumns={true} // Pour enlever la column qui se répete
                            tbodyTextWhite={true}   
                            className="px-3"
                            paging={false}
                        />
                    }
                </>
            </div>
    </div>
    )
}