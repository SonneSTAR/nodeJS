
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
        //AGREGAR/
        if (req.url.startsWith("/agregar")) {
            const { nombre, precio } = url.parse(req.url, true).query;

            let deporte = {
                nombre,
                precio,
            };

            let data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));

            console.log(data)

            let deportes = data.deportes
            console.log(deportes)

            deportes.push(deporte)

            fs.writeFileSync("deportes.json", JSON.stringify(data));

            res.end();
        }

        //POST / READ
        if (req.url.startsWith("/deportes")) {
            let deportes = []
            deportesJSON = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            console.log(JSON.stringify(deportesJSON))


            res.end(JSON.stringify(deportesJSON))

            res.end();

        }

        //DELETE 
        if (req.url.startsWith("/eliminar")) {
            const { nombre } = url.parse(req.url, true).query;

            deportesJSON.deportes = deportes.filter((b) => b.nombre !== nombre)

            fs.writeFileSync("deportes.json", JSON.stringify(deportesJSON))

            res.end();

        }


        //UPDATE
        if (req.url.startsWith("/editar")) {
            
            const { nombre, precio } = url.parse(req.url, true).query;

            //
            deportesJSON.deportes = deportes.map((b) => {
                if(b.nombre === nombre){
                    return {
                        nombre: nombre,
                        precio: precio,
                    };
                    
                }
                return b;
            })
            fs.writeFileSync("deportes.json", JSON.stringify(deportesJSON));
            res.end();
        }

        


    })
    .listen(3000);

module.exports = server;