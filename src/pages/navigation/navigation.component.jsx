import { React, useContext } from 'react';
import { Outlet, Link  } from 'react-router-dom';

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return (
    <div>
      <div className='navigation'>
        <Link to="/">
            <CrwnLogo />
        </Link>
        <div className='nav-links-container'>
            <Link className="nav-link" to="/hats">SHOP</Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}> SIGN OUT </span>
              ) : (
                <Link className='nav-link' to="/auth">SIGN IN</Link>
              )
            }
            <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </div>
  )}


export default Navigation;