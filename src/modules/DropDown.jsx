import React from "react";

import useAppContext  from "../store/Context.js";
import { Link } from "react-router-dom";

const DropDown = () => {

    const {store, actions} = useAppContext();
    
    return (
        <div className="btn-group">
            <button type="button" className="btn dropdown-toggle navbar-text" data-bs-toggle="dropdown" aria-expanded="false">
                Favourites 
                {store.favourites.length ? <span className="dropdown-number"> {store.favourites.length}</span> : null}
            </button>
            <ul className="dropdown-menu bg-secondary">
                 {store.favourites.map(({name, group, number, url}) => {
                    
                    const handlerLocalRemoveFromFavourites = ()=>{
                        // console.log("hola");
                        return actions.handleDeleteFromFavourites(name);
                    }
                    
                    return (
                        <li key={`${group}${number}`}>
                            <div className="row d-flex d-inline-flex justify-content-around p-2">
                                <div className="col">
                                    <Link to={"/details/"+group+"/"+number}>{name}   </Link>
                                </div>
                                <div className="col" onClick={handlerLocalRemoveFromFavourites}>
                                    <i className="fa-solid fa-trash icon text-center" ></i>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>    
    )
}

export default DropDown;