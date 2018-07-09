import { fetchProductsFromLocal, MockStorage, saveProductsToLocal } from '../../../../src/tags/lib/challenge';
import { readDOM__ } from '../data';

const localStorage = new MockStorage();
const MockLocalStorage = new MockStorage();

describe('Testing challenge.', () => {
    describe('Testing MockStorage.', () => {
        test('Testing setItem.', () => {
            const spy = jest.spyOn(MockLocalStorage, 'setItem');

            MockLocalStorage.setItem('lorem', 'ipsum');

            expect(spy).toHaveBeenCalled();
        });

        test('Testing getItem.', () => {
            expect(MockLocalStorage.getItem('lorem')).toMatch('ipsum');
        });

        test('Testing key.', () => {
            expect(MockLocalStorage.key(0)).toMatch('lorem');
        });

        test('Testing removeItem.', () => {
            expect(MockLocalStorage.removeItem('lorem')).toBeTruthy();
        });

        test('Testing clear.', () => {
            const spy = jest.spyOn(MockLocalStorage, 'clear');

            MockLocalStorage.setItem('lorem', 'ipsum');
            MockLocalStorage.clear();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Testing saveProductsToLocal.', () => {
        test('Testing default.', async () => {
            const { productList } = await readDOM__();

            expect(saveProductsToLocal(productList, localStorage)).toBeTruthy();
        });

        test('Testing  with a undefined storage.', async () => {
            const { productList } = await readDOM__();

            expect(saveProductsToLocal(productList, undefined)).toBeFalsy();
        });
    });

    describe('Testing fetchProductsFromLocal.', () => {
        test('Testing default.', async () => {
            const { productList } = await readDOM__();

            expect(fetchProductsFromLocal(localStorage)).toEqual(productList);
        });

        test('Testing with am empty storage.',  () => {
            const emptyLocalStorage = new MockStorage();

            expect(fetchProductsFromLocal(emptyLocalStorage)).toBeNull();
        });

        test('Testing with a undefined storage.', () => {
            expect(fetchProductsFromLocal(undefined)).toBeNull();
        });
    });
});
