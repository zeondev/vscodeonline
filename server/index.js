var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("Home", {
        hgb1: "Easy to use",
        hgb2: "User friendly",
        hgb3: "Free forever"
    })
})

app.get("/app", (req, res) => {
    res.render("App", {})
})

app.get("/terminal", (req, res) => {
    var u = req.query.u
    res.render("Terminal", {
        user: u
    })
})

io.on('connection', (socket) => {
    socket.on("update-text", (txt) => {
        io.emit("update-text", (txt))
    })
})

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});