const fs = require('fs');

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getAll() {
        try{
            const file = await fs.promises.readFile(this.ruta);
            const data = JSON.parse(file);
            return data;
            
        } catch (error) {
            const array = [];
            await fs.promises.writeFile(this.ruta, JSON.stringify(array));

            return array;
        }
    }

    async save(obj) {
        try{
            const data = await this.getAll();
            const nuevoID = data.length === 0 ? 1 : data[data.length-1].id + 1; // operador ternario (OT)
            //OPERADOR TERNARIO: variable = condicion ? true : false
            obj.id = nuevoID;
            data.push(obj);
            const file = JSON.stringify(data, null, 3);
            await fs.promises.writeFile(this.ruta, file);

            return nuevoID;

        } catch (err) {
            console.log(err);
        }        
    }

    async getById(id) {    
        try {
            const objs = await this.getAll();
            const objID = objs.find((obj) => obj.id == id); //arrow function
            return objID;           
        }
        catch (err) {
            console.log('No se pudo leer el archivo', err)
        } 
    }

    async deleteById(n) {
        try {
            const objs = await this.getAll();
            const data = objs.filter((obj) => obj.id != id); //arrow function            
            const file = JSON.stringify(data, null, 3);
            await fs.promises.writeFile(this.ruta, file);
            console.log('eliminado');
        }
        catch (err) {
            console.log('No se pudo leer el archivo', err)
        } 
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta,'');
            console.log('borrado');
        } catch (err) {
            console.log (err);
        }
    }
}

module.exports = Contenedor;