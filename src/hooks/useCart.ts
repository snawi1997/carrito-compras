import { useState, useEffect } from "react"
import { db } from "../data/dbGuitars"

interface Guitar {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export interface GuitarC extends Guitar {
    cantidad: number
}


//______________________________________________________

//estado del carrito con local storage
const initial = () => {
    const cartLocal = localStorage.getItem('cart')
    return cartLocal ? JSON.parse(cartLocal) : []
}



//______________________________________________________Inicio del HOOK
export const useCart = () => {

    //state
    const [data] = useState(db)
    //cart
    const [cart, setCart] = useState<GuitarC[]>(initial)



    //______________________________________________________
    //agregar al carrito
    const handleClick = (item: Guitar) => {

        const itemExist = cart.some((pro) => pro.id === item.id)

        if (itemExist) {
            const producto = cart.find(pro => pro.id === item.id) //se busca el producto
            if (producto) {
                producto.cantidad = producto.cantidad + 1
                const nuevoCart = [...cart]
                setCart(nuevoCart)
            }
        } else {
            setCart([...cart, { ...item, cantidad: 1 }]) // se agrega cantidad
        }




    }


    //______________________________________________________

    useEffect(() => {
        //localstroge
        localStorage.setItem('cart', JSON.stringify(cart)) //la primera vez lo guarda
    }, [cart])

    //______________________________________________________



    //______________________________________________________
    //elimina del carrito
    const deletCart = (id: number) => {
        setCart((pre) => pre.filter((guit) => guit.id !== id))
    }


    //______________________________________________________

    //incrementar cantidad
    const incrementCantidad = (id: number) => {

        const product = cart.find((pro) => pro.id === id)
        if (product) {
            product.cantidad = product.cantidad + 1
        }
        //se crea un nuevo array que contiene ese producto ya cambiado.
        const cart2 = [...cart]
        setCart(cart2)
    }


    //______________________________________________________
    //decrementa cantidad
    const decrementCantidad = (id: number) => {
        const product = cart.find((pro) => pro.id === id)
        if (product && product.cantidad > 0) {
            product.cantidad = product.cantidad - 1
        }
        //se crea un nuevo array que contiene ese producto ya cambiado.
        const cart2 = [...cart]
        setCart(cart2)
    }


    //______________________________________________________
    //vaciar carrito
    const vaciarCarrito = () => {
        setCart([])
    }




    return {
        data,
        cart,
        setCart,
        handleClick,
        vaciarCarrito,
        decrementCantidad,
        incrementCantidad,
        deletCart
    }
}