'use strict';

import { Response } from '../api/raccoon';
import { joinProjects, newCounter } from './project';
import { Review } from './review';

export interface Analysis extends Review {
    mean: Array<number>;
    standard_deviation: Array<number>;
}

const updateProjects = (total: Analysis, { projects }: Review): object => {
    return Object.keys(projects).reduce((acc: object, name: string) => {
        if (acc.hasOwnProperty(name)) {
            acc[name] = joinProjects(acc[name], projects[name]);
        } if (!acc.hasOwnProperty(name)) {
            acc[name] = projects[name];
        }

        return acc;
    }, total.projects);
};

const updateCounter = ({ projects }: Analysis): object => {
    return Object.keys(projects).reduce((acc: object, name: string) => {
        const lastHourError = acc[name].tmp_counter.error_counter.reduce((acc, cur) => acc + cur, 0);
        const lastHourCritical = acc[name].tmp_counter.critical_counter.reduce((acc, cur) => acc + cur, 0);

        acc[name].tmp_counter = newCounter();

        acc[name].total_counter.error_counter.push(lastHourError);
        acc[name].total_counter.critical_counter.push(lastHourCritical);

        return acc;
    }, projects);
};

const updateTracebacks = (total: Analysis, { tracebacks }: Review): Array<Response> => {
    const totalTracebacks = total.tracebacks.concat(tracebacks);

    return totalTracebacks.slice(totalTracebacks.length - 5, totalTracebacks.length);
};

const updateTimestamp = (total: Analysis, { total_timestamp }: Review): Array<number> => {
    return total.total_timestamp.concat(total_timestamp);
};

const calculateStandardDeviation = ({ total_timestamp, mean }: Analysis): number => {
    const lastMean = mean[mean.length - 1];
    const dividend = total_timestamp.reduce((acc, cur) => acc + (cur - lastMean), 0);
    const divisor = total_timestamp.length;

    return Math.sqrt(Math.pow(dividend, 2) / divisor);
};

const calculateMean = ({ total_timestamp }: Analysis): number => {
    return Math.trunc(total_timestamp.reduce((acc, cur) => acc + cur, 0) / total_timestamp.length);
};

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