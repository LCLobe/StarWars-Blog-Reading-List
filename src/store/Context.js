import React, { createContext, useContext} from "react";
import { useEffect, useState } from "react";

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
        fetch("https://www.swapi.tech/api/people/")
        .then(res => res.json())
        .then(data => {
            setPeople(data);
            //console.log(data.results);
            })
        .catch(err => console.error(err))

        fetch("https://www.swapi.tech/api/vehicles/")
        .then(res => res.json())
        .then(data => {
            setVehicles(data);
            //console.log(data.results);
            })
        .catch(err => console.error(err))

        fetch("https://www.swapi.tech/api/planets/")
        .then(res => res.json())
        .then(data => {
            setPlanets(data)
            //console.log(data.results);
            })
        .catch(err => console.error(err))

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
        handleDeleteFromFavourites
    };

    return (
        <Context.Provider value={{store, actions}}>
            {children}
        </Context.Provider>
        );
};

const useAppContext = ()=>useContext(Context);
export default useAppContext;

