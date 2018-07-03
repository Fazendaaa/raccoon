'use strict';

import { writeFileSync } from 'fs';
import { parse } from 'json2csv';
import { Analysis } from '../data/analysis';

export const toCSV = (data: Analysis): boolean => {
    try {
        writeFileSync('dev.csv', parse(data), 'utf8');

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
};
