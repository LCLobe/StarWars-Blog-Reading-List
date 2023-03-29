import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import useAppContext from "../store/Context";
import { object } from "prop-types";

const Details = ()=> { 
    const params =useParams();
    const {actions} =useAppContext();
    
    //Create URLs
    const [itemInfo, setItemInfo] = useState ();
    const [urlForFetch, setUrlForFetch] = useState ("https://www.swapi.tech/api/"+params.group+"/"+params.id);
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/${params.group!=="people"?params.group:"characters"}/${params.id}.jpg`);
    const [arrayOfProperties, setArrayOfProperties] = useState ([]);

    if (params.group=="planets" && params.id ==1) setUrlForImage("https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png");

    //Fetch with params
    
    useEffect(()=>{
        try{

            if (localStorage.getItem(urlForFetch) != null) {
                const myCardStorage = JSON.parse(localStorage.getItem(urlForFetch));
                //console.log("Distinto de undefined: ", myCardStorage);
                
                setItemInfo(myCardStorage);
                setArrayOfProperties(Object.entries(myCardStorage));
                //console.log("iteminfo: ", itemInfo);
    
            }else {
                console.log("estoy en el else");
                useEffect(()=>{
                    fetch(urlForFetch)
                    .then(res => res.json())
                    .then(({result}) => {
                        setItemInfo(result);
                        setArrayOfProperties(Object.entries(result));
                    //     return actions.getArrayOfSinglePropertyArrays(result.properties)
                        })  
                    // .then(result => setArrayOfProperties(result))
                    .catch(err => console.error(err))    
                },[]);
            }
        }catch (err) {
            console.log('Error: ', err.message);
        }
    },[]);
    
    return (
        <div className="container p-4">
            <div className="row mt-5">
                <div className="col">
                    <div className="details-image p-1">
                        <img src={urlForImage} alt="Photo" />
                    </div>
                </div>
                <div className="col">
                    <h1 className="details-title">{itemInfo? itemInfo.name : ""}</h1>
                    <p className="details-paragraph">{itemInfo? itemInfo.description : ""}</p>
                </div>
            </div>
            <hr></hr>
            <div className="row d-flex d-inline">
               {arrayOfProperties.length ? 
                arrayOfProperties.map((element)=>{            
                    return (
                        <div className="d-block col p-3 m-1 bg-light" key={element[0]}>
                            <h3 >{element[0]}</h3>
                            <p >{element[1]}</p>
                        </div>
                    )
                })
                :  "loading..." } 
            </div>
            
        </div>
    )

}

export default Details;