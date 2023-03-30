import React, { createContext, useContext} from "react";
import { useEffect, useState } from "react";

import {arrayContainsObjectWithGivenNameProperty, getGroupDetails, getPathDetails, getArrayOfSinglePropertyArrays} from "../utils/functions.js"
import { getResultProperties, getCharacters, getPlanets, getVehicles } from "../services/getFetch.js";
import { detailsProperties } from "./SelectedPropertiesForDetails.js"

const Context = createContext();

export const ContextProvider = ({children}) => {

    //Hooks
    const [people, setPeople] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [favourites, setFavourites] = useState([]);

    //LocalStorage

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
    const checkStorage =(stringOfStorage, seter, geter)=>{
        if (localStorage.getItem(stringOfStorage) != null) {
            const myTempPeople = JSON.parse(localStorage.getItem(stringOfStorage));
            seter(myTempPeople);
        }else {
            if (typeof(geter) != "function") return;
            geter(seter);
        }
    }

    //Fetch
    useEffect(( ) => {
        
        try{
            checkStorage('storagePeople',setPeople,getCharacters);
        }catch (err) {
            console.log('Error: ', err.message);
        }
        try{
            checkStorage('storagePlanets',setPlanets,getPlanets);
        }catch (err) {
            console.log('Error: ', err.message);
        }
        try{
            checkStorage('storageVehicles',setVehicles,getVehicles);
        }catch (err) {
            console.log('Error: ', err.message);
        }
        try{
            checkStorage('storageFavourites',setFavourites,null);
        }catch (err) {
            console.log('Error: ', err.message);
        }

    }, []);

    useEffect(()=>{
        if (people.length) localStorage.setItem('storagePeople', JSON.stringify(people));
    },[people]);
    useEffect(()=>{
       if(vehicles.length) localStorage.setItem('storageVehicles', JSON.stringify(vehicles));
    },[vehicles]);
    useEffect(()=>{
       if(planets.length) localStorage.setItem('storagePlanets', JSON.stringify(planets));
    },[planets]);
    useEffect(()=>{
       if (favourites.length) localStorage.setItem('storageFavourites', JSON.stringify(favourites));
    },[favourites]);

    //Flux Context Info
    const store ={
        people, 
        vehicles,
        planets,
        favourites,
        detailsProperties
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

