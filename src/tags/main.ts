import { config } from 'dotenv';
import { DOMWindow, JSDOM } from 'jsdom';
import { fetchProductsFromLocal, saveProductsToLocal__ } from './lib/challenge';
import { availableIds, DOMAvailableIds, DOMPartialProduct, smartphonesIds } from './lib/first';
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
    const { document, productList, localStorage } = <TagWindow> window;
    const DOMProducts = document.getElementsByClassName('product');
    // const total = joinProducts(productList, DOMProducts);

    // saveProductsToLocal__(total, localStorage);
    // console.log(fetchProductsFromLocal(localStorage));

    // console.log(availableIds(productList));
    // console.log(smartphonesIds(productList));
    // console.log(DOMAvailableIds(DOMProducts));
    // console.log(DOMPartialProduct(DOMProducts));
    // console.log(joinBaseProducts(productList, DOMProducts));
};

initHTML__();
