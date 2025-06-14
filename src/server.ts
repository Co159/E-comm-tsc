import express from 'express';
import './config/express-aug';
import router from './routes';
const server = express();
require("dotenv").config();
require("./config/db");

let Port = process.env.PORT;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router);

try {
    server.listen(`${Port}`, (): void => {
        console.log(`server is connected on port: ${Port}....`);
    });
} catch (error) {
    console.log("Server failed.....")
   
}