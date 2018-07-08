import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { byTimestamp, getLogs__ } from '../../../../../src/dev/lib/api/raccoon';

config();

const basePath = join(__dirname, '../../../../__mocks__/dev/api/raccoon');
const first = JSON.parse(readFileSync(`${basePath}/byTimestamp.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/getLogs__.json`, 'utf8'));

describe('Testing byTimestamp.', () => {
    first.map(({ input, label, output }) => test(label, () => {
        const { a, b } = input;

        expect(byTimestamp(a, b)).toEqual(output);
    }));
});

describe.skip('Testing getLogs__.', () => {
    const { label, output } = second;

    test(label, async () => {
        const input = await getLogs__({
            hostname: process.env.MOCK_API,
            authorization: process.env.MOCK_KEY
        });

        expect(input).toEqual(output);
    });
});
