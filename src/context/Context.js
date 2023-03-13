import React, { createContext } from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
    return (
        <Context.Provider value={null}>
            {children}
        </Context.Provider>
        );
};



export default ContextProvider;