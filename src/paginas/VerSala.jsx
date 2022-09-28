import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Spinner from '../components/Spinner'

const VerSala = () => {

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
    <div>
        {cargando ? <Spinner/> : Object.keys(sala).length === 0 ? <p>No hay resultados</p> : (
            <>
        <h1 className="font-black text-4xl text-purple-900">Sala {sala.nombreSala}</h1>
        <p className="mt-3">Información de la sala</p>

        { sala.nombreSala &&(
            <p className="text-4xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">
                    Sala: </span>
                    {sala.nombreSala}
            </p>
        )}
        { sala.reservanteSala &&(
            <p className="text-2xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">
                    Quien reserva: </span>
                    {sala.reservanteSala}
            </p>
        )}
        { sala.estadoSala &&(
            <p className={ `${sala.estadoSala === 'Desocupada' ? 'text-green-600' : 'text-red-600'}  mt-5 text-2xl` }>
                <span className="text-gray-800 uppercase font-bold">
                    Estado actual de la sala: </span>
                    {sala.estadoSala}
            </p>
        )}
        { sala.horarioSala &&(
            <p className="text-2xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">
                    Fecha y hora de asignación de la sala: </span>
                    {sala.horarioSala}
            </p>
        )}
        { sala.notasSala &&(
            <p className="text-2xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">
                    Notas de asignación de la sala: </span>
                    {sala.notasSala}
            </p>
        )}

            </>
        )}
    </div>
    
  )
}

export default VerSala