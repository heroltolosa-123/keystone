// Run: node --test lib/quote.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, type Fields } from "./quote.ts";

const ok: Fields = {
  name: "Juan Dela Cruz",
  org: "TARELCO I",
  email: "juan@tarelco.ph",
  phone: "0917 123 4567",
  items: "",
  message: "20 steel poles, 45 ft, delivered to Tarlac",
};

test("accepts a complete request", () => assert.deepEqual(validate(ok), {}));

test("flags every required field", () => {
  const e = validate({ name: " ", org: "", email: "nope", phone: "", items: "", message: "short" });
  assert.deepEqual(Object.keys(e).sort(), ["email", "message", "name", "org"]);
});

test("phone is optional but must look like a number", () => {
  assert.equal(validate({ ...ok, phone: "" }).phone, undefined);
  assert.ok(validate({ ...ok, phone: "call me" }).phone);
});
