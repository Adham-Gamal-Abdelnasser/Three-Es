
const { createContext } = require("react");
export let unitContext = createContext()
let activeClientId = localStorage.getItem("activeClientId")

export function unitContextProvider(props) {
    

    function getLoggedUserUnits() {
        activeClientId = localStorage.getItem("activeClientId")
        return axios.get(`${process.env.REACT_APP_BASE_URL}unit`,).then(response=>{
            console.log("ana response el context",response);
            return response
        })
        .catch(error=>error)
    }
    return <unitContext.Provider value={{getLoggedUserUnits}}>
    </unitContext.Provider>
}