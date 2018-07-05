'use strict';

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { join } from 'path';

config();

const htmlPath = join(__dirname, '../../html/Processo seletivo - Tags.html');
const html = readFileSync(htmlPath);
const { window } = new JSDOM(html);
const { document } = window;

console.log(document.getElementsByTagName('div.product[data-id="AEMD818BZA_PRD"]'));
