import AppLocalStorage from "./AppLocalStorage.js";
export default class {
    constructor() {
        var _a;
        this.routes = (_a = window.routes) !== null && _a !== void 0 ? _a : window.mainView;
        if (!this.routes)
            throw new Error("No Veiws Found");
        if (Array.isArray(this.routes)) {
            const potentialMatches = this.routes.map(route => {
                return {
                    route: route,
                    result: location.pathname.match(this.pathToRegex(route.path))
                };
            });
            this.match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
            if (!this.match) {
                this.match = {
                    route: this.routes[0],
                    result: [location.pathname]
                };
                history.pushState(null, '', this.routes[0].path);
            }
            this.loadMainView(new this.match.route.view());
        }
        else {
            this.loadMainView(this.routes);
        }
    }
    loadMainView(view) {
        var _a, _b;
        const mainContainer = (_a = AppLocalStorage.getMainContainer()) !== null && _a !== void 0 ? _a : 'body';
        document.querySelector(mainContainer).replaceChildren();
        const node = new view().getComponentHTML();
        (_b = document.querySelector(mainContainer)) === null || _b === void 0 ? void 0 : _b.append(node);
    }
    pathToRegex(path) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }
    static getCurrentParams() {
        const values = window.location.search;
        const urlSearchParams = new URLSearchParams(values);
        return Object.fromEntries(urlSearchParams.entries());
    }
    static initAppRouting(routes = []) {
        window.routes = routes;
        window.addEventListener("popstate", (e) => new this());
        window.addEventListener("resize", (e) => new this());
        document.body.addEventListener("click", (e) => {
            const targetElement = e === null || e === void 0 ? void 0 : e.target;
            if (targetElement.matches("[data-link]")) {
                e.preventDefault();
                this.navigateTo(targetElement.href);
            }
        });
        new this();
    }
    static initApp(mainView) {
        if (!mainView)
            throw new Error("No main view found");
        window.mainView = mainView;
        new this();
    }
    static navigateTo(url, params = null) {
        if (params)
            AppLocalStorage.TemporaryData(params);
        history.pushState(null, '', url);
        new this();
    }
}
