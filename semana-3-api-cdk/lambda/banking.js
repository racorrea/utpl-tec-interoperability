exports.handler = async (event) => {
    // Función para generar números aleatorios dentro de un rango
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Datos financieros de ejemplo para varias personas
    const financialData = [];
    
    // Generar datos para 10 personas
    for (let i = 1; i <= 10; i++) {
        const person = {
            "nombre": `Persona ${i}`,
            "saldo": getRandomNumber(1000, 10000),
            "transacciones": [],
            "cuentas": [],
            "prestamos": []
        };
        
        // Generar datos aleatorios para cuentas y transacciones
        const numAccounts = getRandomNumber(1, 3); // Entre 1 y 3 cuentas por persona
        for (let j = 0; j < numAccounts; j++) {
            const accountType = j === 0 ? "Cuenta corriente" : "Cuenta de ahorros";
            const account = {
                "tipo": accountType,
                "saldo": getRandomNumber(500, 5000)
            };
            person.cuentas.push(account);
            
            // Generar transacciones para cada cuenta
            const numTransactions = getRandomNumber(1, 5); // Entre 1 y 5 transacciones por cuenta
            for (let k = 0; k < numTransactions; k++) {
                const transaction = {
                    "fecha": `2022-01-${getRandomNumber(1, 31)}`,
                    "monto": getRandomNumber(-500, 500),
                    "descripcion": "Descripción de la transacción"
                };
                person.transacciones.push(transaction);
            }
        }
        
        // Generar datos aleatorios para préstamos
        const numLoans = getRandomNumber(0, 2); // Hasta 2 préstamos por persona
        for (let l = 0; l < numLoans; l++) {
            const loan = {
                "fecha_inicio": `2022-01-${getRandomNumber(1, 31)}`,
                "monto": getRandomNumber(1000, 10000),
                "interes": getRandomNumber(5, 20),
                "plazo_meses": getRandomNumber(6, 24)
            };
            person.prestamos.push(loan);
        }
        
        // Agregar persona a los datos financieros
        financialData.push(person);
    }
    
    // Devolver los datos financieros como respuesta
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(financialData)
    };
    
    return response;
};