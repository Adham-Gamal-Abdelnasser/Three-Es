import axios from "axios";

const { createContext } = require("react");

export let RoomContext = createContext()
export function RoomContextProvider(props) {

        // todo : add new product to room
        function addProductToRoom(roomId,productId){
            return axios.post(`${process.env.REACT_APP_BASE_URL}room/${roomId}/product`,{
                productId,
                quantity: 1
            }).then(response=>response)
            .catch(error => error)
        }
         
    return <RoomContext.Provider value={{addProductToRoom}}>
        {props.children}
    </RoomContext.Provider>
}
