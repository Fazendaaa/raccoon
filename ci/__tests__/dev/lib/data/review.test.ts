import { readFileSync } from 'fs';
import { join } from 'path';
import { reviewResponse } from '../../../../../src/dev/lib/data/review';

const basePath = join(__dirname, '../../../../__mocks__/dev/data/review');
const first = JSON.parse(readFileSync(`${basePath}/reviewResponse.json`, 'utf8'));

describe('Testing reviewResponse.', () => {
    first.map(({ input, output, label }) => test(label, () => {
        expect(reviewResponse(input)).toEqual(output);
    }));
});
