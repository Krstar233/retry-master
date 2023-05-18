import { expect, it, spec, beforeAll, afterAll, beforeEach, afterEach } from "../common";
import { MainApp } from "../../src/index"


export default spec("spec util test", function() {

  beforeAll(async done => {
    done();
  });

  beforeEach(async done => {
    done();
  });

  it("should pass", async done => {
    const app = new MainApp();
    expect(app.run()).true;
    done();
  });

  afterEach(async done => {
    done();
  });

  afterAll(async done => {
    done();
  });
});
