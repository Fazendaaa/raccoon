import { readFileSync } from 'fs';
import { join } from 'path';
import { availableIds, DOMAvailableIds, DOMPartialProduct, smartphonesIds } from '../../../../src/tags/lib/first';
import { productList, readDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/first');
const first = JSON.parse(readFileSync(`${basePath}/availableIds.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/smartphonesIds.json`, 'utf8'));
const third = JSON.parse(readFileSync(`${basePath}/DOMPartialProduct.json`, 'utf8'));

describe('Testing first question.', () => {
    test('Retrieving all available ids.', () => {
        expect(availableIds(productList)).toEqual(first);
    });

    test('Retrieving all smartphones.', () => {
        expect(smartphonesIds(productList)).toEqual(second);
    });

    test('Retrieving all available ids from the DOM.', async () => {
        const input = await readDOMProducts__();

        expect(DOMAvailableIds(input)).toEqual(first);
    });

    test.skip('Retrieving partial data from the DOM as id and imageURL.', async () => {
        const input = await readDOMProducts__();

        expect(DOMPartialProduct(input)).toEqual(expect.arrayContaining(third));
    });
});
