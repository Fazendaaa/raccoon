import { config } from 'dotenv';
import { JSDOM, Options } from 'jsdom';
import { Product, TagWindow } from '../../../src/tags/main';

export interface DOMData {
    productList: Array<Product>;
    DOMProducts: HTMLCollection;
}

const { fromURL, fromFile } = JSDOM;
const JSDOMOptions: Options = {
    runScripts: 'dangerously'
};

config();

export const readDOM__ = async (url = process.env.URL): Promise<DOMData> => {
    const { window } = await fromURL(url, JSDOMOptions);
    const { document, productList } = <TagWindow> window;

    return {
        productList,
        DOMProducts: document.getElementsByClassName('product')
    };
};

export const readMockDOMProducts__ = async (filePath: string): Promise<HTMLCollection> => {
    const { window } = await fromFile(filePath, JSDOMOptions);
    const { document } = window;

    return document.getElementsByClassName('product');
};
