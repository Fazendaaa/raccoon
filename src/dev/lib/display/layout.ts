import { question, screen } from 'blessed';
import { gauge, grid, markdown, stackedBar, table, tree } from 'blessed-contrib';
import { initHandle__ } from './handle';

export const display = screen();

const background = new grid({
    rows: 50,
    cols: 50,
    screen: display
});

export const tracing = background.set(30, 0, 21, 10, tree, {
    fg: 'cyan',
    label: 'Tracebacks'
});

export const counter = background.set(30, 10, 21, 10, tree, {
    fg: 'cyan',
    label: 'Counters'
});

export const header = background.set(12, 43, 18, 7, markdown, {
    label: 'Usage'
});

export const displayData = background.set(30, 19.8, 21, 30.2, markdown, {
    label: 'Display Data'
});

export const hour = background.set(6, 43, 6, 7, gauge, {
    fill: 'white',
    stroke: 'red',
    label: 'Next Update Per Hour'
});

export const minute = background.set(0, 43, 6, 7, gauge, {
    fill: 'white',
    stroke: 'green',
    label: 'Next Update Per Minute'
});

export const graph = background.set(0, 0, 30, 43, stackedBar, {
    xOffset: 1,
    barWidth: 2,
    height: '100%',
    barSpacing: -1,
    label: 'Requests Milliseconds vs Time (Minute)',
    barBgColor: [
        'red',
        'cyan'
    ]
});

export const displayGraph = background.set(30, 19.8, 21, 30.2, table, {
    keys: true,
    fg: 'green',
    columnSpacing: 1,
    label: 'Display Data',
    columnWidth: [
        45,
        45,
        45
    ]
});

export const leave = question({
    keys: true,
    mouse: true,
    top: 25,
    left: 90
});

initHandle__();
