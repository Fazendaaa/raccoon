'use strict';

import { getLogs__, Request } from './lib/api/raccoon';
import { displayAnalysis__,  displayRefresh__ } from './lib/display/show';
import { getAnalysis__, initAnalysis } from './lib/info/analysis';
import { reviewResponse } from './lib/info/review';

const analysis = initAnalysis();

const generateRandom = (min: number, max: number): number => Math.random() * ((max - min) + min);

const dataAnalysis__ = (): void => {
    // const logs = await getLogs__({});
    // const reviewed = reviewResponse(logs);
    // getAnalysis__(analysis, reviewed);

    const mock = {
        projects: {},
        tracebacks: [],
        mean: [generateRandom(5, 20)],
        total_timestamp: [generateRandom(5, 20)]
    };

    getAnalysis__(analysis, mock);
    displayAnalysis__(analysis);
};

const errorsCounter__ = (): void => {
    // Update error bar
};

const executeAndInterval = (): void => {
    dataAnalysis__();
    errorsCounter__();

    setInterval(dataAnalysis__, 1 * 1000);
    setInterval(errorsCounter__, 60 * 1000 * 60);

    displayRefresh__();
}

executeAndInterval();
