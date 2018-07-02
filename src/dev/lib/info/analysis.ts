'use strict';

import { Response } from '../api/raccoon';
import { joinProjects } from './project';
import { Review } from './review';

export interface Analysis extends Review {
    mean: Array<number>;
    standard_deviation: Array<number>;
}

export const initAnalysis = (): Analysis => {
    return {
        mean: [],
        projects: {},
        tracebacks: [],
        total_timestamp: [],
        standard_deviation: []
    };
};

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

export const getAnalysis__ = (total: Analysis, reviewed: Review): Analysis => {
    total.projects = updateProjects(total, reviewed);
    total.tracebacks = updateTracebacks(total, reviewed);
    total.total_timestamp = updateTimestamp(total, reviewed);

    total.mean.push(calculateMean(total));
    total.standard_deviation.push(calculateStandardDeviation(total));

    return total;
};
