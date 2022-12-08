import AbstractView from '../AbstractView.js';
import BuildElement from '../BuildElement.js';


const notificationPosition = {
    'topRight': {
        'top': '15%',
        'right': '5%',
    },
    'topLeft': {
        'top': '15%',
        'left': '5%',
    },
    'topCenter': {
        'top': '15%',
        'left': '0',
        'right': '0',
    },
    'bottomRight': {
        'bottom': '10%',
        'right': '5%',
    },
    'bottomLeft': {
        'bottom': '10%',
        'left': '5%',
    },
    'bottomCenter': {
        'bottom': '15%',
        'left': '0',
        'right': '0',
    },
};


export default class extends AbstractView {
    notification: AbstractView | undefined;
    displayTime: number;
    displayPosition: keyof typeof notificationPosition;

    constructor(displayTime = 5000, displayPosition = 'topRight' as keyof typeof notificationPosition) {
        super();

        this.displayTime = displayTime;
        this.displayPosition = displayPosition;
    }
    
    incubator() {
        if (!this.notification) throw new Error('notification not defined');

        let styleNotification = {
            'z-index': '50',
            'position': 'absolute',
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
        };

        styleNotification = { ...styleNotification, ...notificationPosition[this.displayPosition] }; 

        return BuildElement({
            tag: 'div',
            id: this.id,
            attributes: [
                {  attribute: 'class',  value: [ 'app-notification-main-incubator' ] }
            ],
            style: styleNotification,
            content: this.notification
        });
    }

    displaynotification(notification: AbstractView) {
        this.notification = notification;

        const prev = document.querySelector(".app-notification-main-incubator");
        if (prev) prev.remove();

        const mainnotification = this.incubator();
        document.querySelector("body")!.append(mainnotification);

        if(this.displayTime !== 0){
            setTimeout(() => this.hidenotification(), this.displayTime );
        }
    }

    hidenotification() {
        if(this.id) document.getElementById(this.id)!.remove();
    }
}