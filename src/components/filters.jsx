import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react";

const Filters = () => {
    const { filters, setFilters } = useContext(AppContext);

    const handleCheckboxChange = (filterName) => {
        const updatedFilters = { ...filters };
        updatedFilters[filterName] = !updatedFilters[filterName];
        setFilters(updatedFilters);
    };
    return (
        <div className="filters">
            <label htmlFor="verbos">
                <input type="checkbox" name="tipos" id="verbos" defaultChecked={filters.verbos} onChange={() => handleCheckboxChange("verbos")} />
                Verb.
            </label>
            <label htmlFor="sustantivos">
                <input type="checkbox" name="tipos" id="sustantivos" defaultChecked={filters.sustantivos} onChange={() => handleCheckboxChange("sustantivos")} />
                Sus.
            </label>
            <label htmlFor="conectores">
                <input type="checkbox" name="tipos" id="conectores" defaultChecked={filters.conectores} onChange={() => handleCheckboxChange("conectores")} />
                Conec.
            </label>
            <label htmlFor="expresiones">
                <input type="checkbox" name="tipos" id="expresiones" defaultChecked={filters.expresiones} onChange={() => handleCheckboxChange("expresiones")} />
                Exp.
            </label>
            <label htmlFor="palabras">
                <input type="checkbox" name="tipos" id="palabras" defaultChecked={filters.palabras} onChange={() => handleCheckboxChange("palabras")} />
                Pal.
            </label>
        </div>)
}

export default Filters