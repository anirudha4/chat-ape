import React, { createContext, useState } from 'react'

export const HomeStoreContext = createContext();
export default function HomeStoreProvider({ children }) {
    const [state, setState] = useState(null);
    const values = {}
    return (
        <HomeStoreContext.Provider value={values}>
            { children }            
        </HomeStoreContext.Provider>
    )
}
