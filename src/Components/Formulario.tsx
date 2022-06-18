/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select'

const optionsGenero = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Unknowkn', label: 'Unknowkn' }
]

const optionsStatus = [
    { value: 'Alive', label: 'Alive' },
    { value: 'Dead', label: 'Dead' },
    { value: 'Unknowkn', label: 'Unknowkn' }
]


type formularioProps = {
    changeParams: (filtro: { status:string, genero:string }) => void;
}



const Formulario:FC<formularioProps> = ({changeParams}) => {
    const [filtroGenero, setFiltroGenero] = useState(undefined)
    const [filtroStatus, setFiltroStatus] = useState(undefined)


    const onDropChangeGenero = (value: any) => {
        //console.log(value)
        setFiltroGenero(value.value)
    }
    const onDropChangeSTATUS = (value: any) => {
        //console.log(value)
        setFiltroStatus(value.value)
    }

    useEffect(() => {
        if(filtroStatus){
            //console.log("solo status")
            changeParams({status:filtroStatus, genero: ""})
        }
        if(filtroGenero){
            //console.log("solo genero")
            changeParams({status: "", genero: filtroGenero})
        }
        if(filtroStatus && filtroGenero){
            //console.log("las dos")
          changeParams({status:filtroStatus, genero:filtroGenero})
        }
        
    },[filtroStatus, filtroGenero, changeParams])

    return (
        <div>
            <h1 className='filtrado'>FILTRADO</h1>
            <Select
                options={optionsGenero}
                onChange={onDropChangeGenero}
            />
            <Select
                options={optionsStatus}
                onChange={onDropChangeSTATUS}
            />
        </div>
    )
}


export default Formulario