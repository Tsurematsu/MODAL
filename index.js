// import { databases, saveDataToIndexedDB, deleteDataFromIndexedDB, updateDataInIndexedDB, loadDataFromIndexedDB, getDataFromIndexedDB } from './indexedDB.js';
// deleteDataFromIndexedDB(databases.MyDatabaseActionevent, data.id);
// deleteDataFromIndexedDB(databases.eventsDB, data.id);
// getDataFromIndexedDB(databases.eventsDB);
// saveDataToIndexedDB(databases.MyDatabaseActionevent, tuobjetoquetienedatospaguardar);

import modal from './modal/modal.js';
const urlBase = (url)=> import.meta.url.split('/').slice(0, -1).join('/') + "/" + url.replace('//', '');
const main = async function(){
    const modal1 = new modal({});
    await modal1.LoadModal();
    const formulario = modal1.Modales[0].properties.fillForm({
        titulo: 'Hola mundo',
        name: 'juan camilo',
        email: 'fakeEmail@gmail.com',
        kaka: false,
        selection: {options:['hola', 'gato', 'perro'], selected: 0},
        radio1: {options:['hola a todos', 'gato', 'perro'], selected: 0},
        aceptar: ()=>{console.log("aceptar botón");},
        cancelar: ()=>{console.log("cancelar botón");},
    })
    formulario.click(()=>{
        console.log(formulario.email);
    }).email
}
main();
