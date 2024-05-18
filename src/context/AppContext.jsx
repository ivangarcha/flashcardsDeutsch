import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
    const initialFiltersState = {
        verbos: true,
        sustantivos: true,
        conectores: true,
        expresiones: true,
        palabras: true
    };
    const [filters, setFilters] = useState(initialFiltersState);
    return (
        <AppContext.Provider value={{ filters, setFilters}}>
            {children}
        </AppContext.Provider>
    );
}

AppContextProvider.propTypes = {
    children: PropTypes.any.isRequired
};