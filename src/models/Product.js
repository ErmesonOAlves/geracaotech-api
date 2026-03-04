import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'
class Product extends Model{}
Product.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false
    },
    use_in_menu:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: true
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type: DataTypes.FLOAT(10,2),
        allowNull: false
    },
    price_with_discount:{
        type: DataTypes.FLOAT(10,2),
        allowNull: false
    }
   
},{
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: true,
    underscored: true
})

export default Product