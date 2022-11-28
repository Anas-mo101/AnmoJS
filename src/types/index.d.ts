export {};

declare global {
    interface Window {
        mainView: AbstractView | null = null;
        routes: AbstractView[] | null = null;
    }
}

window.NameSpace = window.NameSpace || {};