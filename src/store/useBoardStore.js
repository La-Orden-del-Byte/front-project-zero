//Acá se maneja el estado global de la app. Voy a usar "Zustand", es como tener un objeto JS accesible desde cualquier componente

import {create} from 'zustand'
import {getCards, createCard, deleteCard, updateCard} from "../services/cardService.js";

//create() recibe una funcion que devuelve un objeto con :
// - el estado (datos)
// - las acciones (funciones para modificar esos datos)

const useBoardStore = create((set, get) => ({

    // -- ESTADO --
    tarjetas: [],      // array de tarjetas (va a venir desde el mock/backend)
    cargando: false,    // para mostrar un spinner mientras carga
    error: null,       // para mostrar errores si algo falla


    // -- ACCIONES --

    //Carga todas las tarjetas (LLAMA AL SERVICE)
    fetchTarjetas: async () => {
        set({cargando: true})
        try {
            const data = await getCards()
            set({tarjetas: data, cargando: false})
        } catch (e) {
            set({error: e.message, cargando: false})
        }
    },
    // Agrega una tarjeta nueva
    agregarTarjeta: async (nuevaTarjeta) => {
        const tarjetaCreada = await createCard(nuevaTarjeta)
        // get() te da acceso al estado actual dentro del store
        set({tarjetas: [...get().tarjetas, tarjetaCreada]})
    },

    // Mueve una tarjeta a otro estado (POR EJEMPLO DE VIENDO A TERMINADO)
    moverTarjeta: async (id, nuevoEstado) => {
        await updateCard(id, {estad: nuevoEstado})
        set({
            tarjetas: get().tarjetas.map((t) =>
                t.id === id
                    ? {...t, estado: nuevoEstado, fechaActualizacion: new Date().toISOString().split('T')[0]}
                    : t
            ),
        })
    },

    // Elimina una tarjeta
    eliminarTarjeta: async (id) => {
        await deleteCard(id)
        set({tarjetas: get().tarjetas.filter((t) => t.id !== id)})
    },
}))

export default useBoardStore
