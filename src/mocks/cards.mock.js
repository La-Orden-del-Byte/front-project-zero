//Acá por ahora estoy simulando datos falsos de lo que vendría de la base de datos
import {ESTADOS, CATEGORIAS} from "../constants/board.constants.js";

export const mockCards = [
    {

        id: 1,
        titulo: "Attack on Titan",
        descripcion: "Humanidad vs titanes.",
        categoria: CATEGORIAS.ANIME,
        estado: ESTADOS.TERMINADO,
        fechaCreacion: "2024-01-10",
        fechaActualizacion: "2024-03-15",
    }, {
        id: 2,
        titulo: "The Last of Us",
        descripcion: "Serie post-apocaliptica.",
        categoria: CATEGORIAS.SERIE,
        estado: ESTADOS.VIENDO,
        fechaCreacion: "2024-02-01",
        fechaActualizacion: "2024-04-01",
    },
    {
        id: 3,
        titulo: "Elden Ring",
        descripcion: "RPG de FromSoftware, mundo abierto epico breeoooo.",
        categoria: CATEGORIAS.VIDEOJUEGO,
        estado: ESTADOS.INICIANDO,
        fechaCreacion: "2024-02-01",
        fechaActualizacion: "2024-02-01",
    },
    {
        id: 4,
        titulo: "Cien años de soledad",
        descripcion: "Clasico de García Márquez.",
        categoria: CATEGORIAS.NOVELA,
        estado:ESTADOS.ABANDONADO,
        fechaCreacion: "2023-11-05",
        fechaActualizacion: "2024-01-08",

    },
]