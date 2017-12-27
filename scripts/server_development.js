var serveStatic = require("serve-static"),
    express = require('express');

var app = express();

app.use(serveStatic("/dist"));
app.listen(3000);
console.log("Te la sirvo en el 3000");