import {logout} from './../../services/auth';

const Logout = (props) =>{

  logout(localStorage.getItem('token'));
  props.history.push('/sign_in');

  return null;
};

export default Logout;