'use strict';

import { analysis } from '../../main';
import { toCSV } from '../export/CSV';
import { counter, display, displayData, displayGraph, graph, header, hour, leave, loading, minute, tracing } from './info';

const leave__ = (): void => process.exit(0);

export const loadingData__ = async (): Promise<void> => {
    loading.show();

    for (let index = 0; index <= 100; index += 10) {
        setTimeout(() => loading.setPercent(10 * index), 800);
    }

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
