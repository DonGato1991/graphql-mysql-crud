import { createConnection } from "typeorm";
import { User } from './entities/User';
import { HOST_DB, PORT_DB, USER_NAME_DB, PASS_DB, NAME_DB } from './config';

export const connectionDB = async () => {
    await createConnection({
        type: "mariadb",
        host: HOST_DB,
        port: Number(PORT_DB),
        username: USER_NAME_DB,
        password: PASS_DB,
        database: NAME_DB,
        entities:[User],
        ssl: false,
        synchronize: false
    })
} 