import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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


export default function DashboardDataDisplay(props) {
  const classes = useStyles();
  const [yoyoType, setYoyoType] = React.useState(0);

  const [state, setState] = React.useState({
    productId: 0,
    name: 'hai',
  });

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