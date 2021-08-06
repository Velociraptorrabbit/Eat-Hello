const request = require("supertest");
const express = require("express");

// const createServer = require("../server/server")

// const app = express()

// const app = require('../server/server').app;
const server = "http://localhost:3000";
// beforeAll(done => {
//   server = app.listen(3000, done);
// });

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });
});

describe("Route integration", () => {
  describe("/map", () => {
    describe("POST", () => {
      it("responds with 200 status and JSON/application content type", () => {
        return request(server)
          .post("/map")
          .send({ zipCode: 11206 })
          .then((res) => {
            console.log(res.body);
            expect(res.body).toEqual(true);
          })
          .catch((err) => err);
      });
      it("respond with 200 status and JSON/application content type and correct lat long", () => {
        return request(server)
          .post("/map")
          .send({ zipCode: 11206 })
          .then((res) => {
            expect(res.body).toEqual({ lat: 40.7047738, lng: -73.9418603 });
          })
          .catch((err) => err);
      });
      it("respond with 400 status on wrong Key value", () => {
        return request(server)
          .post("/map")
          .send({ zipCode: "shawn" })
          .expect(400);
      });
    });
  });
});
