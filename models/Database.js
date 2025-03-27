const fs = require("fs");
const path = require("path");

class Database {
  constructor(filename) {
    this.dbPath = path.join(__dirname, filename); // Ruta al archivo db.json
  }

  // Función para leer el archivo db.json
  readFile() {
    try {
      return JSON.parse(fs.readFileSync(this.dbPath, "utf8"));
    } catch (err) {
      console.error("Error leyendo el archivo:", err);
      return {}; // Retorna un objeto vacío si hay error al leer el archivo
    }
  }

  // Función para escribir en el archivo db.json
  writeFile(data) {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error escribiendo el archivo:", err);
    }
  }

  // Método para obtener los datos de una entidad
  getAll(entity) {
    const db = this.readFile();
    return db[entity] || [];
  }

  // Método para obtener una entidad por su ID
  getById(entity, id) {
    const db = this.readFile();
    return db[entity]?.find((item) => String(item.id) === String(id)) || null;
  }

  // Método para crear una nueva entidad
  create(entity, data) {
    console.log(data);    
    const db = this.readFile();
    const newItem = { id: Date.now(), ...data }; // Generamos un ID único
    db[entity] = db[entity] ? [...db[entity], newItem] : [newItem];
    this.writeFile(db);
    return newItem;
  }

  // Método para eliminar una entidad por ID
  delete(entity, id) {
    const db = this.readFile();
    const index = db[entity]?.findIndex(
      (item) => String(item.id) === String(id)
    );
    if (index !== -1) {
      db[entity].splice(index, 1); // Eliminar elemento
      this.writeFile(db);
      return true;
    }
    return false;
  }

  // Método para actualizar una entidad
  update(entity, id, updatedData) {
    const db = this.readFile();
    const index = db[entity]?.findIndex(
      (item) => String(item.id) === String(id)
    );
    if (index !== -1) {
      db[entity][index] = { ...db[entity][index], ...updatedData };
      this.writeFile(db);
      return db[entity][index];
    }
    return null;
  }
}

module.exports = Database;
