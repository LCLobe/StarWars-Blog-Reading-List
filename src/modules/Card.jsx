import React from "react";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAppContext from "../store/Context";

const Card = ({url, uid, propOneLabel, propOneContent, propTwoLabel, propTwoContent, propThreeLabel, propThreeContent}) => {

    const {store, actions} = useAppContext();

    const [cardInfo, setCardInfo] = useState();
    const groupForPicture = actions.getGroupDetails(url) === "people"? "characters" : actions.getGroupDetails(url);
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/${groupForPicture}/${uid}.jpg`);
    
    
    useEffect(()=>{

        //if (uid==1 && actions.getGroupDetails(url) === "planets") setUrlForImage("https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png"); 
        if (uid==1 && actions.getGroupDetails(url) === "planets") setUrlForImage("https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png");

        fetch(url)
        .then(res => res.json())
        .then(({result: {properties}}) => {
            setCardInfo(properties);
        })
    },[]);

    const handlerLocalToTogleFavourites = ()=>{
        actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo.name) ?
            actions.handleDeleteFromFavourites(cardInfo.name)
            : actions.handleAddToFavourites(cardInfo.name, actions.getGroupDetails(url), uid, url) ;
    };

    let cardButtonClass = actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo?.name) ? " btn-warning " : "" ;
    let cardButtonIcon = actions.arrayContainsObjectWithGivenNameProperty(store.favourites, cardInfo?.name) ? "❤" : "♡";

    return (
        <>
        {cardInfo
        ?   <div className="card mx-2">
                <div className="card-imageWrapper">
                    <img className="img-fluid rounded-top rounded-5 card-image " src={urlForImage} alt="" />
                </div>
                <div className="p-2">
                    <h1 className="text-nowrap text-center">{cardInfo.name}</h1>
                    <p className="text-nowrap"><strong>{propOneLabel}:</strong> {cardInfo[propOneContent]}</p>
                    <p className="text-nowrap"><strong>{propTwoLabel}:</strong> {cardInfo[propTwoContent]}</p>
                    <p className="text-nowrap"><strong>{propThreeLabel}:</strong> {cardInfo[propThreeContent]}</p>
                    
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

Card.propTypes = {
    url: PropTypes.string,
    uid: PropTypes.string,
    propOneLabel: PropTypes.string,
    propOneContent: PropTypes.string,
    propTwoLabel: PropTypes.string,
    propTwoContent: PropTypes.string,
    propThreeLabel: PropTypes.string,
    propThreeContent: PropTypes.string,
}

export default Card;