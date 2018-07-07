import { readFileSync } from 'fs';
import { join } from 'path';
import { availableIds, DOMAvailableIds, DOMPartialProduct, smartphonesIds } from '../../../../src/tags/lib/first';
import { productList, readDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/first');
const first = JSON.parse(readFileSync(`${basePath}/availableIds.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/smartphonesIds.json`, 'utf8'));
const third = JSON.parse(readFileSync(`${basePath}/DOMPartialProduct.json`, 'utf8'));

const input = [];

beforeAll(async (done) => {
    input.push(...DOMPartialProduct(await readDOMProducts__()))

    done();
});

describe('Testing first question.', () => {
    test('Retrieving all available ids.', () => {
        expect(availableIds(productList)).toEqual(first);
    });

    test('Retrieving all smartphones.', () => {
        expect(smartphonesIds(productList)).toEqual(second);
    });

    test('Retrieving all available ids from the DOM.', async () => {
        expect(DOMAvailableIds(await readDOMProducts__())).toEqual(first);
    });

    test('Retrieving partial data from the DOM as id and imageURL.', () => {
        input.map((value, index) => {
            const { id, imageURL } = third[index];

            expect(value).toMatchObject({
                id,
                imageURL: expect.stringContaining(imageURL)
            });
        });
    });
});
