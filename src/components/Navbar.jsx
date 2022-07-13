import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { SiFreelancer } from 'react-icons/si';
import { BsPersonCircle } from 'react-icons/bs';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <FaHome
              fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              // width='36px'
              // height='36px'
            />

            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Home
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/free')}>
            <SiFreelancer
              fill={pathMatchRoute('/free') ? '#2c2c2c' : '#8f8f8f'}
              // width='36px'
              // height='36px'
            />
            <p
              className={
                pathMatchRoute('/free')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Free
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <BsPersonCircle
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              // width='36px'
              // height='36px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
