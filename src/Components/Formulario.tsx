/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select'
import styled from '@emotion/styled'

const optionsGenero = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'unknown', label: 'unknown' }
]

const optionsStatus = [
    { value: 'Alive', label: 'Alive' },
    { value: 'Dead', label: 'Dead' },
    { value: 'unknown', label: 'unknown' }
]


type formularioProps = {
    changeParams: (filtro: { status: string, genero: string }) => void;
    changeName: (name: string | undefined) => void;
}



const Formulario: FC<formularioProps> = ({ changeParams, changeName }) => {
    const [filtroGenero, setFiltroGenero] = useState(undefined)
    const [filtroStatus, setFiltroStatus] = useState(undefined)
    const [filtroNombre, setFiltroNombre] = useState<string | undefined>(undefined)


    const onDropChangeGenero = (value: any) => {
        //console.log(value)
        setFiltroGenero(value.value)
    }
    const onDropChangeSTATUS = (value: any) => {
        //console.log(value)
        setFiltroStatus(value.value)
    }

    useEffect(() => {
        if (filtroStatus) {
            //console.log("solo status")
            changeParams({ status: filtroStatus, genero: "" })
        }
        if (filtroGenero) {
            //console.log("solo genero")
            changeParams({ status: "", genero: filtroGenero })
        }
        if (filtroStatus && filtroGenero) {
            //console.log("las dos")
            changeParams({ status: filtroStatus, genero: filtroGenero })
        }

    }, [filtroStatus, filtroGenero, changeParams])

    return (
        <div>
            <h1 className='filtrado'>RICK & MORTY</h1>
            <InputStyled type="text" className="inputNombre" placeholder='Buscar por nombre'
                onChange={(e) => setFiltroNombre(e.target.value)}>
            </InputStyled>
            <BotonStyled onClick = {() => {
                changeName(filtroNombre)
            }}>Buscar</BotonStyled>
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


export const BotonStyled = styled.button`
height: 40px;
    color: white;
    background-color: black;
    border: 2px solid white;
    &:hover{
        cursor:pointer
    }
`

const InputStyled = styled.input`
width: 95%;
    height: 35px;
    color: white;
    background-color: black;
    border: 2px solid white;
`