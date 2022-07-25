import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {bookingActions, carActions} from '../../_actions';
import {Room, Schedule} from '@material-ui/icons';

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 5,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpenMaps = this.handleOpenMaps.bind(this);
    this.handleBook = this.handleBook.bind(this);
  }

  componentDidMount() {
    const {size} = this.state;
    const {near} = this.props;

    navigator.geolocation.getCurrentPosition((pos) => {
      near(size, pos.coords.latitude, pos.coords.longitude);
    });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSearch() {
    const {size} = this.state;
    const {near} = this.props;

    navigator.geolocation.getCurrentPosition((pos) => {
      near(size, pos.coords.latitude, pos.coords.longitude);
    });
  }

  handleOpenMaps(lat, long) {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
    window.open(url, '_blank');
  }

  handleBook(id, projID, userID) {
    const token = localStorage.getItem('token');

    if (token !== null) {
      this.props.book(id, projID, token, userID);
    }
  }

  render() {
    const {size} = this.state;
    const {car, user} = this.props;

    return (
        <Paper style={{padding: 20}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField label="Top N" type="number" name={'size'}
                             value={size}
                             variant={'outlined'} size="small"
                             onChange={this.handleChange}/>
                </Grid>
                <Grid item>
                  <Button variant="contained"
                          color="primary"
                          onClick={this.handleSearch}>Search</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>Near your geolocation Top {size} cars</Typography>
              {car.loading ?
                  <Typography>Loading...</Typography> :
                  car.data && <List>
                    {car.data.map((item, _) =>
                        <ListItem key={item.id} role={undefined} dense>
                          <ListItemText id={item.id} primary={item.id}/>
                          <ListItemText id={item.id}
                                        primary={item.car_of_area}/>
                          <ListItemText id={item.id} primary={Math.round(
                              item.distance * 100) / 100 + ` Km`}/>
                          <ListItemIcon>
                            <IconButton onClick={() => this.handleOpenMaps(
                                item.latitude, item.longitude)}>
                              <Room/>
                            </IconButton>
                          </ListItemIcon>
                          {user.logged && (
                              <ListItemSecondaryAction>
                                <IconButton edge="end"
                                            onClick={() => this.handleBook(item.id,
                                                item.project_id, user.data.id)}>
                                  <Schedule/>
                                </IconButton>
                              </ListItemSecondaryAction>
                          )}
                        </ListItem>,
                    )}
                  </List>}
            </Grid>
          </Grid>
        </Paper>
    );
  }
}

function mapStateToProps(state) {
  const {car, user} = state;
  return {car, user};
}

const actionCreators = {
  near: carActions.near,
  book: bookingActions.book,
};

const connectedCarList = connect(mapStateToProps, actionCreators)(CarList);
export {connectedCarList as CarList};
