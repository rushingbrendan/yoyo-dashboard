import React, { Component } from 'react';

import ParetoChart from 'pareto-chart'
import ParetoDisplay from './ParetoDisplay';
import DashboardDataDisplay from './DashboardDataDisplay';

const paretoData = {
    'Customer complaints': {
        'Dificult parking': 40,
        'Rude sales person': 13,
        'Poor lighting': 10,
        'Confusing layout': 27,
        'Limmited sizes': 15
    }
}


export const Dashboard = () => {
    const [yoyoType, setYoyoType] = React.useState(0);

    const childCallback = (value) => {
        setYoyoType(value)
    }

    return (
        <div>

            {/* DASHBOARD CONFIGURATION */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <DashboardDataDisplay passToParent={childCallback} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12">
                        <ParetoDisplay data={paretoData} />
                    </div>
                </div>
                <br />
            </div>
        </div>
    );

}

export default Dashboard