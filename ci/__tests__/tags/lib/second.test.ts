import { readFileSync } from 'fs';
import { join } from 'path';
import { joinBaseProducts } from '../../../../src/tags/lib/second';
import { readDOM__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/second');
const output = JSON.parse(readFileSync(`${basePath}/joinBaseProducts.json`, 'utf8'));

jest.setTimeout(10000);

describe('Testing second question.', () => {
    test('Joining productList with data from the DOM, results are: id, category, name and available.', async () => {
        const { productList, DOMProducts } = await readDOM__();

        expect(joinBaseProducts(productList, DOMProducts)).toEqual(output);
    });
});
