/*
 *   FILE          : Dashboard.js
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

import React, { useEffect } from 'react';

import ParetoChart from 'pareto-chart'
import DashboardDataDisplay from './DashboardDataDisplay';

const SERVER_CALL_INTERVAL_MS = 30000;


/*
FUNCTION : Dashboard
DESCRIPTION : This function creates the dashboard page for react application.
PARAMETERS : none
RETURNS : none
*/
export const Dashboard = () => {
  const [yoyoType, setYoyoType] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [defects, setDefects] = React.useState([]);
  const [totalPartsMolded, setTotalPartsMolded] = React.useState(0);
  const [totalPartsSuccessMolded, setTotalPartsSuccessMolded] = React.useState(0);
  const [yieldAtMold, setYieldAtMold] = React.useState(0);
  const [totalPartsSuccessPaint, setTotalPartsSuccessPaint] = React.useState(0);
  const [yieldAtPaint, setYieldAtPaint] = React.useState(0);
  const [totalPartsSuccessAssembly, setTotalPartsSuccessAssembly] = React.useState(0);
  const [yieldAtAssembly, setYieldAtAssembly] = React.useState(0);
  const [totalPartsPackaged, setTotalPartsPackaged] = React.useState(0);
  const [totalYield, setTotalYield] = React.useState(0);  


  /*
  FUNCTION : useEffect
  DESCRIPTION : This function is called when component state changes.
  PARAMETERS : none
  RETURNS : none
  */
  useEffect(() => {
    populateData(yoyoType)

    const interval = setInterval(() => {
      populateData(yoyoType);
    }, SERVER_CALL_INTERVAL_MS);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval); 
  }, [yoyoType])

  /*
  FUNCTION : childCallbackYoYoType
  DESCRIPTION : This function is called when child component state changes.
  PARAMETERS : value
  RETURNS : none
  */
  const childCallbackYoYoType = (value) => {
        setYoyoType(value)
  }

  /*
  FUNCTION : renderParetoChart
  DESCRIPTION : This function renders pareto chart
  PARAMETERS : defects
  RETURNS : none
  */
  const renderParetoChart = (defects) => {
    let myObj = { 'Defects': defects };
    return (
      <ParetoChart
        width={100}
        height={50}
        lineLabel='Cumulative percentage'
        data={myObj}
      />
    );
  }

  /*
  FUNCTION : populateData
  DESCRIPTION : This function calls server to get data for app.
  PARAMETERS : id
  RETURNS : none
  */
  async function populateData(id) {

    // Get defect data.
    const apiString1 = 'getDefects/' + id;
    const response1 = await fetch(apiString1);
    const data1 = await response1.json();

    const transformed1 = Object.assign(
      {},
      ...data1.map(({ defectName, defects }) => ({ [defectName]: defects }))
    );

    setLoading(false);
    setDefects(transformed1);    

    // Get plant data.
    const apiString2 = 'getData/' + id;
    const response2 = await fetch(apiString2);
    const data2 = await response2.json();

    // Set plant data attributes.
    setTotalPartsMolded(data2.totalPartsMolded);
    setTotalPartsPackaged(data2.totalPartsPackaged);
    setTotalPartsSuccessAssembly(data2.totalPartsSuccessAssembly);
    setTotalPartsSuccessMolded(data2.totalPartsSuccessMolded);
    setTotalPartsSuccessPaint(data2.totalPartsSuccessPaint);
    setTotalYield(data2.totalYield);
    setYieldAtAssembly(data2.yieldAtAssembly);
    setYieldAtMold(data2.yieldAtMold);
    setYieldAtPaint(data2.yieldAtPaint);    
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderParetoChart(defects);

    return (
      <div>        
            <div className="container-fluid">
                <div className="row">
            <div className="col-12">
              <DashboardDataDisplay
                passToParentYoYoTypes={childCallbackYoYoType}
                totalPartsMolded={totalPartsMolded}
                totalPartsSuccessMolded={totalPartsSuccessMolded}
                yieldAtMold={yieldAtMold}
                totalPartsSuccessPaint={totalPartsSuccessPaint}
                yieldAtPaint={yieldAtPaint}
                totalPartsSuccessAssembly={totalPartsSuccessAssembly}
                yieldAtAssembly={yieldAtAssembly}
                totalPartsPackaged={totalPartsPackaged}
                totalYield={totalYield}                

              />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12">
                      {contents}
                    </div>
                </div>
                <br />
                <br />
            </div>
        </div>
    );

}

export default Dashboard