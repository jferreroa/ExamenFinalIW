import React, { useEffect, useState } from 'react'
import { Container } from './Container';
import Formulario from './Formulario';

const PuenteDatosContainer = () => {

    const[filtro,setFiltro] = useState<undefined | {status:string, genero:string}>(undefined)
    useEffect(() => {
        if(filtro)  {
            //console.log("status: " + filtro.status + " genero: " + filtro.genero )
        }
    }, [filtro])
    return (
        <div>
            <Formulario key = {1} changeParams = {setFiltro}/>
            <Container key ={2} genero = {filtro?.genero || ""} status = {filtro?.status || ""}/>
        </div>

    )
}

export default PuenteDatosContainer;