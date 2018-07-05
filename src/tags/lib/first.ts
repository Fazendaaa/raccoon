'use strict';

import { Product } from '../main';

export interface ParsedProduct {
    id: string;
    imageURL: string;
}

const isAvailable = (value: Product): boolean => value.available;

const isSmartphone = (value: Product): boolean => {
    const matched = value.category.match(/smartphone/gm);

    if (null === matched) {
        return false;
    }

    return 0 < matched.length;
};

const fetchId = (value: Product): string => value.id;

export const availableIds = (products: Array<Product>): Array<string> => products.filter(isAvailable).map(fetchId);

export const smartphonesIds = (products: Array<Product>): Array<string> => products.filter(isSmartphone).map(fetchId);

export const DOMAvailableIds = (products: Array<Product>): Array<string> => products.filter(isAvailable).map(fetchId);

export const DOMSmartphonesIds = (products: Array<Product>): Array<ParsedProduct> => [];
