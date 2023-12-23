import { Sequelize } from "sequelize";

const db  = new Sequelize(
    'pos', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default db