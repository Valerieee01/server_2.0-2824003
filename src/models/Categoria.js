import connection from "../utils/db.js";

class Categoria {
  constructor(nombre) {
    this.nombre = nombre;
  }

  // Método para obtener todas las categorías
  async getAll() {
    try {      
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows; // Retorna las categorías obtenidas
    } catch (error) {
      throw new Error("Error al obtener las categorías");
    }
  }

  // Método para obtener una categoría por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias WHERE id = ?", [
        id,
      ]);


      /**
       * 
       * 
       * Push select * from prodcutos where categoria_id = 2
       * 
       * 
       */



      if (rows.length === 0) {
        throw new Error("Categoría no encontrada");
      }
      return rows[0]; // Retorna la categoría encontrada
    } catch (error) {
      throw new Error("Error al obtener la categoría");
    }
  }

  // Método para crear una nueva categoría
  async create() {
    try {
      const [result] = await connection.query(
        "INSERT INTO categorias (nombre) VALUES (?)",
        [this.nombre]
      );
      return { id: result.insertId, nombre: this.nombre }; // Retorna el ID de la categoría creada
    } catch (error) {
      throw new Error("Error al crear la categoría");
    }
  }

  // Método para actualizar una categoría
  async update(id) {
    try {
      const [result] = await connection.query(
        "UPDATE categorias SET nombre = ? WHERE id = ?",
        [this.nombre, id]
      );
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada");
      }
      return { id, nombre: this.nombre }; // Retorna la categoría actualizada
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  // Método para verificar si la categoría está asociada a productos
  async estaRelacionadaConProductos(categoriaId) {
    const [productos] = await connection.query(
      "SELECT * FROM productos WHERE categoria_id = ?",
      [categoriaId]
    );
    return productos.length > 0; // Si hay productos, está relacionada
  }

  // Método para eliminar una categoría
  async delete(categoriaId) {
    // Verificamos si la categoría está relacionada a algún producto
    const categoriaRelacionado = await this.estaRelacionadaConProductos(
      categoriaId
    );

    if (categoriaRelacionado) {
      return {
        error: true,
        mensaje:
          "No se puede eliminar la categoría, ya que está asociada a uno o más productos.",
      };
    }

    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [
      categoriaId,
    ]);

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "Categoría no encontrada.",
      };
    }

    return {
      error: false,
      mensaje: "Categoría eliminada exitosamente.",
    };
  }
}

export default Categoria;
