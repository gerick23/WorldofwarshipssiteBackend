
const supertest =require('supertest')
const app = require('../index')
const api = supertest(app)
const Info = require('../models/Info')


describe('adds a stat to the DB and then gets it', ()=>{
    beforeEach(async ()=>{
        await Info.destroy({where:{}})
    })
    test('add a stat to the database', async ()=>{
        const stat = {statistic:'Hits',value:15};
        await api.post('/api/Infos')
                .send(stat)
                .expect(200)
        const response = await api.get('/api/Infos')
        console.log(response.body)
        expect(response.body).toHaveLength(1);
    })

})