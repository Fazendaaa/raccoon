import { readFileSync } from 'fs';
import { join } from 'path';
import { joinProducts } from '../../../../src/tags/lib/third';
import { productList, readDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/third');
const output = JSON.parse(readFileSync(`${basePath}/joinProducts.json`, 'utf8'));

describe.skip('Testing third question.', () => {
    test('Same as the last one second question but with the caveat of matching price and then transforming it to number.', async () => {
        const input = await readDOMProducts__();

        expect(joinProducts(productList, input)).toEqual(output);
    });
});
