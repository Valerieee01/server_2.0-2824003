const Database = require("./Database");

class Producto {
  constructor(nombre, descripcion, categoria_id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria_id = categoria_id;
  }

  // Obtener todos los productos
  static getAll() {
    const db = new Database("../db.json");
    return db.getAll("productos");
  }

  // Obtener un producto por ID
  static getById(id) {
    const db = new Database("../db.json");
    return db.getById("productos", id);
  }

  // Crear un nuevo producto
  static create(productoData) {
    const db = new Database("../db.json");
    return db.create("productos", productoData);
  }
  // Actualizar un porducto
  static update(id, updatedData) {
    const db = new Database("../db.json");
    return db.update("productos", id, updatedData);
  }

  // Eliminar un producto
  static delete(id) {
    const db = new Database("../db.json");
    return db.delete("productos", id);
  }

}

module.exports = Producto;
