import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import {CarList} from '../car';
import {BookingList} from '../booking';

class App extends React.Component {
  render() {
    const {user} = this.props;

    return (
        <Grid container spacing={2}>
          <Grid item xs={12} style={{padding: 20}}>
            <CarList/>
          </Grid>
          {user.logged &&
          <Grid item xs={12} style={{padding: 20}}>
            <BookingList/>
          </Grid>
          }
        </Grid>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {user};
}

const actionCreators = {};

const connectedApp = connect(mapStateToProps, actionCreators)(App);
export {connectedApp as App};
