/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
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
    query characters($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
        info{
    		pages
   		}
        results {
            name
            status
            gender
            species
            image
        }
  }
}
`

type ContainerProps = {
    genero: string | "",
    status: string | ""
}


export const Container: FC<ContainerProps> = ({ genero, status }) => {



    const [pagina, setPagina] = useState<number>(1);
    const [arrayOriginal, setArrayOriginal] = useState<any>(undefined);
    const [arrayOrdenado, setArrayOrdenado] = useState<any>(undefined);
    const [generoFil, setgeneroFil] = useState<any>("");
    const [statusFil, setstatusFil] = useState<any>("");


    const { data, loading, error, refetch } = useQuery<tipo_ResultadoQuery>(GET_PAGE, {
        variables: {

            filter: {
                status: statusFil,
                gender: generoFil
            },

            page: pagina

        },
    })
    useEffect(() => { //metemos data en los distintos arrays
        if (data) {
            let arr = []
            console.log(data)
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

        setArrayOrdenado(arrOrdenado)
    }

    useEffect(() => {
        if (arrayOrdenado) {
            setArrayOriginal(arrayOrdenado)
        }
    }, [arrayOrdenado])

    useEffect(() => { // deberia actulizar la pagina a 0 cuando cambie el genero o el status
        /*if(genero){
            refetch({filter:{status:"",gender:genero}})
        }
        if(status){
            refetch({filter:{status:status,gender:""}})
        }
        if(genero && status){
            refetch({filter:{status:status,gender:genero}})
        }*/

        if (genero) {
            setgeneroFil(genero) 
        }
        if (status) {
            setstatusFil(status)
        }
    }, [genero, /*refetch,*/ status])

    /*useEffect(() => {
        if (generoFil) {
            refetch({filter:{status:"",gender:generoFil}})
        }
        if(statusFil){
            refetch({filter:{status:statusFil,gender:""}})
        }
        if(statusFil && generoFil){

            refetch({filter:{status:statusFil,gender:generoFil}})
        }


    },[generoFil, refetch, statusFil])*/

    /* if (loading) {
        return (<div>loading</div>)
    }
    if (error) {
        return (<div>error :</div>)
    } */
    const total: number = data?.characters.info.pages ? data?.characters.info.pages : 0;


    return (
        <div className='contenedor'>
            <div className='listadoCompleto'>

                <div>
                    {arrayOriginal && arrayOriginal.slice(0, 4).map((c: any) => (
                        <div className='listado'>
                            <div>
                                <div>Name:{c.name}</div>
                                <div>Status:{c.status}</div>
                                <div>Species:{c.species}</div>
                                <img src={c.image} alt="at" width="100" height="100"></img>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    {arrayOriginal && arrayOriginal.slice(5, 9).map((c: any) => (
                        <div className='listado'>
                            <div>
                                <div>Name:{c.name}</div>
                                <div>Status:{c.status}</div>
                                <div>Species:{c.species}</div>
                                <img src={c.image} alt="at" width="100" height="100"></img>

                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    {arrayOriginal && arrayOriginal.slice(10, 14).map((c: any) => (
                        <div className='listado'>
                            <div>
                                <div>Name:{c.name}</div>
                                <div>Status:{c.status}</div>
                                <div>Species:{c.species}</div>
                                <img src={c.image} alt="at" width="100" height="100"></img>

                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {arrayOriginal && arrayOriginal.slice(15, 19).map((c: any) => (
                        <div className='listado'>
                            <div>
                                <div>Name:{c.name}</div>
                                <div>Status:{c.status}</div>
                                <div>Species:{c.species}</div>
                                <img src={c.image} alt="at" width="100" height="100"></img>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <button onClick={() => { ordenarArr(arrayOriginal) }}>ORDENACION</button>

            <div>
                {pagina > 1 && <button onClick={() => {
                    setPagina(pagina - 1)
                    console.log("GENERO " + generoFil + " status " + statusFil + " pagina " + pagina)

                }
                }>Prev</button>}
                {pagina < total && <button onClick={() => {
                    setPagina(pagina + 1)
                    console.log("GENERO " + generoFil + " status " + statusFil + " PAGINA " + pagina )

                }}>Next</button>}
            </div>

            <div className='numpag'>Numero de pagina: {pagina + "/" + total}</div>
            {/*<div className='filtrado'>
                <InputsFiltrado pagina={pagina} cambiarArr={setArrayOriginal} />
                    </div>*/}
        </div>
    )
}

//no se actualiza al pasar pagina en filtrado