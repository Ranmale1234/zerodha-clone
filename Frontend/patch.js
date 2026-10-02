
const fs = require("fs"); 
let code = fs.readFileSync("../DashBoard/src/App.js", "utf-8"); 
code = code.replace(/function App\(\) \{/g, `function App() { const [username, setUsername] = useState(""); useEffect(() => { fetch("http://localhost:3002/profile", { credentials: "include" }).then(res => res.json()).then(data => { if(data.status) setUsername(data.user); else window.location.href = "http://localhost:3000/signup"; }).catch(() => window.location.href = "http://localhost:3000/signup"); }, []); if(!username) return null; `); 
code = code.replace(/<div className="user" onClick=\{.*?\}\>[\s\S]*?<\/div>/, `<div className="user" onClick={() => setProfile(!profile)}><b>{username[0].toUpperCase()}</b><span>{username}</span></div>`); 
code = code.replace(/<b>Prem Ranmale<\/b>/g, `<b>{username}</b>`); 
code = code.replace(/title="Hi, Prem!"/g, `title={"Hi, " + username + "!"}`); 
if (!code.includes("useEffect")) {
  code = code.replace(/import React, \{ useState/g, `import React, { useState, useEffect`); 
}
fs.writeFileSync("../DashBoard/src/App.js", code);

