import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {
  const location = useLocation()
  const urlActual = location.pathname
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-gray-700 px-5 py-10">
          <h2 className="font-bold text-purple-500 uppercase text-3xl text-center">
            Gestion de salas
          </h2>
          <Link to="/" className={`${urlActual === '/' ? 'text-white' : 'text-blue-500'} font-bold text-2xl  mt-5 block hover:text-blue-500`} >Salas</Link>
          <Link to="/nueva" className={`${urlActual === '/nueva' ? 'text-white' : 'text-blue-500'} font-bold text-2xl  mt-5 block hover:text-blue-500`} >Agregar Sala</Link>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll bg-gray-300">
        <Outlet/>
      </div>   
    </div>
  )
}

export default Layout