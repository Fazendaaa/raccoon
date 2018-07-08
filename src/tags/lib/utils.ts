import { Product } from '../main';

export interface Price {
    priceTo: number;
    priceFrom: number;
}

const cleanPrice = (value: string): number => {
    const matched = value.match(/\d+(,\d*)/gm);

    if (null === matched) {
        return null;
    }

    return parseFloat(matched.shift().replace(/\,/, '.'));
};

const mergeProducts = (a: Product, b: Product): Product => {
    return {
        ...a,
        ...b
    };
};

const fetchSpanPrice = (value: HTMLSpanElement): number => cleanPrice(value.textContent);

const byId = (a: Product, b: Product): number => a.id.localeCompare(b.id);

export const fetchDivId = (value: HTMLDivElement): string => value.dataset.id;

export const fetchDivUrl = (value: HTMLDivElement): string => value.getElementsByTagName('img').item(0).src;

export const fetchDivName = (value: HTMLDivElement): string => value.getElementsByTagName('h2').item(0).textContent;

export const isDivAvailable = (value: HTMLDivElement): boolean => 'true' === value.getAttribute('available');

export const fetchDivPrice = (value: HTMLDivElement): Price => {
    const prices = value.getElementsByTagName('span');

    return {
        priceTo: fetchSpanPrice(prices.item(1)),
        priceFrom: fetchSpanPrice(prices.item(0))
    }
};

export const joiningProducts = (array: Array<Product>, elements: HTMLCollection, divToProduct: (element: HTMLDivElement) => Product): Array<Product> => {
    const parsed = Array.from(elements).map(divToProduct).sort(byId);

    return array.sort(byId).map((product, index) => mergeProducts(product, parsed[index]));
};
