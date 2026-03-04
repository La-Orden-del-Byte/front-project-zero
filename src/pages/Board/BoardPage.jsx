// BoardPage es la página principal. Orquesta todo:
// carga los datos, maneja el modal de crear tarjeta, y renderiza las columnas.

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../../components/Column/Column";
import useCards from "../../hooks/useCards";
import { COLUMNAS_ORDEN, CATEGORIAS } from "../../constants/board.constants";
import "./BoardPage.css";

function BoardPage() {
    const {
        tarjetas,
        cargando,
        error,
        agregarTarjeta,
        moverTarjeta,
        eliminarTarjeta,
    } = useCards();

    const [modalAbierto, setModalAbierto] = useState(false);
    const [estadoParaNuevaTarjeta, setEstadoParaNuevaTarjeta] =
        useState("iniciando");

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        categoria: CATEGORIAS.ANIME,
    });

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            moverTarjeta(Number(draggableId), destination.droppableId);
        }
    };

    const handleAbrirModal = (estado) => {
        setEstadoParaNuevaTarjeta(estado);
        setModalAbierto(true);
    };

    const handleCrearTarjeta = async () => {
        if (!form.titulo.trim()) return;

        await agregarTarjeta({
            ...form,
            estado: estadoParaNuevaTarjeta,
            fechaCreacion: new Date().toISOString().split("T")[0],
            fechaActualizacion: new Date().toISOString().split("T")[0],
        });

        setForm({ titulo: "", descripcion: "", categoria: CATEGORIAS.ANIME });
        setModalAbierto(false);
    };

    if (cargando)
        return <div className="board__loading">Cargando tablero...</div>;
    if (error)
        return <div className="board__error">Error: {error}</div>;

    return (
        <div className="board">
            <header className="board__header">
                <h1 className="board__titulo">Proyecto Zero</h1>
                <p className="board__subtitulo">Tu mapa de consumo cultural</p>
            </header>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board__columnas">
                    {COLUMNAS_ORDEN.map((estado) => (
                        <Column
                            key={estado}
                            estado={estado}
                            tarjetas={tarjetas}
                            onMover={moverTarjeta}
                            onEliminar={eliminarTarjeta}
                            onAgregarClick={handleAbrirModal}
                        />
                    ))}
                </div>
            </DragDropContext>

            {modalAbierto && (
                <div
                    className="modal__overlay"
                    onClick={() => setModalAbierto(false)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal__titulo">Nueva tarjeta</h2>

                        <input
                            className="modal__input"
                            placeholder="Título *"
                            value={form.titulo}
                            onChange={(e) =>
                                setForm({ ...form, titulo: e.target.value })
                            }
                        />

                        <textarea
                            className="modal__input modal__textarea"
                            placeholder="Descripción"
                            value={form.descripcion}
                            onChange={(e) =>
                                setForm({ ...form, descripcion: e.target.value })
                            }
                        />

                        <select
                            className="modal__input"
                            value={form.categoria}
                            onChange={(e) =>
                                setForm({ ...form, categoria: e.target.value })
                            }
                        >
                            {Object.values(CATEGORIAS).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <div className="modal__actions">
                            <button
                                className="modal__btn modal__btn--cancelar"
                                onClick={() => setModalAbierto(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modal__btn modal__btn--crear"
                                onClick={handleCrearTarjeta}
                            >
                                Crear tarjeta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoardPage;