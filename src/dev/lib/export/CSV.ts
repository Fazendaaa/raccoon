import { existsSync, mkdirSync , writeFileSync } from 'fs';
import { Parser } from 'json2csv';
import { Response } from '../api/raccoon';
import { Analysis } from '../data/analysis';
import { Counter, Project } from '../data/project';

interface ProjectCSV extends Counter {
    name: string;
    logs: Array<Response>;
}

const folder = './output/';

const options = {
    flatten: true,
    includeEmptyRows: true
};

const joiningCounters = ({ tmp_counter, total_counter }: Project): Counter => {
    return {
        error_counter: total_counter.error_counter.concat(tmp_counter.error_counter),
        critical_counter: total_counter.critical_counter.concat(tmp_counter.critical_counter)
    }
};

const parseProjectsToCSV = (projects: object): Array<ProjectCSV> => Object.keys(projects).reduce((acc, name) => {
    const cur = projects[name];

    acc.push({
        name,
        logs: cur.logs,
        ...joiningCounters(cur)
    });

    return acc;
}, []);

const projectToCSV = (data: object): boolean => {
    const task = parseProjectsToCSV(data);
    const projects = new Parser(options);

    try {
        task.map(({ name, ...remaining }) => {
            writeFileSync(folder.concat(name, '.projects.csv'), projects.parse(remaining), 'utf8');
        });

        return false;
    } catch (e) {
        console.error(e);

        return false;
    }
};

const analysisToCSV = ({ mean, standard_deviation, total_timestamp, projects }: Analysis, name: string): boolean => {
    const numbers = new Parser(options);

    try {
        writeFileSync(folder.concat(name, '.csv'), numbers.parse({ mean, standard_deviation, total_timestamp }), 'utf8');
        projectToCSV(projects);

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
};

export const toCSV = (data: Analysis, name = 'dev'): boolean => {
    if (false === existsSync(folder)) {
        mkdirSync(folder);
    }

    return analysisToCSV(data, name);
};
