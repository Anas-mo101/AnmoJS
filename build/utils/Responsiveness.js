"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppLocalStorage_js_1 = __importDefault(require("../AppLocalStorage.js"));
class default_1 {
    static isMobile() {
        return this.setByScreen(false, false, true);
    }
    static isTablet() {
        return this.setByScreen(false, true, false);
    }
    static isDesktop() {
        return this.setByScreen(true, false, false);
    }
    static setBreakPoints(breakpoints) {
        if (!breakpoints.mobile && !Number.isInteger(breakpoints.mobile) && breakpoints.mobile < 0) {
            throw new Error('Mobile breakpoint must be a positive integer');
        }
        if (!breakpoints.tablet && !Number.isInteger(breakpoints.tablet) && breakpoints.tablet < 0) {
            throw new Error('Tablet breakpoint must be a positive integer');
        }
        if (breakpoints.mobile >= breakpoints.tablet) {
            throw new Error('Mobile breakpoint must be smaller than tablet breakpoint');
        }
        AppLocalStorage_js_1.default.setBreakPoints(breakpoints);
    }
    static setByScreen(desktop, tablet, mobile) {
        let breakpoints = AppLocalStorage_js_1.default.getBreakPoints();
        if (!(breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints.mobile) || !(breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints.tablet))
            throw new Error('Breakpoints not set');
        const mobileMediaQuery = window.matchMedia(`(max-width: ${breakpoints.mobile})`);
        const tabletMediaQuery = window.matchMedia(`(max-width: ${breakpoints.tablet})`);
        if (mobileMediaQuery.matches) {
            return mobile;
        }
        if (tabletMediaQuery.matches) {
            return tablet;
        }
        return desktop;
    }
}
exports.default = default_1;
