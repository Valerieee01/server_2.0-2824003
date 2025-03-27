import Categoria from "../models/Categoria.js";

// Obtener todas las categorías
const getAllCategorias = async (req, res) => {
  try {    
    const OBJCategoria = new Categoria(); // Crear una instancia de la clase Categoria
    const categorias = await OBJCategoria.getAll();    
    res.json(categorias); // Retorna todas las categorías
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una categoría por su ID
const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoriaInstance = new Categoria(); // Crear una instancia de la clase Categoria
    const categoria = await categoriaInstance.getById(id);
    res.json(categoria); // Retorna la categoría con el id solicitado
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const categoriaInstance = new Categoria(nombre); // Crear una instancia de la clase Categoria
    const categoria = await categoriaInstance.create();
    res.status(201).json(categoria); // Retorna la nueva categoría creada
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una categoría
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoriaInstance = new Categoria(nombre); // Crear una instancia de la clase Categoria
    const categoria = await categoriaInstance.update(id);
    res.json(categoria); // Retorna la categoría actualizada
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  const categoriaInstance = new Categoria(); // Crear una instancia de la clase Categoria
  // Llamamos al método eliminar del modelo de categorías
  const resultado = await categoriaInstance.delete(id);

  // Validamos la respuesta del modelo
  if (resultado.error) {
    return res.status(400).json({ error: true, mensaje: resultado.mensaje });
  }

  return res.status(200).json({ error: false, mensaje: resultado.mensaje });
};

export  {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
