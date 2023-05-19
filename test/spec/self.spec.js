import { expect, it, spec, beforeAll, afterAll, beforeEach, afterEach } from "../common";
import { RetryTask } from "../../src/index"


export default spec("retry task test", function() {

  beforeAll(async done => {
    done();
  });

  beforeEach(async done => {
    done();
  });

  it("normal task", async done => {
    let flag = 0;
    await RetryTask.run((done, fail) => {
      setTimeout(() => {
        flag++;
        if (flag === 10) {
          done();
        } else {
          fail();
        }
      }, 10);
    });
    expect(flag).eq(10);
    done();
  });

  it("timeout task", async done => {
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
        timeout: 100
    }).catch(err => {
        expect(err.timeout).true;
        expect(flag < 10).true;
        done();
    });
  });

  it("abort task", async done => {
    let flag = 0;
    await RetryTask.run((done, fail, abort) => {
      setTimeout(() => {
        flag++;
        if (flag === 10) {
            done();
        } else if (flag === 5){
            abort();
        } else {
            fail();
        }
      }, 10);
    }, {
        timeout: 1000
    }).catch(err => {
        expect(err).not.exist;
        expect(flag === 5).true;
        done();
    });
  });

  it("retry max times", async done => {
    let flag = 0;
    await RetryTask.run((done, fail, abort) => {
      setTimeout(() => {
        flag++;
        if (flag === 10) {
            done();
        } else {
            fail();
        }
      }, 0);
    }, {
        retryMaxTimes: 3
    }).catch(err => {
        expect(err.retryMaxTimes).true;
        expect(flag === 3).true;
        done();
    });
  });

  it("multi hook", async done => {
    let flag = 0;
    await RetryTask.run((done, fail, abort) => {
      flag++;
      fail();
      abort("123");
      done();
    }, {
        retryMaxTimes: 3
    }).catch(err => {
        expect(err).eq("123");
    });
    expect(flag).eq(1);
    done();
  });

  it("multi hook 2", async done => {
    let flag = 0;
    const task = await RetryTask.run((done, fail, abort) => {
      flag++;
      fail();
      fail();
      fail();
      if (flag === 3) {
        done();
      }
    }, {
        retryMaxTimes: 3
    }).catch(err => {});
    expect(flag).eq(3);
    expect(task._callbackTimerList.length).eq(0);
    setTimeout(()=>{
      expect(flag).eq(3);
      done();
    }, 100);
  });

  it("multi hook 3", async done => {
    let flag = 0;
    const task = await RetryTask.run((done, fail, abort) => {
      flag++;
      done();done();done();done();fail();
    }, {
        retryMaxTimes: 100
    }).catch(err => {});
    expect(flag).eq(1);
    expect(task._callbackTimerList.length).eq(0);
    setTimeout(()=>{
      expect(flag).eq(1);
      done();
    }, 100);
  });

  it("multi hook 4", async done => {
    let flag = 0;
    let catchErr = 0;
    const task = await RetryTask.run((done, fail, abort) => {
      flag++;
      done();done();done();done();fail();abort();
    }, {
        retryMaxTimes: 100
    }).catch(err => {catchErr++;});
    expect(flag).eq(1);
    expect(task._callbackTimerList.length).eq(0);
    setTimeout(()=>{
      expect(flag).eq(1);
      expect(catchErr).eq(0);
      done();
    }, 100);
  });


  it("multi hook 5", async done => {
    let flag = 0;
    let catchErr = 0;
    const task = await RetryTask.run((done, fail, abort) => {
      flag++;
      fail();fail();fail();abort();abort();
    }, {
        retryMaxTimes: 100
    }).catch(err => {
      catchErr++;
    });
    expect(flag).eq(1);
    setTimeout(()=>{
      expect(flag).eq(1);
      expect(catchErr).eq(1);
      done();
    }, 100);
  });

  afterEach(async done => {
    done();
  });

  afterAll(async done => {
    done();
  });
});
