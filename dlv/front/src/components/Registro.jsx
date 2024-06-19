import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ingresosService from "../services/ingresos.service";
import Consulta from "./Consulta";

export default function Registro() {
    const initialForm = {
      dni: "",
      horaIngreso: "",
      proveedor: "",
      conNotebook: false,
    };

    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const [rows, setRows] = useState([])
    const [action, setAction] = useState("R")
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        obtenerIngresos()
    }, [])

    const obtenerIngresos = async () => {
        const ingreso = await ingresosService.getIngresos();
        setRows(ingreso)
    }

    const onRegistrar = async (data) => {
        try {
            const result = await ingresosService.saveIngreso(data)
            if(result) {
                obtenerIngresos()
                setAction("C")
            }
        } catch (error) {
            console.error("Error al registar ingreso: ", error)
        }
    }
    const onVolver = () => {
        setAction("R")
    }

    const handleEliminar = (id) => {
        // Filtrar la matriz de filas para eliminar la fila con el ID especificado
        const newRows = rows.filter(row => row.Id !== id);
        // Actualizar el estado de las filas con la nueva matriz filtrada
        setRows(newRows);
    }

    const handleActualizar = (id) => {
        // Buscar la fila con el ID especificado en la matriz de filas
        const rowToUpdate = rows.find(row => row.Id === id);
        // Actualizar la fila encontrada con los nuevos valores
        const updatedRow = {
            ...rowToUpdate,
            Dni: "Nuevo Dni",
            HoraIngreso: "Nueva Hora Ingreso",
            Proveedor: "Nuevo Proveedor",
            ConNotebook: true,
        };
        // Filtrar la matriz de filas para eliminar la fila anterior y agregar la fila actualizada
        const newRows = rows.filter(row => row.Id !== id).concat(updatedRow);
        // Actualizar el estado de las filas con la nueva matriz actualizada
        setRows(newRows);
    }

    
    return (
    <>
        {
            action === "R" && (
                <div>
                <h1>Seguridad. Registro de ingresos</h1>
                <div className="card">
                    <div className="card-header">Seguridad. Registro de ingresos</div>
                    <div className="card-body">
                    <form className="form" onSubmit={handleSubmit(onRegistrar)}>
                        <div className="form-group">
                        <label htmlFor="Dni">DNI ingreso:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Dni"
                            placeholder="Ingrese DNI"
                            {...register("Dni", { required: "Dni es requerido!" })}
                        />
                        {errors.dni && (
                            <span className="text-danger">{errors.dni.message}</span>
                        )}
                        </div>
                        <div className="form-group">
                        <label htmlFor="HoraIngreso">Hora ingreso:</label>
                        <input
                            type="time"
                            className="form-control"
                            id="HoraIngreso"
                            placeholder="Ingrese hora ingreso"
                            {...register("HoraIngreso", { required: "Hora Ingreso es requerido!" })}
                        />
                        {errors.HoraIngreso && (
                            <span className="text-danger">
                            {errors.HoraIngreso.message}
                            </span>
                        )}
                        </div>
                        <div className="form-group">
                        <label htmlFor="Proveedor">Proveedor (Empresa externa):</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Proveedor"
                            placeholder="Ingrese Proveedor"
                            {...register("Proveedor", {
                            required: "Proveedor es requerido!",
                            })}
                        />
                        {errors.proveedor && (
                            <span className="text-danger">{errors.proveedor.message}</span>
                        )}
                        <label htmlFor="ConNotebook">
                            <input type="checkbox" id="ConNotebook"
                            {...register("ConNotebook", {required: true})}
                            /> 
                            Ingresa con notebook
                        </label>
                        </div>
                        <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary mx-1" onClick={onRegistrar}>
                            Registrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary mx-1"
                            onClick={() => reset()}
                        >
                            Limpiar
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            )
        }
        {
            action !== "R" && (
                <Consulta rows={rows} onVolver={onVolver}/> 
            )
        }
    </>
  );
}
