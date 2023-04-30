
/*const supertest =require('supertest')
const app = require('../index')
const api = supertest(app)
const Info = require('../models/Info')


describe('checks database operations', ()=>{
    beforeAll(async ()=>{
        await Info.destroy({where:{}})
    })
    test('add a stat to the database', async ()=>{
        const stat = {statistic:'Hits',value:15};
        const second={statistic:'Hits',value:23};
        await api.post('/api/Infos')
                .send(stat)
                .expect(200)
        await api.post('/api/Infos')
                .send(second)
                .expect(200)
        const response = await api.get('/api/Infos')
        console.log(response.body)
        expect(response.body).toHaveLength(2);
    })
    test('find a specific stat in the database', async ()=>{
        const neededstat = {statistic:'Hits'};
        console.log(neededstat.statistic)
        console.log(neededstat.value)
        const response =  await api.get(`/api/Infos/${neededstat.statistic}`).expect(200)
        expect(response.body).toHaveLength(2)
        console.log(response.body)
    })
    test('delete a specific stat in the database', async ()=>{
        const removalstat = {statistic:'Hits', value:15}
         await api.delete(`/api/Infos/${removalstat.statistic}/${removalstat.value}`)
        const deletedtable = await api.get('/api/Infos')
        console.log(deletedtable.body)
        expect(deletedtable.body).toHaveLength(1)
    })
    //Info.destroy({where:{}})
})*/