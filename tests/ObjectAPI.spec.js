import { test, expect } from '@playwright/test';
import BaseAPI from '../API/baseAPI';
import { ENDPOINTS } from '../API/endpoints';
import { validateSchema, calculateResponseTime } from '../API/apiUtils';


let api;

test.beforeAll(async () => {
    api = new BaseAPI(); // pass token if needed
    await api.init();
});

test('GET single object', async () => {
    const startTime = Date.now();

    const response = await api.get(ENDPOINTS.GET_SINGLE(2));

    const responseTime = calculateResponseTime(startTime);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe('2');
    expect(body.name).toBe('Apple iPhone 12 Mini, 256GB, Blue');

    expect(responseTime).toBeLessThan(1000);
});

test('GET all objects', async () => {
    const response = await api.get(ENDPOINTS.GET_ALL);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    body.forEach(item => validateSchema(item));
});

test('POST object', async () => {
    const payload = {
        name: 'Mac book new',
        data: {
            year: 2026,
            price: 1849.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '2 TB'
        }
    };

    const response = await api.post(ENDPOINTS.CREATE, payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(payload.name);
});

test('PUT object', async () => {
    const id = 'ff8081819d62221a019d7827f1541f29';

    const payload = {
        name: 'Updated Mac book',
        data: {
            year: 2026
        }
    };

    const response = await api.put(ENDPOINTS.UPDATE(id), payload);

    expect(response.status()).toBe(200);
});

test('DELETE object', async () => {
    const id = 'ff8081819d62221a019d7827f1541f29';

    const response = await api.delete(ENDPOINTS.DELETE(id));

    expect(response.status()).toBe(200);
});