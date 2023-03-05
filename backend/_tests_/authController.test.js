const request = require('supertest')
const app = require('../index')

describe("POST /api/auth/login", () => {
    describe('if body is empty', () => {
        test('test if email and password is empty', async () => {
            let body = {
                email: "", password: ""
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("User not found with this email")
        })
    })

    describe('if body is not empty', () => {
        test('test if email not exist in database', async () => {
            let body = {
                email: "lol@gmail.com", password: "sassd"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Not found user with this email")
        })

        test('test if password incorect', async () => {
            let body = {
                email: "Noulamin@gmail.com", password: "hshsjd"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Incorect password")
        })

        test('test if password correct', async () => {
            let body = {
                email: "Noulamin@gmail.com", password: "test"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.statusCode).toBe(200)
        })
    })
})