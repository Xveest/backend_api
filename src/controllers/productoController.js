const pool = require('../config/db');


const getProductos = async (request, response) => {
    try {
        const query = 'SELECT * FROM productos ORDER BY nombre';
        const result = await pool.query(query);

        response.status(200).json({
            cantidad: result.rows.length,
            productos: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

const buscarProductoPorNombre = async (request, response) => {
    try {
        const { nombre } = request.query;

        if (!nombre) {
            return response.status(400).json({ error: 'El parámetro nombre es requerido' });
        }

        const query = `
            SELECT * FROM productos
            WHERE nombre ILIKE $1
            ORDER BY nombre
        `;

        const result = await pool.query(query, [`%${nombre}%`]);

        response.status(200).json({
            cantidad: result.rows.length,
            productos: result.rows
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};

const crearProducto = async (request, response) => {
    try {
        const { nombre, precio, stock, descripcion, imagen_url, youtube_id,latitud,longitud } = request.body;

        if (!nombre || !precio) {
            return response.status(400).json({ error: 'Los campos nombre y precio son requeridos' });
        }

        const query = 
            `INSERT INTO productos (nombre, precio, stock, descripcion, imagen_url, youtube_id, latitud, longitud)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`
            ;

        const result = await pool.query(query, [
            nombre, 
            precio, 
            stock || 0, 
            descripcion || null, 
            imagen_url || null, 
            youtube_id || null, 
            latitud || null, 
            longitud || null
        ]);

        response.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: result.rows[0]
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({ error: error.message });
    }
};


module.exports = { getProductos, buscarProductoPorNombre, crearProducto };
