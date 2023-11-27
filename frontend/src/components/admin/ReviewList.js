import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";


export default function ReviewList() {
    
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState);
    const [productId, setProductId] = useState('');

    const dispatch = useDispatch();

    // Data pour la table
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: "Note",
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: "Utilisateur",
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: "Avis",
                    field: 'comment',
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


        // reviews => on le récupére dans le productState plus haut
        // Puis forEach pour afficher chaque review
        // Pour chaque review on push dans les rows
        // Pour afficher les review dans les rows
        reviews.forEach(review => {
            data.rows.push({
                rating: review.rating,
                user: review.user.name,
                comment: review.comment,
                actions: (
                    <>
                        <Button onClick={e => deleteHandler(e, review._id )} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            })
        })

        return data;
    }

    //Handler pour supprimer un avis
    const deleteHandler = (e, id) => {
        e.target.disabled = true; // Qu'on puisse pas cliquer plusieurs fois sur le boutton
        dispatch(deleteReview(productId, id)) // On utilise l'action en passant comme paramètre l'id de l'avis
    } 

    //SubmitHandler pour récupérer un avis via l'id du produit
    const submitHandler = (e) => {
        e.preventDefault();

        // On récupére les data des avis avec l'id du produit
        // Pour la recherche
        dispatch(getReviews(productId)) // productId qu'on récupere dans l'input

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

        //Pour supprimer : Alerte une fois que l'avis supprimé
         if (isReviewDeleted) {
            toast('Avis supprimé avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearReviewDeleted()) // On clear le isReviewDeleted
            })
             dispatch(getReviews(productId))
            return;
        }


    },[dispatch, error, isReviewDeleted])

    return (
    <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

        <div className="col-12 col-md-10">
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label className="text-white">ID PRODUIT</label>
                                <input className="form-control" type="text" value={productId} onChange={e => setProductId(e.target.value)} />
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
                                Rechercher
                            </button>
                        </form>
                    </div>
                </div>
                <>
                    {loading ? <Loader/> : 
                        
                        <MDBDataTable
                            data={setReviews()}
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