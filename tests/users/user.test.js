import request from 'supertest'
import app from '../../src/app.js'
import {faker} from '@faker-js/faker'
import User from '../../src/models/User.js'
import {Op} from 'sequelize'
let authToken
const authenticatedRequest = (method, url) => {
    return request(app)[method](url).set('Authorization', `Bearer ${authToken}`);
};
beforeAll(async () => {
    await User.destroy({ where: {
        [Op.or]: [
                { firstname: { [Op.like]: '%teste%' } },
                { surname: { [Op.like]: '%teste%' } }
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
    const userInDatabase = await User.findOne({where:{email:userEmail}})
    createdUserId = userInDatabase.id;
    const loginRes = await request(app).post('/v1/user/token').send({email:userEmail,password:'12345678'})
    authToken = loginRes.body.token;
});

test('List all users',async ()=>{
    const res = await request(app).get('/v1/user/search');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data')
})
test('Listing a user by a existing ID',async ()=>{
    const res = await authenticatedRequest('get',`/v1/user/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('firstname');
    expect(res.body).toHaveProperty('surname');
    expect(res.body).toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');

})

test('Listing a user with a non existing ID',async ()=>{
    const notExists = createdUserId +909;
    const res = await authenticatedRequest('get',`/v1/user/${notExists}`)
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toContain('not found')
})
test('Should fail listing a user with an NAN ID',async ()=>{
    const res = await authenticatedRequest('get','/v1/user/abc')
    expect(res.status).toBe(400);
})
test('Should create a user',async ()=>{
    const randomUser = {
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:faker.internet.email(),
        password:'123456789',
        confirmpassword:'123456789'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true)
})
test('Should fail when creating a user with an invalid email',async()=>{
    const randomUser = {
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:'teste',
        password:'123456789',
        confirmpassword:'123456789'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('invalid email')
})
test('Should fail when creating a user with a insecure password',async ()=>{
    const randomUser = {
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:faker.internet.email(),
        password:'12',
        confirmpassword:'12'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Invalid password')
})
test('Should fail when passwords dont match',async ()=>{
    const randomUser = {
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:faker.internet.email(),
        password:'12',
        confirmpassword:'21'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('do not match')
})
test('Should fail when creating a user without password',async ()=>{
    const randomUser = {
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:faker.internet.email(),
        
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('required')
})

test('Should fail when creating user with existing email',async ()=>{
    const res = await request(app).post('/v1/user').send({
        firstname:'Garapaxxxxasdasd',
        surname:'Da silvaxxxa',
        email:'ghost212@gmail.com',
        password:'123456789',
        confirmpassword:'123456789'
    })
    expect(res.status).toBe(409);
})
test('Should update username and return 204',async ()=>{
   
    const res = await authenticatedRequest('put',`/v1/user/${createdUserId}`).send({
        firstname:faker.person.firstName(),
        surname:faker.person.lastName(),
        email:faker.internet.email()
    })
    expect(res.status).toBe(204)
})

test('Should delete a user',async()=>{
    const uniqueEmail = faker.internet.email()
    await request(app).post('/v1/user').send({
        firstname:'Delete',
        surname:'User',
        email:uniqueEmail,
        password:'123456789',
        confirmpassword:'123456789'
    })
    const userToRemove = await User.findOne({where:{email:uniqueEmail}})
    const tempId = userToRemove.id
    const res = await authenticatedRequest('delete',`/v1/user/${tempId}`)
    expect(res.status).toBe(204)
    const checkDeletedUserNotExists = await authenticatedRequest('get',`/v1/user/${tempId}`)
    expect(checkDeletedUserNotExists.status).toBe(404)
})
test('Should fail when delete a non existing user',async()=>{
    const id = 3023223;
    const res = await authenticatedRequest('delete',`/v1/user/${id}`)
    expect(res.status).toBe(404)
    expect(res.body.message).toContain('not found')
})