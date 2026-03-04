import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'
class Users extends Model { }
Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        len: [8, 100] 
    }
    }
},
    {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
        underscored: true
    }
)

export default Users