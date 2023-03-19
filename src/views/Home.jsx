import React from "react";
import { useState, useEffect } from "react";

import CardCharacter from "../modules/CardCharacter.jsx";
import CardPlanet from "../modules/CardPlanet.jsx";
import CardVehicle from "../modules/CardVehicle.jsx";
import useAppContext  from "../store/Context.js";

const Home = () =>  {

    const {store} = useAppContext();
    console.log(store);
    const {people, vehicles, planets} = store;
  
    return (
        <>
        <h1>Characters</h1>
        <div className="roulette d-flex inline">
            {people?.results.length
            ? people.results.map((element)=>{
                return <CardCharacter url={element.url} uid={element.uid} key={element.uid} />
            }) 
            : null}
        </div>
        <h1>Planets</h1>
        <div className="roulette d-flex inline">
            {planets?.results.length
            ? planets.results.map((element)=>{
                return <CardPlanet url={element.url} uid={element.uid} key={element.uid} />
            }) 
            : null}
        </div>
        <h1>Vehicles</h1>
        <div className="roulette d-flex inline">
            {vehicles?.results.length
            ? vehicles.results.map((element)=>{
                return <CardVehicle url={element.url} uid={element.uid} key={element.uid} />
            }) 
            : null}
        </div>
        </>
    );
};

export default Home; 