/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { InputsFiltrado } from './InputsFiltrado';

type tipo_ResultadoQuery = {
    characters: {
        info: { pages: number };
        results: Array<{
            name: string
            status: string
            species: string
            type: string
            gender: string

            image: string
            created: string
        }>
    }
}

const GET_PAGE = gql`
    query characters($pagina: Int) {
        characters(page: $pagina) {
   		    info{
    		    pages
   		    }
            results{
                name
                status
                species
                gender
                image
            }
        }
    }
`


export const Container = () => {



    const [pagina, setPagina] = useState<number>(1);
    const [arrayOriginal, setArrayOriginal] = useState<any>(undefined);

    const [array1, setArray1] = useState<tipo_ResultadoQuery[] | undefined>(undefined);
    const [array2, setArray2] = useState<tipo_ResultadoQuery[] | undefined>(undefined);
    const [array3, setArray3] = useState<tipo_ResultadoQuery[] | undefined>(undefined);
    const [array4, setArray4] = useState<tipo_ResultadoQuery[] | undefined>(undefined);


    const { data, loading, error, refetch } = useQuery<tipo_ResultadoQuery>(GET_PAGE, {
        variables: {
            pagina: pagina

        },
    })
    useEffect(() => { //metemos data en los distintos arrays
        if (data) {
            let arr = []
            arr = data.characters.results.map((character) => {
                return character
            })
            setArrayOriginal(arr)
        }
    }, [data])

    const ordenarArr = (arr: any) => {
        let arrOrdenado: any = []
        function SortArray(x: any, y: any) {
            if (x.name < y.name) { return -1; }
            if (x.name > y.name) { return 1; }
            return 0;
        }
        arrOrdenado = arr.sort(SortArray)
        console.log(arrOrdenado)
        if (arrOrdenado) {
            setArray1(arrOrdenado.slice(0, 4))
            setArray2(arrOrdenado.slice(5, 9))
            setArray3(arrOrdenado.slice(10, 14))
            setArray4(arrOrdenado.slice(15, 19))
        }
    }

    useEffect(() => {
        if (arrayOriginal) {
            console.log("arrrrrr original", arrayOriginal)
            setArray1(arrayOriginal.slice(0, 4))
            setArray2(arrayOriginal.slice(5, 9))
            setArray3(arrayOriginal.slice(10, 14))
            setArray4(arrayOriginal.slice(15, 19))
        }
    }, [arrayOriginal])

    if (loading) {
        return (<div>loading</div>)
    }
    if (error) {
        return (<div>error :</div>)
    }
    const total: number = data?.characters.info.pages ? data?.characters.info.pages : 0;


    return (
        <div className='contenedor'>

            {/*arrayOriginal && arrayOriginal.map((c: any) => (
                <div className='listado'>
                    <div>Name:{c.name}</div>
                    <div>Status:{c.status}</div>
                    <div>Species:{c.species}</div>
                </div>
            ))*/}


            <div className='listadoCompleto'>
                <div className='primerArray'>
                    {array1 && array1.map((c: any) => (
                        <div>
                            <div>Name:{c.name}</div>
                            <div>Status:{c.status}</div>
                            <div>Species:{c.species}</div>
                            <div>Gender:{c.gender}</div>
                            <img src={c.image} alt={c.image} width="100px" height="100px"></img>
                        </div>
                    ))}
                </div>
                <div className='segundoArray'>
                    {array2 && array2.map((c: any) => (
                        <div>
                            <div>Name:{c.name}</div>
                            <div>Status:{c.status}</div>
                            <div>Species:{c.species}</div>
                            <div>Gender:{c.gender}</div>
                            <img src={c.image} alt={c.image} width="100px" height="100px"></img>

                        </div>
                    ))}
                </div>
                <div className='tercerArray'>
                    {array3 && array3.map((c: any) => (
                        <div>
                            <div>Name:{c.name}</div>
                            <div>Status:{c.status}</div>
                            <div>Species:{c.species}</div>
                            <div>Gender:{c.gender}</div>
                            <img src={c.image} alt={c.image} width="100px" height="100px"></img>

                        </div>
                    ))}
                </div>
                <div className='cuartoArray'>
                    {array4 && array4.map((c: any) => (
                        <div>
                            <div>Name:{c.name}</div>
                            <div>Status:{c.status}</div>
                            <div>Species:{c.species}</div>
                            <div>Gender:{c.gender}</div>
                            <img src={c.image} alt={c.image} width="100px" height="100px"></img>

                        </div>
                    ))}
                </div>
                <button onClick={() => { ordenarArr(arrayOriginal) }}>ORDENACION</button>
            </div>

            {pagina > 1 && <button onClick={() => { setPagina(pagina - 1) }}>Prev</button>}
            {pagina < total && <button onClick={() => { setPagina(pagina + 1) }}>Next</button>}
            <div className='numpag'>Numero de pagina: {pagina + "/" + total}</div>
            <div className='filtrado'>
                <InputsFiltrado  pagina ={pagina} cambiarArr ={setArrayOriginal}/>
            </div>
        </div>
    )
}
