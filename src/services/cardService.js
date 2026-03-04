//Este archivo seria el mas importante para mi futuro, hoy devuelve mocks, mañana va a llamar al backend. El resto de la app no cambia

// services/cardService.js
import { mockCards } from '../mocks/cards.mock.js'

// HOY: devuelve datos falsos
export const getCards = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockCards), 300)
    })
}

export const createCard = async (nuevaTarjeta) => {
    //Por ahora solo la va a devolver con un id generado
    const tarjetaConId = {...nuevaTarjeta, id:Date.now()}
    return tarjetaConId
}

export const updateCard = async (id,cambios) =>{
    return {id, ...cambios}
}

export const deleteCard = async (id) => {
    return { succes:true }
}

// MAÑANA: solo tendria que cambiar la función por algo como:
// export const getCards = async () => {
//   const res = await fetch('https://tu-api.com/cards')
//   return res.json()
// }