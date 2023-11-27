import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

export default function Sidebar() {

    const navigate = useNavigate();

    return (
         <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                        <li>
                            <Link to='/admin'><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                        </li>
                
                        <li>
                             <NavDropdown title={<i className='fa fa-product-hunt'> Produits</i>}>
                            
                                <NavDropdown.Item onClick={() => navigate('/admin/products')} > <i className='fa fa-shopping-basket'> Voir les produits</i></NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/products/create')} > <i className='fa fa-plus'> Crée un produit</i></NavDropdown.Item>
                                
                            </NavDropdown>
                        </li>

                        <li>
                            <Link to='/admin/orders'><i className="fa fa-shopping-basket"></i> Voir les commandes</Link>
                        </li>

                        <li>
                            <Link to='/admin/users'><i className="fa fa-users"></i> Voir les utilisateurs</Link>
                        </li>

                        <li>
                            <Link to='/admin/reviews'><i className="fa fa-users"></i> Voir les avis</Link>
                        </li>
                    </ul>
                </nav>
         </div>
    )
}