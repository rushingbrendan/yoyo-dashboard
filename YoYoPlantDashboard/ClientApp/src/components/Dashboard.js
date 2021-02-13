import React, { useEffect } from 'react';

import ParetoChart from 'pareto-chart'
import DashboardDataDisplay from './DashboardDataDisplay';

const MINUTE_MS = 60000;


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


  useEffect(() => {
    populateData(yoyoType)

    const interval = setInterval(() => {
      populateData(yoyoType);
    }, MINUTE_MS);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval); 
  }, [yoyoType])


  const childCallbackYoYoType = (value) => {
        setYoyoType(value)
  }

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