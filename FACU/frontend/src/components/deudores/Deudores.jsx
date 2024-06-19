import React, { useState, useEffect } from "react";
import moment from "moment";
import DeudoresListado from "./DeudoresListado";
import DeudoresRegistro from "./DeudoresRegistro";
import { deudoresService } from "../../services/deudores.service";
import modalDialogService from "../../services/modalDialog.service";

function Deudores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [ApellidoYNombre, setApellidoYNombre] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    Buscar(Pagina);
  }, [Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await deudoresService.Buscar(ApellidoYNombre, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await deudoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdDeudor: 0,
      ApellidoYNombre: '',
      ImporteAdeudado: '',
      FechaDeuda: '',
    });
  }

  async function Grabar(item) {
    try {
      await deudoresService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      "Registro " + (AccionABMC === "A" ? "agregado" : "modificado") + " correctamente."
    );
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Deudores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <div>
          <button className="btn btn-primary agregar-deudor-btn" onClick={Agregar}>
            Agregar Deudor
          </button>
          {Items?.length > 0 ? (
            <DeudoresListado
              {...{
                Items,
                Consultar,
                Modificar,
                Pagina,
                RegistrosTotal,
                Paginas,
                Buscar,
              }}
            />
          ) : (
            <div className="alert alert-info mensajesAlert">
              <i className="fa fa-exclamation-sign"></i>
              No se encontraron registros...
            </div>
          )}
        </div>
      )}

      {AccionABMC !== "L" && (
        <DeudoresRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Deudores };
