import { Response } from '../api/raccoon';
import { toCSV } from '../export/CSV';
import { joinProjects, newCounter, sanitizeProject__ } from './project';
import { Review } from './review';

export interface Analysis extends Review {
    mean: Array<number>;
    standard_deviation: Array<number>;
}

const arrayLimit = 30;

const __updateProjects = (projects: Object, acc: Object, name: string): Object => {
    if (acc.hasOwnProperty(name)) {
        acc[name] = joinProjects(acc[name], projects[name]);
    } if (!acc.hasOwnProperty(name)) {
        acc[name] = projects[name];
    }

    return acc;
};

const updateProjects = (total: Analysis, { projects }: Review): Object => {
    const curried = ((acc: Object, name: string)  => __updateProjects(projects, acc, name));

    return Object.keys(projects).reduce(curried, total.projects);
};

const __updateCounter = (acc: Object, name: string): Object => {
    const lastHourError = acc[name].tmp_counter.error_counter.reduce((acc, cur) => acc + cur, 0);
    const lastHourCritical = acc[name].tmp_counter.critical_counter.reduce((acc, cur) => acc + cur, 0);

    acc[name].tmp_counter = newCounter();

    acc[name].total_counter.error_counter.push(lastHourError);
    acc[name].total_counter.critical_counter.push(lastHourCritical);

    return acc;
}

const updateCounter = ({ projects }: Analysis): Object => {
    return Object.keys(projects).reduce(__updateCounter, projects);
};

const updateTracebacks = (total: Analysis, { tracebacks }: Review): Array<Response> => {
    const totalTracebacks = total.tracebacks.concat(tracebacks);

    return totalTracebacks.slice(totalTracebacks.length - 5, totalTracebacks.length);
};

const updateTimestamp = (total: Analysis, { total_timestamp }: Review): Array<number> => {
    return total.total_timestamp.concat(total_timestamp);
};

const calculateStandardDeviation = ({ total_timestamp, mean }: Analysis): number => {
    const lastMean = mean[mean.length - 1] || 0;
    const dividend = total_timestamp.reduce((acc, cur) => acc + Math.pow((cur - lastMean), 2), 0);
    const divisor = total_timestamp.length || 1;

    return Math.sqrt(dividend / divisor);
};

const calculateMean = ({ total_timestamp }: Analysis): number => {
    return (total_timestamp.reduce((acc, cur) => acc + cur, 0) / total_timestamp.length) || 0;
};

const sanitizeMean = (mean: Array<number>): Array<number> => mean.slice(arrayLimit - 1);

const sanitizeDeviation = (deviation: Array<number>): Array<number> => deviation.slice(arrayLimit - 1);

export const initAnalysis = (): Analysis => {
    return {
        mean: [],
        projects: {},
        tracebacks: [],
        total_timestamp: [],
        standard_deviation: []
    };
};

export const getAnalysis__ = (total: Analysis, reviewed: Review): Analysis => {
    total.projects = updateProjects(total, reviewed);
    total.tracebacks = updateTracebacks(total, reviewed);
    total.total_timestamp = updateTimestamp(total, reviewed);

    total.mean.push(calculateMean(total));
    total.standard_deviation.push(calculateStandardDeviation(total));

    return total;
};

export const getCounters__ = (total: Analysis): Analysis => {
    total.projects = updateCounter(total);

    return total;
};

export const sanitizeAnalysis__ = (total: Analysis): Analysis => {
    toCSV(total);

    total.projects = sanitizeProject__(total.projects);
    total.mean = sanitizeMean(total.mean);
    total.standard_deviation = sanitizeDeviation(total.standard_deviation);

    return total;
};
