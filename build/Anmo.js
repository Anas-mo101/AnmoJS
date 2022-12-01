import Router from "./Router";
import AppLocalStorage from "./AppLocalStorage";
import BuildElement from "./BuildElement";
import AbstractView from "./AbstractView";
import PopupIncubator from "./utils/PopupIncubator";
import Responsiveness from "./utils/Responsiveness";
export default {
    Router,
    AppLocalStorage,
    AbstractView,
    BuildElement,
    Utils: {
        PopupIncubator,
        Responsiveness,
    },
    initApp: (Veiws) => {
        if (Array.isArray(Veiws)) {
            Router.initAppRouting(Veiws);
        }
        else {
            Router.initApp(Veiws);
        }
    },
    setBreakPoints: (breakPoints) => {
        AppLocalStorage.setBreakPoints(breakPoints);
    },
    setMainContainer: (container) => {
        AppLocalStorage.setMainContainer(container);
    }
};
