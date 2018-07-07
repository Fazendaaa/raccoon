import { readFileSync } from 'fs';
import { join } from 'path';
import { joinBaseProducts } from '../../../../src/tags/lib/second';
import { productList, readDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/second');
const output = JSON.parse(readFileSync(`${basePath}/joinBaseProducts.json`, 'utf8'));

describe('Testing second question.', () => {
    test('Joining productList with data from the DOM, results are: id, category, name and available.', async () => {
        const input = await readDOMProducts__();

        expect(joinBaseProducts(productList, input)).toEqual(output);
    });
});
