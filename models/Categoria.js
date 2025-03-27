const Database = require("./Database"); // Importamos la clase Database
const Producto = require("./Producto");

class Categoria {
  constructor(nombre) {
    this.nombre = nombre;
  }

  static getAll() {
    const db = new Database("../db.json");
    return db.getAll("categorias");
  }

  static getById(id) {
    const db = new Database("../db.json");
    return db.getById("categorias", id);
  }

  static create(categoriaData) {
    const db = new Database("../db.json");
    return db.create("categorias", categoriaData);
  }

  static delete(id) {
    const db = new Database("../db.json");
    // Primero verificamos si hay productos relacionados con esta categoría
    const productos = Producto.getAll(); // Obtenemos todos los productos
    const categoriaRelacionada = productos.some(
      (producto) => producto.categoria_id === id
    );
    // Si encontramos productos relacionados, no podemos eliminar la categoría
    if (categoriaRelacionada) {
       return {
         message:
           "No se puede eliminar la categoría porque está asociada a uno o más productos.",
         status: 400,
       };
    }
    // Si no hay productos relacionados, procedemos a eliminar la categoría
    return db.delete("categorias", id);
  }

  static update(id, updatedData) {
    const db = new Database("../db.json");
    return db.update("categorias", id, updatedData);
  }
}

module.exports = Categoria;
