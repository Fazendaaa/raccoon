import { config } from 'dotenv';
import { DOMWindow, JSDOM } from 'jsdom';
import { fetchProductsFromLocal, MockStorage, saveProductsToLocal } from './lib/challenge';
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
    const { document, productList } = <TagWindow> window;
    const localStorage = new MockStorage();
    const DOMProducts = document.getElementsByClassName('product');
    const products = joinProducts(productList, DOMProducts);

    console.log('Just the answers will be printed.\n');

    console.log('First question:\n');
    console.log('First function:\n', availableIds(productList));
    console.log('\nSecond function:\n', smartphonesIds(productList));
    console.log('\nThird function:\n', DOMAvailableIds(DOMProducts));
    console.log('\nFourth function:\n', DOMPartialProduct(DOMProducts));

    console.log('\nSecond question:\n');
    console.log(joinBaseProducts(productList, DOMProducts));

    console.log('\nThird question:\n');
    console.log(products);

    console.log('\nChallenge:\n');
    console.log('\nSaving it parsed product to localStorage:\n', saveProductsToLocal(products, localStorage));
    console.log('\nFetching parsed product from localStorage:\n', fetchProductsFromLocal(localStorage));
};

runQuestions__();
