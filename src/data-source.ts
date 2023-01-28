import "reflect-metadata"
import { DataSource } from "typeorm"
import { Test } from "./entity/Test"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "....",
    password: "....",
    database: "test_data",
    synchronize: true,
    logging: false,
    entities: [Test],
    migrations: [],
    subscribers: [],
})
