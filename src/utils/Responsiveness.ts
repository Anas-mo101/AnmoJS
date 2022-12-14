import AppLocalStorage from "../AppLocalStorage.js";

export default class {

    static isMobile(){
        return this.setByScreen(false,false,true);
    }

    static isTablet(){
        return this.setByScreen(false,true,false);
    }

    static isDesktop(){
        return this.setByScreen(true,false,false);
    }

    static setBreakPoints(breakpoints: {mobile: number, tablet: number}){
        if (!breakpoints.mobile && !Number.isInteger(breakpoints.mobile) && breakpoints.mobile < 0) {
            throw new Error('Mobile breakpoint must be a positive integer');
        }

        if (!breakpoints.tablet && !Number.isInteger(breakpoints.tablet) && breakpoints.tablet < 0) {
            throw new Error('Tablet breakpoint must be a positive integer');
        }

        if (breakpoints.mobile >= breakpoints.tablet) {
            throw new Error('Mobile breakpoint must be smaller than tablet breakpoint');
        }

        AppLocalStorage.setBreakPoints(breakpoints);
    }

    static setByScreen(desktop: any,tablet: any,mobile: any){
        let breakpoints = AppLocalStorage.getBreakPoints();
        if(!breakpoints?.mobile || !breakpoints?.tablet) throw new Error('Breakpoints not set');

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