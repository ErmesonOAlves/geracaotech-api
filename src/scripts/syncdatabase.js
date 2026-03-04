import sequelize from '../config/connection.js';
import Users from '../models/Users.js';
import Categories from '../models/Categories.js';
import Product from '../models/Product.js'
import ProductImages from '../models/ProductImages.js'
import ProductOptions from '../models/ProductOptions.js'
import ProductCategories from '../models/ProductCategories.js'
import '../models/associations.js'
export const syncDatabase = async ()=>{
    try {
    console.log(`Realizando conexao ao banco`)
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    console.log("Tabela 'users' sincronizada com sucesso!");
        process.exit(0);
} catch (error) {
    console.log(`Erro na sincronização do banco de dados`);
    console.log(error.message)
    process.exit(1);
}
}



syncDatabase();