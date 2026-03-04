//Este es un custom hook, básicamente es una function JS que usa otras funciones de REACT. Esto lo uso para
//no poner lógica compleja dentro de los componentes y asi que me queden más limpios. Es como un helper/util del vanilla que agrupa lógica relacionada

import {useEffect} from 'react'
import useBoardStore from '../store/useBoardStore.js'

const useCards = () => {

    //Acá extraemos primero lo que necesitamos del store global
    const {tarjetas, cargando, error, fetchTarjetas, agregarTarjeta, moverTarjeta, eliminarTarjeta} = useBoardStore()

    // useEffect = "Ejecutá esto cuando el componente aparezca en la pantalla okey?"
    // El array vacio [] al final significa "solo una vez, al cargar/montar"

    useEffect(() => {
        fetchTarjetas()
    }, [])

    return {tarjetas, cargando, error, agregarTarjeta, moverTarjeta, eliminarTarjeta}
}
export default useCards