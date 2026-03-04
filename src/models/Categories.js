import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
class Categories extends Model { }
Categories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
         defaultValue: 0
    }
},
    {
        sequelize,
        modelName: 'Categories',
        tableName: 'categories',
        timestamps: true,
        underscored: true
    }
)

export default Categories