import { readFileSync } from 'fs';
import { join } from 'path';
import { fetchDivPrice } from '../../../../src/tags/lib/utils';
import { readMockDOMProducts__ } from '../data';

const basePath = join(__dirname, '../../../__mocks__/tags/utils');
const first = JSON.parse(readFileSync(`${basePath}/priceFrom.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/priceTo.json`, 'utf8'));

jest.setTimeout(10000);

describe('Testing utils library.', () => {
    test('Testing fetchDivPrice with missing priceFrom option.', async () => {
        const mockHTML = basePath.concat('/priceFrom.html');
        const array = await readMockDOMProducts__(mockHTML);
        const input = <HTMLDivElement> array.item(0);

        expect(fetchDivPrice(input)).toEqual(first);
    });

    test('Testing fetchDivPrice with missing priceTo option.', async () => {
        const mockHTML = basePath.concat('/priceTo.html');
        const array = await readMockDOMProducts__(mockHTML);
        const input = <HTMLDivElement> array.item(0);

        expect(fetchDivPrice(input)).toEqual(second);
    });
});
