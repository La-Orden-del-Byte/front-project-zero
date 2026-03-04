// Column recibe un estado (ej: "viendo") y filtra las tarjetas que le corresponden.
// Analogía: es como un contenedor HTML que agrupa tarjetas del mismo estado.

import Card from '../Card/Card'
import './Column.css'

// Configuración visual de cada columna
const COLUMNA_CONFIG = {
    iniciando:  { label: 'Iniciando',  icon: '🌱', color: '#6EE7B7' },
    viendo:     { label: 'Viendo',     icon: '👁️',  color: '#93C5FD' },
    abandonado: { label: 'Abandonado', icon: '💤', color: '#FCA5A5' },
    terminado:  { label: 'Terminado',  icon: '✅', color: '#FCD34D' },
}

function Column({ estado, tarjetas, onMover, onEliminar, onAgregarClick }) {
    const config = COLUMNA_CONFIG[estado]

    // Filtramos solo las tarjetas que pertenecen a este estado
    // Analogía: es como un .filter() de JS — exactamente eso
    const tarjetasDeEstaColumna = tarjetas.filter((t) => t.estado === estado)

    return (
        <div className="column" style={{ '--columna-color': config.color }}>

            {/* Header de la columna */}
            <div className="column__header">
                <span className="column__icon">{config.icon}</span>
                <span className="column__label">{config.label}</span>
                {/* Badge con cantidad de tarjetas */}
                <span className="column__count">{tarjetasDeEstaColumna.length}</span>
            </div>

            {/* Lista de tarjetas */}
            <div className="column__cards">
                {tarjetasDeEstaColumna.length === 0 ? (
                    <div className="column__empty">Sin tarjetas</div>
                ) : (
                    // .map() en React = recorrer un array y devolver JSX por cada elemento
                    tarjetasDeEstaColumna.map((tarjeta) => (
                        <Card
                            key={tarjeta.id}   // key es obligatorio en listas — ayuda a React a identificar cada elemento
                            tarjeta={tarjeta}
                            onMover={onMover}
                            onEliminar={onEliminar}
                        />
                    ))
                )}
            </div>

            {/* Botón para agregar nueva tarjeta en esta columna */}
            <button
                className="column__btn-agregar"
                onClick={() => onAgregarClick(estado)}
            >
                + Nueva tarjeta
            </button>
        </div>
    )
}

export default Column