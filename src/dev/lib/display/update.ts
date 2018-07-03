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

const roundToOne = (toRound: number): number => parseFloat(toRound.toFixed(1));

export const updateGraph__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    const joined = mean.map((value, index) => [ value, roundToOne(deviation[index]) ]);
    const length = joined.length;
    const limit = 22;
    const diff = (limit > length) ? 0 : Math.abs(limit - joined.length);
    const data = joined.slice(diff, length);

    graph.setData({
        data,
        stackedCategory: ['Mean', 'Deviation'],
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
            response_code: childrenfy(response_code),
            request_duration: childrenfy(request_duration)
        }
    };
};

export const updateTracebacks__ = (table: WidgetElements, tracebacks: Array<Response>): void => {
    const children = tracebacks.reduce((acc, { project, ...remaining }) => {
        acc[project] = createChildren(remaining);

        return acc;
    }, {});

    table.setData({
        extended: true,
        children
    });
};
