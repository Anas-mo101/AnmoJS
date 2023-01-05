interface BuildElementInterface {
    tag: string,
    id?: string,
    content?: any, 
    attributes?: [{value: string[], attribute: string}], 
    style?: Object,
    onTap?: Function,
    onContextMenu?: Function,
    onChange?: Function,
    onInput?: Function,
    onSubmit?: Function,
}


const getFunctionContent = (func: Function) : string => {
    const funcString = func.toString();
    return funcString.toString().slice(funcString.toString().indexOf("{") + 1, funcString.toString().lastIndexOf("}"))
}


const isNode = (o : any): boolean => {
    return (
        typeof Node === "object" ?
        o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}

const BuildElement = (
    {
        tag,
        id,
        content = undefined,
        attributes = undefined,
        style = undefined,
        onTap = undefined,
        onContextMenu = undefined,
        onChange = undefined,
        onInput = undefined,
        onSubmit = undefined,
    } : BuildElementInterface
) : HTMLElement => {

    let mainComponent: HTMLElement;
    // let tag: string | undefined = undefined;

    if (tag === '' || tag === undefined) {
        throw new Error('Undefined Element');
    }

    tag = tag;
    mainComponent = document.createElement(tag);
    
    if(id) mainComponent.id = id;

    if(content){
        if(Array.isArray(content)){
            let first = true;
            content.forEach(element => {
                if(isNode(element)){
                    mainComponent.appendChild(element); 
                }
                if (typeof element === 'string' || element instanceof String){
                    if(first){
                        first = false;
                    }else{
                        mainComponent.appendChild(document.createElement('br'))
                    }
                    mainComponent.appendChild(document.createTextNode(element as string));
                }
            });
        }else{
            if(typeof content === 'function'){
                const functionContent = getFunctionContent(content);
                mainComponent.appendChild(document.createTextNode(functionContent))
            }else if(isNode(content)){
                mainComponent.appendChild(content); 
            }else if (typeof content === 'string' || content instanceof String){
                mainComponent.appendChild(document.createTextNode(content as string));
            }
        }
    }

    if(attributes){
        attributes.forEach(el => {          
            let attValue = '';
            if(el.value){
                if(Array.isArray(el.value)){
                    attValue = el.value.join(' ');
                }else{
                    attValue = el.value;
                }
            }
            mainComponent.setAttribute(el.attribute,attValue);  
        });
    }

    if(style){
        for (const [key, value] of Object.entries(style)) {
            mainComponent.style.setProperty(`${key}`, `${value}`);
        }
    }


    if(tag === 'input' || tag === 'textarea'){
        if(onInput) mainComponent.addEventListener('input', (e:Event) => onInput(e))
    }


    if(tag === 'input'){
        if (onSubmit) mainComponent.addEventListener("keyup", ({key}) => {
            if(key === "Enter"){
                onSubmit()
            }
        });
    }

    if(onTap) mainComponent.addEventListener("click", (e:Event) => onTap(e));

    if(onContextMenu) mainComponent.addEventListener("contextmenu", (e:Event) => onContextMenu(e));

    if(onChange) mainComponent.addEventListener('change', (e:Event) => onChange(e));

    return mainComponent;
}

export default BuildElement;




