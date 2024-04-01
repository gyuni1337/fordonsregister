'use server';

import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
    host: 'localhost',
    database: 'fordonsregister',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

}); 

async function getVehicles() {
    const db = await pool.getConnection();
    const [rows, fields] = await db.query('SELECT * FROM vehicles');
    
    db.release();
    return rows;
}

async function registerVehicle(vehicle) {
    const db = await pool.getConnection();
    try {
        await db.query('INSERT INTO vehicles (brand, model, year, color, wheels, type, registration) VALUES (?, ?, ?, ?, ?, ?, ?)', [vehicle.brand, vehicle.model, vehicle.year, vehicle.color, vehicle.wheels, vehicle.type, vehicle.registration]);
        db.release();
        return true;
    } catch(e) {
        console.log(e);
        db.release();
        return false;
    }

}

async function updateVehicle(vehicle) {
    const db = await pool.getConnection();
    try {
        await db.query('UPDATE vehicles SET brand = ?, model = ?, year = ?, color = ?, wheels = ?, type = ?, registration = ? WHERE id = ?', [vehicle.brand, vehicle.model, vehicle.year, vehicle.color, vehicle.wheels, vehicle.type, vehicle.registration, vehicle.id]);
        db.release();
        return true;
    } catch(e) {
        console.log(e);
        db.release();
        return false;
    }
}

async function deleteVehicle(id) {
    const db = await pool.getConnection();
    try {
        await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
        await db.query("ALTER TABLE vehicles AUTO_INCREMENT = 1");
        await db.query("SET @num := 0");
        await db.query("UPDATE vehicles SET id = @num := (@num+1)");
        db.release();
        return true;
    } catch(e) {
        console.log(e);
        db.release();
        return false;
    }
}


export { getVehicles, registerVehicle, updateVehicle, deleteVehicle };