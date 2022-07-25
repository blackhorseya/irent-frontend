import React from 'react';
import {
    Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {bookingActions} from '../../_actions';
import {Cancel, Refresh, Room} from '@material-ui/icons';
import moment from 'moment';

class BookingList extends React.Component {
    constructor(props) {
        super(props);

        this.handleOpenMaps = this.handleOpenMaps.bind(this);
        this.handleCancelBooking = this.handleCancelBooking.bind(this);
        this.handleList = this.handleList.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (token !== null) {
            this.props.list(token);
        }
    }

    handleList() {
        const token = localStorage.getItem('token');

        if (token !== null) {
            this.props.list(token);
        }
    }

    handleOpenMaps(lat, long) {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
        window.open(url, '_blank');
    }

    handleCancelBooking(id) {
        const token = localStorage.getItem('token');

        if (token !== null) {
            this.props.cancel(id, token);
        }
    }

    render() {
        const {booking} = this.props;

        function formatTime(s) {
            return moment(new Date(s)).format('YYYY/MM/DD HH:mm')
        }

        return (<Paper style={{padding: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant={'h5'}>Booking List</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => this.handleList()}>
                                <Refresh/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {booking.loading && (<Typography>Loading...</Typography>)}
                    {booking.loading === false && (booking.error && (<Typography>{booking.error}</Typography>))}
                    {booking.loading === false && booking.data && (<List>
                        {booking.data.map((item, _) => <ListItem key={item.no}>
                            <ListItemText id={item.no} primary={item.car_id}/>
                            <ListItemText id={item.no} primary={formatTime(item.stop_pick_at)}/>
                            <ListItemIcon>
                                <IconButton
                                    onClick={() => this.handleOpenMaps(item.car_latitude, item.car_longitude)}>
                                    <Room/>
                                </IconButton>
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton onClick={() => this.handleCancelBooking(item.no)}>
                                    <Cancel/>
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>)}
                    </List>)}
                </Grid>
            </Grid>
        </Paper>);
    }
}

function mapStateToProps(state) {
    const {booking} = state;
    return {booking};
}

const actionCreators = {
    list: bookingActions.list, cancel: bookingActions.cancel,
};

const connectedBookingList = connect(mapStateToProps, actionCreators)(BookingList);
export {connectedBookingList as BookingList};
