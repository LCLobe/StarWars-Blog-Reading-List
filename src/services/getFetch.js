const getFetch = (url, useStateSeter) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            useStateSeter(data);
            })
        .catch(err => console.error(err))
    return
}

export const getResultProperties = (url, useStateSeter) => {
    fetch(url)
        .then(res => res.json())
        .then(({result: {properties}}) => {
            useStateSeter(properties);
        })
        .catch(err => console.error(err))
    return
}

export const getCharacters = (useStateSeter)=>{
    
    return getFetch("https://www.swapi.tech/api/people/",useStateSeter);
   
}

export const getPlanets = (useStateSeter)=>{
    
    return getFetch("https://www.swapi.tech/api/planets/",useStateSeter);
   
}

export const getVehicles = (useStateSeter)=>{
    
    return getFetch("https://www.swapi.tech/api/vehicles/",useStateSeter);
   
}