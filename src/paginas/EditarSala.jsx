import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import FormularioEditar from "../components/FormularioEditar"

const EditarSala = () => {
  const {id} = useParams()

  const [ sala, setSala ] = useState({})

  const [cargando, setCargando] = useState(false)

  useEffect(() => {
      setCargando(!cargando)
      const obtenerSalaAPI = async ()=>{
          try {
              const url = `${import.meta.env.VITE_API_URL}/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()

              setSala(resultado)

          } catch (error) {
              console.log(error)
          }
          setCargando(false)
      }
      obtenerSalaAPI()
  }, [])
  return (
    <>
      <h1 className="font-black text-4xl text-purple-900" > Editar sala </h1>
      <p className="mt-3">Edite aqui las propiedades de la sala</p>
      <FormularioEditar
        sala={sala}
        cargando={cargando}
      />
    </>
  )
}

export default EditarSala