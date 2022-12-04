import AbstractView from "./AbstractView.js";
import AppLocalStorage from "./AppLocalStorage.js";

export default class {

    routes: AbstractView;
    match: { route: any; result: any; } | undefined;

    constructor(){
        this.routes = window.routes ?? window.mainView;

        if (!this.routes) throw new Error("No Veiws Found");

        if (Array.isArray(this.routes)) {
            const potentialMatches = this.routes.map(route => {
                return {
                    route: route,
                    result: location.pathname.match(this.pathToRegex(route.path))
                };
            });
        
            this.match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
            if (!this.match) {
                // 404 page
                this.match = {
                    route: this.routes[0],
                    result: [location.pathname]
                };
                history.pushState(null, '', this.routes[0].path);
            }
            
            this.loadMainView( this.match.route.view );
        }else{
            this.loadMainView(this.routes);
        }
    }

    loadMainView(view: AbstractView){
        const mainContainer = AppLocalStorage.getMainContainer() ?? 'body';

        document.querySelector(mainContainer)!.replaceChildren();
        // @ts-ignore
        const node = new view().getComponentHTML();
        document.querySelector(mainContainer)?.append(node);
    }

    pathToRegex(path: String){
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }

    static getCurrentParams(){
        const values = window.location.search;
        const urlSearchParams = new URLSearchParams(values);
        return Object.fromEntries(urlSearchParams.entries());
    }

    static initAppRouting(routes: AbstractView[] = []){
        window.routes = routes;

        window.addEventListener("popstate", (e) =>  new this());

        window.addEventListener("resize", (e) =>  new this());
 
        document.body.addEventListener("click", (e) => {
            const targetElement: HTMLAnchorElement = e?.target as HTMLAnchorElement;
            if (targetElement.matches("[data-link]")) {
                e.preventDefault();
                this.navigateTo(targetElement.href);
            }
        });

        new this();
    }

    static initApp(mainView: AbstractView){
        if (!mainView) throw new Error("No main view found");
            
        window.mainView = mainView;

        new this();
    }

    static navigateTo(url: string ,params: {key: string, value: string} | null = null){
        if (params) AppLocalStorage.TemporaryData(params);
        history.pushState(null, '', url);
        new this();
    }
}





