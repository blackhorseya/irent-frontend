import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {cars} from './car.reducer';
import {users} from './user.reducer';
import {billing} from './billing.reducer';
import {booking} from './booking.reducer';

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  car: cars,
  user: users,
  billing: billing,
  booking: booking,
});
