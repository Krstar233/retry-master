import { expect, it, spec, beforeAll, afterAll, beforeEach, afterEach } from "../common";
import { RetryTask } from "retry-task"

export default spec("npm test", function() {

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

  afterEach(async done => {
    done();
  });

  afterAll(async done => {
    done();
  });
});
