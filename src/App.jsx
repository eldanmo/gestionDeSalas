import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevaSala from './paginas/NuevaSala'
import EditarSala from './paginas/EditarSala'
import VerSala from './paginas/VerSala'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<Inicio/>} />
            <Route path='/nueva' element={<NuevaSala/>} />
            <Route path='/editar/:id' element={<EditarSala/>} />
            <Route path=':id' element={<VerSala/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
