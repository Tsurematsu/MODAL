const urlBase = (url)=> url;
const getArchive = async (url)=> await fetch(urlBase(url)).then((response)=>response.text()); 
export default function({html="./modal.html", separador="_", classContainer="modal"}){
    this.Modales = [];
    this.ultimoModal = null;
    this.LoadModal = ()=> new Promise(async (resolve, _)=>{
        for (const item in {...document.querySelectorAll(`.${classContainer}`)}) {
            const element = document.querySelectorAll(`.${classContainer}`)[item];
            this.class = `${classContainer}_${Math.random().toString(36).substring(7)}`;
            let HTMLmodal = await getArchive(html);
            const Estilos = [];
            HTMLmodal.split('<link').forEach((item, index)=>{
                const center = item.split('>')[0]
                if (center.includes('stylesheet')) {
                    const url = center.split('href="')[1].split('"')[0];
                    Estilos.push(url);
                    HTMLmodal = HTMLmodal.replace(`<link${center}>`, '');
                }
            })
            HTMLmodal = HTMLmodal.trim();
            const contenedor = document.createElement('div');
            contenedor.innerHTML = HTMLmodal;
            contenedor.classList.add(this.class);
            element.appendChild(contenedor);
            const estilos = null;
            for (let index = 0; index < Estilos.length; index++) {
                const TEXTstyles = await getArchive(Estilos[index]);
                const estilos = document.createElement('style');
                estilos.innerHTML = `.${this.class}{\n ${TEXTstyles}    \n}`;
                element.appendChild(estilos);
            }
            this.Modales.push({
                element,
                contenedor,
                estilos,
                properties: new Modal({element, ElementModal: contenedor, elementStyle: estilos}),
            });
        }
        this.ultimoModal = this.Modales[this.Modales.length - 1];
        resolve(this);
    });
    function Modal({element, ElementModal, elementStyle}){
        this.fillForm = (formObject)=>{
            const inputsList = {};
            Object.entries(formObject).forEach(([element, value]) => {
                const input = ElementModal.querySelector(`*[name="${element.split(separador)[0]}"]`);
                if (input!==null) {
                    if (input.type == 'file') {
                        input.files = value;
                        inputsList[element]=input;
                    }else if (input.type == 'checkbox') {
                        input.checked = value;
                        inputsList[element]=input;
                    }else if (input.type == 'radio') {
                        input.innerHTML = '';
                        value.options.forEach((item, index)=>{
                            const radio = document.createElement('input');
                            const label = document.createElement('label');
                            const idLabel = `${element.split(separador)[0]}_${index}_${
                                                Math.random().toString(36).substring(7)}`;
                            radio.type = 'radio';
                            radio.name = element;
                            radio.value = item;
                            radio.id = idLabel;
                            label.innerHTML = item;
                            label.htmlFor = idLabel;
                            inputsList[element]=radio;
                            if (item == value.selected) {radio.checked = true;} 
                            else if (index == value.selected) {radio.checked = true;}
                            input.parentNode.insertBefore(label, input.nextSibling);
                            input.parentNode.insertBefore(radio, input.nextSibling);
                        });
                        input.remove();
                    }else if (input.type == 'select-one') {
                        input.innerHTML = '';
                        value.options.forEach((item, index)=>{
                            const option = document.createElement('option');
                            option.value = item;
                            option.innerHTML = item;
                            if (item == value.selected) {option.selected = true;} 
                            else if (index == value.selected) {option.selected = true;}
                            input.appendChild(option);
                        });
                        inputsList[element]=input;
                    }else if(input.type == undefined) {
                        input.innerHTML = value;
                        inputsList[element]=input;
                    }else if(input.type == 'text') {
                        input.value = value;
                        inputsList[element]=input;
                    }else if(input.type == 'button') {
                        input.addEventListener('click', value);
                        inputsList[element]=input;
                    }
                }else if(value.type!==undefined){
                    if (value.type == 'text') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.name = element;
                        input.value = value.value;
                        ElementModal.appendChild(input);
                        inputsList.push({element, element:input});
                    }
                }
            });
            return new Proxy(formObject, {
                get: function(_, prop, receiver) {
                    const eventosExistentes = [
                        'click', 'change', 'input', 'keyup', 
                        'keydown', 'keypress', 'focus', 
                        'blur', 'change', 'select', 
                        'submit', 'reset'
                    ];
                    const retornoCall = (callback, evento)=>new Proxy({}, {
                        get: function(_, prop1, receiver) {
                            const input = inputsList[prop1];
                            input.addEventListener(evento, (event)=>{callback(event, input)});
                            return Reflect.get(...arguments);
                        },
                    });
                    let eventoObtenido = null;
                    eventosExistentes.forEach((evento)=>{
                        if (prop==evento) eventoObtenido = (callback)=>{return retornoCall(callback, evento)};
                    })
                    if (eventoObtenido!==null) return eventoObtenido;
                    const input = inputsList[prop]
                    if (input.type == 'text') {
                        return input.value;
                    }
                    return Reflect.get(...arguments);
                },
                set: function(_, prop, value, receiver) {
                    const input = inputsList[prop];
                    if (input.type == 'text') {
                        input.value = value;
                    }
                    return Reflect.set(...arguments);
                }
            });
        }
    }
}
