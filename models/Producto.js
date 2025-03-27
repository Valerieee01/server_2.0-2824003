import connection from "../utils/db.js";

class Producto {
  constructor(nombre, descripcion, precio, categoria_id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria_id = categoria_id;
  }

  // Obtener todos los productos
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows; // Retorna los productos obtenidos
    } catch (error) {
      throw new Error("Error al obtener los productos");
    }
  }

  // Método para obtener un producto por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM productos WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        throw new Error("Producto no encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el prodcuto");
    }
  }

  // Método para crear un nuevo producto
  async create() {
    try {
      const [result] = await connection.query(
        "INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?,?,?,?)",
        [this.nombre, this.descripcion, this.precio, this.categoria_id]
      );
      return {
        id: result.insertId,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        categoria_id: this.categoria_id,
      };
    } catch (error) {
      throw new Error("Error al crear el producto");
    }
  }

  // Método para actualizar un producto
  async update(id) {
    try {
      const [result] = await connection.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, categoria_id = ?, precio = ? WHERE id = ?",
        [this.nombre, this.descripcion, this.categoria_id, this.precio, id]
      );
      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado");
      }
      // Retornamos el producto actualizado
      return {
        id,
        nombre: this.nombre,
        descripcion: this.descripcion,
        categoria_id: this.categoria_id,
        precio: this.precio,
      };
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  // Actualizacion parcial del modelo
  async updatePartial(id, campos) {
    let query = "UPDATE productos SET ";
    let params = [];

    // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
    for (const [key, value] of Object.entries(campos)) {
      query += `${key} = ?, `;
      params.push(value);
    }

    // Eliminamos la última coma y espacio de la consulta
    query = query.slice(0, -2);

    // Añadimos la condición WHERE para seleccionar el producto por su ID
    query += " WHERE id = ?";
    params.push(id);

    try {
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (err) {
      console.error("Error al actualizar parcialmente el producto:", err);
      throw new Error("Error al actualizar el producto");
    }
  }

  // Eliminar un producto
  async delete(id) {
    try {
      // Procedemos con la eliminación si no está relacionada
      const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "Producto no encontrado.",
        };
      }
      return {
        error: false,
        mensaje: "Producto eliminado exitosamente.",
      };
    } catch (error) {
      res.status(500).json({
        error: true,
        mensaje: "Error al eliminar el producto.",
      });
    }
  }
}

export default Producto;
