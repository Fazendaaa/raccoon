'use strict';

import { readFileSync } from 'fs';
import { DOMWindow, JSDOM } from 'jsdom';
import { join } from 'path';
import { availableIds, smartphonesIds } from './lib/first';

export interface Product {
    id: string;
    category: string;
    available: boolean;
}

export interface TagWindow extends DOMWindow {
    productList?: Array<Product>;
}

const htmlPath = join(__dirname, '../../html/Tags.html');
const html = readFileSync(htmlPath);
const { window, nodeLocation } = new JSDOM(html, {
    resources: 'usable',
    contentType: 'text/html',
    runScripts: 'dangerously',
    includeNodeLocations: true
});
const { document } = window;
const { productList } = <TagWindow> window;

// console.log(availableIds(productList));
// console.log(smartphonesIds(productList));
console.log(document.getElementsByClassName('product').item(0).getElementsByTagName('img').item(0).src);
