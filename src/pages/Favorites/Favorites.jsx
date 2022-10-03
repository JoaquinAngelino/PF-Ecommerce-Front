import React, { useState } from "react";
import './Favorites.css';
import FavCard from "./FavCard";
import { Toaster } from "react-hot-toast";
import { cart, remove} from '../../components/Toast/Toast'
import NothingFound from "../../components/NothingFound/NothingFound";

export default function Favorites() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favList')))

    if (!favorites || favorites.length === 0) {
        return (
            <div className="containerHome">
                <NothingFound/>
            </div>
        );
    }

    const deleteFav = (id) => {
        let arr = favorites.filter(e => e.id !== id)
        localStorage.setItem('favList', JSON.stringify(arr))
        setFavorites(arr)       
    }

    let cellsMap = favorites.map((e) => <FavCard
        key={e.id}
        id={e.id}
        line={e.line}
        brand={e.brand}
        model={e.model}
        price={e.price}
        stock={e.stock}
        capacity={e.capacity}
        image={e.image}
        memoryRAM={e.memoryRAM}
        deleteFav={deleteFav} />);
        
    return (
        <div className="containerHome">
            <h1>Favorites</h1>
            <div className="favoriteCards">
                { cellsMap }
            </div>
            <Toaster position="bottom-right" reverseOrder={false}/>            
        </div>
    );
}