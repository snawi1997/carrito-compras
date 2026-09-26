

import { Footer } from './components/Footer'
import { Guitar } from './components/Guitar'
import { Header } from './components/Header'
import { useCart } from './hooks/useCart'


interface Guitar {
    id: number
    name: string
    image: string
    description: string
    price: number
}




function App() {

    //desde el hook traemos todo
    const { data,
        cart,
        handleClick,
        vaciarCarrito,
        decrementCantidad,
        incrementCantidad,
        deletCart } = useCart()




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
