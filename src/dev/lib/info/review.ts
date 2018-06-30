'use strict';

import { byTimestamp, Response, TotalRequest } from '../api/raccoon';
import { addToProject, joinProjects, newProject } from './project';

export interface Review extends TotalRequest {
    projects: object;
    tracebacks: Array<Response>;
}

const toReview = (total: Review, current: Response): Review => {
    const name = current.project;

    if (current.hasOwnProperty('response_code') || current.hasOwnProperty('request_duration')) {
        total.total_timestamp += current.timestamp;
        total.request_counter += 1;
    } if (current.hasOwnProperty('traceback')) {
        total.tracebacks.push(current);
    } if (!total.projects.hasOwnProperty(name)) {
        total.projects[name] = newProject(current);
    } if (total.projects.hasOwnProperty(name)) {
        total.projects[name] = addToProject(total.projects[name], current);
    }

    return total;
};

export const reviewResponse = (array: Array<Response>): Review => array.sort(byTimestamp).reduce(toReview, {
    projects: {},
    tracebacks: [],
    request_counter: 0,
    total_timestamp: 0
});
