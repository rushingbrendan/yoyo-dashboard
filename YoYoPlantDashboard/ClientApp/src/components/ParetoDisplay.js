import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ParetoChart from 'pareto-chart'


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default function ParetoDisplay(props) {
    const classes = useStyles();


    return (

        <Card className={classes.root}>
            <CardContent>
                <ParetoChart
                    width={100}
                    height={50}
                    lineLabel='Cumulative percentage'
                    data={props.data} />
            </CardContent>
        </Card>
    );
}