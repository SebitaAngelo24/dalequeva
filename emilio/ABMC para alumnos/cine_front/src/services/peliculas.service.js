import axios from 'axios'

const URL = 'http://localhost:3001/api/peliculas'

async function getByFilters(filter){
   let apiUrl = (filter)? URL+'?titulo='+ filter : URL
   const res =  await fetch(apiUrl, {method:'GET'})
   return await res.json()
   
}

async function save(data){
   
   /*const res = await axios.post(URL, data)*/

   const res =  await fetch(URL, {method:'POST', body: JSON.stringify(data), headers:{'content-type': 'application/json'}})
   return await res.json()
   
}


export default {getByFilters, save}