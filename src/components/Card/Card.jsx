// Este componente recibe UNA tarjeta como PROPERTY y la muestra visualmente.
// Analogía: es como una funcion JS que recibe un objeto y genera HTML con sus datos.
import './Card.css'

// Colores por categoría — cada tipo de contenido tiene su identidad visual
const CATEGORIA_CONFIG = {
    videojuego: {color: '#6EE7B7', emoji: '🎮'},
    anime: {color: '#FCA5A5', emoji: '⛩️'},
    serie: {color: '#93C5FD', emoji: '📺'},
    novela: {color: '#FCD34D', emoji: '📖'},
}

// { tarjeta, onMover, onEliminar } son las props que recibe este componente
function Card({tarjeta, onMover, onEliminar}) {
    const config = CATEGORIA_CONFIG[tarjeta.categoria] || {color: '#ccc', emoji: '?'}

    return (
        <div className="card" style={{'--categoria-color': config.color}}>

            {/* Franja de color superior que identifica la categoría */}
            <div className="card__stripe"/>

            <div className="card__body">
                {/* Categoría con emoji */}
                <span className="card__categoria">
                   {config.emoji} {tarjeta.categoria}
                </span>

                {/* Título */}
                <h3 className="card__titulo">{tarjeta.titulo}</h3>

                {/* Descripción */}
                <p className="card__descripcion">{tarjeta.descripcion}</p>

                {/* Fechas */}
                <div className="card__fechas">
                    <span>📅 {tarjeta.fechaCreacion}</span>
                    <span>🔄 {tarjeta.fechaActualizacion}</span>
                </div>
            </div>

            {/* Acciones: mover de estado o eliminar */}
            <div className="card__actions">
                <select
                    className="card__select"
                    value={tarjeta.estado}
                    // onChange en React = addEventListener('change') en JS vanilla
                    onChange={(e) => onMover(tarjeta.id, e.target.value)}
                >
                    <option value="iniciando">Iniciando</option>
                    <option value="viendo">Viendo</option>
                    <option value="abandonado">Abandonado</option>
                    <option value="terminado">Terminado</option>
                </select>

                <button
                    className="card__btn-eliminar"
                    onClick={() => onEliminar(tarjeta.id)}
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

export default Card