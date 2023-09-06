import {DataTypes} from "sequelize"
import db from "../utils/database.js";

const todos = db.define("todos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    completed:  {
        type: DataTypes.BOOLEAN({multi:true}),
        allowNull: false
    }
});
export default todos
