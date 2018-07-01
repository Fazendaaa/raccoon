'use strict';

import { Analysis } from '../info/analysis';
import { display, graph, timer, tracebacks } from './info';
import { addToTimer__, setTimer__, updateLine__ } from './update';

const displayTimer__ = (): void => {
    const percentagePerSec = 100 / 60;
    const added = addToTimer__(timer, percentagePerSec);

    if (100 < added) {
        setTimer__(timer, 0);
    }
}

export const displayAnalysis__ = (data: Analysis): void => {
    updateLine__(graph, data.mean, data.standard_deviation);
    tracebacks.log('Lorem Ipsum');
};

export const displayRefresh__ = (): NodeJS.Timer => setInterval(() => {
    displayTimer__();
    // update display errors each hour
    display.render();
}, 1 * 1000);
