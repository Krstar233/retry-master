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
    timeout: number;
}
/**
 * 重试任务
 */
export declare class RetryTask {
    private _resolve;
    private _reject;
    private _callback;
    private _timeout;
    private _timeoutTimer;
    private constructor();
    private _done;
    private _fail;
    private _clearMaxTimer;
    private _abort;
    private _callTask;
    private _start;
    /**
     * 创建重试任务
     * @param fn 任务回调，done(), fail(), abort(reason?: any) 是传入的钩子
     * @param config 创建重试任务的配置
     * @returns Promise<RetryTask>
     */
    static run(fn: (
    /**
     * 任务完成
     */
    done: () => void, 
    /**
     * 单次任务失败
     */
    fail: () => void, 
    /**
     * 中断任务，停止重试
     */
    abort: (reason?: any) => void) => void, config?: RetryTaskConfig): Promise<RetryTask>;
}
