import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { JSDOM, Options } from 'jsdom';
import { join } from 'path';

const { fromURL, fromFile } = JSDOM;
const JSDOMOptions: Options = {
    resources: 'usable',
    runScripts: 'dangerously'
};

config();

export const readDOMProducts__ = async (url = process.env.URL): Promise<HTMLCollection> => {
    const { window } = await fromURL(url, JSDOMOptions);
    const { document } = window;

    return document.getElementsByClassName('product');
};

export const readMockDOMProducts__ = async (filePath: string): Promise<HTMLCollection> => {
    const { window } = await fromFile(filePath, JSDOMOptions);
    const { document } = window;

    return document.getElementsByClassName('product');
};

export const productList = JSON.parse(readFileSync(join(__dirname, '../../__mocks__/tags/productList.json'), 'utf8'));
