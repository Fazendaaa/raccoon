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
        request_counter: 0,
        total_timestamp: 0,
        standard_deviation: []
    };
};

const updateTracebacks = (total: Analysis, { tracebacks }: Review): Array<Response> => {
    const totalTracebacks = total.tracebacks.concat(tracebacks);

    return totalTracebacks.slice(totalTracebacks.length - 5, totalTracebacks.length);
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

const updateRequestCounter = (total: Analysis, { request_counter }: Review): number => {
    return total.request_counter + request_counter;
};

const updateTimestampTotal = (total: Analysis, { total_timestamp }: Review): number => {
    return total.total_timestamp + total_timestamp;
};

const calculateStandardDeviation = ({ total_timestamp, request_counter }: Analysis): number => 0;

const calculateMean = ({ total_timestamp, request_counter }: Analysis): number => {
    return Math.trunc(total_timestamp / request_counter);
};

export const getAnalysis__ = (total: Analysis, reviewed: Review): Analysis => {
    total.projects = updateProjects(total, reviewed);
    total.tracebacks = updateTracebacks(total, reviewed);
    total.request_counter = updateRequestCounter(total, reviewed);
    total.total_timestamp = updateTimestampTotal(total, reviewed);

    total.mean.push(calculateMean(total));
    total.standard_deviation.push(calculateStandardDeviation(total));

    return total;
};
