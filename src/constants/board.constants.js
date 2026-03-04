//Acá basicamente están los 4 estados posibles de una tarjeta en el tablero

export const ESTADOS = {
    INICIANDO : "iniciando",
    VIENDO : "viendo",
    ABANDONADO: "abandonado",
    TERMINADO: "terminado",
}

// Tambien vamos a tener las 4 categorías de contenido posible
export const CATEGORIAS= {
    VIDEOJUEGO: "videojuego",
    ANIME: "anime",
    SERIE: "serie",
    NOVELA: "novela"
}

// Voy a necesitar un array para poder definir el ORDEN visual de las columnas en el tablero (de izquierda a derecha)
export const COLUMNAS_ORDEN =[
    ESTADOS.INICIANDO,
    ESTADOS.VIENDO,
    ESTADOS.ABANDONADO,
    ESTADOS.TERMINADO,
]
