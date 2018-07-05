import { Widgets } from 'blessed';
import { analysis } from '../../main';
import { toCSV } from '../export/CSV';
import { counter, display, displayData, displayGraph, graph, header, hour, leave, minute, tracing } from './layout';

const leave__ = (): void => process.exit(0);

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

const __returnToProgram__ = (err: any, value: string): void => {
    if (null !== err) {
        unexpectedTermination__(err);
    } if (true === typingBoolean(value)) {
        respawnAll();
    } else {
        leave__();
    }
};

const returnToProgram__ = (): void => leave.ask('Would you like to return to the application?', __returnToProgram__);

const handleClick__ = (): void => {
    tracing.on('click', () => tracing.focus());
    counter.on('click', () => counter.focus());
    displayGraph.on('click', () => displayGraph.focus());
};

const __handleSelectTracing__ = ({ data }: { data: string }): void => {
    if (undefined !== data) {
        displayGraph.hide();
        displayData.show();
        displayData.setMarkdown(data);
    }
};

const __handleSelectCounter__ = ({ data }: { data: Array<Array<number>> }): void => {
    if (undefined !== data) {
        displayData.hide();
        displayGraph.show();
        displayGraph.setData({
            data,
            headers: ['Hour', 'Errors', 'Critical']
        });
    }
};

const handleSelect__ = (): void => {
    tracing.on('select', __handleSelectTracing__);
    counter.on('select', __handleSelectCounter__);
};

const handleResize__ = (): Widgets.Screen => display.on('resize', () => {
    hour.emit('attach');
    graph.emit('attach');
    header.emit('attach');
    minute.emit('attach');
    tracing.emit('attach');
    counter.emit('attach');
    displayData.emit('attach');
    displayGraph.emit('attach');
});

const handleOn__ = (): void => {
    handleClick__();
    handleSelect__();
    handleResize__();
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

const __exiting__ = (err: any, value: string): void => {
    if (null !== err) {
        unexpectedTermination__(err);
    } if (true === typingBoolean(value)) {
        leave__();
    } else {
        returnToProgram__();
    }
};

export const exiting__ = (): void => {
    display.append(leave);
    leave.ask('Would you like to export to CSV?', __exiting__);
};

export const initHandle__ = (): void => {
    header.setMarkdown('\
To allow easy visualization, the milliseconds in the graph are ceiled -- "round up".\n\n\
Just click on Traceback or Counters area and then navigate through arrows.\n\n\
Only the five last tracebacks are shown and the Counters are grouped by hour.\n\n\
When exiting, you will be asked whether or not want to export the data to CSV.\n\
');

    display.key(['escape', 'q', 'C-c'], () => {
        killAll__();
        exiting__();
    });

    handleOn__();
};
