import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const getArrayOfSinglePropertyArrays = async (obj)=> {
    if (Object.keys(obj).length === 0) return; 
    const myArray = [];
    for (const key in obj) {
        const myArr =[key, obj[key]];
        myArray.push(myArr);
    }
    //console.log(myArray);
    return myArray;

}

const Details = ()=> { 
    const params =useParams();
    console.log(params);
    
    //Create URLs
    const [itemInfo, setItemInfo] = useState ();
    const [urlForFetch, setUrlForFetch] = useState ("https://www.swapi.tech/api/"+params.group+"/"+params.id);
    const [urlForImage, setUrlForImage] = useState (`https://starwars-visualguide.com/assets/img/${params.group!=="people"?params.group:"characters"}/${params.id}.jpg`);
    const [arrayOfProperties, setArrayOfProperties] = useState ([]);

    if (params.group=="planets" && params.id ==1) setUrlForImage("https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png");
    //console.log(urlForFetch);
    //console.log(urlForImage);

    //Fetch with params
    useEffect(()=>{
        fetch(urlForFetch)
        .then(res => res.json())
        .then(({result}) => {
            setItemInfo(result);
            return getArrayOfSinglePropertyArrays(result.properties)
            })  
        .then(result => setArrayOfProperties(result))
        .catch(err => console.error(err))    
    },[]);
    console.log("arrayofproperties:", arrayOfProperties);
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="details-image p-1">
                        <img src={urlForImage} alt="Photo" />
                    </div>
                </div>
                <div className="col">
                    <h1>{itemInfo? itemInfo.properties.name : ""}</h1>
                    <p>{itemInfo? itemInfo.description : ""}</p>
                </div>
            </div>
            <hr></hr>
            <div className="row d-flex d-inline">
               {arrayOfProperties.length ? 
                arrayOfProperties.map((element)=>{
                    
                    return (
                        <div className="d-block col p-3 m-1 bg-light">
                            <h3>{element[0]}</h3>
                            <p>{element[1]}</p>
                        </div>
                    )
                })
                :  "loading..." } 
            </div>
        </div>
    )

}

export default Details;