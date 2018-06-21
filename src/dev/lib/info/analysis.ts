'use strict';

import { Response } from '../api/raccoon';

interface Info {
    mean: number;
    error_counter: number;
    critical_counter: number;
    last_five: Array<Response>;
}

export const reviewResponse = (array: Array<Response>): Info => {
    return {
        mean: 0,
        error_counter: 0,
        critical_counter: 0,
        last_five: []
    };
};
