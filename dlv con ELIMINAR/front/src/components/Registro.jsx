import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ingresosService from "../services/ingresos.service";
import Consulta from "./Consulta";

export default function Registro() {
    const initialForm = {
      dni: "",
      horaIngreso: "",
      proveedor: "",
      conNotebook: true,
    };
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
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
  const onEliminar = (id) => {
    // Filtra el registro con el id que se desea eliminar
    const newData = rows.filter(item => item.Id !== id);
    setRows(newData);
  };

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
                            <input type="checkbox" id="ConNotebook" className="form-check-input"
                            {...register("ConNotebook")}
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
                <Consulta rows={rows} onVolver={onVolver} onEliminar={onEliminar}/> 
            )
        }
    </>
  );
}