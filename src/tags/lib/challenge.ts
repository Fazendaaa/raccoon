import { Product } from '../main';

// JSDOM's Storage isn't working properly, that's why I needed to do one of my own.
export class MockStorage implements Storage {
    public readonly length: number;
    private data = {};

    public getItem(key: string): string {
        const value = this.data[key];

        return undefined === value ? null : value;
    }

    public setItem(key: string, value: string): void {
        this.data[key] = value;
    }

    public removeItem(key: string): boolean {
        return delete this.data[key];
    }

    public clear(): void {
        Object.keys(this.data).map(value => {
            delete this.data[value];
        });
    }

    public key(index: number): string {
        return Object.keys(this.data)[index];
    }
}

export const saveProductsToLocal = (data: Array<Product>, local: Storage): boolean => {
    if (undefined === local) {
        return false;
    }

    local.setItem('productList', JSON.stringify(data));

    return true;
};

export const fetchProductsFromLocal = (local: Storage): Array<Product> => {
    if (undefined === local) {
        return null;
    }

    const data = local.getItem('productList');

    return null !== data ? JSON.parse(data) : null;
};
