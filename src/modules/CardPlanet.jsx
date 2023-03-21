import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const getPathDetails = (URLstring) => {
    const splitArray = URLstring.split("/");
    const lastTwoElements = splitArray[splitArray.length-2]+"/"+splitArray[splitArray.length-1];
    return lastTwoElements;
};

const CardPlanet = ({url, uid}) => {

    const [cardInfo, setCardInfo] = useState();
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`);
    
    useEffect(()=>{

        if (uid==1) setUrlForImage("https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png");

        fetch(url)
        .then(res => res.json())
        .then(({result: {properties}}) => {
            setCardInfo(properties);
            console.log(properties);
        })
    },[]);

    return (
        <>
        {cardInfo
        ?   <div className="card mx-2">
                <div className="card-imageWrapper">
                    <img className="img-fluid card-image" src={urlForImage} alt="" />
                </div>
                <div className="">
                    <h1>{cardInfo.name}</h1>
                    <p>Population: {cardInfo.population}</p>
                    <p>Terrain: {cardInfo.terrain}</p>
                    <p>Gravity: {cardInfo.gravity}</p>
                    
                </div>
                <div className="row">
                    <div className="d-flex d-inline-flex justify-content-around p-2">
                        <Link to={"/details"+"/"+getPathDetails(cardInfo.url)} className="btn btn-lg btn-outline-primary">Learn more!</Link>
                        <button className="btn btn-outline-warning">❤</button>
                    </div>
                </div>
            </div>
        : null}
        </> 
    );
};

CardPlanet.propTypes = {
    url: PropTypes.string
}

export default CardPlanet;

