'use strict';

import { BarData, LineData, WidgetElements } from 'blessed-contrib';

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

const generateRandom = (min: number, max: number): number => Math.random() * ((max - min) + min);

const randomColor = (): Array<number> => [ generateRandom(0, 255), generateRandom(0, 255), generateRandom(0, 255) ];

const setCounterData__ = (data: Array<number>, title: string): BarData => {
    return {
        title,
        ...setAxis(data),
        style: {
            line: randomColor()
        }
    };
};

const roundDeviation = (deviation: number): number => parseFloat(deviation.toFixed(1));

export const updateGraph__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    const joined = mean.map((value, index) => [ value, roundDeviation(deviation[index]) ]);
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

export const updateCounter__ = (error: WidgetElements, critical: WidgetElements, projects: object): void => {
    const counter = Object.keys(projects).reduce((acc, name: string) => {
        const curError = projects[name].total_counter.error_counter;
        const curCritical = projects[name].total_counter.critical_counter;

        acc.error_counter.push(setCounterData__(curError, name));
        acc.critical_counter.push(setCounterData__(curCritical, name));

        return acc;
    }, {
        error_counter: [],
        critical_counter: []
    });

    error.setData(counter.error_counter);
    critical.setData(counter.critical_counter);
};
