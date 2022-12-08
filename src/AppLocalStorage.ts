
export default class {

    // save auth token to local storages

    static setToken(val: any){
        localStorage.setItem('app-auth-token',val)
    }

    static getToken(){
        return localStorage.getItem('app-auth-token');
    }

    // save device brealpoints to local storage

    static setBreakPoints(breakpoints: { mobile: number; tablet: number; }){
        localStorage.setItem(
            'app-responsive-breakpoints', 
            JSON.stringify(
                { mobile: `${breakpoints.mobile}px`, tablet: `${breakpoints.tablet}px` }
            )
        );
    }

    static getBreakPoints(){
        return JSON.parse(localStorage.getItem('app-responsive-breakpoints') ?? '');
    }

    //

    static setMainContainer(container: string){
        localStorage.setItem(`anmo-main-container`, container);
    }

    static getMainContainer(){
        return localStorage.getItem(`anmo-main-container`);
    }

    // cache temp. data between routes

    static TemporaryData(data: {key: string, value: any}){ //
        localStorage.setItem(`anmo-edit-project-${data.key}`, JSON.stringify(data.value))
    }

    static clearTemporaryData(key: string){
        localStorage.removeItem(`anmo-edit-project-${key}`)
    }

    static getTemporaryData(key: string){
        const data = localStorage.getItem(`anmo-edit-project-${key}`);
        this.clearTemporaryData(key)
        return data;
    }
}