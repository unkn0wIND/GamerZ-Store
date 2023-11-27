export default function OrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

                <h2 className="text-white text-3xl">Votre commande a bien été passée.</h2>

                <a className="text-white" href="/orders">Cliquez-ici pour voir vos commandes</a>
            </div>

        </div>
    )
}