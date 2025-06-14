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

testConnection();

export default sequelize;



