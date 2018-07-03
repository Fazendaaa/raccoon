'use strict';

import { question, screen } from 'blessed';
import { gauge, grid, markdown, stackedBar, tree } from 'blessed-contrib';
import { analysis } from '../../main';
import { toCSV } from '../export/CSV';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

const header = background.set(12, 43, 18, 7, markdown, {
    label: 'Usage'
});

const displayGraph = background.set(30, 20, 21, 30, stackedBar, {
    xOffset: 1,
    barWidth: 2,
    height: '100%',
    barSpacing: -1,
    label: 'Display Data',
    barBgColor: [
        'blue',
        'magenta'
    ]
});

const displayData = background.set(30, 20, 21, 30, markdown, {
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

export const tracing = background.set(30, 0, 21, 10, tree, {
    fg: 'cyan',
    label: 'Tracebacks'
});

export const counter = background.set(30, 10, 21, 10, tree, {
    fg: 'cyan',
    label: 'Counters'
});

header.setMarkdown('\
To allow easy visualization, the seconds in the graph are ceiled -- "round up".\n\n\
Just click on traceback or Counters area and then navigate through arrows.\n\n\
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
        displayData.show();
        displayData.setMarkdown(data);
    }
});

counter.on('select', ({ data }) => {
    if (undefined !== data) {
        displayData.hide();
        displayGraph.show();
        displayGraph.setData({
            data,
            stackedCategory: [ 'Critical', 'Error' ],
            barCategory: data.map((_, index) => index.toString())
        });
    }
});

const killAll__ = (): void => {
    hour.hide();
    graph.hide();
    header.hide();
    minute.hide();
    tracing.hide();
    counter.hide();
    displayData.hide();
    displayGraph.hide();
};

const respawnAll = (): void => {
    hour.show();
    graph.show();
    header.show();
    minute.show();
    tracing.show();
    counter.show();
    displayData.show();
    displayGraph.show();
};

const leave__ = (): void => process.exit(0);

const leave = question({
    keys: true,
    mouse: true,
    top: 25,
    left: 90
});

const returnToProgram = (): void => {
    leave.ask('Would you like to return to the application?', (err, value) => {
        if (err) {
            console.error(value);
            toCSV(analysis);
            leave__();
        } if ('true' === value) {
            respawnAll();
        } else {
            leave__();
        }
    });
};

const exiting__ = (): void => {
    display.append(leave);

    leave.ask('Would you like to export to CSV?', (err, value) => {
        if (err) {
            console.error(value);
        } if ('false' === value) {
            returnToProgram();
        }

        toCSV(analysis);
        leave__();
    });
};

display.key(['escape', 'q', 'C-c'], () => {
    killAll__();
    exiting__();
});

display.on('resize', () => {
    hour.emit('attach');
    graph.emit('attach');
    header.emit('attach');
    minute.emit('attach');
    tracing.emit('attach');
    counter.emit('attach');
    displayData.emit('attach');
    displayGraph.emit('attach');
});
