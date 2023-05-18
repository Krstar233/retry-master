(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.QuickWasmJS = {}));
})(this, (function (exports) { 'use strict';

    var MainApp = /** @class */ (function () {
        function MainApp() {
        }
        MainApp.prototype.run = function () {
            console.log("hello world");
            return true;
        };
        return MainApp;
    }());

    exports.MainApp = MainApp;

}));
