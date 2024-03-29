import { byTimestamp, Response, TotalRequest } from '../api/raccoon';
import { addToProject, newProject } from './project';

export interface Review extends TotalRequest {
    projects: object;
    tracebacks: Array<Response>;
}

const toReview = (total: Review, current: Response): Review => {
    const name = current.project;

    if (current.hasOwnProperty('response_code') || current.hasOwnProperty('request_duration')) {
        total.total_timestamp.push(current.timestamp);
    } if (current.hasOwnProperty('traceback')) {
        total.tracebacks.push(current);
    } if (total.projects.hasOwnProperty(name)) {
        total.projects[name] = addToProject(total.projects[name], current);
    } if (!total.projects.hasOwnProperty(name)) {
        total.projects[name] = newProject(current);
    }

    return total;
};

export const reviewResponse = (array: Array<Response>): Review => array.sort(byTimestamp).reduce(toReview, {
    projects: {},
    tracebacks: [],
    total_timestamp: []
});
