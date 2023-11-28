const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => {
    const user = {
        firstName: "bless",
        lastName: "el bendito",
        email: "bles@gmail.com",
        password: "12345",
        phone: "13209871947",
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login', async () => {
    const body = {
        email: 'bles@gmail.com',
        password: '12345'  
    }
    const res = await request(app).post(`/users/login`).send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users debe traer todos los usuarios', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id debe actualizar un usuario', async() => {
    const user = {
        firstName: "brayan"
    };
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
 });

test('POST /users/login debe retonar credenciales incorrectas', async () => {
    const body = {
        email: 'bles1@gmail.com',
        password: '817480170'  
    }
    const res = await request(app)
        .post(`/users/login`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(401);
})


 test('DELETE /users/:id debe eliminar un usuario', async () => { 
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);   
    expect(res.status).toBe(204);
    
 });

