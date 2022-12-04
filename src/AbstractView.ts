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
        if(!this.id) throw new Error('Component ID not found');    

        const current_node = document.getElementById(this.id);
        
        if(!current_node) return;

        this.mainCompnent = document.createElement('div');
        const node = await this.getComponentHTML(); 
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

