'use strict';

import { CronJob } from 'cron';
import { getLogs, Request } from './lib/api/raccoon';
import { getAnalysis__, initAnalysis } from './lib/info/analysis';
import { Review, reviewResponse } from './lib/info/review';

try {
    const analysis = initAnalysis();
    const eachSecond = '* * * * * *';
    // const eachMinute = '00 0-59 * * * *';
    // const eachHour = '00 00 0-23 * * *';
    const runLogs = new CronJob(eachSecond, async () => {
        const logs = await getLogs({});
        const reviewed = reviewResponse(logs);

        console.log(getAnalysis__(analysis, reviewed));
    }, () => console.log('Finished request.'), true);
} catch (e) {
    console.error('Error on application:', e);
}
