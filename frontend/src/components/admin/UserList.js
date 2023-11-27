import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Sidebar from "./Sidebar";
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";


export default function UserList() {
    
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);

    const dispatch = useDispatch();

    // Data pour la table
    const setUsers = () => {
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
                    label: "Email",
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: "Role",
                    field: 'role',
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


        // users => on le récupére dans le userState plus haut
        // Puis forEach pour afficher chaque utilisateur
        // Pour chaque utilisateur on push dans les rows
        // Pour afficher les utilisateur dans les rows
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: (
                    <>
                        <Link to={`/admin/user/${user._id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id )} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            })
        })

        return data;
    }

    //Handler pour supprimer un utilisateur
    const deleteHandler = (e, id) => {
        e.target.disabled = true; // Qu'on puisse pas cliquer plusieurs fois sur le boutton
        dispatch(deleteUser(id)) // On utilise l'action en passant comme paramètre l'id du produit
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

        //Pour supprimer : Alerte une fois que l'utilisateur est supprimé
         if (isUserDeleted) {
            toast('Utilisateur supprimé avec succès !', {
                type: 'success',
                position: toast.POSITION.TOP_CENTER,
                onOpen: () => dispatch(clearUserDeleted()) // On clear le isUserDeleted
            })
            return;
        }

        //On récupére les data des utilisateurs
        dispatch(getUsers)

    },[dispatch, error, isUserDeleted])

    return (
    <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

        <div className="col-12 col-md-10">
                <>
                    {loading ? <Loader/> : 
                        
                        <MDBDataTable
                            data={setUsers()}
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