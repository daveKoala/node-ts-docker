"use strict";

module.exports = {
  diff: true,
  extension: ["ts", "js"],
  opts: false,
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  timeout: 2000,
  spec: "src",
  ui: "bdd",
  "watch-files": ["src/**/*.spec.js", "src/**/*.spec.ts"],
  "watch-ignore": ["node_modules"],
};
