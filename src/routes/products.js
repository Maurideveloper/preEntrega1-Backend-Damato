import { Router } from "express";
import { ProductManager } from "../../productManager.js";

const manager = new ProductManager("productos.json");

const products = await manager.getProducts();

const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;

  console.log(products);

  //Definimos si es true
  if (limit) {
    const limitNumber = Number(limit); //Lo transformamos en numero
    if (isNaN(limitNumber)) {
      res.send("El limite no es correcto");
    }
    //cortamos el array dependiedo del limit
    const limitedProducts = products.slice(0, limitNumber);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    //buscamos el id comparado con p.id
    const productFilter = products.find((p) => p.id === Number(pid));

    if (productFilter) {
      res.json(productFilter);
    } else {
      res.json({ error: "No se encontro ningun producto con ese ID" });
    }
  }
});

router.post("/", (req, res) => {
  let producto = req.body;
  res.send(manager.addProducts(producto));
});

router.put("/:pid", (req, res) => {
  let productoModificado = req.body;
  res.send(manager.updateProduct(Number(req.params.pid), productoModificado));
});

router.delete("/:pid", (req, res) => {
  res.send(manager.deleteProduct(Number(req.params.pid)));
});

export default router;
