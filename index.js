import tab5Action from "./tab5-action/tab5-action.js";
tab5Action({
    elementContainer: document.getElementById('tab5-action'), 
    files:[
        {name: 'Image 1', path: 'https://imagen 1'},
        {name: 'Image 2', path: 'https://imagen 2'},
        {name: 'Image 3', path: 'https://imagen 3'},
    ],
    onSave: (datos)=>{
        console.log('onSave: ', datos);
    },
    onCancel: ()=>{
        
    },
})
