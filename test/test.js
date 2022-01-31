const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require('chai-http')
const server = require('../script')




describe("prueba que verifique que la ruta /deportes devuelve un JSON con la propiedad “deportes” y que esta es un arreglo", function () {
    chai
        .request(server)
        .get('/deportes')
        .end(function (err, res) {
            let data = JSON.parse(res.text)
            chai.expect(data).to.have.property('deportes')
            chai.expect(data.deportes).to.be.an('array')
        })
})