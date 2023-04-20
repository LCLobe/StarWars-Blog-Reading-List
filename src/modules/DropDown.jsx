import React from "react";

import useAppContext  from "../store/Context.js";
import { Link } from "react-router-dom";

const DropDown = () => {

    const {store, actions} = useAppContext();
    
    return (
        <div className="btn-group dropdown dropstart">
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
                            <div className="row d-flex p-2">
                                <div className="col-8">
                                    <Link to={"/details/"+group+"/"+number}>{name}   </Link>
                                </div>
                                <div className="col-2" onClick={handlerLocalRemoveFromFavourites}>
                                    <i className="fa-solid fa-trash icon text-center align-middle" ></i>
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