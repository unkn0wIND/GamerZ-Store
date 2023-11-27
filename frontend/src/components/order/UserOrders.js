import MetaData from '../layouts/MetaData'
import { MDBDataTable } from 'mdbreact'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { userOrders as userOrdersAction } from '../../actions/orderActions'
import {Link} from 'react-router-dom'

export default function UserOrders() {

    const { userOrders = [] } = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction)
    },[])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "#ID",
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: "Nombre de produit(s)",
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: "Prix",
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: "Statut",
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: 'asc'
                },

            ],
            rows: [

            ]
        }

        userOrders.forEach(userOrder => {
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `${userOrder.totalPrice}€`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Livré') ? 
                    (<p style={{ color: 'green' }}>{userOrder.orderStatus}</p>) :
                    (<p style={{ color: 'red' }}>{userOrder.orderStatus}</p>),
                actions: <Link to={`/order/${userOrder._id}`} className='btn btn-primary'>
                    <i className="fa fa-eye"></i>
                </Link>

            })
        })

        return data;
    }

    return (
        <>
            <MetaData title={'Mes commandes'} />
        <div className='container container-fluid'>
            <h1 className="mt-5 text-white text-center mb-5" >Mes commandes</h1>
            <MDBDataTable
                searching={false}
                paginationLabel={['Précédent', 'Suivant']}
                className='px-3'
                bordered
                theadTextWhite={true} // Mettre les titre en blanc
                noBottomColumns={true} // Pour enlever la column qui se répete
                tbodyTextWhite={true}    
                striped
                paging={false}
                data={setOrders()}
                />
        </div>
        </>
    )
}