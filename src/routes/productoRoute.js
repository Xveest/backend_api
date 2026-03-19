const express = require('express');
const { poblarProductos } = require('../controllers/externalController');
const { getProductos, buscarProductoPorNombre, crearProducto } = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/poblar', poblarProductos);
router.get('/', getProductos);
router.get('/buscar', buscarProductoPorNombre);
router.post('/crear',authMiddleware, crearProducto);

module.exports = router;