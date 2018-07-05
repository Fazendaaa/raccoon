import { Product } from '../main';

export const saveProductsToLocal__ = (data: Array<Product>, local: Storage): void => {
    if (undefined !== local) {
        local.setItem('products', JSON.stringify(data));
    }
};

export const fetchProductsFromLocal = (local: Storage): Array<Product> => {
    if (undefined === local) {
        return null;
    }

    return JSON.parse(local.getItem('products'));
};
