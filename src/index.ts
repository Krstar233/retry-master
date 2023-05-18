/**
 * 创建重试任务的配置
 */
export interface RetryTaskConfig {
    /**
     * 最大重试次数
     */
    retryMaxTime: number;
    /**
     * 超时时间
     */
    timeout: number
}
/**
 * 重试任务
 */
export class RetryTask {
    private _timeout = 60 * 1e3; // default retry 1 min
    private _timeoutTimer: any = null;

    private constructor(
        private _resolve: (value: RetryTask | PromiseLike<RetryTask>) => void,
        private _reject: (reason?: any) => void,
        private _callback: (done: ()=>void, fail: ()=>void, abort: ()=>void)=>void,
        config?: RetryTaskConfig
    ) {
        if (config) {
            config.timeout && (this._timeout = config.timeout);
        }
        this._start();
    }

    private _done() {
        this._clearMaxTimer();
        this._resolve(this);
    }

    private _fail() {
        this._callTask();
    }

    private _clearMaxTimer() {
        if (this._timeoutTimer) {
            clearTimeout(this._timeoutTimer);
            this._timeoutTimer = null;
        }
    }

    private _abort(reason: any) {
        this._clearMaxTimer();
        this._reject(reason);
    }

    private _callTask() {
        this._callback(this._done.bind(this), this._fail.bind(this), this._abort.bind(this));
    }

    private _start() {
        this._timeoutTimer = setTimeout(() => {
            this._abort({ timeout: true });
        }, this._timeout);
        this._callTask();
    }

    /**
     * 创建重试任务
     * @param fn 任务回调，done(), fail(), abort(reason?: any) 是传入的钩子
     * @param config 创建重试任务的配置
     * @returns Promise<RetryTask>
     */
    static run(
        fn: (
            /**
             * 任务完成
             */
            done: ()=>void,
            /**
             * 单次任务失败
             */
            fail: ()=>void,
            /**
             * 中断任务，停止重试
             */
            abort: (reason?: any)=>void
        )=>void,
        config?: RetryTaskConfig
    ): Promise<RetryTask> {
        return new Promise<RetryTask>((res, rej) => {
            new RetryTask(res, rej, fn, config);
        });
    }
}