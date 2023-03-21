import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../store/Context";

const CardCharacter = ({url, uid}) => {

    const {store, actions} = useAppContext();

    const [cardInfo, setCardInfo] = useState();
    console.log(actions.getGroupDetails(url));
    const groupForPicture = actions.getGroupDetails(url) === "people"? "characters" : actions.getGroupDetails(url);
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/${groupForPicture}/${uid}.jpg`);
    
    
    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(({result: {properties}}) => {
            setCardInfo(properties);
        })
    },[]);

    const handlerLocalToTogleFavourites = ()=>{
        actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo.name) ?
            actions.handleDeleteFromFavourites(cardInfo.name)
            : actions.handleAddToFavourites(cardInfo.name, "people", uid, url) ;
    };

    let cardButtonClass = actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo?.name) ? " btn-warning " : "" ;
    let cardButtonIcon = actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo?.name) ? "❤" : "♡";

    return (
        <>
        {cardInfo
        ?   <div className="card mx-2">
                <div className="card-imageWrapper">
                    <img className="img-fluid card-image" src={urlForImage} alt="" />
                </div>
                <div className="">
                    <h1>{cardInfo.name}</h1>
                    <p>Gender: {cardInfo.gender}</p>
                    <p>Hair Color: {cardInfo.hair_color}</p>
                    <p>Eye-Color: {cardInfo.eye_color}</p>
                    
                </div>
                <div className="row">
                    <div className="d-flex d-inline-flex justify-content-around p-2">
                        <Link to={"/details"+"/"+actions.getPathDetails(cardInfo.url)} className="btn btn-lg btn-outline-primary">Learn more!</Link>
                        <button onClick={handlerLocalToTogleFavourites} className={"btn btn-outline-warning card-button"+cardButtonClass}>{cardButtonIcon}</button>
                    </div>
                </div>
            </div>
        : null}
        </> 
    );
};

CardCharacter.propTypes = {
    url: PropTypes.string
}

export default CardCharacter;