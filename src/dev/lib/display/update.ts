import { WidgetElements } from 'blessed-contrib';
import { Response } from '../api/raccoon';
import { Counter } from '../data/project';

interface Father {
    level: string;
    message: string;
    timestamp: number;
    traceback?: string;
    response_code?: number;
    request_duration?: number;
}

const ceilingMilliseconds = (value: number): number => Math.ceil(new Date(value).getMilliseconds());

const meanAndDeviationToSeconds = (mean: Array<number>, deviation: Array<number>): Array<Array<number>> => {
    return mean.map((value, index) => [
        ceilingMilliseconds(value),
        ceilingMilliseconds(deviation[index])
    ]);
};

const mockChildren = {
    'No data available yet': {}
};

const totalCounterToData = ({ critical_counter, error_counter }: Counter): Array<Array<number>> => {
    return critical_counter.map((value, index) => [ index, value, error_counter[index] ]);
};

const __counterChildren = (projects, acc, name) => {
    acc[name] = {
        data: totalCounterToData(projects[name].total_counter)
    }

    return acc;
};

const counterChildren = (projects: Object): Object => {
    const fathers = Object.keys(projects);
    const curried = (projects: Object) => ((acc: Object, name: string) => __counterChildren(projects, acc, name));

    if (0 === fathers.length) {
        return mockChildren;
    }

    return fathers.reduce(curried(projects), {});
};

const childrenfy = (value: any) => {
    return {
        data: (undefined !== value) ? value.toString() : 'Not available'
    };
};

const createChildren = ({ level, message, timestamp, traceback, response_code, request_duration }: Father) => {
    return {
        children: {
            level: childrenfy(level),
            message: childrenfy(message),
            traceback: childrenfy(traceback),
            timestamp: childrenfy(new Date(timestamp).toDateString()),
            response_code: childrenfy(response_code),
            request_duration: childrenfy(request_duration)
        }
    };
};

const __tracebackChildren = (acc: Object, { project, ...remaining }: Response) : Object => {
    acc[project] = createChildren(remaining);

    return acc;
};

const tracebackChildren = (tracebacks: Array<Response>): Object => {
    if (0 === tracebacks.length) {
        return mockChildren;
    }

    return tracebacks.reduce(__tracebackChildren, {});
};

export const updateCounter__ = (counter: WidgetElements, projects: object): void => {
    counter.setData({
        extended: true,
        children: counterChildren(projects)
    });
};

export const updateGraph__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    const joined = meanAndDeviationToSeconds(mean, deviation);
    const length = joined.length;
    const limit = 30;
    const diff = (limit > length) ? 0 : Math.abs(limit - joined.length);
    const data = joined.slice(diff, length);

    graph.setData({
        data,
        stackedCategory: ['Mean', 'Deviation'],
        barCategory: data.map((_, index) => (diff + index).toString())
    });
};

export const updateTracebacks__ = (table: WidgetElements, tracebacks: Array<Response>): void => {
    table.setData({
        extended: true,
        children: tracebackChildren(tracebacks)
    });
};
