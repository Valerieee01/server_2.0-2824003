import Categoria from "../models/Categoria.js";

class CategoriaController {

  // Obtener todas las categorías
  static getAllCategorias = async (req, res) => {
    try {    
      // Crear una instancia de la clase Categoria
      const OBJCategoria = new Categoria();
      const categorias = await OBJCategoria.getAll();    
      // Retorna todas las categorías
      res.json(categorias); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener una categoría por su ID
  static getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
      // Crear una instancia de la clase Categoria
      const categoriaInstance = new Categoria(); 
      const categoria = await categoriaInstance.getById(id);
      // Retorna la categoría con el id solicitado
      res.json(categoria); 
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  // Crear una nueva categoría
  static createCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const categoriaInstance = new Categoria(nombre);
      const categoria = await categoriaInstance.create();
      // Retorna la nueva categoría creada
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualizar una categoría
  static updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
      // Crear una instancia de la clase Categoria
      const categoriaInstance = new Categoria(nombre);
      const categoria = await categoriaInstance.update(id);
      // Agrega a la respuesta la categiria modificada
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Eliminar una categoría
  static deleteCategoria = async (req, res) => {
    const { id } = req.params;
    // Crear una instancia de la clase Categoria
    const categoriaInstance = new Categoria();
    // Llamamos al método eliminar del modelo de categorías
    const resultado = await categoriaInstance.delete(id);

    // Validamos la respuesta del modelo
    if (resultado.error) {
      return res.status(400).json({ error: true, mensaje: resultado.mensaje });
    }

    return res.status(200).json({ error: false, mensaje: resultado.mensaje });
  };

}
export default CategoriaController;
