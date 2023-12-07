// import fetch from "node-fetch";
const fetch = require("node-fetch");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  // globalThis.Headers = Headers;
  // globalThis.Request = Request;
  // globalThis.Response = Response;
}
