# RetryTask

**RetryTask** is a simple yet powerful tool that allows you to start a task and continuously retry it until it succeeds. This tool is useful for scenarios where you need to perform operations or handle unpredictable errors in an unstable environment.

## Installation

Install RetryTask using npm:

```
npm install retry-task
```

## Usage Example

Here's a simple example that demonstrates how to use RetryTask for task retrying:

```javascript
const RetryTask = require('retry-task');

let flag = 0;
await RetryTask.run((done, fail) => {
  setTimeout(() => {
    flag++;
    if (flag === 10) {
      done();
    } else {
      fail();
    }
  }, 100);
}, {
  retryMaxTime: 5
}).catch(err => {
  // Handle errors or timeouts
});
```

In the above example, we define a task that simulates an asynchronous operation using `setTimeout`. If the `flag` reaches 10, we call `done()` to indicate a successful completion of the task. Otherwise, we call `fail()` to indicate a failure. We use the `RetryTask.run` method to execute the task and specify the maximum retry count as 5 using the configuration option. During the execution of the task, if the maximum retry count is reached or a timeout occurs, we can catch the error and handle it accordingly using the `catch` statement.

## Configuration Options

RetryTask provides several optional configuration options to customize the behavior of task retrying. The following options are available:

- `retryMaxTime` (optional): Specifies the maximum number of retry attempts for the task. Defaults to 3.
- `retryDelay` (optional): Specifies the delay between each retry attempt (in milliseconds). Defaults to 1000.
- `timeout` (optional): Specifies the timeout for the task (in milliseconds). If the task doesn't succeed before the timeout, it is considered a failure. Defaults to 5000.

## Contributing

Contributions, bug reports, and improvement suggestions for RetryTask are welcome. If you encounter a bug or have any ideas for improvements, please create a new issue in the GitHub repository.

## License

RetryTask is licensed under the [MIT License](https://opensource.org/licenses/MIT).