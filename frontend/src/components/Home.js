import React, { Fragment, useEffect } from 'react'
import { getProducts } from '../actions/productActions'
import MetaData from './layouts/MetaData'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './layouts/Loader'
import Product from './product/Product'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useState } from 'react'
import Hero from './Hero'

const Home = () => {

    //Dispatch qu'on passe comme argument dans actions/productsActions.js
    const dispatch = useDispatch();

    //Destructuring, on récupere products & loading du state qu'on voit via ReduxToolKit
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)

        //Pagination
    const [currentPage, setCurrentPage] = useState(1);

    //Numéro du currentPage
    const setCurrentPageNumber = (pageNum) => {
        setCurrentPage(pageNum)

    }

    //Afficher les produits, les lister sur la page
    useEffect(() => {
        //En cas d'erreur
        if (error) {
        return toast.error('Impossible de récupérer les produits !')
        }
        

        // Null = Pas de keyword dans le HomePage
        // Null = Pas de price 
        // Null = Pas de catégorie
        // Null = Pas d'avis
        dispatch(getProducts(null, null, null, null,currentPage)) 
    }, [error, dispatch, currentPage])
    



    return (
        <Fragment>
        <Hero/>
        {loading ? <Loader/> : 
            <Fragment>
                <MetaData title={'Bienvenue'}/>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product col={3} key={product._id} product={product} />
                        ))
                        }
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

export default Home