'use strict';

import { CronJob } from 'cron';
import { getLogs, Request } from './lib/api/raccoon';
import { reviewResponse } from './lib/info/analysis';

const runRequest = async ({ authorization, hostname }: Request): Promise<void> => {
    const logs = await getLogs({ authorization, hostname });
    const analyzed = reviewResponse(logs);

    console.log(analyzed);
};

try {
    const eachMinute = '00 0-59 * * * *';
    const eachSecond = '* * * * * *';
    const runLogs = new CronJob(eachMinute, async () => runRequest({}), () => console.log('Finished request.'), true);
} catch (e) {
    console.error('Error on application:', e);
}
