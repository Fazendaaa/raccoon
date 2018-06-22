'use strict';

import { config } from 'dotenv';
import { IncomingMessage } from 'http';
import { get, RequestOptions } from 'https';

config();

type INFO = string;
type DEBUG = string;
type ERROR = string;
type CRITICAL = string;

export interface Request extends Object {
    hostname?: string;
    authorization?: string;
};

export interface Response extends Object {
    project: string;
    message: string;
    timestamp: number;
    traceback?: string;
    response_code?: number;
    request_duration?: number;
    level: INFO | DEBUG | ERROR | CRITICAL;
};

export interface TotalRequest extends Object {
    total_timestamp: number;
    request_counter: number;
    standard_deviation: number;
}

const handleApiData = (response: IncomingMessage): Promise<string | Error> => new Promise((resolve, reject) => {
    let chunk = '';

    if (200 !== response.statusCode) {
        throw new Error('Connection not accepted.');
    }

    response.setEncoding('utf8');
    response.on('data', (data: string) => chunk += data);
    response.on('end', () => resolve(chunk));
});

const getPromise = (request: RequestOptions): Promise<string | Error> => new Promise(resolve => {
    get(request, async (response) => resolve(await handleApiData(response)))
    .on('error', (e) => {
        throw e;
    });
});

const defaultAuthorization = <string> process.env.API_KEY;
const defaultHostname = <string> process.env.HOSTNAME;

export const getLogs = async ({ authorization = defaultAuthorization, hostname = defaultHostname }: Request): Promise<Array<Response>> => {
    const split = hostname.split(/\/(.+)/);
    const request =  {
        hostname: split[0],
        path: `/${split[1]}`,
        headers: { authorization }
    };

    try {
        const response = <string> await getPromise(request);

        return JSON.parse(response);
    } catch (e) {
        throw e;
    }
};

export const byTimestamp = (a: Response, b: Response): number => a.timestamp - b.timestamp;
