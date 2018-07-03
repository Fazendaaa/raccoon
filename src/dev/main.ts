'use strict';

import { getLogs__, Request } from './lib/api/raccoon';
import { Analysis, getAnalysis__, getCounters__, initAnalysis } from './lib/data/analysis';
import { reviewResponse } from './lib/data/review';
import { displayAnalysis__, displayCounter__, displayRefresh__ } from './lib/display/show';

const execute__ = async (data: Analysis): Promise<void> => {
    const logs = await getLogs__({});
    const reviewed = reviewResponse(logs);

    getAnalysis__(data, reviewed);

   /*
    const generateRandom = (min: number, max: number): number => Math.random() * ((max - min) + min);
    const mock = {
        projects: {
            foo: {
                logs: [],
                tmp_counter: {
                    error_counter: [generateRandom(5, 10)],
                    critical_counter: [generateRandom(5, 10)]
                },
                total_counter: {
                    error_counter: [ ],
                    critical_counter: [ ]
                }
            },
            bar: {
                logs: [],
                tmp_counter: {
                    error_counter: [ generateRandom(5, 10) ],
                    critical_counter: [ generateRandom(5, 10) ]
                },
                total_counter: {
                    error_counter: [ ],
                    critical_counter: [ ]
                }
            }
        },
        tracebacks: [],
        mean: [ generateRandom(5, 20) ],
        total_timestamp: [ generateRandom(5, 20) ],
        standard_deviation: []
    };

    getAnalysis__(data, mock);
    */
};

const executeAndInterval__ = async (): Promise<void> => {
    const eachTwoSec = 60 * 1000;
    const eachMinute = 60 * 1000;
    const eachHour = 60 * eachMinute;
    const analysis = initAnalysis();

    displayRefresh__();

    await execute__(analysis);
    getCounters__(analysis);

    displayAnalysis__(analysis);
    displayCounter__(analysis);

    setInterval(async () => await execute__(analysis), eachTwoSec);
    setInterval(() => getCounters__(analysis), eachHour);

    setInterval(() => displayAnalysis__(analysis), eachMinute);
    setInterval(() => displayCounter__(analysis), eachHour);
};

executeAndInterval__();
