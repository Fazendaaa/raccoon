'use strict';

import { getLogs__, Request } from './lib/api/raccoon';
import { displayAnalysis__, displayCriticalCounter__, displayErrorCounter__, displayRefresh__ } from './lib/display/show';
import { Analysis, getAnalysis__, initAnalysis } from './lib/info/analysis';
import { reviewResponse } from './lib/info/review';

const generateRandom = (min: number, max: number): number => Math.random() * ((max - min) + min);

const fetchAPI__ = async (data: Analysis): Promise<void> => {
    // const logs = await getLogs__({});
    // const reviewed = reviewResponse(logs);
    // getAnalysis__(analysis, reviewed);

    const mock = {
        projects: {},
        tracebacks: [],
        mean: [generateRandom(5, 20)],
        total_timestamp: [generateRandom(5, 20)]
    };

    getAnalysis__(data, mock);
};

const executeAndInterval__ = async (): Promise<void> => {
    // const eachMinute = 60 * 1000;
    const eachMinute = 1 * 1000;
    const eachHour = 60 * eachMinute;
    const analysis = initAnalysis();

    displayRefresh__();

    await fetchAPI__(analysis);
    displayAnalysis__(analysis);
    displayErrorCounter__(analysis);
    displayCriticalCounter__(analysis);

    setInterval(async () => await fetchAPI__(analysis), eachMinute);
    setInterval(() => displayAnalysis__(analysis), eachMinute);
    setInterval(() => displayErrorCounter__(analysis), eachHour);
    setInterval(() => displayCriticalCounter__(analysis), eachHour);
};

executeAndInterval__();
