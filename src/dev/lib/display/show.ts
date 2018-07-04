'use strict';

import { Analysis } from '../data/analysis';
import { counter, display, graph, hour, minute, tracing } from './layout';
import { updateCounter__, updateGraph__, updateTracebacks__ } from './update';

const totalTimer = {
    second: 1,
    minute: 0
};

const displayTimer__ = (): void => {
    const percentage = 100 / 60;

    minute.setPercent(totalTimer.second * percentage);
    hour.setPercent(totalTimer.minute * percentage);

    totalTimer.second += 1;

    if (61 === totalTimer.second) {
        totalTimer.second = 0;
        totalTimer.minute += 1;
    } if (61 === totalTimer.minute) {
        totalTimer.minute = 0;
    }
}

export const displayAnalysis__ = ({ mean, standard_deviation, tracebacks }: Analysis): void => {
    updateGraph__(graph, mean, standard_deviation);
    updateTracebacks__(tracing, tracebacks);
};

export const displayCounter__ = ({ projects }: Analysis): void => updateCounter__(counter, projects);

export const displayRefresh__ = (): NodeJS.Timer => setInterval(() => {
    displayTimer__();
    display.render();
}, 1 * 1000);
