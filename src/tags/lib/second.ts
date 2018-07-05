'use strict';

import { Product } from '../main';
import { fetchDivId, fetchDivName } from './utils';

const DivToProduct = (element: HTMLDivElement): Product => {
    return {
        id: fetchDivId(element),
        name: fetchDivName(element)
    };
};

const mergeProducts = (a: Product, b: Product): Product => {
    return {
        ...a,
        ...b
    };
};

export const joinBaseProducts = (array: Array<Product>, elements: HTMLCollection): Array<Product> => {
    const parsed = Array.from(elements).map(DivToProduct).sort();

    return array.sort().map((product, index) => mergeProducts(product, parsed[index]));
};
