const config = {
    classContainer:"modal",
    styles:"./modal.css",
    html:"./modal.html",
    separador:"_",
}
const urlBase = (url)=> import.meta.url.split('/').slice(0, -1).join('/') + "/" + url.replace('//', '');
const getArchive = async (url)=> await fetch(urlBase(url)).then((response)=>response.text()); 
export default new function(){
    this.Modales = [];
    this.ultimoModal = null;
    this.LoadModal = ()=> new Promise(async (resolve, _)=>{
        for (const item in {...document.querySelectorAll(`.${config.classContainer}`)}) {
            const element = document.querySelectorAll(`.${config.classContainer}`)[item];
            this.class = `${config.classContainer}_${Math.random().toString(36).substring(7)}`;
            const HTMLmodal = await getArchive(config.html);
            const TEXTstyles = await getArchive(config.styles);
            const ElementModal = document.createElement('div');
            const elementStyle = document.createElement('style');
            elementStyle.innerHTML = `.${this.class}{\n ${TEXTstyles}\n}`;
            ElementModal.innerHTML = HTMLmodal;
            ElementModal.classList.add(this.class);
            element.appendChild(ElementModal);
            element.appendChild(elementStyle);
            this.Modales.push({
                element: element,
                elementModal: ElementModal,
                elementStyle: elementStyle,
                properties: new Modal({element, ElementModal, elementStyle}),
            });
        }
        this.ultimoModal = this.Modales[this.Modales.length - 1];
        resolve(this);
    });
    function Modal({element, ElementModal, elementStyle}){
        this.loadData = (formObject)=>{
            Object.entries(formObject).forEach(([element, value]) => {
                const input = ElementModal.querySelector(`*[name="${element.split(config.separador)[0]}"]`);
                console.log(input,"->" , input.type);
                if (input!==null) {
                    if (input.type == 'file') {
                        input.files = value;
                    }else if (input.type == 'checkbox') {
                        input.checked = value;
                    }else if (input.type == 'radio') {
                        console.log('radio -> ' , value, ' -> ', input);
                        input.innerHTML = '';
                        value.options.forEach((item, index)=>{
                            const radio = document.createElement('input');
                            const label = document.createElement('label');
                            const idLabel = `${element.split(config.separador)[0]}_${index}_${Math.random().toString(36).substring(7)}`;
                            radio.type = 'radio';
                            radio.name = element;
                            radio.value = item;
                            radio.id = idLabel;
                            label.innerHTML = item;
                            label.htmlFor = idLabel;
                            if (item == value.selected) {radio.checked = true;} else if (index == value.selected) {radio.checked = true;}
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
                            if (item == value.selected) {option.selected = true;} else if (index == value.selected) {option.selected = true;}
                            input.appendChild(option);
                        });
                    }else{
                        input.value = value;
                    }
                }
            });
            // [...element.querySelector('form')].forEach((item)=>{
            //     console.log(item);
            // });
        }
    }
}
