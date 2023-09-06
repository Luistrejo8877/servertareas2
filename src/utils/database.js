import { Sequelize } from "sequelize"


const db = new Sequelize(
    {
    dialect: 'postgres',
    host: "ep-winter-frost-66905832.ap-southeast-1.aws.neon.tech",
    port: 5432,
    username: "fl0user",
    password: 'kr7ycfZKPWm6',
    database: "tareas",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  
export default db