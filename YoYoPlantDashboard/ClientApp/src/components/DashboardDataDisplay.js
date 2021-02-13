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

    props.passToParent(event.target.value);

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
              <span>Total parts molded: 100</span>
              <br />
              <span>Total parts successfully molded: 80</span>
              <br />
              <span>Yield at Mold: 0.80</span>
              <br />
              <span>Total parts successfully painted: 70</span>
              <br />
              <span>Yield at Paint: 0.875</span>
              <br />
            </div>
            <div className="col-4">
              <span>Total parts successfully assembled: 60</span>
              <br />
              <span>Yield at Assembly: 0.875</span>
              <br />
              <span>Total parts packaged: 60</span>
              <br />
              <span>Total Yield: 0.60</span>
              <br />
            </div>
          </div>
        </div>


      </CardContent>
    </Card>
  );
}




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

function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">YoYo Types</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          label="YoYo Type"
          inputProps={{
            name: 'YoYo Types',
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
  );
}
