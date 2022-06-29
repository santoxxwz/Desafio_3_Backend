const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    save(objeto) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        objetos.push(JSON.stringify(objeto));
        let id = Date.now()
        fs.writeFileSync(this.nombreArchivo, objetos);
        return id;
    }
    findById(id) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = [JSON.parse(contenido)];
        let objeto = objetos.find(obj => obj.id == id);
        return objeto;
    }
    findAll() {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        return objetos;
    }
    delete(id) {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        let objetos = JSON.parse(contenido);
        let objeto = objetos.find(obj => obj.id == id);
        let indice = objetos.indexOf(objeto);
        objetos.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(objetos));
    }
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '[]');
    }
    getRandomArbitrary () {
        let contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
        const lista = JSON.parse(contenido);
        const index = (Math.random() * (lista.length - 1)).toFixed();
        console.log(index)
        const object = lista[index]
        return object
    }
}

const express = require('express')
const PORT = 8080;
const app = express();

app.get('/', (req,res) => {
    res.send(`<h1 style="color: blue;">Desafio 3</h1>`)
})
app.get('/productos', (req,res) => {
    try {
        const nombre = 'productos.txt'
        const archivo = new Contenedor (nombre)
        const list = JSON.stringify(archivo.findAll())
        res.send(`<p>${list}</p>`)
    }
    catch {
        res.send(`<p>${[]}</p>`)
    }
})
app.get('/productoRandom', (req,res) => {
    try {
        const nombre = 'productos.txt'
        const archivo = new Contenedor (nombre)
        res.send(`<p>${JSON.stringify(archivo.getRandomArbitrary())}</p>`)
    }
    catch {
        res.send(`<p>${[]}</p>`)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en servidor ${error}`))


