import { readFileSync } from 'fs';
import { join } from 'path';
import { joinProducts } from '../../../../src/tags/lib/third';
import { productList, readDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/third');
const output = JSON.parse(readFileSync(`${basePath}/joinProducts.json`, 'utf8'));

describe('Testing third question.', () => {
    test('Same as the last one second question but with the caveat of matching price and then transforming it to number.', async () => {
        const input = joinProducts(productList, await readDOMProducts__());

        input.map((value, index) => {
            const { imageURL, ...remaining } = output[index];

            expect(value).toMatchObject({
                ...remaining,
                imageURL: expect.stringContaining(imageURL)
            });
        });
    });
});
