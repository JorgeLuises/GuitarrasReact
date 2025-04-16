import {useState, useEffect} from 'react'
import Header from './components/Header'
import Guitarra from './components/Guitarra'
import {db} from './data/db'

function App() {

  const carritoInicial = () => {
    const carritoLocalStorage = localStorage.getItem('carrito');
    return carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];
  }

  const [guitarras] = useState(db);
  const [carrito, setCarrito] = useState(carritoInicial);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  function agregarItem(item) {
    const itemExist = carrito.findIndex(guitarra => guitarra.id === item.id);
    if (itemExist >= 0) {
      if(carrito[itemExist].cantidad >= 5) return;
      const carritoActualizado = [...carrito];
      carritoActualizado[itemExist].cantidad++;
      setCarrito(carritoActualizado);
    } else {
      item.cantidad = 1;
      setCarrito([...carrito, item]);
    }
  }

  function eliminarItem (id) {
    setCarrito(carrito.filter(guitarra => guitarra.id !== id))
  }

  function incrementarCantidad(id) {
    const actualizarCarrito = carrito.map(guitarra => {
      if (guitarra.id === id && guitarra.cantidad < 5) {
        return {
          ...guitarra,
          cantidad: guitarra.cantidad + 1
        }
      }
      return guitarra;
    })
    setCarrito(actualizarCarrito);
  }

  function decrementarCantidad(id) {
    const actualizarCarrito = carrito.map(guitarra => {
      if (guitarra.id === id && guitarra.cantidad > 1) {
        return {
          ...guitarra,
          cantidad: guitarra.cantidad - 1
        }
      }
      return guitarra;
    })
    setCarrito(actualizarCarrito);
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      
    <Header 
      carrito = {carrito}
      eliminarItem = {eliminarItem}
      incrementarCantidad = {incrementarCantidad}
      decrementarCantidad = {decrementarCantidad}
      vaciarCarrito = {vaciarCarrito}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitarras.map((guitarra, index) => {
            return(
              <Guitarra 
                key={index}
                guitarra={guitarra}
                agregarItem={agregarItem}
              />
            );
          })}
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
