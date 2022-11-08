"use strict";

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { init } = require("./api");

describe("GET /", () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("responds with 200", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).to.equal(200);
  });

  it("includes application/json in content-type", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.headers["content-type"]).to.contain("application/json");
  });

  it("includes charset in content-type header", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.headers["content-type"]).to.contain("charset=utf-8");
  });

  it("includes products in the response", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });

    let json = JSON.parse(res.payload);
    expect(json).to.include("products");
  });
});
