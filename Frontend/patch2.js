
const fs = require("fs");
let code = fs.readFileSync("../DashBoard/src/App.js", "utf-8");
code = code.replace(/return \(\s*<div className="app">/, `if(!username) return null;\n\n  return (\n      <div className="app">`);
fs.writeFileSync("../DashBoard/src/App.js", code);

