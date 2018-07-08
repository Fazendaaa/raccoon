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

export interface TagWindow extends DOMWindow {
    productList?: Array<Product>;
}

config();

const { fromURL } = JSDOM;

const runQuestions__ = async (): Promise<void> => {
    const { window } = await fromURL(process.env.URL, {
        runScripts: 'dangerously'
    });
    const { document, productList, localStorage } = <TagWindow> window;

    const DOMProducts = document.getElementsByClassName('product');

    console.log('Just the answers will be printed.\n');

    console.log('First question:\n');
    console.log('First function:\n', availableIds(productList));
    console.log('\nSecond function:\n', smartphonesIds(productList));
    console.log('\nThird function:\n', DOMAvailableIds(DOMProducts));
    console.log('\nFourth function:\n', DOMPartialProduct(DOMProducts));

    console.log('\nSecond question:\n');
    console.log(joinBaseProducts(productList, DOMProducts));

    console.log('\nThird question:\n');
    console.log(joinProducts(productList, DOMProducts));

    // saveProductsToLocal__(total, localStorage);
    // console.log(fetchProductsFromLocal(localStorage));
};

runQuestions__();
