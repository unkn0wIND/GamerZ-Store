
export default function CheckoutStep({shipping, confirmOrder, payment}) {
    return (
    <div className="container">
      <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? 
                <>
                    <div className="triangle2-active hidden sm:inline-block"></div>
                    <div className="step active-step hidden sm:inline-block">Information Livraison</div>
                    <div className="triangle-active hidden sm:inline-block"></div>
                </> :
                 <>
                    <div className="triangle2-incomplete hidden sm:inline-block"></div>
                    <div className="step incomplete hidden sm:inline-block">Information Livraison</div>
                    <div className="triangle-incomplete hidden sm:inline-block"></div>
                </>
        }


        {confirmOrder ? 
                <>
                    <div className="triangle2-active hidden sm:inline-block"></div>
                    <div className="step active-step hidden sm:inline-block">Confirmer la commande</div>
                    <div className="triangle-active hidden sm:inline-block"></div>
                </> :
                 <>
                    <div className="triangle2-incomplete hidden sm:inline-block"></div>
                    <div className="step incomplete hidden sm:inline-block">Confirmer la commande</div>
                    <div className="triangle-incomplete hidden sm:inline-block"></div>
                </>
        }

        
        {payment ? 
                <>
                    <div className="triangle2-active hidden sm:inline-block"></div>
                    <div className="step active-step hidden sm:inline-block">Paiement</div>
                    <div className="triangle-active hidden sm:inline-block"></div>
                </> :
                 <>
                    <div className="triangle2-incomplete hidden sm:inline-block"></div>
                    <div className="step incomplete hidden sm:inline-block">Paiement</div>
                    <div className="triangle-incomplete hidden sm:inline-block"></div>
                </>
        }

        </div>
    </div>
    )
}