import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../modules/Home.jsx";
import PlanetDetails from "../modules/PlanetDetails.jsx";

export const Router = createBrowserRouter([
    {
        path: '/'  ,
        element: <Home />
    },
    {
        path: '/planetdetails'  ,
        element: <PlanetDetails />
    } //,
    // {
    //     path: '/'   ,
    //     element: <VehiculeDetails />
    // },
    // {
    //     path: '/'  ,
    //     element: <CharacterDetails />
    // }
]);