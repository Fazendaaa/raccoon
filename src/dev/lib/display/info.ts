'use strict';

import { screen } from 'blessed';
import { gauge, grid, markdown, stackedBar, tree } from 'blessed-contrib';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

const header = background.set(12, 43, 18, 7, markdown, {
    label: 'Usage'
});

const displayData = background.set(30, 20, 21, 30, markdown, {
    label: 'Display Data'
});

const displayGraph = background.set(30, 20, 21, 30, stackedBar, {
    label: 'Display Data',
    barWidth: 2,
    barSpacing: -1,
    xOffset: 1,
    height: '100%',
    barBgColor: [
        'magenta',
        'blue'
    ]
});

export const graph = background.set(0, 0, 30, 43, stackedBar, {
    label: 'Minutes vs Requests',
    barWidth: 2,
    barSpacing: -1,
    xOffset: 1,
    height: '100%',
    barBgColor: [
        'red',
        'white'
    ]
});

export const minute = background.set(0, 43, 6, 7, gauge, {
    fill: 'white',
    stroke: 'green',
    label: 'Next Update Per Minute'
});

export const hour = background.set(6, 43, 6, 7, gauge, {
    fill: 'white',
    stroke: 'red',
    label: 'Next Update Per Hour'
});

export const tracing = background.set(30, 0, 21, 10, tree, {
    fg: 'cyan',
    label: 'Tracebacks'
});

export const counter = background.set(30, 10, 21, 10, tree, {
    fg: 'cyan',
    label: 'Counters'
});

header.setMarkdown('\
Just click on traceback or Counters area and then navigate through arrows.\n\
');

tracing.on('click', () => {
    tracing.focus();
});

counter.on('click', () => {
    counter.focus();
});

tracing.on('select', ({ data }) => {
    if (undefined !== data) {
        displayData.setMarkdown(data);
    }
});

counter.on('select', ({ data }) => {
    if (undefined !== data) {
        displayGraph.setData({
            data,
            stackedCategory: [ 'Critical', 'Error' ],
            barCategory: data.map((_, index) => index.toString())
        });
    }
});

display.key(['escape', 'q', 'C-c'], () => process.exit(0));

display.on('resize', () => {
    graph.emit('attach');
    header.emit('attach');
    minute.emit('attach');
    tracing.emit('attach');
    counter.emit('attach');
});
