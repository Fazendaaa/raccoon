'use strict';

import { config } from 'dotenv';
import { DOMWindow, JSDOM } from 'jsdom';
import { availableIds, DOMAvailableIds, DOMSmartphonesIds, smartphonesIds } from './lib/first';

export interface Product {
    id: string;
    category: string;
    available: boolean;
}

export interface TagWindow extends DOMWindow {
    productList?: Array<Product>;
}

config();

const { fromURL } = JSDOM;

const initHTML__ = async (): Promise<void> => {
    const { window } = await fromURL(process.env.URL, {
        resources: 'usable',
        runScripts: 'dangerously',
        includeNodeLocations: true
    });
    const { document, productList } = <TagWindow> window;

    // console.log(availableIds(productList));
    // console.log(smartphonesIds(productList));
    // console.log(DOMAvailableIds(document.getElementsByClassName('product')));
    // console.log(DOMSmartphonesIds(document.getElementsByClassName('product')));
};

initHTML__();
