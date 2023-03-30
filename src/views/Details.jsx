import React from "react";
import { useParams } from "react-router";
import { useState, useEffect, useMemo } from "react";

import useAppContext from "../store/Context";
import { object } from "prop-types";

const Details = ()=> { 
    //React
    const params =useParams();
    const {store, actions} =useAppContext();
    
    //Function:
    const {selectedProperties, titlesForProperties} = store.detailsProperties;

    //Create URLs
    const [itemInfo, setItemInfo] = useState ();
    
    const urlForFetch = useMemo(()=>{
        return "https://www.swapi.tech/api/"+params.group+"/"+params.id;
    }, []);
    const urlForImage = useMemo(()=>{
        return `https://starwars-visualguide.com/assets/img/${params.group!=="people"?params.group:"characters"}/${params.id}.jpg`;
    },[])
   
    const [arrayOfProperties, setArrayOfProperties] = useState ([]);

    if (params.group=="planets" && params.id ==1) setUrlForImage("https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png");

    //Fetch with params
    useEffect(()=>{
        try{

            if (localStorage.getItem(urlForFetch) != null) {
                const myCardStorage = JSON.parse(localStorage.getItem(urlForFetch));
                
                setItemInfo(myCardStorage);
                setArrayOfProperties(Object.entries(myCardStorage));
                console.log("iteminfo: ", itemInfo);
    
            }else {
                console.log("estoy en el else");
                useEffect(()=>{
                    fetch(urlForFetch)
                    .then(res => res.json())
                    .then(({result}) => {
                        console.log("result: ", result);
                        setItemInfo(result);
                        setArrayOfProperties(Object.entries(result));
                        })  
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
                    <p className="details-paragraph">{itemInfo? itemInfo.description : null}</p>
                </div>
            </div>
            <hr></hr>
            <div className="row d-flex d-inline">
               {arrayOfProperties.length ? 
                arrayOfProperties.map((element)=>{  
                    if (selectedProperties[params.group].includes(element[0])) {
                        return (
                            <div className="d-block col p-3 m-1 bg-light" key={element[0]}>
                                <div className="row">
                                <h3 className="text-start fs-3 lh-1">{titlesForProperties[params.group][element[0]]}</h3>
                                </div>
                                <div className="row d-flex justify-content-center">
                                <p className="text-center fs-4 fst-italic lh-1">{element[1]}</p>   
                                </div>
                                
                                
                            </div>
                        )
                    }
                })
                :  "loading..." } 
            </div>
            
        </div>
    )

}

export default Details;