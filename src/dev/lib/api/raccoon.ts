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
    total_timestamp: Array<number>;
}

const handleApiData__ = (response: IncomingMessage): Promise<string | Error> => new Promise((resolve, reject) => {
    const { statusCode } = response;
    const chunk = [];

    if (200 !== statusCode) {
        reject(new Error('Connection not accepted.'));
    }

    response
        .setEncoding('utf8')
        .on('data', (data: string) => chunk.push(data))
        .on('end', () => resolve(chunk.join('')))
        .on('error', reject)
        .on('uncaughtException', reject);
});

const getPromise__ = (request: RequestOptions): Promise<string | Error> => new Promise((resolve, reject) => {
    get(request, response => {
        handleApiData__(response)
            .then(resolve)
            .catch(reject);
    })
    .on('error', reject)
    .on('uncaughtException', reject);
});

const defaultAuthorization = <string> process.env.API_KEY;
const defaultHostname = <string> process.env.HOSTNAME;

export const getLogs__ = async ({ authorization = defaultAuthorization, hostname = defaultHostname }: Request): Promise<Array<Response> | Error> => {
    const split = hostname.split(/\/(.+)/);
    const request =  {
        hostname: split[0],
        path: `/${split[1]}`,
        rejectUnauthorized: false,
        headers: {
            authorization
        }
    };

    try {
        const response = <string> await getPromise__(request);

        return JSON.parse(response);
    } catch (e) {
        throw e;
    }
};

export const byTimestamp = (a: Response, b: Response): number => a.timestamp - b.timestamp;
