const express = require('express');
const { poblarProductos } = require('../controllers/externalController');
const { buscarProductoPorNombre } = require('../controllers/productoController');
const router = express.Router();

router.post('/poblar', poblarProductos);
router.get('/buscar', buscarProductoPorNombre);

module.exports = router;