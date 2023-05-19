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
            this._isDone = false;
            this._isAborted = false;
            this._retryDelay = 0;
            this._timeout = 30 * 1e3; // default retry 30s
            this._timeoutTimer = null;
            this._retryMaxTimes = 10; // default 10 times
            this._retryCount = 0;
            this._callbackTimerList = [];
            if (config) {
                config.timeout && (this._timeout = config.timeout);
                config.retryDelay && (this._retryDelay = config.retryDelay);
                config.retryMaxTimes && (this._retryMaxTimes = config.retryMaxTimes);
            }
            this._start();
        }
        RetryTask.prototype._canCallTask = function () {
            return !this._isAborted && !this._isDone;
        };
        RetryTask.prototype._clearCallbackTimerList = function () {
            this._callbackTimerList.forEach(function (cbtimer) {
                clearTimeout(cbtimer);
            });
            this._callbackTimerList = [];
        };
        RetryTask.prototype._done = function () {
            this._clearMaxTimer();
            this._isDone = true;
            this._clearCallbackTimerList();
            this._resolve(this);
        };
        RetryTask.prototype._fail = function () {
            var _this = this;
            if (!this._canCallTask()) {
                return;
            }
            var cbTimer = setTimeout(function () {
                _this._callbackTimerList = _this._callbackTimerList.filter(function (timer) { return timer !== cbTimer; });
                clearTimeout(cbTimer);
                if (_this._canCallTask()) {
                    _this._callTask();
                }
            }, this._retryDelay * this._callbackTimerList.length + 1);
            this._callbackTimerList.push(cbTimer);
        };
        RetryTask.prototype._clearMaxTimer = function () {
            if (this._timeoutTimer) {
                clearTimeout(this._timeoutTimer);
                this._timeoutTimer = null;
            }
        };
        RetryTask.prototype._abort = function (reason) {
            this._clearMaxTimer();
            this._isAborted = true;
            this._reject(reason);
        };
        RetryTask.prototype._callTask = function () {
            this._retryCount++;
            if (this._retryCount > this._retryMaxTimes) {
                this._abort({ retryMaxTimes: true });
                return;
            }
            this._canCallTask() && this._callback(this._done.bind(this), this._fail.bind(this), this._abort.bind(this));
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
