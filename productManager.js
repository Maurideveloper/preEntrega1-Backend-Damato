import fs from "fs";

class ProductManager {
  constructor(fileName) {
    //verificamos si existe el producto
    this.fileName = fileName;
    if (fs.existsSync(fileName)) {
      try {
        let products = fs.readFileSync(fileName, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async saveFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getProducts() {
    return this.products;
  }

  async addProducts(product) {
    const existeProducto = this.products.find(
      (producto) => producto.code === product.code
    );
    if (existeProducto) {
      console.log(`Producto con código ${product.code} ya existe.`);
    } else {
      if (this.products.length == 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }

      this.products.push(product);
      const respuesta = await this.saveFile(this.products);

      if (respuesta) {
        console.log("Usuario creado");
      } else {
        console.log("Hubo un error al crear un usuario");
      }
    }
  }

  consultarProducto() {
    console.log(this.products);
    return this.products;
  }

  getProductByID(id) {
    const product = this.products.find((p) => p.id === id);
    return product || "No existe el ID seleccionado";
  }

  async updateProduct(id, updatedProduct) {
    const existeProducto = this.products.find((p) => p.id === id);

    if (existeProducto) {
      existeProducto.title = updatedProduct.title;
      existeProducto.description = updatedProduct.description;
      existeProducto.price = updatedProduct.price;
      existeProducto.thumbnail = updatedProduct.thumbnail;
      existeProducto.code = updatedProduct.code;
      existeProducto.stock = updatedProduct.stock;

      const respuesta = await this.saveFile(this.products);

      if (respuesta) {
        console.log(`Producto con ID ${id} actualizado`);
      } else {
        console.log("Hubo un error al actualizar el producto");
      }
    } else {
      console.log(`No existe el producto con ID ${id}`);
    }
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);

      const respuesta = await this.saveFile(this.products);

      if (respuesta) {
        console.log(`Producto con ID ${id} eliminado`);
      } else {
        console.log("Hubo un error al eliminar el producto");
      }
    } else {
      console.log(`No existe el producto con ID ${id}`);
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock, category) {
    this.title = title || "";
    this.description = description || "";
    this.price = price || 0;
    this.thumbnail = thumbnail || "";
    this.code = code || "";
    this.stock = stock || 0;
    this.status = true;
    this.category = category || "";
  }
}

const producto1 = new Product(
  "Chocolate 1",
  "Chips de chocolate",
  1200,
  "🍫",
  "a1",
  10,
  "c"
);

const producto2 = new Product(
  "Chocolate 2",
  "Chips de chocolate",
  1200,
  "🍫",
  "a2",
  10,
  "a"
);

const producto3 = new Product(
  "Chocolate 3",
  "Chips de chocolate",
  1200,
  "🍫",
  "a2",
  10,
  "d"
);

const producto4 = new Product(
  "Chocolate 4",
  "Chips de chocolate",
  1200,
  "🍫",
  "a4",
  10,
  "f"
);

async function ejecutarTests() {
  const manager = new ProductManager("./productos.json");

  await manager.addProducts(producto1);
  await manager.addProducts(producto2);
  await manager.addProducts(producto3);
  await manager.addProducts(producto4);
  console.log(manager.consultarProducto());
  console.log(manager.getProducts());

  const productoEncontrado = manager.getProductByID(2);
  console.log("Se encontro con el ID el producto: " + productoEncontrado.title);

  const productoActualizado = new Product(
    "Nuevo Chocolate",
    "Nueva descripción",
    1500,
    "🍫",
    "a2",
    5
  );
  await manager.updateProduct(1, productoActualizado);

  await manager.deleteProduct(1);
}

//ejecutarTests()

export { ProductManager };
