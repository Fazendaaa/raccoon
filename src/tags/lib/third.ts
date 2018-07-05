'use strict';

import { Product } from '../main';
import { fetchDivId, fetchDivName, fetchDivPrice, fetchDivUrl } from './utils';

const DivToProduct = (element: HTMLDivElement): Product => {
    return {
        id: fetchDivId(element),
        ...fetchDivPrice(element),
        name: fetchDivName(element),
        imageURL: fetchDivUrl(element)
    };
};

const mergeProducts = (a: Product, b: Product): Product => {
    return {
        ...a,
        ...b
    };
};

export const joinProducts = (array: Array<Product>, elements: HTMLCollection): Array<Product> => {
    const parsed = Array.from(elements).map(DivToProduct).sort();

    return array.sort().map((product, index) => mergeProducts(product, parsed[index]));
};
