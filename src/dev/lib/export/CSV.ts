import { existsSync, mkdirSync , writeFileSync } from 'fs';
import { Parser } from 'json2csv';
import { Response } from '../api/raccoon';
import { Analysis } from '../data/analysis';
import { Counter, Project } from '../data/project';

interface ProjectCSV extends Counter {
    name: string;
    logs: Array<Response>;
}

const joiningCounters = ({ tmp_counter, total_counter }: Project): Counter => {
    return {
        error_counter: total_counter.error_counter.concat(tmp_counter.error_counter),
        critical_counter: total_counter.critical_counter.concat(tmp_counter.critical_counter)
    }
};

const projectsToCSV = (projects: object): Array<ProjectCSV> => Object.keys(projects).reduce((acc, name) => {
    const cur = projects[name];

    acc.push({
        name,
        logs: cur.logs,
        ...joiningCounters(cur)
    });

    return acc;
}, []);

export const toCSV = ({ mean, standard_deviation, total_timestamp, projects }: Analysis, name = 'dev'): boolean => {
    const folder = './output/';
    const options = {
        includeEmptyRows: true
    };
    const numbers = new Parser(options);
    const data = new Parser(options);
    const task = projectsToCSV(projects);

    if (false === existsSync(folder)) {
        mkdirSync(folder);
    }

    try {
        writeFileSync(folder.concat(name, '.csv'), numbers.parse({ mean, standard_deviation, total_timestamp }), 'utf8');

        task.map(({ name, ...remaining }) => {
            writeFileSync(folder.concat(name, '_projects.csv'), data.parse(remaining), 'utf8');
        });

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
};
