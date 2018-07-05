import { writeFileSync } from 'fs';
import { parse } from 'json2csv';
import { Analysis } from '../data/analysis';

export const toCSV = (data: Analysis, name = 'dev.csv'): boolean => {
    try {
        writeFileSync(name, parse(data), 'utf8');

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
};
