'use strict';

import { question, screen } from 'blessed';
import { gauge, grid, markdown, stackedBar, table, tree } from 'blessed-contrib';
import { exiting__, killAll__, loadingData__ } from './handle';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

export const header = background.set(12, 43, 18, 7, markdown, {
    label: 'Usage'
});

export const displayGraph = background.set(30, 19.8, 21, 30.2, table, {
    keys: true,
    fg: 'green',
    columnSpacing: 1,
    label: 'Display Data',
    columnWidth: [
        40,
        40,
        40
    ]
});

export const displayData = background.set(30, 19.8, 21, 30.2, markdown, {
    label: 'Display Data'
});

export const graph = background.set(0, 0, 30, 43, stackedBar, {
    xOffset: 1,
    barWidth: 2,
    height: '100%',
    barSpacing: -1,
    label: 'Milliseconds vs Requests',
    barBgColor: [
        'red',
        'cyan'
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

export const loading = background.set(30, 19.8, 21, 30.2, gauge, {
    fill: 'white',
    stroke: 'magenta',
    label: 'Display Loading'
});

export const tracing = background.set(30, 0, 21, 10, tree, {
    fg: 'cyan',
    label: 'Tracebacks'
});

export const counter = background.set(30, 10, 21, 10, tree, {
    fg: 'cyan',
    label: 'Counters'
});

export const leave = question({
    keys: true,
    mouse: true,
    top: 25,
    left: 90
});

loading.hide();

header.setMarkdown('\
To allow easy visualization, the milliseconds in the graph are ceiled -- "round up".\n\n\
Just click on Traceback or Counters area and then navigate through arrows.\n\n\
When exiting, you will be asked whether or not want to export the data to CSV.\n\
');

tracing.on('click', () => {
    tracing.focus();
});

counter.on('click', () => {
    counter.focus();
});

tracing.on('select', ({ data }) => {
    if (undefined !== data) {
        displayGraph.hide();
        loadingData__();
        displayData.show();
        displayData.setMarkdown(data);
    }
});

counter.on('select', ({ data }) => {
    if (undefined !== data) {
        displayData.hide();
        loadingData__();
        displayGraph.show();
        displayGraph.setData({
            data,
            headers: ['Hour', 'Errors', 'Critical']
        });
    }
});

display.key(['escape', 'q', 'C-c'], () => {
    killAll__();
    exiting__();
});

display.on('resize', () => {
    hour.emit('attach');
    graph.emit('attach');
    header.emit('attach');
    minute.emit('attach');
    loading.emit('attach');
    tracing.emit('attach');
    counter.emit('attach');
    displayData.emit('attach');
    displayGraph.emit('attach');
});
