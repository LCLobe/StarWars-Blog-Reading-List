import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../modules/Layout.jsx";

import Home from "../views/Home.jsx";
import Details from "../views/Details.jsx";

export const Router = createBrowserRouter([
    {
        path: '/'  ,
        element: <Layout />,
        children: [
            {
                path: '/', 
                element: <Home />
            },
            {
                path: '/details'  ,
                element: <Details />,
                children: [
                    {
                        path: '/details',
                        element: <Details />
                    },
                    {
                        path: '/details/:group/:id',
                        element: <Details />
                    }
                ]
            } ,

    ]
    }
]);