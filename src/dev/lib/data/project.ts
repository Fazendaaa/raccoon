import { Response } from '../api/raccoon';

export interface Counter extends Object {
    error_counter: Array<number>;
    critical_counter: Array<number>;
}

export interface Project extends Object {
    logs: Array<Response>;
    tmp_counter: Counter;
    total_counter: Counter;
}

const hasError = ({ level }: Response): boolean => 'ERROR' === level;

const hasCritical = ({ level }: Response): boolean => 'CRITICAL' === level;

export const newCounter = (): Counter => {
    return {
        error_counter: [
            0
        ],
        critical_counter: [
            0
        ]
    };
};

export const newProject = (value: Response): Project => {
    return {
        logs: [
            value
        ],
        total_counter: newCounter(),
        tmp_counter: {
            error_counter: [
                hasError(value) ? 1 : 0
            ],
            critical_counter: [
                hasCritical(value) ? 1 : 0
            ]
        }
    }
};

export const addToProject = ({ logs, tmp_counter, ...remaining }: Project, value: Response): Project => {
    const currentError = hasError(value) ? 1 : 0;
    const currentCritical = hasCritical(value) ? 1 : 0;
    const lastError = tmp_counter.error_counter.pop() + currentError;
    const lastCritical = tmp_counter.critical_counter.pop() + currentCritical;

    return {
        ...remaining,
        logs: logs.concat(value),
        tmp_counter: {
            error_counter: tmp_counter.error_counter.concat(lastError),
            critical_counter: tmp_counter.critical_counter.concat(lastCritical)
        }
    };
};

export const joinProjects = (dst: Project, src: Project): Project => {
    return {
        total_counter: dst.tmp_counter,
        logs: dst.logs.concat(src.logs),
        tmp_counter: {
            error_counter: dst.tmp_counter.error_counter.concat(src.tmp_counter.error_counter),
            critical_counter: dst.tmp_counter.critical_counter.concat(src.tmp_counter.critical_counter)
        }
    };
};

export const sanitizeProject__ = (total: object): object => {
    Object.keys(total).map(name => total[name].logs = []);

    return total;
};
