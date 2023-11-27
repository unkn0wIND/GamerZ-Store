import React, { Fragment, useEffect } from 'react'
import { getProducts } from '../../actions/productActions'
import MetaData from '.././layouts/MetaData'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '.././layouts/Loader'
import Product from '.././product/Product'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

const ProductSearch = () => {

    //Dispatch qu'on passe comme argument dans actions/productActions.js
    const dispatch = useDispatch();

    //Destructuring, on récupere products & loading du state qu'on voit via ReduxToolKit
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)

    //State
    const [currentPage, setCurrentPage] = useState(1); // Pagination



    // Numéro du currentPage
    const setCurrentPageNumber = (pageNum) => {
        setCurrentPage(pageNum)

    }

    //Pour récupérer ce qui est afficher dans l'url (keyword)
    const { keyword } = useParams();

   
    //Afficher les produits par recherche
    useEffect(() => {
        //En cas d'erreur
        if (error) {
        return toast.error('Impossible de récupérer les produits !')
        }
        
        dispatch(getProducts(keyword, currentPage))
    }, [error, dispatch, currentPage, keyword])
    



    return (
    <Fragment>
        {loading ? <Loader/> : 
            <Fragment>
                <MetaData title={'Bienvenue'}/>
                <section id="products" className="mt-5">
                        <div className="">
                           
                                <div className="flex flex-col items-center justify-center mx-auto sm:flex-row sm:w-1/2">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
    
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ?
                    <div className='d-flex justify-content-center mt-5'>
                        <Pagination
                            activePage={currentPage}
                            onChange={setCurrentPageNumber}
                            totalItemsCount={productsCount}
                            itemsCountPerPage={resPerPage}
                            nextPageText={'Suivant'}
                            prevPageText={'Précédent'}
                            itemClass={'page-item'}
                            linkClass={'page-link'}
                        />
                        </div> : null
                    }
            </Fragment>
        }
    </Fragment>

  )
}

export default ProductSearch