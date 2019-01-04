var serveStatic = require("serve-static"),
    express = require('express');

var app = express();

app.use(serveStatic("./dist"));
app.listen(3000);

console.log("====================");
console.log("Listening port: 3000");
console.log("====================");