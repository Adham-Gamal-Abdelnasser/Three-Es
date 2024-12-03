import axios from "axios";
import { createContext } from "react";

export let categoryContext = createContext()

export function CategoryContextProvider(props) {

    function getCategories(){
        return axios.get(`${process.env.REACT_APP_BASE_URL}category`)
        .then(response=>response)
        .catch(error=>error)
    }

    return <categoryContext.Provider value={{getCategories}}>
        {props.children}
    </categoryContext.Provider>
}