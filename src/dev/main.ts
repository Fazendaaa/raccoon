import { getLogs__, Response } from './lib/api/raccoon';
import { getAnalysis__, getCounters__, initAnalysis } from './lib/data/analysis';
import { reviewResponse } from './lib/data/review';
import { displayAnalysis__, displayCounter__, displayRefresh__ } from './lib/display/show';

export const analysis = initAnalysis();

const executeAnalysis__ = async (): Promise<void> => {
    const logs = <Array<Response>> await getLogs__({});
    const reviewed = reviewResponse(logs);

    getAnalysis__(analysis, reviewed);
};

const executeAndInterval__ = async (): Promise<void> => {
    const eachMinute = 60 * 1000;
    const eachHour = 60 * eachMinute;

    displayRefresh__();

    await executeAnalysis__();
    getCounters__(analysis);

    displayAnalysis__(analysis);
    displayCounter__(analysis);

    setInterval(async () => await executeAnalysis__(), eachMinute);
    setInterval(() => getCounters__(analysis), eachHour);

    setInterval(() => displayAnalysis__(analysis), eachMinute);
    setInterval(() => displayCounter__(analysis), eachHour);
};

executeAndInterval__();
