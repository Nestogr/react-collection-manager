import {readFileSync} from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const schema = readFileSync("src/database/schema.sql", "utf-8");

const connection = await mysql.createConnection({
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "",
    multipleStatements: true,
});

await connection.query(schema);
console.log("Migration completed.");
await connection.end();