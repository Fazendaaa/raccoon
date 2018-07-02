'use strict';

import { screen } from 'blessed';
import { gauge, grid, line, markdown, set, stackedBar, table } from 'blessed-contrib';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

export const graph = background.set(0, 0, 30, 43, stackedBar, {
    label: 'Min vs Requests',
    barWidth: 2,
    barSpacing: -1,
    xOffset: 1,
    height: '100%',
    barBgColor: ['red', 'blue']
});

export const timer = background.set(0, 43, 9, 7, gauge, {
    fill: 'white',
    stroke: 'green',
    label: 'Next Update'
});

const header = background.set(9, 43, 22, 7, markdown, {
    label: 'Usage'
});

header.setMarkdown('\n\
To exit press: Escape (ESC), Ctrl + c, q\n\n\
To save all the data as CSV just terminate the program.\n\
');

export const tracing = background.set(30, 0, 21, 25, table, {
    keys: true
    , fg: 'white'
    , selectedFg: 'white'
    , selectedBg: 'blue'
    , interactive: true
    , label: 'Active Processes'
    , width: '30%'
    , height: '30%'
    , border: { type: 'line', fg: 'cyan' }
    , columnSpacing: 10
    , columnWidth: [16, 12, 12]
});

export const criticalCounter = background.set(30, 25, 10, 25, line, {
    style: {
        text: 'blue',
        line: 'white',
        baseline: 'black'
    },
    showLegend: true,
    label: 'Critical Counter'
});

export const errorCounter = background.set(40, 25, 11, 25, line, {
    style: {
        text: 'green',
        line: 'yellow',
        baseline: 'black'
    },
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
    tracing.emit('attach');
    errorCounter.emit('attach');
});
