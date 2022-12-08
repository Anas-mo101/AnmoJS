import Router from "./Router.js";
import AppLocalStorage from "./AppLocalStorage.js";
import BuildElement from "./BuildElement.js";
import AbstractView from "./AbstractView.js";
import PopupIncubator from "./utils/PopupIncubator.js";
import Responsiveness from "./utils/Responsiveness.js";
import NotificationIncubator from "./utils/NotificationIncubator.js";
export default {
    Router,
    AppLocalStorage,
    AbstractView,
    BuildElement,
    Utils: {
        PopupIncubator,
        Responsiveness,
        NotificationIncubator
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
