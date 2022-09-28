import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import Alerta from "./Alerta"
import { useNavigate } from "react-router-dom"

const Formulario = () => {
    const navigate = useNavigate()

    const handleSubmit = async (valores) => {
        try {
            const url = import.meta.env.VITE_API_URL
            const respuesta = await fetch (url, {
                method: 'POST',
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
        })
    
  return (
    <div className="bg-gray-50 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-purple-700 font-bold text-xl uppercase text-center">
            Agregar Sala
        </h1>
        <Formik 
            initialValues={{
                nombreSala: '',
                reservanteSala: '',
                estadoSala: 'Desocupada',
                horarioSala: '',
                notasSala: ''
            }} 

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
                    
                    <input type="submit" value="Agregar Sala" className="mt-5 bg-purple-800 p-3 text-white uppercase font-bold text-lg block w-full" />
                </Form>
            )}}
        </Formik>
    </div>
  )
}

export default Formulario