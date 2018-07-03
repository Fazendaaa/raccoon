'use strict';

import { BarData, LineData, WidgetElements } from 'blessed-contrib';
import { Response } from '../api/raccoon';
import { Counter } from '../data/project';

const timerTotal = {
    percent: 0,
    color: 'green',
    label: 'Loading'
};

const setAxis = (data: Array<number>) => {
    return {
        y: data,
        x: data.map((value, index) => index.toString())
    };
};

const ceilingMilliseconds = (value: number): number => Math.ceil(new Date(value).getMilliseconds());

const meanAndDeviationToSeconds = (mean: Array<number>, deviation: Array<number>): Array<Array<number>> => {
    return mean.map((value, index) => [
        ceilingMilliseconds(value),
        ceilingMilliseconds(deviation[index])
    ]);
};

export const updateGraph__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    const joined = meanAndDeviationToSeconds(mean, deviation);
    const length = joined.length;
    const limit = 30;
    const diff = (limit > length) ? 0 : Math.abs(limit - joined.length);
    const data = joined.slice(diff, length);

    graph.setData({
        data,
        stackedCategory: [ 'Mean', 'Deviation' ],
        barCategory: data.map((_, index) => (diff + index).toString())
    });
};

const totalCounterToData = ({ critical_counter, error_counter }: Counter): Array<Array<number>> => {
    return [ critical_counter, error_counter ];
};

export const updateCounter__ = (counter: WidgetElements, projects: object): void => {
    const children = Object.keys(projects).reduce((acc, name: string) => {
        acc[name] = {
            data: totalCounterToData(projects[name].total_counter)
        }

        return acc;
    }, {});

    counter.setData({
        extended: true,
        children
    });
};

interface Father {
    level: string;
    message: string;
    timestamp: number;
    traceback?: string;
    response_code?: number;
    request_duration?: number;
}

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

const tracebackChildren = (tracebacks: Array<Response>): Object => {
    if (0 === tracebacks.length) {
        return {
            'Soon data will be displayed here': {}
        };
    }

    return tracebacks.reduce((acc, { project, ...remaining }) => {
        acc[project] = createChildren(remaining);

        return acc;
    }, {});
};

export const updateTracebacks__ = (table: WidgetElements, tracebacks: Array<Response>): void => {
    table.setData({
        extended: true,
        children: tracebackChildren(tracebacks)
    });
};
