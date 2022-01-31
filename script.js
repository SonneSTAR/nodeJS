
const url = require("url");

const http = require("http");

const fs = require("fs");
const { parse } = require("path/posix");



const server = http
    .createServer(function (req, res) {
        let deportesJSON = JSON.parse(fs.readFileSync("deportes.json","utf8"));

        let deportes = deportesJSON.deportes;


        if (req.url.startsWith("/")) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('index.html', 'utf8', (err, html) => {
                res.end(html)
            })
        }

        if (req.url.startsWith("/agregar")) {
            const { nombre, precio } = url.parse(req.url, true).query;

            let deporte = {
                nombre,
                precio,
            };

            let data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));


            let deportes = data.deportes


            deportes.push(deporte)

            fs.writeFileSync("deportes.json", JSON.stringify(data));

            res.end();
        }


        if (req.url.startsWith("/deportes")) {
            let deportes = []
            deportesJSON = JSON.parse(fs.readFileSync("deportes.json", "utf8"));


            res.end(JSON.stringify(deportesJSON))

            res.end();


        }


        if (req.url.startsWith("/eliminar")) {
            const { nombre } = url.parse(req.url, true).query;

            deportesJSON.deportes = deportes.filter((b) => b.nombre !== nombre)

            fs.writeFileSync("deportes.json", JSON.stringify(deportesJSON))

            res.end();

        }


        
        

        


    })
    .listen(3000);

module.exports = server;