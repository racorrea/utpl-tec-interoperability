exports.handler = async (event) => {
    // Conectar Mysql
    const mysql = require('mysql');

    // Crear la conexion a mysql
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'banking'
    })

    // Obtener saldo de la cuenta de la tabla de mysql transacciones de la persona 1
    const query = 'SELECT saldo FROM transacciones WHERE persona = 1 ORDER BY id DESC LIMIT 1';
    


}