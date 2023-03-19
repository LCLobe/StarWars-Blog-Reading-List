import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// const openDetails = () => {
//     const navigate = useNavigate()
//     alert("hola");  
//     //navigate("/details");
//     <Link to="/details"><Details info={cardInfo}/></Link>;
// };


const getPathDetails = (URLstring) => {
    const splitArray = URLstring.split("/");
    const lastTwoElements = splitArray[splitArray.length-2]+"/"+splitArray[splitArray.length-1];
    return lastTwoElements;
};

const CardVehicle = ({url, uid}) => {

    const [cardInfo, setCardInfo] = useState();
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`);
    useEffect(()=>{
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
                    <p>Vehicle Class: {cardInfo.vehicle_class}</p>
                    <p>Max Speed: {cardInfo.max_atmosphering_speed}</p>
                    <p>Price: {cardInfo.cost_in_credits}</p>
                    
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

CardVehicle.propTypes = {
    url: PropTypes.string
}

export default CardVehicle;

