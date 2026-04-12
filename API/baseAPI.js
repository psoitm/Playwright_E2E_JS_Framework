import { request } from '@playwright/test';

export default class BaseAPI {
    constructor(token = null) {
        this.token = token;
        this.context = null;
    }

    async init() {
        this.context = await request.newContext({
            baseURL: 'https://api.restful-api.dev',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                //  ...(this.token && { Authorization: `Bearer ${this.token}` })
            }
        });
    }

    async get(url) {
        return await this.context.get(url);
    }

    async post(url, data) {
        return await this.context.post(url, { data });
    }

    async put(url, data) {
        return await this.context.put(url, { data });
    }

    async delete(url) {
        return await this.context.delete(url);
    }
}