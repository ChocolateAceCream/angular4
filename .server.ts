// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import { ngExpressEngine } from '@nguniversal/express-engine';

// Express server
const app = express();
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');//so the input and output are both html
app.set('views', 'dist');

//for root route, render index.html
app.get('/', (req, res) => {
  res.render('index', {req, res});
});

// Server static files from /dist
app.use(express.static(`${__dirname}/dist`));

//for other route, render index.html
app.get('*', (req, res) => {
  res.render('index', {req, res});
});

// Start up the Node server
app.listen(3000, () => {
  console.log(`Node server listening on http://localhost:3000`);
});
