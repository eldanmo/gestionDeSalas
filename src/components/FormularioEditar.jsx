import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import Alerta from "./Alerta"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'

const FormularioEditar = ({sala, cargando}) => {
    const navigate = useNavigate()

    const handleSubmit = async (valores) => {
        try {
            console.log(valores)
            const url = `${import.meta.env.VITE_API_URL}${sala.id}`
            const respuesta = await fetch (url, {
                method: 'PUT',
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await respuesta.json()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const nuevaSalaSchema = Yup.object().shape({
        
        nombreSala: Yup.string()
                        .max(40,'El máximo de caracteres son 40')
                        .required('Debe ingresar el nombre de la sala'),
        reservanteSala: Yup.string()
                            .max(40,'El máximo de caracteres son 40')
                            .required('Debe ingresar el nombre o entidad de quien reserva'),
        horarioSala: Yup.string()
                        .required('Debe ingresar la fecha y hora de reserva')
    })
  return (
    cargando ? <Spinner/> :  Object.keys(sala).length === 0 ? <p>No hay resultados</p> : (
    <div className="bg-gray-50 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-purple-700 font-bold text-xl uppercase text-center">
            Asignar Sala {sala.nombreSala}
        </h1>
        <Formik 
            initialValues={{
                nombreSala: sala.nombreSala ?? '',
                reservanteSala: sala.reservanteSala ?? '',
                estadoSala: sala.estadoSala ?? 'Desocupada',
                horarioSala: sala.horarioSala ?? '',
                notasSala: sala.notasSala ?? ''
            }} 

            enableReinitialize={true}

            onSubmit={ async (values, {resetForm})=>{
                handleSubmit(values)

                resetForm()
            }}

            validationSchema = {nuevaSalaSchema}
        >   
            {({errors,touched})=>{
                return(
                <Form className="mt-10">
                    <div className="mb-4">
                        <label htmlFor="nombreSala" className="text-gray-800">Nombre de la sala:</label>
                        <Field
                            id="nombreSala"
                            name="nombreSala"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-200"
                            placeholder="Nombre de la sala"
                        />
                        { errors.nombreSala && touched.nombreSala ? (
                            <Alerta> {errors.nombreSala} </Alerta>
                        ): null }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reservanteSala" className="text-gray-800">Reservante de la sala:</label>
                        <Field
                            id="reservanteSala"
                            name="reservanteSala"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-200"
                            placeholder="Quien reserva la sala de la sala"
                        />
                        { errors.reservanteSala && touched.reservanteSala ? (
                            <Alerta> {errors.reservanteSala} </Alerta>
                        ): null }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="estadoSala" className="text-gray-800">Estado:</label>
                        <Field
                            id="estadoSala"
                            name="estadoSala"
                            as="select"
                            className="mt-2 block w-full p-3 bg-gray-200"
                            placeholder="Nombre de la sala"
                        >
                            <option value="Desocupada">Desocupada</option>
                            <option value="Ocupada">Ocupada</option>
                        </Field>
                        { errors.estadoSala && touched.estadoSala ? (
                            <Alerta> {errors.estadoSala} </Alerta>
                        ): null }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="horarioSala" className="text-gray-800">Hora de reserva de Sala:</label>
                        <Field
                            id="horarioSala"
                            name="horarioSala"
                            type="datetime-local"
                            className="mt-2 block w-full p-3 bg-gray-200"
                            placeholder="Nombre de la sala"
                        />
                        { errors.horarioSala && touched.horarioSala ? (
                            <Alerta> {errors.horarioSala} </Alerta>
                        ): null }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notasSala" className="text-gray-800">Notas de reserva:</label>
                        <Field
                            id="notasSala"
                            name="notasSala"
                            as="textarea"
                            type="datetime-local"
                            className="mt-2 block w-full p-3 bg-gray-200"
                            placeholder="Notas para la reserva de la sala"
                        />
                    </div>
                    
                    <input type="submit" value="Asignar" className="mt-5 bg-purple-800 p-3 text-white uppercase font-bold text-lg block w-full hover:bg-purple-900" />
                </Form>
            )}}
        </Formik>
    </div>
  ))
}

export default FormularioEditar