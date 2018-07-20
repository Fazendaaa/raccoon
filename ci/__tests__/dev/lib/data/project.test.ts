import { readFileSync } from 'fs';
import { join } from 'path';
import { addToProject, joinProjects, newCounter, newProject, sanitizeProject__ } from '../../../../../src/dev/lib/data/project';

const basePath = join(__dirname, '../../../../__mocks__/dev/data/project');
const first = JSON.parse(readFileSync(`${basePath}/addToProject.json`, 'utf8'));
const second = JSON.parse(readFileSync(`${basePath}/joinProjects.json`, 'utf8'));
const third = JSON.parse(readFileSync(`${basePath}/newCounter.json`, 'utf8'));
const fourth = JSON.parse(readFileSync(`${basePath}/newProject.json`, 'utf8'));
const fifth = JSON.parse(readFileSync(`${basePath}/sanitizeProject__.json`, 'utf8'));

describe('Testing addToProject.', () => {
    first.map(({ input, output, label }) => test(label, () => {
        const { total, current } = input;

        expect(addToProject(total, current)).toEqual(output);
    }));
});

describe('Testing joinProjects.', () => {
    const { input, output, label } = second;

    test(label, () => {
        const { dst, src } = input;

        expect(joinProjects(dst, src)).toEqual(output);
    });
});

describe('Testing newCounter.', () => {
    const { output, label } = third;

    test(label, () => {
        expect(newCounter()).toEqual(output);
    });
});

describe('Testing newProject.', () => {
    fourth.map(({ input, output, label }) => test(label, () => {
        expect(newProject(input)).toEqual(output);
    }));
});

describe('Testing sanitizeProject__.', () => {
    test('Default test.', () => {
        const { input, output } = fifth;

        expect(sanitizeProject__(input)).toEqual(output);
    });
});
