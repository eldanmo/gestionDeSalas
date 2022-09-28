import { useNavigate } from "react-router-dom"

const Sala = ({sala, handleEliminar, handleLiberar}) => {
    
   const  {id, nombreSala, reservanteSala, estadoSala, horarioSala} = sala

   const navigate = useNavigate()

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3 uppercase">{nombreSala}</td>
        <td className="p-3 uppercase">{reservanteSala}</td>
        <td className={`${estadoSala === 'Desocupada' ? 'text-green-800' : 'text-red-800' } p-3 uppercase`}>
            {estadoSala}
            <p className="text-green-800">{horarioSala}</p>
        </td>
        <td className="p-3">
            <button 
                type="button"
                className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs"
                onClick={()=>navigate(`/${id}`)}
            >
                Ver
            </button>
            <button 
                type="button"
                className="bg-green-600 hover:bg-green-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
                onClick={()=>navigate(`/editar/${id}`)}
            >
                Asignar
            </button>
            <button 
                type="button"
                className="bg-yellow-600 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
                onClick={()=>handleLiberar(id,{nombreSala,estadoSala:'Desocupada'})}
            >
                Liberar
            </button>
            <button 
                type="button"
                className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
                onClick={()=>handleEliminar(id)}
            >
                Eliminar
            </button>
        </td>
    </tr>
  )
}

export default Sala