import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
    providedIn: 'root',
})
export class IdbService {
    constructor() {}
    public openDB(dbname: any) {
        return openDB('auth', 1, {
            upgrade(db) {
                db.createObjectStore(dbname);
            },
        });
    }

    async get(key: string) {
        return (await this.openDB('tmp')).get('tmp', key);
    }

    async set(key: string, val: any) {
        return (await this.openDB('tmp')).put('tmp', val, key);
    }

    public async remove(key: string) {
        return (await this.openDB('tmp')).delete('tmp', key);
    }

    async delete(key: string) {
        return (await this.openDB('tmp')).delete('tmp', key);
    }

    async clear() {
        return (await this.openDB('tmp')).clear('tmp');
    }

    async keys() {
        return (await this.openDB('tmp')).getAllKeys('tmp');
    }
}
