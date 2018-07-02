'use strict';

import { BarData, LineData, WidgetElements } from 'blessed-contrib';

const meanTotal = {
    title: 'Mean',
    x: [],
    y: [],
    style: {
        line: 'red'
    }
};

const deviationTotal = {
    title: 'Deviation',
    x: [],
    y: [],
    style: {
        line: 'yellow'
    }
};

const timerTotal = {
    percent: 0,
    color: 'green',
    label: 'Loading'
};

const setGraphData__ = ({ x, y, ...remaining }: LineData, cur: number): void => {
    y.push(cur);
    x.push(x.length.toString());
};

const setAxis = (data: Array<number>) => {
    return {
        y: data,
        x: data.map((value, index) => index.toString())
    };
};

const randomColor = (): Array<number> => [ Math.random() * 255, Math.random() * 255, Math.random() * 255 ];

const setCounterData__ = (data: Array<number>, title: string): BarData => {
    return {
        title,
        ...setAxis(data),
        style: randomColor()
    };
};

export const updateGraph__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    setGraphData__(meanTotal, mean[mean.length - 1]);
    setGraphData__(deviationTotal, deviation[deviation.length - 1]);

    graph.setData([
        meanTotal,
        deviationTotal
    ]);
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

export const setTimer__ = (timer: WidgetElements, value: number): number => {
    timerTotal.percent = value;

    timer.setData([ timerTotal ]);

    return timerTotal.percent;
};

export const addToTimer__ = (timer: WidgetElements, value: number): number => {
    timerTotal.percent += value;

    timer.setData([ timerTotal ]);

    return timerTotal.percent;
};
