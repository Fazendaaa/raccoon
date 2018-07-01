'use strict';

import { LineData, WidgetElements } from 'blessed-contrib';

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

const setLineData__ = ({ x, y, ...remaining }: LineData, cur: number): void => {
    y.push(cur);
    x.push(x.length.toString());
};

export const updateLine__ = (graph: WidgetElements, mean: Array<number>, deviation: Array<number>): void => {
    setLineData__(meanTotal, mean[mean.length - 1]);
    setLineData__(deviationTotal, deviation[deviation.length - 1]);

    graph.setData([
        meanTotal,
        deviationTotal
    ]);
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
