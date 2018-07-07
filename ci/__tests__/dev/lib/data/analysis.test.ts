import { readFileSync } from 'fs';
import { join } from 'path';
import { getAnalysis__, getCounters__, initAnalysis } from '../../../../../src/dev/lib/data/analysis';

const basePath = join(__dirname, '../../../../__mocks__/dev/data/analysis');
const first = JSON.parse(readFileSync(`${basePath}/initAnalysis.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/getAnalysis__.json`, 'utf8'));
const third = JSON.parse(readFileSync(`${basePath}/getCounters__.json`, 'utf8'));

describe('Testing initAnalysis.', () => {
    test('Initial values.', () => {
        expect(initAnalysis()).toEqual(first);
    });
});

describe('Testing getAnalysis__.', () => second.map(({ label, input, output }) => {
    test(label, () => {
        const { total, reviewed } = input;

        expect(getAnalysis__(total, reviewed)).toEqual(output);
    });
}));

describe('Testing getCounters__.', () => third.map(({ label, input, output }) => {
    test(label, () => {
        expect(getCounters__(input)).toEqual(output);
    });
}));
