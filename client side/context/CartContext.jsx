import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children})=> {
    const data = JSON.parse(localStorage.getItem("items"))
    // console.log(data, "context")
const [items, setItems] = useState(data || [])

   return <CartContext.Provider value={{
items,
setItems
}}>
{children}
   </CartContext.Provider>
}