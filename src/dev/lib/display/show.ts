'use strict';

import { Analysis } from '../info/analysis';
import { display, graph, timer, tracebacks } from './info';
import { updateLine__ } from './update';

let drawing;

const updateDisplay__ = (initial = 0): void => {
    let percent = initial;

    drawing = setInterval(() => {
        timer.setData([{
            percent,
            color: 'green',
            label: 'Countdown'
        }]);
        percent += 1.6;
        display.render();
    }, 1 * 1000);
};

export const initDisplay__ = (): void => updateDisplay__(new Date().getSeconds());

export const displayAnalysis__ = (data: Analysis): void => {
    updateLine__(graph, data.mean, data.standard_deviation);
    tracebacks.log('Lorem Ipsum');

    clearInterval(drawing);
    updateDisplay__();
};
