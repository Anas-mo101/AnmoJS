import AbstractView from '../AbstractView.js';
import BuildElement from '../BuildElement.js';


export default class extends AbstractView {
    popup: AbstractView | undefined;

    constructor() {
        super();
    }
    
    incubator() {
        if (!this.popup) throw new Error('Popup not defined');

        return BuildElement({
            tag: 'div',
            id: this.id,
            style: {
                'z-index':'50',
                'position': 'fixed',
                'background-color': 'rgb(115 115 115)',
                'top': '0',
                'left': '0',
                'height': '100%',
                'width': '100%',
                'justify-content': 'center',
                'align-items': 'center',
            },
            content: BuildElement({
                tag: 'div',
                attributes: [
                    {  attribute: 'class',  value: [ 'app-popup-main-incubator' ] }
                ],
                style: {
                    'position': 'fixed',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'height': '100%',
                    'width': '100%',
                },
                content: this.popup
            })
        });
    }

    displayPopup(popup: AbstractView) {
        this.popup = popup;

        const prev = document.querySelector(".app-popup-main-incubator");
        if (prev) prev.remove();

        const mainPopup = this.incubator();
        document.querySelector("body")!.append(mainPopup);
    }

    hidePopup() {
        if(this.id) document.getElementById(this.id)!.remove();
    }
}