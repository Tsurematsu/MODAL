// import { databases, saveDataToIndexedDB, deleteDataFromIndexedDB, updateDataInIndexedDB, loadDataFromIndexedDB, getDataFromIndexedDB } from './indexedDB.js';
// deleteDataFromIndexedDB(databases.MyDatabaseActionevent, data.id);
// deleteDataFromIndexedDB(databases.eventsDB, data.id);
// getDataFromIndexedDB(databases.eventsDB);
// saveDataToIndexedDB(databases.MyDatabaseActionevent, tuobjetoquetienedatospaguardar);

import modal from './modal/modal.js';
const main = async function(){
    await modal.LoadModal();
    modal.Modales[0].properties.fillForm({
        titulo: 'Hola mundo',
        name: 'juan',
        email: 'fakeEmail@gmail.com',
        kaka: false,
        selection: {options:['hola', 'gato', 'perro'], selected: 0},
        radio1: {options:['hola a todos', 'gato', 'perro'], selected: 0},
        aceptar: ()=>{console.log("aceptar botón");},
        cancelar: ()=>{console.log("cancelar botón");},
    })

    

}
main();


// import tab5Action from "./tab5-action/tab5-action.js";
// tab5Action({
//     elementContainer: document.getElementById('tab5-action'), 
//     files:[
//         {name: 'Image 1', path: 'https://imagen 1'},
//         {name: 'Image 2', path: 'https://imagen 2'},
//         {name: 'Image 3', path: 'https://imagen 3'},
//     ],
//     onSave: (datos)=>{
//         console.log('onSave: ', datos);
//     },
//     onCancel: ()=>{
        
//     },
// }).then((objectModal)=>{
//     document.getElementById('open').addEventListener('click', objectModal.open);
//     document.getElementById('close').addEventListener('click', objectModal.close);
// });
