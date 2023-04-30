const supertest =require('supertest')
const app = require('../index')
const api = supertest(app)
const Info = require('../models/Info')
const User = require('../models/users')

describe('checks functionality of user operations',()=>{
    beforeAll(async ()=>{
        await User.destroy({where:{}})
    })
    //sucessfully add unique user to the database
    test('add user to the database',async ()=>{
        const password = 'secretpassword';
        const username = 'secretusername';
        const newuser = {username:username,hashedpassword:password};
        await api.post('/api/users')
                .send(newuser)
                .expect(200)
        const users = await api.get('/api/users')
        expect(users.body).toHaveLength(1);
    })
    //check if duplicate users fails
    test('check is adding an already added user fails', async ()=>{
        const password = 'secretpassword'
        const username = 'secretusername'
        const exactuser = {username:username, hashedpassword:password}
        await api.post('/api/users')
                .send(exactuser)
                .expect(400)
        const users = await api.get('/api/users')
        expect(users.body).toHaveLength(1)
    })
    //check adding stat to particular user
    //check adding duplicate stat to same user.
})


