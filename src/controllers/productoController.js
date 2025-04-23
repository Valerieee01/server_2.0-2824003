import  Producto  from "../models/Producto.js";

class ProductoController{

  // Obtener todos los productos
  static getAllProductos = async (req, res) => {
    try {
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método listar
      const productos = await OBJProducto.getAll();
      // Retornamos todos los productos
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener un producto por su ID
  static getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Creamos la instancia de producto
      const OBJProducto = new Producto();
      // Llamamos el metodo consultar porducto por ID
      const producto = await OBJProducto.getById(id);
      // Retornamos el prodcuto con el id solicitado
      res.json(producto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  // Crear un nuevo producto
  static createProducto = async (req, res) => {  
    const { nombre, descripcion, precio, categoria_id } = req.body;  
    try {
      // Creamos una instancia de producto
      const OBJProducto = new Producto(nombre, descripcion, precio, categoria_id);
      // Llamamos el método crear
      const producto = await OBJProducto.create();
      // Respondemos con el objeto creado
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualizar un producto
  static updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria_id, precio } = req.body;
    try {
      // Creamos una instancia de producto
      const OBJProducto = new Producto(nombre, descripcion, precio, categoria_id);
      // Llamamos el método actualizar
      const producto = await OBJProducto.update(id);
      // Retornamos el producto actualizado
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualización parcial del producto
  static updatePartialProduct = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Creamos una instancia de producto
      const OBJProducto = new Producto(id, campos);
      const producto = await OBJProducto.updatePartial(id, campos);
      if (!producto) {
        return res
          .status(404)
          .json({ error: true, mensaje: "Producto no encontrado." });
      }
      // Retornamos la respuesta
      res.status(200).json({ error: false, producto: producto });
    } catch (error) {
      res.status(500).json({
        error: true,
        mensaje: "Error al actualizar parcialmente el producto.",
      });
    }
  };

  // Eliminar un producto
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    // Creamos una instancia de producto
    const OBJProducto = new Producto(id);
    // Llamamos al método eliminar del modelo
    const resultado = await OBJProducto.delete(id);

    // Validamos la respuesta del modelo
    if (resultado.error) {
      return res.status(400).json({ error: true, mensaje: resultado.mensaje });
    }

    return res.status(200).json({ error: false, mensaje: resultado.mensaje });
  };

}

export default ProductoController;
