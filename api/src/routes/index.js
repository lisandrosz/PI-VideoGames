const { Router } = require("express");
const videogamesRouter = require("./videogamesRouter.js");
const genresRouter = require("./genresRouter.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/videogames", videogamesRouter);
router.use("/genres", genresRouter);

router.get("/", (req, res) => {
  res.send("Estas en el home");
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
