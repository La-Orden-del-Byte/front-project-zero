// Column recibe un estado (ej: "viendo") y filtra las tarjetas que le corresponden.
// Analogía: es como un contenedor HTML que agrupa tarjetas del mismo estado.

import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";
import "./Column.css";

// Configuración visual de cada columna
const COLUMNA_CONFIG = {
    iniciando: { label: "Iniciando", icon: "🌱", color: "#6EE7B7" },
    viendo: { label: "Viendo", icon: "👁️", color: "#93C5FD" },
    abandonado: { label: "Abandonado", icon: "💤", color: "#FCA5A5" },
    terminado: { label: "Terminado", icon: "✅", color: "#FCD34D" },
};

function Column({ estado, tarjetas, onMover, onEliminar, onAgregarClick }) {
    const config = COLUMNA_CONFIG[estado];

    const tarjetasDeEstaColumna = tarjetas.filter(
        (t) => t.estado === estado
    );

    return (
        <div
            className="column"
            style={{ "--columna-color": config.color }}
        >
            {/* Header */}
            <div className="column__header">
                <span className="column__icon">{config.icon}</span>
                <span className="column__label">{config.label}</span>
                <span className="column__count">
          {tarjetasDeEstaColumna.length}
        </span>
            </div>

            {/* Lista con Drag & Drop */}
            <Droppable droppableId={estado}>
                {(provided) => (
                    <div
                        className="column__cards"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tarjetasDeEstaColumna.length === 0 ? (
                            <div className="column__empty">
                                Sin tarjetas
                            </div>
                        ) : (
                            tarjetasDeEstaColumna.map(
                                (tarjeta, index) => (
                                    <Draggable
                                        key={tarjeta.id}
                                        draggableId={String(tarjeta.id)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card
                                                    tarjeta={tarjeta}
                                                    onMover={onMover}
                                                    onEliminar={onEliminar}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )
                        )}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Botón agregar */}
            <button
                className="column__btn-agregar"
                onClick={() => onAgregarClick(estado)}
            >
                + Nueva tarjeta
            </button>
        </div>
    );
}

export default Column;