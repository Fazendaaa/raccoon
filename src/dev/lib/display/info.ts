'use strict';

import { screen } from 'blessed';
import { gauge, grid, markdown, set, stackedBar, tree } from 'blessed-contrib';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

export const graph = background.set(0, 0, 30, 43, stackedBar, {
    label: 'Minutes vs Requests',
    barWidth: 2,
    barSpacing: -1,
    xOffset: 1,
    height: '100%',
    barBgColor: ['red', 'blue']
});

export const minute = background.set(0, 43, 9, 7, gauge, {
    fill: 'white',
    stroke: 'green',
    label: 'Next Update Per Minute'
});

export const hour = background.set(9, 43, 10, 7, gauge, {
    fill: 'white',
    stroke: 'red',
    label: 'Next Update Per Hour'
});

const displayData = background.set(30, 20, 21, 30, markdown, {
    label: 'Display Data'
});

export const tracing = background.set(30, 0, 21, 10, tree, {
    label: 'Tracebacks',
    fg: 'cyan'
});

tracing.focus();
tracing.on('select', ({ data }) => {
    if (undefined !== data) {
        displayData.setMarkdown(data);
    }
});

export const counter = background.set(30, 10, 21, 10, tree, {
    label: 'Counters',
    fg: 'cyan'
});

const displayGraph = background.set(30, 20, 21, 30, stackedBar, {
    label: 'Display Data',
    barWidth: 2,
    barSpacing: -1,
    xOffset: 1,
    height: '100%',
    barBgColor: ['red', 'blue']
});

counter.focus();
counter.on('select', ({ data }) => {
    if (undefined !== data) {
        displayGraph.setData({
            data,
            stackedCategory: ['Error', 'Critical'],
            barCategory: data.map((_, index) => index.toString())
        });
    }
});

display.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});

display.on('resize', () => {
    graph.emit('attach');
    minute.emit('attach');
    tracing.emit('attach');
    counter.emit('attach');
});
