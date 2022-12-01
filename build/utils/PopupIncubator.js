import AbstractView from '../AbstractView.js';
import BuildElement from '../BuildElement.js';
export default class extends AbstractView {
    constructor() {
        super();
    }
    incubator() {
        if (!this.popup)
            throw new Error('Popup not defined');
        return BuildElement({
            tag: 'div',
            id: this.id,
            attributes: [
                { attribute: 'class', value: ['fixed z-50 bg-neutral-500 opacity-60 top-0 left-0 h-full w-full justify-center items-center'] }
            ],
            content: BuildElement({
                tag: 'div',
                attributes: [
                    {
                        attribute: 'class',
                        value: [
                            'flex justify-center items-center h-full w-full',
                            'app-popup-main-incubator'
                        ]
                    }
                ],
                content: this.popup
            })
        });
    }
    displayPopup(popup) {
        this.popup = popup;
        const prev = document.querySelector(".app-popup-main-incubator");
        if (prev)
            prev.remove();
        const mainPopup = this.incubator();
        document.querySelector("body").append(mainPopup);
    }
    hidePopup() {
        if (this.id)
            document.getElementById(this.id).remove();
    }
}
