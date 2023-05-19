# RetryTask

**RetryTask** is a simple yet powerful tool that allows you to initiate a task and continuously retry it until it succeeds in case of failure. This tool is useful for scenarios where operations need to be performed in an unstable environment or when dealing with unpredictable errors.

## Installation

Install RetryTask using npm:

```
npm install retry-task
```

## Usage Example

Here's a simple example demonstrating how to use RetryTask for task retrying:

```javascript
import { RetryTask } from 'retry-task';

let flag = 0;
await RetryTask.run((done, fail, abort) => {
  setTimeout(() => {
    flag++;
    if (flag === 10) {
      done();  // Task successfully completed
    } else if (flag === 5) {
      abort();  // Abort the task and stop retrying
    } else {
      fail();  // Task failed, continue retrying
    }
  }, 10);
}, {
   retryMaxTimes: 15,
   timeout: 1000
}).catch(err => {
  // Handle errors or timeout
});
```

In the above example, we define a task and call the `done()` hook to indicate successful completion, the `abort()` hook to terminate the task and stop retrying, and the `fail()` hook to signify failure and continue retrying. We use the `RetryTask.run` method to execute the task and specify the timeout duration as 1 second and the maximum retry count as 15 through the configuration options. During the task execution, if a timeout occurs or the maximum retry count is reached, we can catch the error and handle it using the `catch` statement.

## Configuration Options

RetryTask provides some optional configuration options to customize the behavior of task retrying. Here are the available configuration options:

- `retryMaxTimes` (optional): Specifies the maximum number of retries for the task. Default is 10.
- `retryDelay` (optional): Specifies the delay between each retry (in milliseconds). Default is 0.
- `timeout` (optional): Specifies the task timeout duration (in milliseconds). If the task fails to complete before the timeout, it is considered a failure. Default is 30000.

## Contribution

Contributions, bug reports, and improvement suggestions for RetryTask are welcome. If you discover a bug or have any ideas for improvement, please create a new issue in the GitHub repository.

## License

RetryTask is licensed under the [MIT License](https://opensource.org/licenses/MIT).