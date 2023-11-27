import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError } from "../../slices/productsSlice";
import Sidebar from "./Sidebar";
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";
import { clearProductDeleted } from "../../slices/productSlice";

export default function ProductList() {
    
    const { products = [], loading = true, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error:productError } = useSelector(state => state.productState);

    const dispatch = useDispatch();

    // Data pour la table
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "#ID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Nom",
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: "Prix",
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: "Stock",
                    field: 'stock',
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
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price}€`,
                stock: product.stock,
                actions: (
                    <>
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id )} className='btn btn-danger py-1 px-2 ml-2'>
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
        dispatch(deleteProduct(id)) // On utilise l'action en passant comme paramètre l'id du produit
    } 

    useEffect(() => {
        if (error || productError) {
              toast(error || productError, {
                position: toast.POSITION.TOP_CENTER,
                type: 'error',
                onOpen:() => { dispatch(clearError())} //Clear le state de l'erreur quand le message a été envoyer
            })
            return
        }

        //Pour supprimer : Alerte une fois un produit supprimer
         if (isProductDeleted) {
            toast('Produit supprimé avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        //On récupére les produits
        dispatch(getAdminProducts)

    },[dispatch, error, isProductDeleted, productError])

    return (
    <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

        <div className="col-12 col-md-10">
                <>
                    {loading ? <Loader/> : 
                        
                        <MDBDataTable
                            data={setProducts()}
                            searchLabel='Rechercher'
                            paginationLabel={['Précédent', 'Suivant']}
                            bordered
                             theadTextWhite={true} // Mettre les titre en blanc
                             noBottomColumns={true} // Pour enlever la column qui se répete
                            tbodyTextWhite={true}   
                            striped
                            className="px-3"
                            paging={false}
                        />
                    }
                </>
            </div>
    </div>
    )
}