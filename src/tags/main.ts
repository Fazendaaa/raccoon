'use strict';

import { config } from 'dotenv';
import { DOMWindow, JSDOM } from 'jsdom';
import { availableIds, DOMAvailableIds, DOMSmartphonesIds, smartphonesIds } from './lib/first';
import { joinBaseProducts } from './lib/second';
import { joinProducts } from './lib/third';

export interface Product extends Object {
    id: string;
    name?: string;
    priceTo?: number;
    category?: string;
    imageURL?: string;
    priceFrom?: number;
    available?: boolean;
}

interface TagWindow extends DOMWindow {
    productList?: Array<Product>;
}

config();

const { fromURL } = JSDOM;

const initHTML__ = async (): Promise<void> => {
    const { window } = await fromURL(process.env.URL, {
        resources: 'usable',
        runScripts: 'dangerously'
    });
    const { document } = <TagWindow> window;
    const DOMProducts = document.getElementsByClassName('product');

    // console.log(availableIds(productList));
    // console.log(smartphonesIds(productList));
    // console.log(DOMAvailableIds(DOMProducts));
    // console.log(DOMSmartphonesIds(DOMProducts));
    // console.log(joinBaseProducts(productList, DOMProducts));
    // console.log(joinProducts(productList, DOMProducts));
};

initHTML__();
