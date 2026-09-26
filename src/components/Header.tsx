import type { GuitarC } from "../App"

interface CartProp {
    cart: GuitarC[]
    deletCart: (id: number) => void
    incrementCantidad: (id: number) => void
    decrementCantidad: (id: number) => void
    vaciarCarrito: () => void
}


export const Header = ({ cart, deletCart, incrementCantidad, decrementCantidad, vaciarCarrito }: CartProp) => {

//calculat total pagar
const TotalPagar = cart.reduce((total, pro) => total + (pro.cantidad * pro.price), 0)



    return (

        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">

                                {cart.length > 0 ? (
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map(({ name, image, id, price, cantidad }) => (
                                                    <tr key={id}>
                                                        <td>
                                                            <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{name}</td>
                                                        <td className="fw-bold">
                                                            ${price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                            onClick={() => decrementCantidad(id)}
                                                                type="button"
                                                                className="btn btn-dark"
                                                            >
                                                                -
                                                            </button>
                                                            {cantidad}
                                                            <button
                                                            onClick={() => incrementCantidad(id)}
                                                                type="button"
                                                                className="btn btn-dark"
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={()=> deletCart(id)}
                                                                className="btn btn-danger"
                                                                type="button"
                                                            >
                                                                X
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${TotalPagar}</span></p>
                                    </table>


                                ) :
                                    <p className="text-center">El carrito esta vacio</p>}

                                <button onClick={vaciarCarrito} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

