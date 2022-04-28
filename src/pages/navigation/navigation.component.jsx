import { React } from 'react';
import { Outlet, Link  } from 'react-router-dom';

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => (
    <div>
      <div className='navigation'>
        <Link to="/">
            <CrwnLogo />
        </Link>
        <div className='nav-links-container'>
            <Link className="nav-link" to="/hats">SHOP</Link>
            <Link className='nav-link' to="/auth">LOGIN</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );


export default Navigation;