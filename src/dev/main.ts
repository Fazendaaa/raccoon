'use strict';

import { getLogs__, Request } from './lib/api/raccoon';
import { displayAnalysis__,  displayRefresh__ } from './lib/display/show';
import { getAnalysis__, initAnalysis } from './lib/info/analysis';
import { reviewResponse } from './lib/info/review';

const analysis = initAnalysis();

const dataAnalysis = (): void => {
    // const logs = await getLogs__({});
    // const reviewed = reviewResponse(logs);

    // getAnalysis__(analysis, reviewed);
    analysis.mean.push(Math.random());
    analysis.standard_deviation.push(Math.random());
    displayAnalysis__(analysis);
};

const errorsCounter = (): void => {
    // Update error bar
};

const executeAndInterval = (): void => {
    dataAnalysis();

    setInterval(dataAnalysis, 60 * 1000);
    setInterval(errorsCounter, 60 * 1000 * 60);

    displayRefresh__();
}

executeAndInterval();
