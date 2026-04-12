import { test, expect, request } from '@playwright/test';

let token;

let apiContext; // ✅ shared variable

test.beforeAll(async () => {

    apiContext = await request.newContext({
        baseURL: 'https://api.restful-api.dev',
        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }
    });
});

test('Verify Get Request for single object', async () => {
    const startTime = Date.now();

    const response = await apiContext.get('/objects/2');

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe('2');
    expect(body.name).toBe('Apple iPhone 12 Mini, 256GB, Blue');
    expect(responseTime).toBeLessThan(1000);
});
test('Verify Get Request for multiple objects', async ({ request }) => {
    const startTime = Date.now();
    const response = await apiContext.get('/objects');
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(13);
    for (let i = 0; i < body.length; i++) {
        expect(body[i]).toHaveProperty('id');
        expect(body[i]).toHaveProperty('name');
        expect(body[i].id).toBeTruthy();
        expect(body[i].name).toBeTruthy();
    }
    expect(body[0].data).toBeTruthy();
    // expect(body.id).toBe('2');
    // expect(body.name).toBe('Apple iPhone 12 Mini, 256GB, Blue');
    expect(responseTime).toBeLessThan(1000);
});

test('Verify Post Request for single object', async ({ request }) => {

    const response = await request.post('https://api.restful-api.dev/objects',
        {
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
        },
        {
            data: {
                name: 'Mac book new',
                data: {
                    year: 2026,
                    price: 1849.99,
                    'CPU model': 'Intel Core i9',
                    'Hard disk size': '2 TB'
                }
            }
        });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body.name).toBe('Mac book new');
});

test('Verify PUT Request for single object', async ({ request }) => {

    const response = await request.put('https://api.restful-api.dev/objects/ff8081819d62221a019d7827f1541f29',
        {
            data: {
                name: 'Mac book new',
                data: {
                    year: 2026,
                    price: 1849.99,
                    'CPU model': 'Intel Core i9',
                    'Hard disk size': '2 TB'
                }
            }
        });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body.name).toBe('Mac book new');
});


test('Verify Delete Request for single object', async ({ request }) => {

    const response = await request.delete('https://api.restful-api.dev/objects/ff8081819d62221a019d7827f1541f29');

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);


});