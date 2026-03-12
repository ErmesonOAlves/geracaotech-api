import request from 'supertest'
import app from '../../src/app.js'
import Category from '../../src/models/Category.js'
import {Op} from 'sequelize'
let authToken
let createdCategoryId
const authenticatedRequest = (method, url) => {
    return request(app)[method](url).set('Authorization', `Bearer ${authToken}`);
};

beforeAll(async () => {
    await Category.destroy({ where: {
        [Op.or]: [
                { name: { [Op.like]: '%teste%' } },
                { slug: { [Op.like]: '%teste%' } }
            ]
    }});
    await request(app).post('/v1/user').send({
        firstname:'Ermeson',
        surname:'alves',
        email:'ghost212@gmail.com',
        password:'12345678',
        confirmpassword:'12345678'
    })
    const userEmail = 'ghost212@gmail.com'

    //capturando o ID, pois no post nem no get retorno o ID
    const loginRes = await request(app).post('/v1/user/token').send({email:userEmail,password:'12345678'})
    authToken = loginRes.body.token;
   const newCategory = {
        name: 'Categoria teste',
        slug: 'categoria-teste'
   }
   await authenticatedRequest('post','/v1/category').send(newCategory)
    
    const categoryInDB = await Category.findOne({where:{slug:newCategory.slug}}) 
    createdCategoryId = categoryInDB.id;
       
});
test('List all categories',async()=>{
    const res = await request(app).get('/v1/category/search');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
})
test('List a Category By Id',async ()=>{
    const res = await authenticatedRequest('get', `/v1/category/${createdCategoryId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('slug');
    expect(res.body).toHaveProperty('use_in_menu');
})