import { Product } from '../main';
import { fetchDivId, fetchDivName, joiningProducts } from './utils';

const divToProduct = (element: HTMLDivElement): Product => {
    return {
        id: fetchDivId(element),
        name: fetchDivName(element)
    };
};

export const joinBaseProducts = (array: Array<Product>, elements: HTMLCollection): Array<Product> => {
    return joiningProducts(array, elements, divToProduct);
};
