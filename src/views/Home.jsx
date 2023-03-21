import React from "react";

import Card from "../modules/Card.jsx";
import CardCharacter from "../modules/CardCharacter.jsx";
import CardPlanet from "../modules/CardPlanet.jsx";
import CardVehicle from "../modules/CardVehicle.jsx";
import useAppContext  from "../store/Context.js";

const Home = () =>  {

    const {store} = useAppContext();
    
    const {people, vehicles, planets} = store;

    return (
        <>
        <h1 className="home-title mt-5">Characters</h1>
        <div className="roulette d-flex inline p-2">
            {people?.results.length
            ? people.results.map((element)=>{
                return <Card 
                            url={element.url} 
                            uid={element.uid} 
                            key={element.uid}
                            propOneLabel="Gender"
                            propOneContent="gender"
                            propTwoLabel="Hair Color"
                            propTwoContent="hair_color"
                            propThreeLabel="Eye-Color"
                            propThreeContent="eye_color"
                        />
            }) 
            : null}
        </div>
        <h1 className="home-title">Planets</h1>
        <div className="roulette d-flex inline p-2">
            {planets?.results.length
            ? planets.results.map((element)=>{
                return <Card
                            url={element.url}
                            uid={element.uid}
                            key={element.uid}
                            propOneLabel="Population"
                            propOneContent="population"
                            propTwoLabel="Terrain"
                            propTwoContent="terrain"
                            propThreeLabel="Gravity"
                            propThreeContent="gravity"
                        />
            }) 
            : null}
        </div>
        <h1 className="home-title">Vehicles</h1>
        <div className="roulette d-flex inline p-2">
            {vehicles?.results.length
            ? vehicles.results.map((element)=>{
                return <Card
                            url={element.url} 
                            uid={element.uid}
                            key={element.uid}
                            propOneLabel="Vehicle Class"
                            propOneContent="vehicle_class"
                            propTwoLabel="Max Speed"
                            propTwoContent="max_atmosphering_speed"
                            propThreeLabel="Price [credits]"
                            propThreeContent="cost_in_credits"
                        />
            }) 
            : null}
        </div>
        </>
    );
};

export default Home; 