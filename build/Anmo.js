"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router"));
const AppLocalStorage_1 = __importDefault(require("./AppLocalStorage"));
const BuildElement_1 = __importDefault(require("./BuildElement"));
const AbstractView_1 = __importDefault(require("./AbstractView"));
const PopupIncubator_1 = __importDefault(require("./utils/PopupIncubator"));
const Responsiveness_1 = __importDefault(require("./utils/Responsiveness"));
exports.default = {
    Router: Router_1.default,
    AppLocalStorage: AppLocalStorage_1.default,
    AbstractView: AbstractView_1.default,
    BuildElement: BuildElement_1.default,
    Utils: {
        PopupIncubator: PopupIncubator_1.default,
        Responsiveness: Responsiveness_1.default,
    },
    initApp: (Veiws) => {
        if (Array.isArray(Veiws)) {
            Router_1.default.initAppRouting(Veiws);
        }
        else {
            Router_1.default.initApp(Veiws);
        }
    },
    setBreakPoints: (breakPoints) => {
        AppLocalStorage_1.default.setBreakPoints(breakPoints);
    }
};
