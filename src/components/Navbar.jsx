import { useNavigate, useLocation } from 'react-router-dom';

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
            <p
              className={
                pathMatchRoute('/sign-in') ||
                pathMatchRoute('/sign-up') ||
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
