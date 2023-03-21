import React, { createContext, useContext} from "react";
import { useEffect, useState } from "react";

import {arrayContainsObjectWithGivenNameProperty, getGroupDetails, getPathDetails, getArrayOfSinglePropertyArrays} from "../utils/functions.js"
import { getResultProperties, getCharacters, getPlanets, getVehicles } from "../services/getFetch.js";

const Context = createContext();

export const ContextProvider = ({children}) => {

    //Hooks
    const [people, setPeople] = useState();
    const [vehicles, setVehicles] = useState();
    const [planets, setPlanets] = useState();
    const [favourites, setFavourites] = useState([]);

    //Functions
    const handleAddToFavourites = (name, group, number, url) => {
        const myNewElement = {name, group, number, url};
        setFavourites((favourites)=>{
            return [...favourites, myNewElement]
        })
    }
    const handleDeleteFromFavourites = (nameOfElementToDelete) => {
        
        setFavourites(previous=>previous.filter((element)=>{
            return (nameOfElementToDelete !== element.name);
        }));
    }

    //Fetch
    useEffect(() => {
        
        getCharacters(setPeople);
        getPlanets(setPlanets);
        getVehicles(setVehicles);

    }, []);

    //Flux Context Info
    const store ={
        people, 
        vehicles,
        planets,
        favourites
    };
    const actions ={
        handleAddToFavourites,
        handleDeleteFromFavourites,
        getPathDetails,
        getGroupDetails,
        arrayContainsObjectWithGivenNameProperty,
        getArrayOfSinglePropertyArrays,
        getResultProperties
    };

    return (
        <Context.Provider value={{store, actions}}>
            {children}
        </Context.Provider>
        );
};

const useAppContext = ()=>useContext(Context);
export default useAppContext;

