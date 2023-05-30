import ErrorComponent from "./utils/ErrorComponent.js";


export default class AbstractView {
    id: string | undefined;
    mainCompnent: HTMLElement;

    constructor({style = undefined} : {style?: Object} = {}) {
        this.id = AbstractView.generateID(); 
        this.mainCompnent = document.createElement('div');
        

        if(style){
            for (const [key, value] of Object.entries(style)) {
                this.mainCompnent.style.setProperty(`${key}`, `${value}`);
            }
        }
    }

    static generateID(){
        return `anmo-` + Math.random().toString(36).substring(2, 10);
    }

    setTitle(title: string) {
        document.title = title;
    }

    getComponentHTML() {
        return document.createElement('div');
    }

    async update(){
        // ensure that the component has an ID 
        if(!this.id) throw new Error('Component ID not found');    

        // get the current node
        const current_node = document.getElementById(this.id);
        
        // if the node is not found, return
        if(!current_node) return;

        // create an updated component
        this.mainCompnent = document.createElement('div');
        const node = await this.getComponentHTML(); 

        // replace the current node with the updated component
        current_node.replaceWith(node);
    }

    appendHTMLComponent(element: HTMLElement){
        this.mainCompnent.appendChild(element);
    }

    getComponent_(){
        return this.mainCompnent;
    }

    obs(vr: any, callback: Function | null){ 
        let observed = {state: vr};
        return new Proxy(observed,{
            set: (target: any, key, value) => {
                target[key] = value;
                if(callback) callback();
                this.update();  
                return true;
            }
        })
    }

    componentError(error = 'Error'){
        return new ErrorComponent(error).getComponentHTML();
    }
}

