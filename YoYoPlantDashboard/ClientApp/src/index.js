/*
 *   FILE          : index.js
 *   PROJECT       : SENG3120 - Business Intelligence - Assignment #2
 *   PROGRAMMER    : Brendan Rushing
 *   FIRST VERSION : 2021-02-13
 *   DESCRIPTION   :   Create a live reportwith the following requirements:
 *                      a.Allow the user to choose any one, or all, of the products to perform the calculations for the report.
 *                        The choice may be changed any timeby the user, and the report should be updated immediately upon change.
 *
 *                      b.Use the MS Chartcontrol to display a Pareto diagram showing the reasons for rejection (rework and scrap combined).
 *                      c.Make sure to show the actual numbers on the chart.
 *                      d.In addition to the Pareto diagram, display the following information based on the chosen product (or all products):
 *                        i.Total parts molded
 *                        ii.Total parts successfully molded
 *                        iii.Yield at Mold: (Total parts successfully molded) / (Total parts molded)
 *                        iv.Total parts successfully painted
 *                        v.Yield at Paint: (Total parts successfully painted) / (Total parts successfully molded)
 *                        vi.Total parts successfully assembledvii.Yield at Assembly: (Total parts successfully assembled) / (Total parts successfully painted)
 *                        viii.Total parts packaged
 *                        ix.Total Yield: (Total parts packaged) / (Total parts molded)
 *                      e.The data should be updated automaticallyusing a timer or manually using a button on the report
 * */

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

