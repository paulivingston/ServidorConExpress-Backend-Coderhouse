const express = require('express');
const app = express();

const Contenedor = require('./contenedor.js');
const contProductos = new Contenedor('./productos.txt');

const PORT = 8080;

//comienza con -> npm init -y
//nodemon /index.js

//http://localhost:8080

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));  
// RUTAS

//http://localhost:8080/productos
app.get('/productos', async (req, res) => {
    try{
        const productos = await contProductos.getAll();
        res.send(productos);
    } catch (err) {
        res.send(err);
    }
})

//http://localhost:8080/productoRandom
app.get('/productoRandom', async (req, res) => {
    try {
        const productos = await contProductos.getAll();
        let i = Math.floor(Math.random() * productos.length)
        res.send(productos[i]);
    } catch (err) {
        res.send(err);
    }
})
  

/*
En package.json, "scrips" se agrega:
"start": "nodemon index.js" para iniciar la app
*/


//PRUEBAS

class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

let prod1 = new Producto('title1', 45, 'asdasd');
let prod2 = new Producto('title2', 50, 'asdasdasd');
let prod3 = new Producto('title3', 62, 'asdasdasdasd');

contProductos.save(prod1);
contProductos.save(prod2);
contProductos.save(prod3);

all = contProductos.getAll();
console.log(all);