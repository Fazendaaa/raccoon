'use strict';

import { Product } from '../main';

export interface PartialProduct {
    id: string;
    imageURL: string;
}

const isAvailable = (value: Product): boolean => value.available;

const isDivAvailable = (value: HTMLDivElement): boolean => 'true' === value.getAttribute('available');

const isSmartphone = (value: Product): boolean => {
    const matched = value.category.match(/smartphone/gm);

    if (null === matched) {
        return false;
    }

    return 0 < matched.length;
};

const fetchId = (value: Product): string => value.id;

const fetchDivId = (value: HTMLDivElement): string => value.dataset.id;

const fetchDivUrl = (value: HTMLDivElement): string => value.getElementsByTagName('img').item(0).src;

const fetchPartialProduct = (value: HTMLDivElement): PartialProduct => {
    return {
        id: fetchDivId(value),
        imageURL: fetchDivUrl(value)
    };
};

export const availableIds = (products: Array<Product>): Array<string> => products.filter(isAvailable).map(fetchId);

export const smartphonesIds = (products: Array<Product>): Array<string> => products.filter(isSmartphone).map(fetchId);

export const DOMAvailableIds = (products: HTMLCollection): Array<string> => {
    return Array.from(products).filter(isDivAvailable).map(fetchDivId);
};

export const DOMSmartphonesIds = (products: HTMLCollection): Array<PartialProduct> => {
    return Array.from(products).map(fetchPartialProduct);
};
