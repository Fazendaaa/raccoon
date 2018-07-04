'use strict';

import { analysis } from '../../main';
import { toCSV } from '../export/CSV';
import { counter, display, displayData, displayGraph, graph, header, hour, leave, loading, minute, tracing } from './layout';

const leave__ = (): void => process.exit(0);

// https://stackoverflow.com/q/33843091/7092954
const promiseTimeout__ = (time: number) => new Promise((resolve) => setTimeout(() => resolve(time), time));

const __loadingData__ = async (percentage = 0): Promise<void> => {
    if (100 >= percentage) {
        await promiseTimeout__(100);
        loading.setPercent(percentage);
        __loadingData__(percentage + 10);
    }
};

export const loadingData__ = async (): Promise<void> => {
    loading.show();
    await __loadingData__();
    loading.hide();
};

export const killAll__ = (): void => {
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

const unexpectedTermination__ = (err) => {
    console.error(err);
    toCSV(analysis, 'error');
    leave__();
};

// The value parameter IS NOT a string, it is a boolean but since the typing file is wrong, TS compiler is warning about
// it. This function is farther from being a 'write way' of correcting this.
// Issue about this: https://github.com/chjj/blessed/issues/348
const typingBoolean = (value: any): boolean => value;

const returnToProgram = (): void => {
    leave.ask('Would you like to return to the application?', (err, value) => {
        if (null !== err) {
            unexpectedTermination__(err);
        } if (true === typingBoolean(value)) {
            respawnAll();
        } else {
            leave__();
        }
    });
};

export const exiting__ = (): void => {
    display.append(leave);

    leave.ask('Would you like to export to CSV?', (err, value) => {
        if (null !== err) {
            unexpectedTermination__(err);
        } if (true === typingBoolean(value)) {
            leave__();
        } else {
            returnToProgram();
        }
    });
};

const handleClick__ = (): void => {
    tracing.on('click', () => tracing.focus());
    counter.on('click', () => counter.focus());
    displayGraph.on('click', () => displayGraph.focus());
};

const handleSelect__ = (): void => {
    tracing.on('select', async ({ data }) => {
        if (undefined !== data) {
            displayGraph.hide();
            await loadingData__();

            displayData.show();
            displayData.setMarkdown(data);
        }
    });

    counter.on('select', async ({ data }) => {
        if (undefined !== data) {
            displayData.hide();
            await loadingData__();

            displayGraph.show();
            displayGraph.setData({
                data,
                headers: ['Hour', 'Errors', 'Critical']
            });
        }
    });
};

const handleResize__ = (): void => {
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
};

const handleOn__ = (): void => {
    handleClick__();
    handleSelect__();
    handleResize__();
};

export const initHandle__ = (): void => {
    header.setMarkdown('\
To allow easy visualization, the milliseconds in the graph are ceiled -- "round up".\n\n\
Just click on Traceback or Counters area and then navigate through arrows.\n\n\
When exiting, you will be asked whether or not want to export the data to CSV.\n\
');

    display.key(['escape', 'q', 'C-c'], () => {
        killAll__();
        exiting__();
    });

    handleOn__();
};
