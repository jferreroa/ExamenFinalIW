/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'

type propsIn = {
    pagina: number
    cambiarArr: (arr: any) => void
}
type tipo_ResultadoQuery = {
    characters: {
        info: { pages: number };
        results: Array<{
            name: string
            status: string
            species: string
            gender: string
            image: string

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


export const InputsFiltrado: FC<propsIn> = ({ pagina, cambiarArr }) => {
    const [genero, setGenero] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [paginaFil, setPaginaFil] = useState<number |undefined>(pagina)
    const { data, loading, error, refetch } = useQuery<tipo_ResultadoQuery>(GET_PAGE, {
        variables: {
            filter: {
                status: status,
                gender: genero
            },
            page: paginaFil
        },
    })
    const total: number = data?.characters.info.pages ? data?.characters.info.pages : 0;

    return (
        <div>
            <input value={genero} type="text" onChange={(e) => setGenero(e.target.value)} placeholder="Male | Female"></input>
            <input value={status} type="text" onChange={(e) => setStatus(e.target.value)} placeholder="Alive | Dead | Unknown"></input>
            <button onClick={() => {
                console.log("filtrando")
                cambiarArr(data!.characters.results)
            }}>FILTRAR LA PAGINA</button>
            <div className='info'>Se puede filtrar solo por un campo(Genero o estado)</div>
            {/*data && data.characters.results.map(c => (<div className="aa" key = {c.name + "ds" }>{c.name}</div>))*/}
            {paginaFil  && <button onClick={() => {
                setPaginaFil(paginaFil - 1)
                refetch()
                console.log(paginaFil)
                cambiarArr(data!.characters.results)

            }}>PrevFiltrado</button>}
            {paginaFil  && <button onClick={() => {
                setPaginaFil(paginaFil + 1)
                refetch()
                console.log(paginaFil)
                console.log(data!.characters.results)
                cambiarArr(data!.characters.results)


            }}>NextFiltrado</button>}
            <div className='numpag>'>Hay que usar las flechas de filtrado para pasar paginas una vez filtrado</div>
            <div className='numpag2'>¡¡¡Hay que usar las flechas de filtrado para pasar paginas una vez filtrado!!!!</div>
        </div>
    )
}

