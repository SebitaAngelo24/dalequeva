import React from "react";
import moment from "moment";

export default function DeudoresListado({
  Items,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Apellido y Nombre del Deudor</th>
            <th className="text-center">Importe Adeudado</th>
            <th className="text-center">Fecha de la Deuda</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdDeudor}>
                <td>{Item.ApellidoYNombre}</td>
                <td className="text-end">{Item.ImporteAdeudado}</td>
                <td className="text-end">
                  {moment(Item.FechaDeuda).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
