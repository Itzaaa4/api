import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../api/entities/User.js";
import { Settings } from "../api/entities/Settings.js";
dotenv.config();
function getEnv(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Falta la variable de entorno ${name}`);
    return value;
}
export const AppDataSource = new DataSource({
    type: "mysql",
    host: getEnv("DB_HOST"),
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: getEnv("DB_USERNAME"),
    password: getEnv("DB_PASSWORD"),
    database: getEnv("DB_DATABASE"),
    synchronize: true,
    logging: false,
    entities: [User, Settings],
    migrations: [],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => {
    console.log("Conexión exitosa a la base de datos");
})
    .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
});
//# sourceMappingURL=data-source.js.map