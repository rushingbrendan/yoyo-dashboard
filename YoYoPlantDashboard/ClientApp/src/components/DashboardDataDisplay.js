/*
 *   FILE          : DashboardDataDisplay.js
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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


/*
FUNCTION : useStyles
DESCRIPTION : This function creates styles for react component.
PARAMETERS : theme
RETURNS : none
*/
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

/*
FUNCTION : DashboardDataDisplay
DESCRIPTION : This function displays the dashboard data.
PARAMETERS : props
RETURNS : none
*/
export default function DashboardDataDisplay(props) {
  const classes = useStyles();
  const [yoyoType, setYoyoType] = React.useState(0);

  const [state, setState] = React.useState({
    productId: 0,
    name: 'hai',
  });

  /*
  FUNCTION : handleChange
  DESCRIPTION : This function is called when select input is changed.
  PARAMETERS : event
  RETURNS : none
  */
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });

    props.passToParentYoYoTypes(event.target.value);

  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">YoYo Types</InputLabel>
                <Select
                  native
                  value={state.productId}
                  onChange={handleChange}
                  label="YoYo Type"
                  inputProps={{
                    name: 'productId',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value={0}>All Types</option>
                  <option value={1}>Original Sleeper</option>
                  <option value={2}>Black Beauty</option>
                  <option value={3}>Firecracker</option>
                  <option value={4}>Lemon Yellow</option>
                  <option value={5}>Midnight Blue</option>
                  <option value={6}>Screaming Orange</option>
                  <option value={7}>Gold Glitter</option>
                  <option value={8}>White Lightening</option>
                </Select>
              </FormControl>
            </div>
            <div className="col-4">
              <span>Total parts molded: {props.totalPartsMolded}</span>
              <br />
              <span>Total parts successfully molded: {props.totalPartsSuccessMolded}</span>
              <br />
              <span>Yield at Mold: {props.yieldAtMold}</span>
              <br />
              <span>Total parts successfully painted: {props.totalPartsSuccessPaint}</span>
              <br />
              <span>Yield at Paint: {props.yieldAtPaint}</span>
              <br />
            </div>
            <div className="col-4">
              <span>Total parts successfully assembled: {props.totalPartsSuccessAssembly}</span>
              <br />
              <span>Yield at Assembly: {props.yieldAtAssembly}</span>
              <br />
              <span>Total parts packaged: {props.totalPartsPackaged}</span>
              <br />
              <span>Total Yield: {props.totalYield}</span>
              <br />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}