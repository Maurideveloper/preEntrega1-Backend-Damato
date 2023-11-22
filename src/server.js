// const express = require("express");
import express from "express";
import product from "./routes/products.js"
import cart from './routes/carts.js'
//import carts from "./routes/carts.js"
const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json()) //para que lleguen las peticiones por post
app.use(express.urlencoded({ extended: true })); //para recibir los datos post generalmente


// Routes
app.use("/api/products", product);
app.use("/api/carts", cart);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
