"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    static setToken(val) {
        localStorage.setItem('app-auth-token', val);
    }
    static getToken() {
        return localStorage.getItem('app-auth-token');
    }
    static setBreakPoints(breakpoints) {
        localStorage.setItem('app-responsive-breakpoints', JSON.stringify({ mobile: `${breakpoints.mobile}px`, tablet: `${breakpoints.tablet}px` }));
    }
    static getBreakPoints() {
        var _a;
        return JSON.parse((_a = localStorage.getItem('app-responsive-breakpoints')) !== null && _a !== void 0 ? _a : '');
    }
    static TemporaryData(data) {
        localStorage.setItem(`anmo-edit-project-${data.key}`, JSON.stringify(data.value));
    }
    static clearTemporaryData(key) {
        localStorage.removeItem(`anmo-edit-project-${key}`);
    }
    static getProjectPassedData(key) {
        const data = localStorage.getItem(`anmo-edit-project-${key}`);
        this.clearTemporaryData(key);
        return data;
    }
}
exports.default = default_1;
