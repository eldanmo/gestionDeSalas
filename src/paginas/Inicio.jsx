import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Sala from "../components/Sala"

const Inicio = () => {

  const navigate = useNavigate()

  const [salas, setSalas] = useState([])

  useEffect(()=>{
    const obtenerSalasAPI = async ()=> {
      try {
        const url = 'http://localhost:4000/salas'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setSalas(resultado)
      } catch (error) {
          console.log(error)
      }
    }
    obtenerSalasAPI()
  },[])

    const handleEliminar = async (id)=> {
      const confirmarEliminacion = confirm('Desea eliminar la sala??')

      if(confirmarEliminacion) {
        try {
          const url = `http://localhost:4000/salas/${id}`
          const respuesta = await fetch(url, {
            method:'DELETE'
          })
          await respuesta.json()
          const arraySalas = salas.filter(sala=>sala.id !== id)
          setSalas(arraySalas)
        } catch (error) {
          console.log(error)
        }
      }
    }

    const handleLiberar = async (id, valores)=>{
      const liberacion = confirm(`esta seguro que liberar la sala?`)

      if(liberacion){
        try {
          const url = `http://localhost:4000/salas/${id}`
          const respuesta = await fetch (url, {
              method: 'PUT',
              body: JSON.stringify(valores),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          await respuesta.json()
          location.reload()
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <>
      <h1 className="font-black text-4xl text-purple-900">Salas</h1>
      <p className="mt-3">Gestiona aqui las salas</p>

      <table className="w-full mt-5 table-auto shadow bg-white" >
        <thead className="bg-purple-800 text-white">
          <tr>
            <th className="p-2">Sala</th>
            <th className="p-2">Quien reserva</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Gestión</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {salas.map(sala => (
            <Sala
              key={sala.id}
              sala={sala}
              handleEliminar={handleEliminar}
              handleLiberar={handleLiberar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio