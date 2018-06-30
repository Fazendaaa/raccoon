'use strict';

import { getLogs__, Request } from './lib/api/raccoon';
import { displayAnalysis__, initDisplay__ } from './lib/display/show';
import { getAnalysis__, initAnalysis } from './lib/info/analysis';
import { reviewResponse } from './lib/info/review';

initDisplay__();
const analysis = initAnalysis();
setInterval(() => {
    // const logs = await getLogs__({});
    // const reviewed = reviewResponse(logs);

    // getAnalysis__(analysis, reviewed);
    analysis.mean.push(Math.random());
    analysis.standard_deviation.push(Math.random());
    displayAnalysis__(analysis);
}, 1 * 1000);
