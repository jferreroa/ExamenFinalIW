import React, { useEffect, useState } from 'react'
import { Container } from './Container';
import Formulario from './Formulario';

const PuenteDatosContainer = () => {

    const[filtro,setFiltro] = useState<undefined | {status:string, genero:string}>(undefined)
    const [nombreCont, setNombreCont] = useState<string|undefined>(undefined)
    useEffect(() => {
        if(nombreCont)  {
          console.log("PUENTE ", nombreCont)
        }
    }, [nombreCont])
    return (
        <div>
            <Formulario key = {1} changeParams = {setFiltro} changeName={setNombreCont} />
            <Container key ={2} genero = {filtro?.genero || ""} status = {filtro?.status || ""} name= {nombreCont}/>
        </div>

    )
}

export default PuenteDatosContainer;