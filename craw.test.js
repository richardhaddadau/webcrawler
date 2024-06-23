import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("Normalize https://ravenci.solutions/", () => {
  expect(normalizeURL("https://ravenci.solutions/")).toBe("ravenci.solutions");
});

test("Normalize https://boot.dev/path/", () => {
  expect(normalizeURL("https://boot.dev/path/")).toBe("boot.dev/path");
});
