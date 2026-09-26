
import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Guitar } from './components/Guitar'
import { Header } from './components/Header'
import { db } from './data/dbGuitars'

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



function App() {

    //estado del carrito con local storage
    const initial = () => {
        const cartLocal = localStorage.getItem('cart')
        return cartLocal ? JSON.parse(cartLocal) : []
    }

    //state
    const [data] = useState(db)
    //cart
    const [cart, setCart] = useState<GuitarC[]>(initial)





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

    useEffect(() => {
        //localstroge
        localStorage.setItem('cart', JSON.stringify(cart)) //la primera vez lo guarda
    }, [cart])


    //elimina del carrito
    const deletCart = (id: number) => {
        setCart((pre) => pre.filter((guit) => guit.id !== id))
    }

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

    //vaciar carrito
    const vaciarCarrito = () => {
        setCart([])
    }




    return (
        <>
            <Header
                cart={cart}
                deletCart={deletCart}
                incrementCantidad={incrementCantidad}
                decrementCantidad={decrementCantidad}
                vaciarCarrito={vaciarCarrito}
            />
            <main className="container-xl mt-5">
                <div className="row mt-5">
                    <h2 className="text-center">Nuestra Coleccion de Guitarras</h2>
                    {data.map((guitar) => (
                        <Guitar
                            guitar={guitar}
                            key={guitar.id}
                            handleClick={handleClick} />

                    ))}

                </div>
            </main>

            <Footer />
        </>
    )
}

export default App
