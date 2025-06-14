import { Sequelize } from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME || 'E-comm',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'fenil@159', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || 'fenil@159',
    port: parseInt(process.env.DB_PORT || '5432'),
    logging: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection the PostgreSQL Database....")

        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully');
    } catch (error) {
        console.log('Unable to connect to the database : ', error);
        process.exit(0);
    }
}

// async function testConnection(retries = 5, delay = 5000) {
//     while (retries) {
//         try {
//             await sequelize.authenticate();
//             console.log(" Connected to PostgreSQL DB!");
//             await sequelize.sync({ alter: true });
//             console.log(' Models synced');
//             break; 
//         } catch (error) {
//             console.log(' Unable to connect to the database:', error);
//             retries--;
//             if (retries === 0) {
//                 console.error(" Exhausted all retries. Exiting...");
//                 process.exit(1);
//             }
//             console.log(` Retrying in ${delay / 1000}s...`);
//             await new Promise((res) => setTimeout(res, delay));
//         }
//     }
// }


testConnection();

export default sequelize;



