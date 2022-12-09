import AbstractView from '../AbstractView.js';
import BuildElement from '../BuildElement.js';


export default class extends AbstractView {
    popup: HTMLElement | undefined;
    dismissable: boolean;
    animation: boolean;

    constructor(dismissable = true, animation = true) {
        super();
        this.dismissable = dismissable;
        this.animation = animation;
    }
    
    incubator() {
        if (!this.popup) throw new Error('Popup not defined');

        const incubatedPopup = !this.dismissable ? this.popup : BuildElement({
            tag: 'div',
            style: {
                'display': 'contents',
                'width': 'auto',
                'height': 'auto',
            },
            onTap: (e: Event) => e.stopPropagation(),
            content: this.popup
        });

        return BuildElement({
            tag: 'div',
            id: this.id,
            attributes: [
                {  attribute: 'class',  value: [ 'app-popup-main-incubator' ] }
            ],
            onTap: () => {
                if (this.dismissable) this.hidePopup();
            },
            style: {
                'display': 'flex',
                'z-index':'50',
                'position': 'fixed',
                'background-color': 'rgb(115 115 115 / 50%)',
                'top': '0',
                'left': '0',
                'height': '100%',
                'width': '100%',
                'justify-content': 'center',
                'align-items': 'center',
            },
            content: BuildElement({
                tag: 'div',
                style: {
                    'position': 'fixed',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'height': '100%',
                    'width': '100%',
                },
                content: incubatedPopup
            })
        });
    }

    displayPopup(popup: HTMLElement) {
        this.popup = popup;

        if (this.animation) {
            var startTime = Date.now();
            this.popup.style.transform = 'scale(0)';
        }

        const prev = document.querySelector(".app-popup-main-incubator");
        if (prev) prev.remove();

        const mainPopup = this.incubator();
        document.querySelector("body")!.append(mainPopup);

        if (this.animation) {

            const animatePopup = () => {
                let time = Date.now() - startTime;
        
                let scale = Math.min(1, time / 250);
                let opacity = Math.min(1, time / 500);
        
                this.popup!.style.transform = 'scale(' + scale + ')';
                this.popup!.style.opacity = `${opacity}`;
                
                if (time < 1000) {
                    requestAnimationFrame(animatePopup);
                }
            }
        
            requestAnimationFrame(animatePopup);
        }
    }

    hidePopup() {
        if(this.id) document.getElementById(this.id)!.remove();
    }
}