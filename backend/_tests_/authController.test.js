const request = require('supertest')
const app = require('../index')

describe("POST /api/auth/login", () => {

    let TestedEmail = "test1@gmail.com"
    let TestedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTljMTk4YmUxM2U5ZTE0YWU5ODQ0OSIsImlhdCI6MTY4MTIyNDg3Nn0.7yLSoZuJlMK95QGWBfwoLQ9ZEGDdgSZMroa2afB6zuQ"
    let TestedResetPaswordLink = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdWFtYW5sYW1rYWRteGRAZ21haWwuY29tIiwiZXhwaXJlVGltZSI6IjIwMjMtMDQtMTFUMTU6MjI6MTEuMDU0WiIsImlhdCI6MTY4MTIyNjIzMX0.fw_gyklYJTswKx2ms0SMjifu6LLmXmqRmOPD11d2wv0"
    describe('body tests', () => {
        test('test if login email and password are invalid.', async () => {
            let body = {
                email: "", password: ""
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.text).toBe("Invalid email or password.")
        })

        test('test if login works.', async () => {
            let body = {
                email: "nouamanlamkadmxd@gmail.com", password: "lol"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.status).toBe(200)
        })

        test('test if register email already exist.', async () => {
            let body = {
                firstName: 'Test1',
                lastName: 'Test2',
                email: "nouamanlamkadmxd@gmail.com",
                password: "test"
            }
            const response = await request(app).post('/api/auth/register').send(body)
            expect(response.text).toBe("Email already in use.")
        })

        test('test if register works.', async () => {
            let body = {
                firstName: 'xyz',
                lastName: 'xyz',
                email: TestedEmail,
                password: "test"
            }
            const response = await request(app).post('/api/auth/register').send(body)
            expect(response.text).toBe("An email has been sent to your email for verification.")
        })

        test('test if unverified account cannot login yet.', async () => {
            let body = {
                firstName: 'xyz',
                lastName: 'xyz',
                email: TestedEmail,
                password: "test"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.text).toBe("Account not verified yet.")
        })

        test('test if token is verified.', async () => {
            const response = await request(app).get('/api/auth/tokenVerification/' + TestedToken)
            expect(response.status).toBe(200)
        })

        test('test if token is not verified.', async () => {
            const response = await request(app).get('/api/auth/tokenVerification/' + TestedToken + 'something else.')
            expect(response.status).toBe(222)
        })

        test('test if forget password email exist.', async () => {
            const response = await request(app).get('/api/auth/forgetpassword/' + TestedEmail)
            expect(response.status).toBe(200)
        })

        test('test if forget password email not exist.', async () => {
            const response = await request(app).get('/api/auth/forgetpassword/' + TestedEmail + 'something else')
            expect(response.status).toBe(222)
        })

        test('test if reset Link Token is valid.', async () => {
            const response = await request(app).get('/api/auth/resetLinkTokenVerification/' + TestedResetPaswordLink)
            expect(response.status).toBe(222)
        })

        test('test if reset Link Token is not valid.', async () => {
            const response = await request(app).get('/api/auth/resetLinkTokenVerification/' + TestedResetPaswordLink + 'something else')
            expect(response.status).toBe(222)
        })
    })
})