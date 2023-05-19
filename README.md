# RetryTask

**RetryTask** 是一个简单而实用的工具，它允许您开启一个任务，并在失败时不断重试直到成功。该工具适用于需要在不稳定的环境中执行操作或处理不可预测错误的场景。

## 安装

使用 npm 安装 RetryTask：

```
npm install retry-task
```

## 使用示例

以下是一个简单的示例，演示了如何使用 RetryTask 进行任务重试：

```javascript
import { RetryTask } from 'retry-task';

let flag = 0;
await RetryTask.run((done, fail, abort) => {
  setTimeout(() => {
    flag++;
    if (flag === 10) {
      done();  // 任务成功完成
    } else if (flag === 5) {
      abort();  // 终止任务并停止重试
    } else {
      fail();  // 任务失败，继续重试
    }
  }, 10);
}, {
   retryMaxTimes: 15,
   timeout: 1000,
}).catch(err => {
  // 处理错误或超时情况
});
```

在上面的示例中，我们定义了一个任务，调用钩子函数 `done()` 表示任务成功完成，调用 `abort()` 终止任务并停止重试，调用 `fail()` 表示任务失败，继续重试。我们使用 `RetryTask.run` 方法来执行任务，并通过配置选项指定超时的时间为 1s， 最大重试次数为 15 次。在任务运行过程中，如果达到发生超时或者达到最大重试次数，我们可以通过 `catch` 语句捕获到错误并进行处理。

## 配置选项

RetryTask 提供了一些可选的配置选项，用于自定义任务重试的行为。以下是可用的配置选项：

- `retryMaxTimes`（可选）：指定任务最大重试次数。默认为 10。
- `retryDelay`（可选）：指定每次重试之间的延迟时间（毫秒）。默认为 0。
- `timeout`（可选）：指定任务超时时间（毫秒）。如果任务在超时之前没有成功完成，将被视为失败。默认为 30000。

## 贡献

欢迎对 RetryTask 提交问题和改进建议。如果您发现了 Bug，或者有任何改进意见，请在 GitHub 存储库中创建一个新的 issue。

## 许可证

RetryTask 使用 [MIT 许可证](https://opensource.org/licenses/MIT)。