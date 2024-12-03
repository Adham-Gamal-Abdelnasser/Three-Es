import axios from "axios";
import { createContext } from "react";


export let productDetails = createContext()
export function DetailsContextProvider(props) {
    // todo get product details
    function getDetails(id) {
        axios.get(`${process.env.REACT_APP_BASE_URL}category/${id}`).then(response=>response)
        .catch(error=>error)
    }
    return <productDetails.Provider value={{getDetails}}>
    {props.children}
</productDetails.Provider>
}