'use strict';

import { Analysis } from '../info/analysis';
import { display, errorCounter, graph, timer, tracebacks } from './info';
import { addToTimer__, setTimer__, updateErrorCounter__, updateGraph__ } from './update';

const displayTimer__ = (): void => {
    const percentagePerSec = 100 / 60;
    const added = addToTimer__(timer, percentagePerSec);

    if (100 < added) {
        setTimer__(timer, 0);
    }
}

export const displayAnalysis__ = (data: Analysis): void => {
    updateGraph__(graph, data.mean, data.standard_deviation);
    tracebacks.log('Lorem Ipsum');
};

export const displayErrorCounter__ = (data: Analysis): void => updateErrorCounter__(errorCounter, data.projects);

export const displayCriticalCounter__ = (data: Analysis): void => updateErrorCounter__(errorCounter, data.projects);

export const displayRefresh__ = (): NodeJS.Timer => setInterval(() => {
    displayTimer__();
    display.render();
}, 1 * 1000);
