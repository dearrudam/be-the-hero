const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG resources', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    })

    it('should be able to create a new ONG with valid parameters', async () => {

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Ong2",
                email: "contato@ong2.com.br",
                whatsapp: "11999999999",
                city: "São Paulo",
                uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });

});
