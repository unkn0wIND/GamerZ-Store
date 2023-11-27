import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Search() {

    const navigate = useNavigate();
    const location = useLocation(); // Avoir l'url
    const [keyword, setKeyword] = useState('')

    //Fonction la recherche en formulaire
    const searchHandler = (e) => {
        e.preventDefault() // Pour pas que le navigateur se recharge

        navigate(`/search/${keyword}`) // La valeur du state en keyword
    }

    //Fonction pour clear la barre de recherche
    const clearKeyword = () => {
        setKeyword('');
    }

    // Clear l'input
    useEffect(() => {
        // Si l'url est / alors on clear
        if (location.pathname === '/') {
            clearKeyword();
        } 
            
    },[location]) // En dépendance car la location change

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Entrer le nom d'un jeu..."
                    value={keyword}
                            onChange={(e) => setKeyword(e.target.value) }
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>

    )
}