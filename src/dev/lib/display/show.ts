'use strict';

import { Analysis } from '../data/analysis';
import { criticalCounter, display, errorCounter, graph, timer, tracing } from './info';
import { updateCounter__, updateGraph__, updateTracebacks__ } from './update';

let totalTimer = 1;

const displayTimer__ = (): void => {
    const percentagePerSec = 100 / 60;
    timer.setPercent(totalTimer * percentagePerSec);
    totalTimer += 1;

    if (61 === totalTimer) {
        totalTimer = 0;
    }
}

export const displayAnalysis__ = ({ mean, standard_deviation, tracebacks }: Analysis): void => {
    updateGraph__(graph, mean, standard_deviation);
    updateTracebacks__(tracing, tracebacks);
};

export const displayCounter__ = ({ projects }: Analysis): void => updateCounter__(errorCounter, criticalCounter, projects);

export const displayRefresh__ = (): NodeJS.Timer => setInterval(() => {
    displayTimer__();
    display.render();
}, 1 * 1000);
