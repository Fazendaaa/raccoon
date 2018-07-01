'use strict';

import { screen } from 'blessed';
import { donut, grid, line, log, markdown, set } from 'blessed-contrib';

export const display = screen();

const background = new grid({
    rows: 12,
    cols: 12,
    screen: display
});

export const graph = background.set(0, 0, 8, 10, line, {
    style: {
        text: 'green',
        line: 'yellow',
        baseline: 'black'
    },
    data: [{
        title: '',
        x: [],
        y: [100]
    }],
    showNthLabel: 5,
    label: 'Time vs Value',
    showLegend: true
});

export const timer = background.set(0, 10, 3, 2, donut, {
    label: 'Next Update',
    radius: 0,
    yPadding: 2,
    archWidth: 2,
    remainColor: 'black'
});

const header = background.set(3, 10, 5.2, 2, markdown, {
    label: 'Usage'
});

export const tracebacks = background.set(8, 0, 4.25, 6, log, {
    fg: 'green',
    label: 'Tracebacks',
    selectedFg: 'green'
});

export const errorCounter = background.set(8, 6, 4.25, 6, line, {
    style: {
        text: 'green',
        line: 'yellow',
        baseline: 'black'
    },
    data: [{
        title: '',
        x: [],
        y: [10]
    }],
    showLegend: true,
    label: 'Error Counter'
});

display.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});

display.on('resize', () => {
    graph.emit('attach');
    timer.emit('attach');
    header.emit('attach');
    tracebacks.emit('attach');
    errorCounter.emit('attach');
});
