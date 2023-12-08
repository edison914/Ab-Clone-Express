import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navBar'>
      <NavLink exact to="/">
        <img className='logo' src="../../public/logo.png" alt="Home" />
      </NavLink>
      {isLoaded && (
        <li className="toggle" >
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
