'use strict';

import { Response } from '../api/raccoon';

const hasError = ({ level }: Response): boolean => 'ERROR' === level;

const hasCritical = ({ level }: Response): boolean => 'CRITICAL' === level;

export interface Project extends Object {
    logs: Array<Response>;
    error_counter: number;
    critical_counter: number;
}

export const newProject = (value: Response): Project => {
    return {
        logs: [value],
        error_counter: hasError(value) ? 1 : 0,
        critical_counter: hasCritical(value) ? 1 : 0
    }
};

export const addToProject = ({ logs, error_counter, critical_counter, ...remaining }: Project, value: Response): Project => {
    const currentError = hasError(value) ? 1 : 0;
    const currentCritical = hasError(value) ? 1 : 0;
    logs.push(value);

    return {
        logs,
        ...remaining,
        error_counter: error_counter + currentError,
        critical_counter: critical_counter + currentCritical
    };
};

export const joinProjects = (dst: Project, src: Project): Project => {
    return {
        logs: dst.logs.concat(src.logs),
        error_counter: dst.error_counter + src.error_counter,
        critical_counter: dst.critical_counter + src.critical_counter
    };
};
