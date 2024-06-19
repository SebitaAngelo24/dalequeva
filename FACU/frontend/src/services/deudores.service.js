
import httpService from "./http.service";
 const urlResource = "http://localhost:4000/api/deudores"


async function Buscar(ApellidoYNombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { ApellidoYNombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdDeudor);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdDeudor);
}


async function Grabar(item) {
  if (item.IdDeudor === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdDeudor, item);
  }
}


export const deudoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
