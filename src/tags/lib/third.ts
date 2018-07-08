import { Product } from '../main';
import { fetchDivId, fetchDivName, fetchDivPrice, fetchDivUrl, joiningProducts } from './utils';

const divToProduct = (element: HTMLDivElement): Product => {
    return {
        id: fetchDivId(element),
        ...fetchDivPrice(element),
        name: fetchDivName(element),
        imageURL: fetchDivUrl(element)
    };
};

export const joinProducts = (array: Array<Product>, elements: HTMLCollection): Array<Product> => {
    return joiningProducts(array, elements, divToProduct);
};
