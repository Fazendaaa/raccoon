import { readFileSync } from 'fs';
import { join } from 'path';
import { joinProducts } from '../../../../src/tags/lib/third';
import { readDOM__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/third');
const output = JSON.parse(readFileSync(`${basePath}/joinProducts.json`, 'utf8'));

jest.setTimeout(10000);

describe('Testing third question.', () => {
    test('Same as the last one second question but with the caveat of matching price and then transforming it to number.', async () => {
        const { productList, DOMProducts } = await readDOM__();
        const input = joinProducts(productList, DOMProducts);

        input.map((value, index) => {
            const { imageURL, ...remaining } = output[index];

            expect(value).toMatchObject({
                ...remaining,
                imageURL: expect.stringContaining(imageURL)
            });
        });
    });
});
