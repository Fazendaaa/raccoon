'use strict';

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

const fetchSpanPrice = (value: HTMLSpanElement): number => cleanPrice(value.textContent);

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
