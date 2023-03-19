import React from "react";
import CardCharacter from "./CardCharacter";

const Roulette = (props) => {

    return (
        <div className="roulette d-flex inline">
            {people?.results.length
            ? people.results.map((element)=>{
                return <CardCharacter url={element.url} key={element.uid} />
            }) 
            : null}
        </div>
    )

}

export default Roulette;