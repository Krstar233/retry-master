(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.QuickWasmJS = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 重试任务
     */
    var RetryTask = /** @class */ (function () {
        function RetryTask(_resolve, _reject, _callback, config) {
            this._resolve = _resolve;
            this._reject = _reject;
            this._callback = _callback;
            this._timeout = 60 * 1e3; // default retry 1 min
            this._timeoutTimer = null;
            if (config) {
                config.timeout && (this._timeout = config.timeout);
            }
            this._start();
        }
        RetryTask.prototype._done = function () {
            this._clearMaxTimer();
            this._resolve(this);
        };
        RetryTask.prototype._fail = function () {
            this._callTask();
        };
        RetryTask.prototype._clearMaxTimer = function () {
            if (this._timeoutTimer) {
                clearTimeout(this._timeoutTimer);
                this._timeoutTimer = null;
            }
        };
        RetryTask.prototype._abort = function (reason) {
            this._clearMaxTimer();
            this._reject(reason);
        };
        RetryTask.prototype._callTask = function () {
            this._callback(this._done.bind(this), this._fail.bind(this), this._abort.bind(this));
        };
        RetryTask.prototype._start = function () {
            var _this = this;
            this._timeoutTimer = setTimeout(function () {
                _this._abort({ timeout: true });
            }, this._timeout);
            this._callTask();
        };
        /**
         * 创建重试任务
         * @param fn 任务回调，done(), fail(), abort(reason?: any) 是传入的钩子
         * @param config 创建重试任务的配置
         * @returns Promise<RetryTask>
         */
        RetryTask.run = function (fn, config) {
            return new Promise(function (res, rej) {
                new RetryTask(res, rej, fn, config);
            });
        };
        return RetryTask;
    }());

    exports.RetryTask = RetryTask;

}));
