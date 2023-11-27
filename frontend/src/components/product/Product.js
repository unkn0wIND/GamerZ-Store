import React from 'react'
import { Link } from 'react-router-dom'

//col pour modifier dynamiquement le style(la taille)
const Product = ({product, col}) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                          <div className="">
                              <img
                                className="card-img-top mx-auto"
                                src={product.images[0].image}
                                alt={product.name}
                                                
                              />
                              <div className="card-body d-flex flex-column">
                                  <h5 className="card-title">
                                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                                  </h5>
                                  <div className="ratings mt-auto">
                                      <div className="rating-outer">
                                          {/* Pour afficher en pourcentage le rating du produit */}
                                          <div className="rating-inner" style={{width: `${product.ratings / 5 * 100}%`}}></div>
                                      </div>
                                      <span id="no_of_reviews">({product.numOfReviews} Notes)</span>
                                  </div>
                                  <p className="card-text text-white">Prix : {product.price} €</p>
                                  <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">Voir le produit</Link>
                              </div>
                          </div>
                    </div>
  )
}

export default Product