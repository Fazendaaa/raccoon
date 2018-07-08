import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { byTimestamp, getLogs__ } from '../../../../../src/dev/lib/api/raccoon';

config();

const basePath = join(__dirname, '../../../../__mocks__/dev/api/raccoon');
const first = JSON.parse(readFileSync(`${basePath}/byTimestamp.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/getLogs__.json`, 'utf8'));

jest.setTimeout(10000);

describe('Testing byTimestamp.', () => {
    first.map(({ input, label, output }) => test(label, () => {
        const { a, b } = input;

        expect(byTimestamp(a, b)).toEqual(output);
    }));
});

describe('Testing getLogs__.', () => {
    const { label, output } = second;

    test(label, async () => {
        const input = await getLogs__({
            hostname: process.env.MOCK_API,
            authorization: process.env.MOCK_KEY
        });

        expect(input).toEqual(output);
    });

    test('Request different from 200.', async () => {
        const options = {
            hostname: process.env.MOCK_API_ERROR,
            authorization: process.env.MOCK_KEY
        };

        await expect(getLogs__(options)).rejects.toThrowError();
    });

    test('Non acceptable url and default authorization.', async () => {
        const options = {
            hostname: ''
        };

        await expect(getLogs__(options)).rejects.toThrow();
    });

    test('Non acceptable url and authorization.', async () => {
        const options = {
            hostname: '',
            authorization: ''
        };

        await expect(getLogs__(options)).rejects.toThrow();
    });
});
