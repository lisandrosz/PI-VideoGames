const supertest = require("supertest");
var request = require("supertest");
const app = require("../../src/app.js");

describe("GET /genres", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/genres")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
