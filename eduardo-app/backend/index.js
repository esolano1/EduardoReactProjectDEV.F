const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());         
app.use(express.json()); 
// endpoint básico
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

// inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
