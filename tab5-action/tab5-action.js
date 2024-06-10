export default async function tab5Action({elementContainer, files = [], onSave=()=>{}, onCancel=()=>{}, separator = "_"}){
    const ModalElement = document.createElement('div');
    const idModal = `ModalElement${Math.floor(Math.random() * 1000)}`;
    const cacheAssign = {};
    ModalElement.className = 'modalElement';
    ModalElement.id = idModal;
    ModalElement.innerHTML = await (await fetch('./tab5-action/tab5-action.html')).text();
    document.getElementById('tab5-action')
    elementContainer.parentNode.insertBefore(ModalElement, elementContainer.nextSibling);
    elementContainer.remove();
    const elementModal = document.getElementById(idModal);
    
    elementModal.querySelector('.tab5-action').addEventListener('submit', event => {
        event.preventDefault();
    })


    elementModal.querySelector('.modalActionAdd').addEventListener('click', () => {
        const formulario = document.querySelector('.tab5-action');
        const datosFormulario = new Map();
        const nameFilter = {};
        for (const elemento of formulario.elements) {
            if (elemento.name) {
                if (elemento.type === 'checkbox') {
                    // Si es un checkbox, agregar un valor booleano
                    datosFormulario.set(elemento.name, elemento.checked);
                }else if (elemento.type == "select-one") {
                    datosFormulario.set(elemento.name, cacheAssign[elemento.value]);
                }else{
                    datosFormulario.set(elemento.name, elemento.value);
                }
                nameFilter[(elemento.name).split(separator)[0]] = [];
            }
        }
        const retornoDatos = Object.fromEntries(datosFormulario);
        Object.keys(nameFilter).forEach((key) => {
            const KeysFilter = Object.fromEntries(
                Object.entries(retornoDatos).filter(([clave, valor]) => clave.includes(key + separator))
            );
            const ResultSpited = {};
            Object.entries(KeysFilter).forEach(([clave, valor]) => {
                ResultSpited[clave.split(separator)[1]] = valor;
            });
            nameFilter[key] = ResultSpited;
        })
        onSave(nameFilter);
        elementModal.style.display = 'none';
    });



    // modalActionClose
    elementModal.querySelector('.modalActionClose').addEventListener('click', () => {
        elementModal.style.display = 'none';
        onCancel();
    });

    elementModal.querySelectorAll('.inputSelectSources').forEach(elementHTML => {
        files.forEach(File => {
            const optionElement = document.createElement('option');
            optionElement.textContent = File.name;
            optionElement.value = File.path;
            elementHTML.appendChild(optionElement);
            cacheAssign[File.path] = File;
        });
        
    })

}